/** Stable identifier the API uses for a pathway (e.g. `favorite_pathway: "hanged-man"`). */
export type PathwaySlug =
  | "seer"
  | "apprentice"
  | "marauder"
  | "spectator"
  | "bard"
  | "sailor"
  | "reader"
  | "secrets-suppliant"
  | "sleepless"
  | "corpse-collector"
  | "warrior"
  | "assassin"
  | "hunter"
  | "mystery-pryer"
  | "savant"
  | "monster"
  | "planter"
  | "apothecary"
  | "criminal"
  | "prisoner"
  | "lawyer"
  | "arbiter";

export interface Pathway {
  slug: PathwaySlug;
  /** Tarot-style numeral, 0–21. */
  number: number;
  name: string;
  /** Entry-level Sequence 9 name. Shown only once the pathway itself is revealed. */
  sequence9: string;
  /** Accent hue shared by related pathways. */
  hue: number;
  /** First chapter where this pathway is revealed; before it, the UI treats it as a spoiler. */
  revealChapter: number;
}

/**
 * The chapter where each pathway is first revealed to the reader.
 * Everything that hides pathways reads from this table only.
 */
const REVEAL_CHAPTER: Record<PathwaySlug, number> = {
  seer: 1,
  apprentice: 150,
  marauder: 300,
  spectator: 10,
  bard: 60,
  sailor: 10,
  reader: 100,
  "secrets-suppliant": 100,
  sleepless: 10,
  "corpse-collector": 30,
  warrior: 60,
  assassin: 200,
  hunter: 150,
  "mystery-pryer": 250,
  savant: 300,
  monster: 400,
  planter: 250,
  apothecary: 200,
  criminal: 400,
  prisoner: 400,
  lawyer: 500,
  arbiter: 500,
};

/**
 * The 22 Beyonder pathways. Static reference content until the Wiki module
 * (roadmap Phase 3) serves it from the API.
 */
const PATHWAY_BASE: Omit<Pathway, "revealChapter">[] = [
  { slug: "seer", number: 0, name: "Seer", sequence9: "Seer", hue: 265 },
  { slug: "apprentice", number: 1, name: "Apprentice", sequence9: "Apprentice", hue: 265 },
  { slug: "marauder", number: 2, name: "Marauder", sequence9: "Marauder", hue: 265 },
  { slug: "spectator", number: 3, name: "Spectator", sequence9: "Spectator", hue: 200 },
  { slug: "bard", number: 4, name: "Bard", sequence9: "Bard", hue: 42 },
  { slug: "sailor", number: 5, name: "Sailor", sequence9: "Sailor", hue: 205 },
  { slug: "reader", number: 6, name: "Reader", sequence9: "Reader", hue: 45 },
  { slug: "secrets-suppliant", number: 7, name: "Secrets Suppliant", sequence9: "Secrets Suppliant", hue: 15 },
  { slug: "sleepless", number: 8, name: "Sleepless", sequence9: "Sleepless", hue: 235 },
  { slug: "corpse-collector", number: 9, name: "Corpse Collector", sequence9: "Corpse Collector", hue: 235 },
  { slug: "warrior", number: 10, name: "Warrior", sequence9: "Warrior", hue: 28 },
  { slug: "assassin", number: 11, name: "Assassin", sequence9: "Assassin", hue: 320 },
  { slug: "hunter", number: 12, name: "Hunter", sequence9: "Hunter", hue: 355 },
  { slug: "mystery-pryer", number: 13, name: "Mystery Pryer", sequence9: "Mystery Pryer", hue: 175 },
  { slug: "savant", number: 14, name: "Savant", sequence9: "Savant", hue: 175 },
  { slug: "monster", number: 15, name: "Monster", sequence9: "Monster", hue: 140 },
  { slug: "planter", number: 16, name: "Planter", sequence9: "Planter", hue: 110 },
  { slug: "apothecary", number: 17, name: "Apothecary", sequence9: "Apothecary", hue: 340 },
  { slug: "criminal", number: 18, name: "Criminal", sequence9: "Criminal", hue: 0 },
  { slug: "prisoner", number: 19, name: "Prisoner", sequence9: "Prisoner", hue: 10 },
  { slug: "lawyer", number: 20, name: "Lawyer", sequence9: "Lawyer", hue: 220 },
  { slug: "arbiter", number: 21, name: "Arbiter", sequence9: "Arbiter", hue: 50 },
];

export const PATHWAYS: Pathway[] = PATHWAY_BASE.map((p) => ({
  ...p,
  revealChapter: REVEAL_CHAPTER[p.slug],
}));

/** Pathways a reader at `chapter` has already met, in tarot order. */
export function pathwaysRevealedAt(chapter: number): Pathway[] {
  return PATHWAYS.filter((p) => p.revealChapter <= chapter);
}

const BY_SLUG = new Map(PATHWAYS.map((p) => [p.slug, p]));

export function getPathway(slug: string | null | undefined): Pathway | undefined {
  return slug ? BY_SLUG.get(slug as PathwaySlug) : undefined;
}

export function isPathwaySlug(value: unknown): value is PathwaySlug {
  return typeof value === "string" && BY_SLUG.has(value as PathwaySlug);
}

const ROMAN: [number, string][] = [
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

export function toRoman(value: number): string {
  if (value === 0) return "0";
  let rest = value;
  let out = "";
  for (const [n, glyph] of ROMAN) {
    while (rest >= n) {
      out += glyph;
      rest -= n;
    }
  }
  return out;
}