import type { PathwaySlug } from "@/data/lore/pathways";

/**
 * Types for the Posts module. They define the proposed API contract,
 * documented in docs/api-contracts/posts.md; keep the two in sync.
 */

export interface PostAuthor {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  favorite_pathway: PathwaySlug | null;
}

export interface Post {
  id: string;
  author: PostAuthor;
  /**
   * Null only when `redacted` is true: the server withheld a spoiler past the
   * viewer's reading progress. Fetch with `?reveal=true` to get it.
   */
  body: string | null;
  redacted: boolean;
  tags: string[];
  /** Chapter the post spoils up to; null = spoiler-free. */
  spoiler_chapter: number | null;
  created_at: string;
  edited_at: string | null;
  stats: { likes: number; comments: number };
  /** `bookmarked` is private: only ever true for the viewer's own saves. */
  viewer: { liked: boolean; bookmarked: boolean; is_author: boolean };
}

/** POST /posts */
export interface PostCreate {
  body: string;
  tags: string[];
  spoiler_chapter: number | null;
}

/** PATCH /posts/{id}. Send only changed fields. */
export type PostUpdate = Partial<PostCreate>;

export type FeedKind = "latest" | "following";

export interface TrendingTag {
  tag: string;
  count: number;
}

export const POST_LIMITS = {
  body: 2000,
  tags: 5,
  tagLength: 30,
} as const;
