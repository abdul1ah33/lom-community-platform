import type { SummaryChapter, SummaryPart, SummaryVolume } from "../types";
import { VOL2_PART1, VOL2_PART2, VOL2_PART3, type ChapterRow } from "./vol2Chapters";

const toChapters = (rows: ChapterRow[]): SummaryChapter[] =>
  rows.map(([number, page, title]) => ({ number, page, title }));

/**
 * The summaries shelf. To publish a new part: drop the PDF in
 * `public/summaries/vol-<n>/`, add its chapter index next to `vol2Chapters.ts`,
 * and append an entry here. Page and word counts are shown on the folio cards.
 */
export const VOLUMES: SummaryVolume[] = [
  {
    number: 2,
    name: "Faceless",
    startChapter: 214,
    authors: ["Nour"],
    ongoing: true,
    parts: [
      {
        id: "v2-p1",
        number: 1,
        file: "/summaries/vol-2/part-1.pdf",
        pages: 33,
        words: 18232,
        writtenAt: "2025-10-11",
        prelude: { title: "Notes from Volume 1", page: 1 },
        chapters: toChapters(VOL2_PART1),
      },
      {
        id: "v2-p2",
        number: 2,
        file: "/summaries/vol-2/part-2.pdf",
        pages: 39,
        words: 19999,
        writtenAt: "2026-03-15",
        chapters: toChapters(VOL2_PART2),
      },
      {
        id: "v2-p3",
        number: 3,
        file: "/summaries/vol-2/part-3.pdf",
        pages: 41,
        words: 21637,
        writtenAt: "2026-04-12",
        chapters: toChapters(VOL2_PART3),
      },
    ],
  },
];

export const ALL_PARTS = VOLUMES.flatMap((volume) => volume.parts.map((part) => ({ volume, part })));

export function findPart(id: string | null) {
  return ALL_PARTS.find((entry) => entry.part.id === id) ?? null;
}

export const firstChapter = (part: SummaryPart) => part.chapters[0].number;
export const lastChapter = (part: SummaryPart) => part.chapters[part.chapters.length - 1].number;

/** Roughly 230 words a minute. */
export const readingMinutes = (words: number) => Math.round(words / 230);

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
export const roman = (n: number) => ROMAN[n] ?? String(n);

export function formatMonth(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(undefined, { month: "short", year: "numeric" });
}
