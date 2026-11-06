export interface SummaryChapter {
  number: number;
  /** PDF page where this chapter's heading appears. */
  page: number;
  title: string;
}

export interface SummaryPart {
  /** Stable id used in the URL (`?part=`) and the spoiler reveal key. */
  id: string;
  number: number;
  /** Served from `public/`, e.g. `/summaries/vol-2/part-1.pdf`. */
  file: string;
  pages: number;
  words: number;
  /** When the PDF was finished (ISO date). */
  writtenAt: string;
  /** Notes that come before the first chapter, e.g. a recap of the previous volume. */
  prelude?: { title: string; page: number };
  chapters: SummaryChapter[];
}

export interface SummaryVolume {
  number: number;
  /** The volume's name. Treated as a spoiler until the reader reaches `startChapter`. */
  name: string;
  startChapter: number;
  authors: string[];
  parts: SummaryPart[];
  /** More parts are still being written. */
  ongoing: boolean;
}
