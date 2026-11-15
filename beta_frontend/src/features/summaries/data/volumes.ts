import type { SummaryChapter, SummaryPart, SummaryVolume } from "../types";
import { VOL2_PART1, VOL2_PART2, VOL2_PART3, type ChapterRow } from "./vol2Chapters";

const toChapters = (rows: ChapterRow[]): SummaryChapter[] =>
  rows.map(([number, title]) => ({ number, title }));

/**
 * The shelf as it ships with the site. It seeds the editable library in `library.ts`:
 * the summary desk (`/admin/summaries`) adds, edits and removes volumes, parts and
 * chapters on top of it, so new summaries no longer need a code change.
 */
export const SEED_VOLUMES: SummaryVolume[] = [
  {
    number: 2,
    name: "Faceless",
    startChapter: 214,
    cover: "/summaries/vol-2/cover.webp",
    coverColor: "#14231f",
    authors: ["Nour"],
    ongoing: true,
    parts: [
      {
        id: "v2-p1",
        number: 1,
        words: 18232,
        writtenAt: "2025-10-11",
        prelude: { title: "Notes from Volume 1" },
        chapters: toChapters(VOL2_PART1),
      },
      {
        id: "v2-p2",
        number: 2,
        words: 19999,
        writtenAt: "2026-03-15",
        chapters: toChapters(VOL2_PART2),
      },
      {
        id: "v2-p3",
        number: 3,
        words: 21637,
        writtenAt: "2026-04-12",
        chapters: toChapters(VOL2_PART3),
      },
    ],
  },
];

export const allParts = (volumes: SummaryVolume[]) =>
  volumes.flatMap((volume) => volume.parts.map((part) => ({ volume, part })));

export function findPart(volumes: SummaryVolume[], id: string | null) {
  return allParts(volumes).find((entry) => entry.part.id === id) ?? null;
}

/** What readers see: parts that have no chapters yet stay on the desk. */
export const publishedVolume = (volume: SummaryVolume): SummaryVolume => ({
  ...volume,
  parts: volume.parts.filter((part) => part.chapters.length > 0),
});

export const firstChapter = (part: SummaryPart) => part.chapters[0].number;
export const lastChapter = (part: SummaryPart) => part.chapters[part.chapters.length - 1].number;

/** Roughly 230 words a minute. */
export const readingMinutes = (words: number) => Math.round(words / 230);

const NUMERALS: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
  [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];
export function roman(n: number) {
  if (!Number.isInteger(n) || n < 1 || n > 3999) return String(n);
  let out = "";
  for (const [value, numeral] of NUMERALS) {
    while (n >= value) {
      out += numeral;
      n -= value;
    }
  }
  return out;
}

export function formatMonth(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(undefined, { month: "short", year: "numeric" });
}
