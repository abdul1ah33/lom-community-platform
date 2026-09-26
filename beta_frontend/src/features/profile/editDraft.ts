import type { PathwaySlug } from "@/data/lore/pathways";
import { TOTAL_CHAPTERS } from "@/data/lore/reading";
import { PROFILE_LIMITS, type ProfileUpdate, type UserProfile } from "./types";

/** Form state for the edit page. Text fields are plain strings; "" means cleared. */
export interface ProfileDraft {
  display_name: string;
  location: string;
  bio: string;
  favorite_character: string;
  favorite_pathway: PathwaySlug | null;
  current_chapter: number;
}

export type DraftErrors = Partial<Record<keyof ProfileDraft, string>>;

const TEXT_FIELDS = ["display_name", "location", "bio", "favorite_character"] as const;

export function draftFromProfile(profile: UserProfile): ProfileDraft {
  return {
    display_name: profile.display_name ?? "",
    location: profile.location ?? "",
    bio: profile.bio ?? "",
    favorite_character: profile.favorite_character ?? "",
    favorite_pathway: profile.favorite_pathway,
    current_chapter: profile.reading_progress.current_chapter,
  };
}

/** Only the fields that changed, normalised the way the API expects (trimmed, "" → null). */
export function diffDraft(draft: ProfileDraft, profile: UserProfile): ProfileUpdate {
  const original = draftFromProfile(profile);
  const changes: ProfileUpdate = {};

  for (const field of TEXT_FIELDS) {
    const next = draft[field].trim();
    if (next !== original[field].trim()) changes[field] = next || null;
  }
  if (draft.favorite_pathway !== original.favorite_pathway) changes.favorite_pathway = draft.favorite_pathway;
  if (draft.current_chapter !== original.current_chapter) changes.current_chapter = draft.current_chapter;

  return changes;
}

export function validateDraft(draft: ProfileDraft): DraftErrors {
  const errors: DraftErrors = {};
  const tooLong = (field: (typeof TEXT_FIELDS)[number], max: number) => {
    if (draft[field].trim().length > max) errors[field] = `Keep it under ${max} characters.`;
  };

  tooLong("display_name", PROFILE_LIMITS.displayName);
  tooLong("location", PROFILE_LIMITS.location);
  tooLong("bio", PROFILE_LIMITS.bio);
  tooLong("favorite_character", PROFILE_LIMITS.favoriteCharacter);

  if (draft.current_chapter < 0 || draft.current_chapter > TOTAL_CHAPTERS)
    errors.current_chapter = `Choose a chapter from 0 to ${TOTAL_CHAPTERS}.`;

  return errors;
}
