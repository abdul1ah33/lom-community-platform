import { hueFromString } from "@/components/ui/Avatar";
import { getPathway, pathwaysRevealedAt, type Pathway } from "@/data/lore/pathways";

/**
 * The pathway shown on a member's arcana card: their chosen favourite, or,
 * until they pick one, a stable pathway derived from their id. The derived
 * one is only ever drawn from pathways revealed by `chapter`, so an
 * auto-assigned card can never be a spoiler.
 */
export function arcanaFor(user: { id: string; favorite_pathway?: string | null }, chapter: number): Pathway {
  const chosen = getPathway(user.favorite_pathway);
  if (chosen) return chosen;
  // Chapter 1's pathway is always available, so brand-new readers still get a card.
  const pool = pathwaysRevealedAt(Math.max(chapter, 1));
  return pool[hueFromString(user.id) % pool.length];
}
