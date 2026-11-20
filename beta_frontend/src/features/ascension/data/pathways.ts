import { PATHWAYS } from "@/data/lore/pathways";
import type { PathwayDetail, PathwayMeta } from "../types";

/** Sequence 0 name, Sefirah and a one-line motto (ours) for each of the 22 pathways. */
const DIVINE: Record<string, Omit<PathwayMeta, "slug" | "kind" | "first" | "hue">> = {
  seer: { god: "The Fool", sefirah: "Sefirah Castle", motto: "Fate read in cards, a smile painted on." },
  apprentice: { god: "Door", sefirah: "Sefirah Castle", motto: "No wall is thick enough." },
  marauder: { god: "Error", sefirah: "Sefirah Castle", motto: "Everything can be taken, even time." },
  spectator: { god: "Visionary", sefirah: "Chaos Sea", motto: "Every mind is a stage to watch." },
  bard: { god: "Sun", sefirah: "Chaos Sea", motto: "Sing until the darkness burns." },
  sailor: { god: "Tyrant", sefirah: "Chaos Sea", motto: "Storm and sea, answering one voice." },
  "secrets-suppliant": {
    god: "The Hanged Man",
    sefirah: "Chaos Sea",
    motto: "Pray to the dark, and it whispers back.",
  },
  reader: { god: "White Tower", sefirah: "Chaos Sea", motto: "Knowledge, stacked to the sky." },
  "corpse-collector": { god: "Death", sefirah: "River of Eternal Darkness", motto: "Every ending has a keeper." },
  sleepless: { god: "Darkness", sefirah: "River of Eternal Darkness", motto: "The night watches back." },
  warrior: { god: "Twilight Giant", sefirah: "River of Eternal Darkness", motto: "A shield at the end of the day." },
  lawyer: { god: "Black Emperor", sefirah: "Nation of Disorder", motto: "Every law has a crack." },
  arbiter: { god: "Justiciar", sefirah: "Nation of Disorder", motto: "Order, spoken aloud." },
  hunter: { god: "Red Priest", sefirah: "City of Calamity", motto: "War is the oldest prayer." },
  assassin: { god: "Demoness", sefirah: "City of Calamity", motto: "Beauty, poison and catastrophe." },
  criminal: { god: "Abyss", sefirah: "Tenebrous World", motto: "Desire with no bottom." },
  prisoner: { god: "Chained", sefirah: "Tenebrous World", motto: "Madness, held in irons." },
  "mystery-pryer": { god: "Hermit", sefirah: "Knowledge Moor", motto: "Every secret wants to be known." },
  savant: { god: "Paragon", sefirah: "Knowledge Moor", motto: "Build it, and understand the world." },
  planter: { god: "Mother", sefirah: "Brood Hive", motto: "Life, and the harvest after it." },
  apothecary: { god: "The Moon", sefirah: "Brood Hive", motto: "Potions, beasts and a crimson light." },
  monster: { god: "Wheel of Fortune", sefirah: "Key of Light", motto: "Luck is a wheel, and it turns." },
};

/** The ten Outer Deity pathways, from beyond Earth. */
const OUTER: PathwayMeta[] = [
  {
    slug: "scrooge",
    kind: "outer",
    god: "Mother Tree of Desire",
    first: "Scrooge",
    hue: 130,
    motto: "Want, and keep wanting.",
  },
  {
    slug: "initiator",
    kind: "outer",
    god: "Inextinguishable Ravings",
    first: "Initiator",
    hue: 300,
    motto: "A voice that never goes quiet.",
  },
  {
    slug: "tramp",
    kind: "outer",
    god: "Primordial Hunger",
    first: "Tramp",
    hue: 20,
    motto: "Hunger older than worlds.",
  },
  { slug: "broker", kind: "outer", god: "Uncertain Mist", first: "Broker", hue: 200, motto: "Nothing stays settled." },
  {
    slug: "dreamless",
    kind: "outer",
    god: "Goddess of Fate",
    first: "Dreamless",
    hue: 260,
    motto: "Sleep without dreams, fate without mercy.",
  },
  {
    slug: "astronomy-aficionado",
    kind: "outer",
    god: "Supernova Dominator",
    first: "Astronomy Aficionado",
    hue: 45,
    motto: "Stars are born to burn out.",
  },
  {
    slug: "shaman",
    kind: "outer",
    god: "High-Dimensional Overseer",
    first: "Shaman",
    hue: 175,
    motto: "Seen from somewhere higher.",
  },
  {
    slug: "patient",
    kind: "outer",
    god: "Monarch of Decay",
    first: "Patient",
    hue: 85,
    motto: "All things rot in time.",
  },
  {
    slug: "dancer",
    kind: "outer",
    god: "Circle of Inevitability",
    first: "Dancer",
    hue: 350,
    motto: "The circle always closes.",
  },
  {
    slug: "villain",
    kind: "outer",
    god: "Mother Goddess of Depravity",
    first: "Villain",
    hue: 320,
    motto: "Corruption, born a mother.",
  },
];

export const DIVINE_PATHWAYS: PathwayMeta[] = PATHWAYS.map((p) => ({
  slug: p.slug,
  kind: "divine" as const,
  first: p.sequence9,
  hue: p.hue,
  ...DIVINE[p.slug],
}));

export const OUTER_PATHWAYS = OUTER;

const ALL = new Map([...DIVINE_PATHWAYS, ...OUTER_PATHWAYS].map((p) => [p.slug, p]));

export function getPathwayMeta(slug: string | null | undefined): PathwayMeta | undefined {
  return slug ? ALL.get(slug) : undefined;
}

/** Each pathway's full ladder lives in its own chunk, loaded when it is opened. */
const loaders = import.meta.glob<{ default: PathwayDetail }>("./pathways/*.ts");

export function hasPathwayDetail(slug: string) {
  return `./pathways/${slug}.ts` in loaders;
}

export async function loadPathwayDetail(slug: string): Promise<PathwayDetail | null> {
  const load = loaders[`./pathways/${slug}.ts`];
  return load ? (await load()).default : null;
}
