export interface SummaryChapter {
  number: number;
  title: string;
}

export interface SummaryPart {
  /** Stable id used in the URL (`?part=`), the spoiler reveal key, and the text file name. */
  id: string;
  number: number;
  words: number;
  /** When the part was finished (ISO date). */
  writtenAt: string;
  /** Notes that come before the first chapter, e.g. a recap of the previous volume. */
  prelude?: { title: string };
  chapters: SummaryChapter[];
}

export interface SummaryVolume {
  number: number;
  /** The volume's name. Treated as a spoiler until the reader reaches `startChapter`. */
  name: string;
  startChapter: number;
  /** Cover art served from `public/`, at a 2:3 ratio to fit the 3D book. */
  cover: string;
  /** Dark colour sampled from the art, used for the book's spine and boards. */
  coverColor: string;
  authors: string[];
  parts: SummaryPart[];
  /** More parts are still being written. */
  ongoing: boolean;
}

/**
 * One block of a summary: a paragraph, a small heading (only in a prelude),
 * or a passage the author quotes straight from the novel.
 */
export type SummaryBlock = string | { heading: string } | { quote: string[] };

/** The written text of one part, as produced by `pdf_summaries/extract_text.py`. */
export interface SummaryText {
  prelude: SummaryBlock[];
  /** Keyed by chapter number. */
  chapters: Record<string, SummaryBlock[]>;
}
