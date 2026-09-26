import { hueFromString } from "@/components/ui/Avatar";
import { getPathway, PATHWAYS, type Pathway } from "@/data/lore/pathways";

/**
 * The pathway shown on a member's arcana card: their chosen favourite, or,
 * until they pick one, a stable pathway derived from their id.
 */
export function arcanaFor(user: { id: string; favorite_pathway?: string | null }): Pathway {
  return getPathway(user.favorite_pathway) ?? PATHWAYS[hueFromString(user.id) % PATHWAYS.length];
}
