import { useQuery } from "@tanstack/react-query";
import { getPathway } from "@/data/lore/pathways";
import { useReaderChapter } from "@/features/profile";
import { useRevealStore } from "@/lib/spoilers/revealStore";
import { loadPathwayDetail } from "../data/pathways";
import type { PathwayMeta } from "../types";

/** Book one ends near here; anything gated past it comes from the sequel. */
export const SEQUEL = 1500;

/**
 * The chapter a Sequence stops being a spoiler. The first five steps of a pathway are
 * public once the pathway itself is; the demigod and angel steps open far later.
 */
export function sequenceSealUntil(meta: PathwayMeta, n: number): number {
  if (meta.kind === "outer") return SEQUEL;
  const base = getPathway(meta.slug)?.revealChapter ?? 0;
  if (n >= 5) return base;
  if (n >= 3) return Math.max(base, 600);
  if (n >= 1) return Math.max(base, 1000);
  return Math.max(base, 1200);
}

/**
 * Spoiler gating for the Ascension codex. Divine pathways share the home deck's
 * `pathway:<slug>` key, so revealing one anywhere reveals it here too.
 */
export function useAscensionSpoilers() {
  const chapter = useReaderChapter();
  const store = useRevealStore();

  const isSealed = (key: string, until: number) => chapter < until && !store.has(key);

  const pathwayKey = (meta: PathwayMeta) =>
    meta.kind === "divine" ? `pathway:${meta.slug}` : `ascension:outer:${meta.slug}`;
  const pathwayUntil = (meta: PathwayMeta) =>
    meta.kind === "outer" ? SEQUEL : (getPathway(meta.slug)?.revealChapter ?? 0);

  return {
    chapter,
    isSealed,
    reveal: (key: string) => store.add(key),
    isPathwaySealed: (meta: PathwayMeta) => isSealed(pathwayKey(meta), pathwayUntil(meta)),
    revealPathway: (meta: PathwayMeta) => store.add(pathwayKey(meta)),
    pathwayUntil,
    isSequenceSealed: (meta: PathwayMeta, n: number) =>
      isSealed(`ascension:${meta.slug}:${n}`, sequenceSealUntil(meta, n)),
    revealSequence: (meta: PathwayMeta, n: number) => store.add(`ascension:${meta.slug}:${n}`),
  };
}

export function usePathwayDetail(slug: string | null) {
  return useQuery({
    queryKey: ["ascension", "pathway", slug],
    queryFn: () => loadPathwayDetail(slug!),
    enabled: slug !== null,
    staleTime: Infinity,
  });
}
