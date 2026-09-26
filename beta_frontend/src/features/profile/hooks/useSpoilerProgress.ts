import type { Pathway } from "@/data/lore/pathways";
import { useRevealStore } from "@/lib/spoilers/revealStore";
import { useMyProfile } from "./useProfile";

/** The signed-in reader's saved chapter. 0 until known: better to over-hide than to spoil. */
export function useReaderChapter() {
  const { data } = useMyProfile();
  return data?.reading_progress.current_chapter ?? 0;
}

const pathwayKey = (pathway: Pathway) => `pathway:${pathway.slug}`;

/**
 * Pathway spoiler rules: a pathway is sealed until the reader reaches its
 * `revealChapter`, unless they chose to reveal it this session.
 */
export function usePathwaySpoilers() {
  const chapter = useReaderChapter();
  const store = useRevealStore();

  return {
    chapter,
    /** `atChapter` lets the edit page preview against a chapter that isn't saved yet. */
    isSealed: (pathway: Pathway, atChapter = chapter) =>
      atChapter < pathway.revealChapter && !store.has(pathwayKey(pathway)),
    reveal: (pathway: Pathway) => store.add(pathwayKey(pathway)),
  };
}
