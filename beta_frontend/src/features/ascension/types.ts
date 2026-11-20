/** One named ability, retold in our own words. */
export interface Power {
  name: string;
  text: string;
}

/** Extra lore on a Sequence: its characteristic, Uniqueness, mythical form, kingdom… */
export interface Note {
  label: string;
  text: string;
}

export interface Sequence {
  /** 9 down to 0; outer-deity pathways also have -1 (the Great Old One above). */
  n: number;
  name: string;
  /** What the brewed potion looks like. */
  potion?: string;
  main?: string[];
  sub?: string[];
  ritual?: string;
  /** Short acting principles, one per line. */
  acting?: string[];
  powers: Power[];
  notes?: Note[];
}

export type PathwayKind = "divine" | "outer";

export interface PathwayDetail {
  slug: string;
  sequences: Sequence[];
}

/** Index entry: enough to draw the card grid without loading the detail chunk. */
export interface PathwayMeta {
  slug: string;
  kind: PathwayKind;
  /** Sequence 0 / Great Old One title. */
  god: string;
  /** Sequence 9 name. */
  first: string;
  hue: number;
  /** Sefirah it belongs to (divine pathways only). */
  sefirah?: string;
  /** Short line of flavour, our own. */
  motto: string;
}
