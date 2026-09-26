export interface Pathway {
  /** Tarot-style numeral, 0–21. */
  number: number;
  name: string;
  /** Entry-level Sequence 9 name, safe for readers at any chapter. */
  sequence9: string;
  /** Accent hue shared by related pathways. */
  hue: number;
}

/**
 * The 22 Beyonder pathways. Static reference content that seeds the Wiki
 * teaser until the Wiki module (Phase 3) serves it from the API.
 */
export const PATHWAYS: Pathway[] = [
  { number: 0, name: "Fool", sequence9: "Seer", hue: 265 },
  { number: 1, name: "Door", sequence9: "Apprentice", hue: 265 },
  { number: 2, name: "Error", sequence9: "Marauder", hue: 265 },
  { number: 3, name: "Visionary", sequence9: "Spectator", hue: 200 },
  { number: 4, name: "Sun", sequence9: "Bard", hue: 42 },
  { number: 5, name: "Tyrant", sequence9: "Sailor", hue: 205 },
  { number: 6, name: "White Tower", sequence9: "Reader", hue: 45 },
  { number: 7, name: "Hanged Man", sequence9: "Secrets Suppliant", hue: 15 },
  { number: 8, name: "Darkness", sequence9: "Sleepless", hue: 235 },
  { number: 9, name: "Death", sequence9: "Corpse Collector", hue: 235 },
  { number: 10, name: "Twilight Giant", sequence9: "Warrior", hue: 28 },
  { number: 11, name: "Demoness", sequence9: "Assassin", hue: 320 },
  { number: 12, name: "Red Priest", sequence9: "Hunter", hue: 355 },
  { number: 13, name: "Hermit", sequence9: "Mystery Pryer", hue: 175 },
  { number: 14, name: "Paragon", sequence9: "Savant", hue: 175 },
  { number: 15, name: "Wheel of Fortune", sequence9: "Monster", hue: 140 },
  { number: 16, name: "Mother", sequence9: "Planter", hue: 110 },
  { number: 17, name: "Moon", sequence9: "Apothecary", hue: 340 },
  { number: 18, name: "Abyss", sequence9: "Criminal", hue: 0 },
  { number: 19, name: "Chained", sequence9: "Prisoner", hue: 10 },
  { number: 20, name: "Black Emperor", sequence9: "Lawyer", hue: 220 },
  { number: 21, name: "Justiciar", sequence9: "Arbiter", hue: 50 },
];

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
