import { useReaderChapter } from "@/features/profile";
import { useRevealStore } from "@/lib/spoilers/revealStore";
import type { WikiEntrySummary } from "../types";

/**
 * Reveal keys. Pathway entries share the home deck's `pathway:<slug>` key, so revealing a
 * pathway in one place reveals it everywhere.
 */
export const entryRevealKey = (entry: Pick<WikiEntrySummary, "slug" | "category">) =>
  entry.category === "pathways" ? `pathway:${entry.slug}` : `wiki:${entry.slug}`;

export const sectionRevealKey = (slug: string, index: number) => `wiki:${slug}#${index}`;

/**
 * Chapter gating for wiki content: anything marked past the reader's saved chapter is
 * sealed until they choose to reveal it (remembered for the session).
 */
export function useWikiSpoilers() {
  const chapter = useReaderChapter();
  const store = useRevealStore();

  return {
    chapter,
    isSealed: (key: string, atChapter: number | null) => atChapter !== null && chapter < atChapter && !store.has(key),
    reveal: (key: string) => store.add(key),
  };
}
