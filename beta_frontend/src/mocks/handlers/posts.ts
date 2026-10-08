import { env } from "@/config/env";
import { TOTAL_CHAPTERS } from "@/data/lore/reading";
import { POST_LIMITS, type Post, type TrendingTag } from "@/features/posts/types";
import { db, type MockPost, type MockUser } from "../db";
import { apiError, json, noContent, validationError } from "../http";
import { currentUser, requireUser } from "../identity";
import type { MockRouter } from "../router";

/**
 * The proposed Posts API (docs/api-contracts/posts.md), served from the
 * browser until the backend implements it.
 */
export function registerPostHandlers(router: MockRouter) {
  router
    .on("GET", "/posts", async ({ query, headers }) => {
      const viewer = await currentUser(headers);
      const feed = query.get("feed") ?? "latest";
      const tag = query.get("tag")?.toLowerCase();

      let posts = db.posts;
      if (feed === "following") {
        if (!viewer) return apiError(401, "INVALID_ACCESS_TOKEN", "Sign in to see your following feed.");
        const following = new Set(db.followingIds(viewer.id));
        posts = posts.filter((p) => following.has(p.author_id) || p.author_id === viewer.id);
      }
      if (tag) posts = posts.filter((p) => p.tags.some((t) => t.toLowerCase() === tag));

      return json(paginate(sortNewest(posts), query, (p) => toPost(p, viewer, false)));
    })

    .on("POST", "/posts", async ({ headers, body }) => {
      const me = await requireUser(headers);
      const parsed = parsePostInput(body, true);
      if ("errors" in parsed) return validationError(parsed.errors);

      const post: MockPost = {
        id: crypto.randomUUID(),
        author_id: me.id,
        body: parsed.value.body!,
        tags: parsed.value.tags ?? [],
        spoiler_chapter: parsed.value.spoiler_chapter ?? null,
        created_at: new Date().toISOString(),
        edited_at: null,
        base_likes: 0,
        comments: 0,
      };
      db.insertPost(post);
      return json(toPost(post, me, true), 201);
    })

    .on("GET", "/posts/:id", async ({ params, query, headers }) => {
      const viewer = await currentUser(headers);
      const post = db.postById(params.id);
      if (!post) return notFound();
      return json(toPost(post, viewer, query.get("reveal") === "true"));
    })

    .on("PATCH", "/posts/:id", async ({ params, headers, body }) => {
      const me = await requireUser(headers);
      const post = db.postById(params.id);
      if (!post) return notFound();
      if (post.author_id !== me.id) return forbidden();

      const parsed = parsePostInput(body, false);
      if ("errors" in parsed) return validationError(parsed.errors);

      const updated = db.updatePost(post.id, { ...parsed.value, edited_at: new Date().toISOString() })!;
      return json(toPost(updated, me, true));
    })

    .on("DELETE", "/posts/:id", async ({ params, headers }) => {
      const me = await requireUser(headers);
      const post = db.postById(params.id);
      if (!post) return notFound();
      if (post.author_id !== me.id) return forbidden();
      db.deletePost(post.id);
      return noContent();
    })

    .on("POST", "/posts/:id/like", async ({ params, headers }) => {
      const me = await requireUser(headers);
      if (!db.postById(params.id)) return notFound();
      db.like(me.id, params.id);
      return noContent();
    })

    .on("DELETE", "/posts/:id/like", async ({ params, headers }) => {
      const me = await requireUser(headers);
      if (!db.postById(params.id)) return notFound();
      db.unlike(me.id, params.id);
      return noContent();
    })

    .on("POST", "/posts/:id/bookmark", async ({ params, headers }) => {
      const me = await requireUser(headers);
      if (!db.postById(params.id)) return notFound();
      db.bookmark(me.id, params.id);
      return noContent();
    })

    .on("DELETE", "/posts/:id/bookmark", async ({ params, headers }) => {
      const me = await requireUser(headers);
      // No 404 here: un-saving a post that was deleted meanwhile should still succeed.
      db.unbookmark(me.id, params.id);
      return noContent();
    })

    .on("GET", "/users/me/bookmarks", async ({ query, headers }) => {
      const me = await requireUser(headers);
      const posts = db.bookmarkedPostIds(me.id).flatMap((id) => db.postById(id) ?? []);
      return json(paginate(posts, query, (p) => toPost(p, me, false)));
    })

    .on("GET", "/users/:username/posts",async ({ params, query, headers }) => {
      const viewer = await currentUser(headers);
      const author = db.byUsername(params.username);
      if (!author) return apiError(404, "USER_NOT_FOUND", "The requested user does not exist.");
      const posts = sortNewest(db.posts.filter((p) => p.author_id === author.id));
      return json(paginate(posts, query, (p) => toPost(p, viewer, false)));
    })

    .on("GET", "/tags/trending", () => {
      const counts = new Map<string, number>();
      for (const post of db.posts) for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
      const trending: TrendingTag[] = [...counts]
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
        .slice(0, 10);
      return json(trending);
    });
}

