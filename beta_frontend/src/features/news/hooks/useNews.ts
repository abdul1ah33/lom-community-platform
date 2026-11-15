import { useQuery } from "@tanstack/react-query";
import { fetchNewsFeed, fetchNewsPost } from "../api/newsApi";

export const newsKeys = {
  feed: ["news", "feed"] as const,
  post: (id: string) => ["news", "post", id] as const,
};

/** The official site posts a few times a month, so one read per visit is plenty. */
const STALE = 10 * 60_000;

export function useNewsFeed() {
  return useQuery({ queryKey: newsKeys.feed, queryFn: fetchNewsFeed, staleTime: STALE });
}

export function useNewsPost(id: string) {
  return useQuery({ queryKey: newsKeys.post(id), queryFn: () => fetchNewsPost(id), enabled: !!id, staleTime: STALE });
}
