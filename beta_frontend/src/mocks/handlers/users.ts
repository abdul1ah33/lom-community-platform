import { isPathwaySlug } from "@/data/lore/pathways";
import { TOTAL_CHAPTERS } from "@/data/lore/reading";
import { PROFILE_LIMITS, type Achievement, type UserProfile, type UserSummary } from "@/features/profile/types";
import { db, type MockUser } from "../db";
import { apiError, json, noContent, validationError, type MockRequest } from "../http";
import { currentUser, requireUser } from "../identity";
import type { MockRouter } from "../router";

/**
 * The proposed Profiles API (docs/api-contracts/profiles.md), served from
 * the browser until the backend implements it.
 */
export function registerUserHandlers(router: MockRouter) {
  router
    .on("GET", "/users/:username", async ({ params, headers }) => {
      // Resolve the viewer first: in "users" mode that is what mirrors a real account into the mock DB.
      const viewer = await currentUser(headers);
      const user = db.byUsername(params.username);
      if (!user) return notFound();
      return json(toProfile(user, viewer));
    })

    .on("PATCH", "/users/me", async ({ headers, body }) => {
      const me = await requireUser(headers);
      const result = parseUpdate(body);
      if ("errors" in result) return validationError(result.errors);

      const patch: Partial<MockUser> = { ...result.patch };
      if (result.patch.current_chapter !== undefined && result.patch.current_chapter !== me.current_chapter) {
        patch.progress_updated_at = new Date().toISOString();
      }
      return json(toProfile(db.updateUser(me.id, patch)!, me));
    })

    .on("POST", "/users/me/avatar", async ({ headers, body }) => {
      const me = await requireUser(headers);
      const file = body instanceof FormData ? body.get("file") : null;

      if (!(file instanceof File))
        return validationError([{ field: "file", message: "An image file is required." }]);
      if (!/^image\/(png|jpeg|webp|gif)$/.test(file.type))
        return apiError(415, "UNSUPPORTED_MEDIA_TYPE", "Avatar must be a PNG, JPEG, WebP or GIF image.");
      if (file.size > PROFILE_LIMITS.avatarBytes)
        return apiError(413, "FILE_TOO_LARGE", "Avatar must be 2 MB or smaller.");

      // A real backend would upload to S3/Cloudinary and store the URL.
      const avatar_url = await readAsDataUrl(file);
      return json(toProfile(db.updateUser(me.id, { avatar_url })!, me));
    })

    .on("DELETE", "/users/me/avatar", async ({ headers }) => {
      const me = await requireUser(headers);
      return json(toProfile(db.updateUser(me.id, { avatar_url: null })!, me));
    })

    .on("POST", "/users/:username/follow", async ({ params, headers }) => {
      const me = await requireUser(headers);
      const target = db.byUsername(params.username);
      if (!target) return notFound();
      if (target.id === me.id) return apiError(400, "CANNOT_FOLLOW_SELF", "You cannot follow yourself.");
      db.follow(me.id, target.id);
      return noContent();
    })

    .on("DELETE", "/users/:username/follow", async ({ params, headers }) => {
      const me = await requireUser(headers);
      const target = db.byUsername(params.username);
      if (!target) return notFound();
      db.unfollow(me.id, target.id);
      return noContent();
    })

    .on("GET", "/users/:username/followers", (request) =>
      listRelations(request, (id) => db.followerIds(id)),
    )
    .on("GET", "/users/:username/following", (request) =>
      listRelations(request, (id) => db.followingIds(id)),
    );
}

function notFound() {
  return apiError(404, "USER_NOT_FOUND", "The requested user does not exist.");
}

async function listRelations(
  { params, query, headers }: MockRequest,
  relatedIds: (userId: string) => string[],
) {
  const viewer = await currentUser(headers);
  const user = db.byUsername(params.username);
  if (!user) return notFound();

  const limit = Math.min(Number(query.get("limit")) || 20, 50);
  const offset = Number(query.get("cursor")) || 0;
  const ids = relatedIds(user.id);

  const items: UserSummary[] = ids
    .slice(offset, offset + limit)
    .map((id) => db.byId(id))
    .filter((u): u is MockUser => !!u)
    .map((u) => ({
      id: u.id,
      username: u.username,
      display_name: u.display_name,
      avatar_url: u.avatar_url,
      favorite_pathway: u.favorite_pathway,
      viewer_is_following: viewer ? db.isFollowing(viewer.id, u.id) : false,
    }));

  const next = offset + limit;
  return json({ items, next_cursor: next < ids.length ? String(next) : null });
}

