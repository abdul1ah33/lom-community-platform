import { COMMENT_LIMITS, type Comment, type MentionCandidate, type ProfileComment } from "@/features/comments/types";
import { db, type MockComment, type MockUser } from "../db";
import { apiError, json, noContent, validationError } from "../http";
import { currentUser, requireUser } from "../identity";
import type { MockRouter } from "../router";

/**
 * The proposed Comments API (docs/api-contracts/comments.md), plus the user
 * search that powers @mention autocomplete.
 */
export function registerCommentHandlers(router: MockRouter) {
  router
    .on("GET", "/posts/:id/comments", async ({ params, query, headers }) => {
      const viewer = await currentUser(headers);
      if (!db.postById(params.id)) return postNotFound();
      // Top level only, newest first. A removed comment only stays while it still has replies.
      const top = db.comments
        .filter((c) => c.post_id === params.id && c.parent_id === null && (!c.deleted || replyCount(c.id) > 0))
        .sort((a, b) => b.created_at.localeCompare(a.created_at));
      return json(paginate(top, query, (c) => toComment(c, viewer)));
    })

    .on("POST", "/posts/:id/comments", async ({ params, headers, body }) => {
      const me = await requireUser(headers);
      if (!db.postById(params.id)) return postNotFound();

      const input = (body ?? {}) as { body?: unknown; parent_id?: unknown };
      const text = typeof input.body === "string" ? input.body.trim() : "";
      if (!text) return validationError([{ field: "body", message: "A comment needs some text." }]);
      if (text.length > COMMENT_LIMITS.body)
        return validationError([{ field: "body", message: `At most ${COMMENT_LIMITS.body} characters.` }]);

      // One level of nesting: replying to a reply attaches to its top-level comment.
      let parentId: string | null = null;
      if (input.parent_id != null) {
        const parent = db.commentById(String(input.parent_id));
        if (!parent || parent.post_id !== params.id)
          return validationError([{ field: "parent_id", message: "That comment is not on this post." }]);
        parentId = parent.parent_id ?? parent.id;
      }

      const comment: MockComment = {
        id: crypto.randomUUID(),
        post_id: params.id,
        parent_id: parentId,
        author_id: me.id,
        body: text,
        deleted: false,
        created_at: new Date().toISOString(),
        edited_at: null,
      };
      db.insertComment(comment);
      return json(toComment(comment, me), 201);
    })

    .on("GET", "/comments/:id/replies", async ({ params, query, headers }) => {
      const viewer = await currentUser(headers);
      if (!db.commentById(params.id)) return commentNotFound();
      const replies = db.comments
        .filter((c) => c.parent_id === params.id && !c.deleted)
        .sort((a, b) => a.created_at.localeCompare(b.created_at));
      return json(paginate(replies, query, (c) => toComment(c, viewer)));
    })

    .on("PATCH", "/comments/:id", async ({ params, headers, body }) => {
      const me = await requireUser(headers);
      const comment = db.commentById(params.id);
      if (!comment || comment.deleted) return commentNotFound();
      if (comment.author_id !== me.id) return forbidden();

      const text = typeof (body as { body?: unknown })?.body === "string" ? (body as { body: string }).body.trim() : "";
      if (!text) return validationError([{ field: "body", message: "A comment needs some text." }]);
      if (text.length > COMMENT_LIMITS.body)
        return validationError([{ field: "body", message: `At most ${COMMENT_LIMITS.body} characters.` }]);

      const updated = db.updateComment(comment.id, { body: text, edited_at: new Date().toISOString() })!;
      return json(toComment(updated, me));
    })

    .on("DELETE", "/comments/:id", async ({ params, headers }) => {
      const me = await requireUser(headers);
      const comment = db.commentById(params.id);
      if (!comment || comment.deleted) return commentNotFound();
      if (comment.author_id !== me.id) return forbidden();

      // Keep a placeholder when replies hang off it, so the thread still makes sense.
      if (comment.parent_id === null && replyCount(comment.id) > 0) db.updateComment(comment.id, { deleted: true });
      else db.removeComment(comment.id);
      return noContent();
    })

    .on("POST", "/comments/:id/like", async ({ params, headers }) => {
      const me = await requireUser(headers);
      if (!db.commentById(params.id)) return commentNotFound();
      db.likeComment(me.id, params.id);
      return noContent();
    })

    .on("DELETE", "/comments/:id/like", async ({ params, headers }) => {
      const me = await requireUser(headers);
      if (!db.commentById(params.id)) return commentNotFound();
      db.unlikeComment(me.id, params.id);
      return noContent();
    })

    .on("GET", "/users/:username/comments", async ({ params, query, headers }) => {
      const viewer = await currentUser(headers);
      const author = db.byUsername(params.username);
      if (!author) return apiError(404, "USER_NOT_FOUND", "The requested user does not exist.");
      const comments = db.comments
        .filter((c) => c.author_id === author.id && !c.deleted)
        .sort((a, b) => b.created_at.localeCompare(a.created_at));
      return json(paginate(comments, query, (c) => toProfileComment(c, viewer)));
    })

    .on("GET", "/search/users", ({ query }) => {
      const q = (query.get("q") ?? "").trim().toLowerCase();
      const limit = Math.min(Number(query.get("limit")) || 8, 20);
      const rank = (u: MockUser) => (u.username.toLowerCase().startsWith(q) ? 0 : 1);
      const results: MentionCandidate[] = db.users
        .filter((u) => !q || u.username.toLowerCase().includes(q) || u.display_name?.toLowerCase().includes(q))
        .sort((a, b) => rank(a) - rank(b) || a.username.localeCompare(b.username))
        .slice(0, limit)
        .map((u) => ({ id: u.id, username: u.username, display_name: u.display_name, avatar_url: u.avatar_url }));
      return json(results);
    });
}

