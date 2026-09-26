import type { PathwaySlug } from "@/data/lore/pathways";

/**
 * Types for the Profiles module. They define the proposed API contract,
 * documented in docs/api-contracts/profiles.md; keep the two in sync.
 */

export interface ReadingProgress {
  /** Last chapter the user finished; 0 = not started. */
  current_chapter: number;
  updated_at: string | null;
}

export interface ProfileStats {
  posts: number;
  comments: number;
  followers: number;
  following: number;
  likes_received: number;
}

export interface Achievement {
  code: string;
  title: string;
  description: string;
  earned_at: string;
}

/** Relationship between the signed-in viewer and the profile being viewed. */
export interface ViewerRelation {
  is_self: boolean;
  is_following: boolean;
}

/** GET /users/{username} */
export interface UserProfile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  favorite_character: string | null;
  favorite_pathway: PathwaySlug | null;
  reading_progress: ReadingProgress;
  joined_at: string;
  stats: ProfileStats;
  achievements: Achievement[];
  viewer: ViewerRelation;
}

/** PATCH /users/me. Every field is optional; send only what changed. `null` clears a field. */
export interface ProfileUpdate {
  display_name?: string | null;
  bio?: string | null;
  location?: string | null;
  favorite_character?: string | null;
  favorite_pathway?: PathwaySlug | null;
  current_chapter?: number;
}

/** Compact user shown in follower / following lists. */
export interface UserSummary {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  favorite_pathway: PathwaySlug | null;
  viewer_is_following: boolean;
}

/** Cursor-paginated list. `next_cursor` is null on the last page. */
export interface Page<T> {
  items: T[];
  next_cursor: string | null;
}

/** Field limits shared by the edit form and the mock server. */
export const PROFILE_LIMITS = {
  displayName: 50,
  bio: 300,
  location: 60,
  favoriteCharacter: 60,
  avatarBytes: 2 * 1024 * 1024,
} as const;