function toProfile(user: MockUser, viewer: MockUser | null): UserProfile {
  const followers = db.followerIds(user.id).length;
  return {
    id: user.id,
    username: user.username,
    display_name: user.display_name,
    avatar_url: user.avatar_url,
    bio: user.bio,
    location: user.location,
    favorite_character: user.favorite_character,
    favorite_pathway: user.favorite_pathway,
    reading_progress: { current_chapter: user.current_chapter, updated_at: user.progress_updated_at },
    joined_at: user.joined_at,
    stats: {
      posts: db.posts.filter((p) => p.author_id === user.id).length,
      comments: user.comments,
      followers,
      following: db.followingIds(user.id).length,
      likes_received:
        user.likes_received +
        db.posts.filter((p) => p.author_id === user.id).reduce((sum, p) => sum + db.likeCount(p.id), 0),
    },
    achievements: achievementsFor(user, followers),
    viewer: {
      is_self: viewer?.id === user.id,
      is_following: viewer ? db.isFollowing(viewer.id, user.id) : false,
    },
  };
}

/** Achievements are computed server-side from the user's state. */
function achievementsFor(user: MockUser, followers: number): Achievement[] {
  const earned_at = user.progress_updated_at ?? user.joined_at;
  const all: (Achievement & { when: boolean })[] = [
    { code: "first_seat", title: "A Seat at the Table", description: "Joined the community.", earned_at: user.joined_at, when: true },
    { code: "chosen_path", title: "Potion Chosen", description: "Picked a favourite pathway.", earned_at, when: !!user.favorite_pathway },
    { code: "chapter_100", title: "Awakened", description: "Read past chapter 100.", earned_at, when: user.current_chapter >= 100 },
    { code: "halfway", title: "Halfway Through the Fog", description: "Read half of the main story.", earned_at, when: user.current_chapter >= TOTAL_CHAPTERS / 2 },
    { code: "finished", title: "Beyond the Era", description: "Finished the main story.", earned_at, when: user.current_chapter >= TOTAL_CHAPTERS },
    { code: "gathering", title: "The Gathering", description: "Reached 3 followers.", earned_at, when: followers >= 3 },
  ];
  return all.filter((a) => a.when).map(({ when: _when, ...achievement }) => achievement);
}

type ParsedUpdate = { patch: Partial<MockUser> } | { errors: { field: string; message: string }[] };

function parseUpdate(body: unknown): ParsedUpdate {
  const input = (body ?? {}) as Record<string, unknown>;
  const patch: Partial<MockUser> = {};
  const errors: { field: string; message: string }[] = [];

  const text = (field: "display_name" | "bio" | "location" | "favorite_character", max: number) => {
    if (!(field in input)) return;
    const value = input[field];
    if (value === null) return void (patch[field] = null);
    if (typeof value !== "string") return void errors.push({ field, message: "Must be a string." });
    const trimmed = value.trim();
    if (trimmed.length > max) return void errors.push({ field, message: `At most ${max} characters.` });
    patch[field] = trimmed || null;
  };

  text("display_name", PROFILE_LIMITS.displayName);
  text("bio", PROFILE_LIMITS.bio);
  text("location", PROFILE_LIMITS.location);
  text("favorite_character", PROFILE_LIMITS.favoriteCharacter);

  if ("favorite_pathway" in input) {
    const value = input.favorite_pathway;
    if (value === null) patch.favorite_pathway = null;
    else if (isPathwaySlug(value)) patch.favorite_pathway = value;
    else errors.push({ field: "favorite_pathway", message: "Unknown pathway." });
  }

  if ("current_chapter" in input) {
    const value = input.current_chapter;
    if (typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= TOTAL_CHAPTERS)
      patch.current_chapter = value;
    else errors.push({ field: "current_chapter", message: `Must be a whole number from 0 to ${TOTAL_CHAPTERS}.` });
  }

  return errors.length ? { errors } : { patch };
}

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
