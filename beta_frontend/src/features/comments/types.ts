import type { PostAuthor } from "@/features/posts/types";
import type { UserSummary } from "@/features/profile/types";

/**
 * Types for the Comments module. They define the proposed API contract,
 * documented in docs/api-contracts/comments.md; keep the two in sync.
 */

export interface Comment {
  id: string;
  post_id: string;
  /** Null for a top-level comment; otherwise the top-level comment it replies to (one level of nesting). */
  parent_id: string | null;
  author: PostAuthor;
  /** Null when `deleted`: removed comments that still have replies stay as a placeholder. */
  body: string | null;
  deleted: boolean;
  created_at: string;
  edited_at: string | null;
  stats: { likes: number; replies: number };
  viewer: { liked: boolean; is_author: boolean };
}

/** A comment listed on a profile, with just enough of its post to link back to it. */
export interface ProfileComment extends Comment {
  post: {
    id: string;
    author_username: string;
    /** Lets the UI keep comments on spoiler posts sealed, exactly like the post. */
    spoiler_chapter: number | null;
  };
}

export interface CommentCreate {
  body: string;
  parent_id?: string | null;
}

/** GET /search/users (mention autocomplete). */
export type MentionCandidate = Pick<UserSummary, "id" | "username" | "display_name" | "avatar_url">;

export const COMMENT_LIMITS = { body: 1000 } as const;
