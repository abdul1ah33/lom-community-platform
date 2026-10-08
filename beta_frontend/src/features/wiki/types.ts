/**
 * Types for the Wiki module. They define the proposed API contract,
 * documented in docs/api-contracts/wiki.md; keep the two in sync.
 */

export type WikiCategory = "characters" | "pathways" | "sequences" | "artifacts" | "organizations" | "locations";

/** Display order and labels, per the MVP roadmap's wiki categories. */
export const WIKI_CATEGORIES: { id: WikiCategory; label: string }[] = [
  { id: "characters", label: "Characters" },
  { id: "pathways", label: "Pathways" },
  { id: "sequences", label: "Sequences" },
  { id: "artifacts", label: "Artifacts" },
  { id: "organizations", label: "Organizations" },
  { id: "locations", label: "Locations" },
];

/** What search and browse return. */
export interface WikiEntrySummary {
  slug: string;
  category: WikiCategory;
  title: string;
  summary: string;
  /** First chapter where the entry itself (its title and summary) is safe to see. 0 = always safe. */
  reveal_chapter: number;
}

export interface WikiSection {
  heading: string;
  body: string;
  /** Chapter this section spoils up to; null = safe once the entry itself is. */
  spoiler_chapter: number | null;
}

export interface WikiEntry extends WikiEntrySummary {
  aliases: string[];
  sections: WikiSection[];
  updated_at: string;
}