const notFound = () => apiError(404, "POST_NOT_FOUND", "This post does not exist or was deleted.");
const forbidden = () => apiError(403, "FORBIDDEN", "You do not have permission to perform this action.");

const sortNewest = (posts: MockPost[]) => [...posts].sort((a, b) => b.created_at.localeCompare(a.created_at));

function paginate(posts: MockPost[], query: URLSearchParams, map: (p: MockPost) => Post) {
  const limit = Math.min(Number(query.get("limit")) || 10, 50);
  const offset = Number(query.get("cursor")) || 0;
  const next = offset + limit;
  return {
    items: posts.slice(offset, next).map(map),
    next_cursor: next < posts.length ? String(next) : null,
  };
}

function toPost(post: MockPost, viewer: MockUser | null, reveal: boolean): Post {
  const author = db.byId(post.author_id);
  const isAuthor = viewer?.id === post.author_id;

  // Server-side spoiler redaction (optional in the mock, see VITE_MOCK_REDACT_SPOILERS).
  const beyondProgress = post.spoiler_chapter !== null && (viewer?.current_chapter ?? 0) < post.spoiler_chapter;
  const redacted = env.mockRedactSpoilers && beyondProgress && !isAuthor && !reveal;

  return {
    id: post.id,
    author: {
      id: post.author_id,
      username: author?.username ?? "deleted",
      display_name: author?.display_name ?? null,
      avatar_url: author?.avatar_url ?? null,
      favorite_pathway: author?.favorite_pathway ?? null,
    },
    body: redacted ? null : post.body,
    redacted,
    tags: post.tags,
    spoiler_chapter: post.spoiler_chapter,
    created_at: post.created_at,
    edited_at: post.edited_at,
    stats: {
      likes: post.base_likes + db.likeCount(post.id),
      comments: db.comments.filter((c) => c.post_id === post.id && !c.deleted).length,
    },
    viewer: {
      liked: viewer ? db.hasLiked(viewer.id, post.id) : false,
      bookmarked: viewer ? db.hasBookmarked(viewer.id, post.id) : false,
      is_author: isAuthor,
    },
  };
}

type ParsedPost =
  | { value: Partial<Pick<MockPost, "body" | "tags" | "spoiler_chapter">> }
  | { errors: { field: string; message: string }[] };

function parsePostInput(body: unknown, creating: boolean): ParsedPost {
  const input = (body ?? {}) as Record<string, unknown>;
  const value: Partial<Pick<MockPost, "body" | "tags" | "spoiler_chapter">> = {};
  const errors: { field: string; message: string }[] = [];

  if (creating || "body" in input) {
    const text = typeof input.body === "string" ? input.body.trim() : "";
    if (!text) errors.push({ field: "body", message: "A post needs some text." });
    else if (text.length > POST_LIMITS.body) errors.push({ field: "body", message: `At most ${POST_LIMITS.body} characters.` });
    else value.body = text;
  }

  if ("tags" in input) {
    const tags = Array.isArray(input.tags) ? input.tags : null;
    if (!tags || tags.some((t) => typeof t !== "string")) errors.push({ field: "tags", message: "Tags must be a list of text." });
    else {
      const clean = [...new Set(tags.map((t) => (t as string).trim().replace(/^#/, "")).filter(Boolean))];
      if (clean.length > POST_LIMITS.tags) errors.push({ field: "tags", message: `At most ${POST_LIMITS.tags} tags.` });
      else if (clean.some((t) => t.length > POST_LIMITS.tagLength))
        errors.push({ field: "tags", message: `Tags are at most ${POST_LIMITS.tagLength} characters.` });
      else value.tags = clean;
    }
  }

  if ("spoiler_chapter" in input) {
    const chapter = input.spoiler_chapter;
    if (chapter === null) value.spoiler_chapter = null;
    else if (typeof chapter === "number" && Number.isInteger(chapter) && chapter >= 1 && chapter <= TOTAL_CHAPTERS)
      value.spoiler_chapter = chapter;
    else errors.push({ field: "spoiler_chapter", message: `Must be a chapter from 1 to ${TOTAL_CHAPTERS}.` });
  }

  return errors.length ? { errors } : { value };
}