const postNotFound = () => apiError(404, "POST_NOT_FOUND", "This post does not exist or was deleted.");
const commentNotFound = () => apiError(404, "COMMENT_NOT_FOUND", "This comment does not exist or was deleted.");
const forbidden = () => apiError(403, "FORBIDDEN", "You do not have permission to perform this action.");

const replyCount = (id: string) => db.comments.filter((c) => c.parent_id === id && !c.deleted).length;

function paginate<T>(items: MockComment[], query: URLSearchParams, map: (c: MockComment) => T) {
  const limit = Math.min(Number(query.get("limit")) || 20, 50);
  const offset = Number(query.get("cursor")) || 0;
  const next = offset + limit;
  return { items: items.slice(offset, next).map(map), next_cursor: next < items.length ? String(next) : null };
}

function toComment(comment: MockComment, viewer: MockUser | null): Comment {
  const author = db.byId(comment.author_id);
  return {
    id: comment.id,
    post_id: comment.post_id,
    parent_id: comment.parent_id,
    author: {
      id: comment.author_id,
      username: author?.username ?? "deleted",
      display_name: author?.display_name ?? null,
      avatar_url: author?.avatar_url ?? null,
      favorite_pathway: author?.favorite_pathway ?? null,
    },
    body: comment.deleted ? null : comment.body,
    deleted: comment.deleted,
    created_at: comment.created_at,
    edited_at: comment.edited_at,
    stats: { likes: db.commentLikeCount(comment.id), replies: replyCount(comment.id) },
    viewer: {
      liked: viewer ? db.hasLikedComment(viewer.id, comment.id) : false,
      is_author: viewer?.id === comment.author_id,
    },
  };
}

function toProfileComment(comment: MockComment, viewer: MockUser | null): ProfileComment {
  const post = db.postById(comment.post_id);
  return {
    ...toComment(comment, viewer),
    post: {
      id: comment.post_id,
      author_username: (post && db.byId(post.author_id)?.username) ?? "deleted",
      spoiler_chapter: post?.spoiler_chapter ?? null,
    },
  };
}
