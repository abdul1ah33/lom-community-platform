import type { Page } from "@/features/profile/types";
import { http } from "@/lib/http/client";
import type { WikiCategory, WikiEntry, WikiEntrySummary } from "../types";

function qs(params: Record<string, string | null | undefined>) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) if (value) search.set(key, value);
  const text = search.toString();
  return text ? `?${text}` : "";
}

/** Thin wrappers over `/api/v1/wiki` (contract: docs/api-contracts/wiki.md). */
export const wikiApi = {
  search: (q: string | null, category: WikiCategory | null, cursor: string | null) =>
    http.get<Page<WikiEntrySummary>>(`/wiki/entries${qs({ q, category, cursor })}`, { auth: true }),

  get: (slug: string) => http.get<WikiEntry>(`/wiki/entries/${encodeURIComponent(slug)}`, { auth: true }),
};
