import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { wikiApi } from "../api/wikiApi";
import type { WikiCategory } from "../types";

export const wikiKeys = {
  search: (q: string, category: WikiCategory | null) => ["wiki", "search", q.toLowerCase(), category ?? ""] as const,
  entry: (slug: string) => ["wiki", "entry", slug] as const,
};

/** Lore barely changes, so keep results around instead of refetching on every visit. */
const STALE = 5 * 60_000;

export function useWikiSearch(q: string, category: WikiCategory | null) {
  return useInfiniteQuery({
    queryKey: wikiKeys.search(q, category),
    queryFn: ({ pageParam }) => wikiApi.search(q || null, category, pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (page) => page.next_cursor,
    // Keep showing the previous results while the next search loads, so the grid doesn't flash.
    placeholderData: keepPreviousData,
    staleTime: STALE,
  });
}

export function useWikiEntry(slug: string) {
  return useQuery({ queryKey: wikiKeys.entry(slug), queryFn: () => wikiApi.get(slug), enabled: !!slug, staleTime: STALE });
}
