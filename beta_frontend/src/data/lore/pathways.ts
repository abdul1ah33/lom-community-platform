/** Stable identifier the API uses for a pathway (e.g. `favorite_pathway: "hanged-man"`). */
export type PathwaySlug =
  | "fool"
  | "door"
  | "error"
  | "visionary"
  | "sun"
  | "tyrant"
  | "white-tower"
  | "hanged-man"
  | "darkness"
  | "death"
  | "twilight-giant"
  | "demoness"
  | "red-priest"
  | "hermit"
  | "paragon"
  | "wheel-of-fortune"
  | "mother"
  | "moon"
  | "abyss"
  | "chained"
  | "black-emperor"
  | "justiciar";

export interface Pathway {
  slug: PathwaySlug;
  /** Tarot-style numeral, 0–21. */
  number: number;
  name: string;
  /** Entry-level Sequence 9 name, safe for readers at any chapter. */
  sequence9: string;
  /** Accent hue shared by related pathways. */
  hue: number;
}

/**
 * The 22 Beyonder pathways. Static reference content until the Wiki module
 * (roadmap Phase 3) serves it from the API.
 */
export const PATHWAYS: Pathway[] = [
  { slug: "fool", number: 0, name: "Fool", sequence9: "Seer", hue: 265 },
  { slug: "door", number: 1, name: "Door", sequence9: "Apprentice", hue: 265 },
  { slug: "error", number: 2, name: "Error", sequence9: "Marauder", hue: 265 },
  { slug: "visionary", number: 3, name: "Visionary", sequence9: "Spectator", hue: 200 },
  { slug: "sun", number: 4, name: "Sun", sequence9: "Bard", hue: 42 },
  { slug: "tyrant", number: 5, name: "Tyrant", sequence9: "Sailor", hue: 205 },
  { slug: "white-tower", number: 6, name: "White Tower", sequence9: "Reader", hue: 45 },
  { slug: "hanged-man", number: 7, name: "Hanged Man", sequence9: "Secrets Suppliant", hue: 15 },
  { slug: "darkness", number: 8, name: "Darkness", sequence9: "Sleepless", hue: 235 },
  { slug: "death", number: 9, name: "Death", sequence9: "Corpse Collector", hue: 235 },
  { slug: "twilight-giant", number: 10, name: "Twilight Giant", sequence9: "Warrior", hue: 28 },
  { slug: "demoness", number: 11, name: "Demoness", sequence9: "Assassin", hue: 320 },
  { slug: "red-priest", number: 12, name: "Red Priest", sequence9: "Hunter", hue: 355 },
  { slug: "hermit", number: 13, name: "Hermit", sequence9: "Mystery Pryer", hue: 175 },
  { slug: "paragon", number: 14, name: "Paragon", sequence9: "Savant", hue: 175 },
  { slug: "wheel-of-fortune", number: 15, name: "Wheel of Fortune", sequence9: "Monster", hue: 140 },
  { slug: "mother", number: 16, name: "Mother", sequence9: "Planter", hue: 110 },
  { slug: "moon", number: 17, name: "Moon", sequence9: "Apothecary", hue: 340 },
  { slug: "abyss", number: 18, name: "Abyss", sequence9: "Criminal", hue: 0 },
  { slug: "chained", number: 19, name: "Chained", sequence9: "Prisoner", hue: 10 },
  { slug: "black-emperor", number: 20, name: "Black Emperor", sequence9: "Lawyer", hue: 220 },
  { slug: "justiciar", number: 21, name: "Justiciar", sequence9: "Arbiter", hue: 50 },
];

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
