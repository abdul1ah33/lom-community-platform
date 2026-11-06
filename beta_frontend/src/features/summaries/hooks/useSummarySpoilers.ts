import { useReaderChapter } from "@/features/profile";
import { useRevealStore } from "@/lib/spoilers/revealStore";
import { firstChapter } from "../data/volumes";
import type { SummaryPart, SummaryVolume } from "../types";

const partKey = (part: SummaryPart) => `summary:${part.id}`;
const volumeKey = (volume: SummaryVolume) => `summary:vol-${volume.number}`;

/**
 * Spoiler rules for the summaries, sharing the session reveal store with posts and the wiki:
 * - a part is sealed until the reader reaches its first chapter;
 * - inside an open part, chapter titles past the reader stay blurred;
 * - the volume's name is sealed until its first chapter.
 * Revealing a part reveals everything in it, and its volume's name.
 */
export function useSummarySpoilers() {
  const chapter = useReaderChapter();
  const store = useRevealStore();

  const partRevealed = (part: SummaryPart) => store.has(partKey(part));

  return {
    chapter,
    isPartSealed: (part: SummaryPart) => chapter < firstChapter(part) && !partRevealed(part),
    isTitleHidden: (part: SummaryPart, chapterNumber: number) => chapterNumber > chapter && !partRevealed(part),
    isVolumeSealed: (volume: SummaryVolume) =>
      chapter < volume.startChapter && !store.has(volumeKey(volume)) && !volume.parts.some(partRevealed),
    revealPart: (part: SummaryPart) => store.add(partKey(part)),
    revealVolume: (volume: SummaryVolume) => store.add(volumeKey(volume)),
  };
}
