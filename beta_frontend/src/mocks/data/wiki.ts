import { PATHWAYS, toRoman } from "@/data/lore/pathways";
import type { WikiEntry } from "@/features/wiki/types";

/**
 * Seed content for the mock Wiki API. DRAFT LORE: every `reveal_chapter` and
 * `spoiler_chapter` below is an estimate and must be checked against the novel
 * before this content moves to the real backend. When unsure, pick a later chapter:
 * over-hiding is better than spoiling.
 */

const UPDATED = "2026-10-08T00:00:00Z";

const entry = (e: Omit<WikiEntry, "updated_at" | "aliases" | "sections"> & Partial<WikiEntry>): WikiEntry => ({
  aliases: [],
  sections: [],
  updated_at: UPDATED,
  ...e,
});

/** One entry per pathway, built from the same table the home deck uses, so the two never disagree. */
const pathwayEntries: WikiEntry[] = PATHWAYS.map((p) =>
  entry({
    slug: p.slug,
    category: "pathways",
    title: `${p.name} Pathway`,
    aliases: [p.name],
    summary: `Pathway ${toRoman(p.number)} of the 22 Beyonder pathways. Its first step is the Sequence 9 potion, ${p.sequence9}.`,
    reveal_chapter: p.revealChapter,
    sections: [
      {
        heading: "Sequence 9",
        body: `${p.sequence9}: the entry-level potion of the ${p.name} pathway. The higher Sequences will be added with their own chapter seals.`,
        spoiler_chapter: null,
      },
    ],
  }),
);

const loreEntries: WikiEntry[] = [
  entry({
    slug: "klein-moretti",
    category: "characters",
    title: "Klein Moretti",
    aliases: ["Klein"],
    summary: "The protagonist: a young history graduate living in Tingen City, where the story begins.",
    reveal_chapter: 0,
    sections: [
      {
        heading: "Family",
        body: "Klein shares a small rented apartment in Tingen with his elder brother Benson and his younger sister Melissa.",
        spoiler_chapter: null,
      },
      {
        heading: "Later story",
        body: "Placeholder section to demonstrate per-section seals. Replace with real, verified text and its chapter.",
        spoiler_chapter: 213,
      },
    ],
  }),
  entry({
    slug: "dunn-smith",
    category: "characters",
    title: "Dunn Smith",
    summary: "Captain of the Tingen City squad of the Nighthawks.",
    reveal_chapter: 10,
  }),
  entry({
    slug: "audrey-hall",
    category: "characters",
    title: "Audrey Hall",
    aliases: ["Justice"],
    summary: "A young noblewoman of Backlund and a member of the Tarot Club, where she goes by Justice.",
    reveal_chapter: 10,
  }),
  entry({
    slug: "alger-wilson",
    category: "characters",
    title: "Alger Wilson",
    aliases: ["The Hanged Man"],
    summary: "A sailor and a member of the Tarot Club, where he goes by the Hanged Man.",
    reveal_chapter: 10,
  }),
  entry({
    slug: "sequences",
    category: "sequences",
    title: "Sequences",
    aliases: ["Sequence"],
    summary:
      "Every pathway is climbed through ten Sequences, from Sequence 9, the weakest, up to Sequence 0. A Beyonder advances by drinking the next Sequence's potion.",
    reveal_chapter: 10,
  }),
  entry({
    slug: "sealed-artifacts",
    category: "artifacts",
    title: "Sealed Artifacts",
    summary: "Objects with supernatural power, often dangerous to their users, that the churches lock away and classify by the harm they can do.",
    reveal_chapter: 20,
  }),
  entry({
    slug: "nighthawks",
    category: "organizations",
    title: "Nighthawks",
    summary: "The Beyonder team of the Church of the Evernight Goddess that handles supernatural incidents in secret. Tingen City has its own squad.",
    reveal_chapter: 10,
  }),
  entry({
    slug: "tarot-club",
    category: "organizations",
    title: "Tarot Club",
    summary: "A secret gathering held in a palace above a gray fog. Its members hide their identities behind tarot card names.",
    reveal_chapter: 10,
  }),
  entry({
    slug: "tingen-city",
    category: "locations",
    title: "Tingen City",
    aliases: ["Tingen"],
    summary: "A city in the Kingdom of Loen, and where the story begins.",
    reveal_chapter: 0,
  }),
  entry({
    slug: "backlund",
    category: "locations",
    title: "Backlund",
    summary: "The capital of the Kingdom of Loen: a vast, foggy industrial city.",
    reveal_chapter: 0,
  }),
  entry({
    slug: "kingdom-of-loen",
    category: "locations",
    title: "Kingdom of Loen",
    aliases: ["Loen"],
    summary: "The kingdom where Tingen City and the capital, Backlund, are found.",
    reveal_chapter: 0,
  }),
];

/** Browse order: by category (as listed in the MVP), then as written above. */
export const WIKI_ENTRIES: WikiEntry[] = [
  ...loreEntries.filter((e) => e.category === "characters"),
  ...pathwayEntries,
  ...loreEntries.filter((e) => e.category !== "characters"),
];
