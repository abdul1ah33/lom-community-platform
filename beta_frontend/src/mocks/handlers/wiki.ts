import type { WikiEntry, WikiEntrySummary } from "@/features/wiki/types";
import { WIKI_ENTRIES } from "../data/wiki";
import { apiError, json } from "../http";
import type { MockRouter } from "../router";

/**
 * The proposed Wiki API (docs/api-contracts/wiki.md), served from the browser
 * until the backend implements it. Read-only: editing is an admin feature (roadmap Phase 4).
 */
export function registerWikiHandlers(router: MockRouter) {
  router
    .on("GET", "/wiki/entries", ({ query }) => {
      const q = query.get("q")?.trim().toLowerCase() ?? "";
      const category = query.get("category");

      let entries = WIKI_ENTRIES.filter((e) => !category || e.category === category);
      if (q) {
        entries = entries
          .map((e) => ({ e, rank: rank(e, q) }))
          .filter(({ rank }) => rank > 0)
          // Stable sort keeps browse order among equally good matches.
          .sort((a, b) => b.rank - a.rank)
          .map(({ e }) => e);
      }

      const limit = Math.min(Number(query.get("limit")) || 24, 50);
      const offset = Number(query.get("cursor")) || 0;
      const next = offset + limit;
      return json({
        items: entries.slice(offset, next).map(toSummary),
        next_cursor: next < entries.length ? String(next) : null,
      });
    })

    .on("GET", "/wiki/entries/:slug", ({ params }) => {
      const found = WIKI_ENTRIES.find((e) => e.slug === params.slug.toLowerCase());
      if (!found) return apiError(404, "WIKI_ENTRY_NOT_FOUND", "There is no wiki entry with that name.");
      return json(found);
    });
}

/** Title prefix > title word > alias > summary; 0 = no match. */
function rank(entry: WikiEntry, q: string) {
  const title = entry.title.toLowerCase();
  if (title.startsWith(q)) return 4;
  if (title.includes(q)) return 3;
  if (entry.aliases.some((a) => a.toLowerCase().includes(q))) return 2;
  if (entry.summary.toLowerCase().includes(q)) return 1;
  return 0;
}

function toSummary({ slug, category, title, summary, reveal_chapter }: WikiEntry): WikiEntrySummary {
  return { slug, category, title, summary, reveal_chapter };
}
