import type { Page } from "@/features/profile/types";
import { http } from "@/lib/http/client";
import type { FeedKind, Post, PostCreate, PostUpdate, TrendingTag } from "../types";

function qs(params: Record<string, string | null | undefined>) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) if (value) search.set(key, value);
  const text = search.toString();
  return text ? `?${text}` : "";
}

/** Thin wrappers over `/api/v1/posts` (contract: docs/api-contracts/posts.md). */
export const postsApi = {
  feed: (feed: FeedKind, tag: string | null, cursor: string | null) =>
    http.get<Page<Post>>(`/posts${qs({ feed, tag, cursor })}`, { auth: true }),

  byUser: (username: string, cursor: string | null) =>
    http.get<Page<Post>>(`/users/${encodeURIComponent(username)}/posts${qs({ cursor })}`, { auth: true }),

  get: (id: string, reveal = false) =>
    http.get<Post>(`/posts/${encodeURIComponent(id)}${reveal ? "?reveal=true" : ""}`, { auth: true }),

  create: (input: PostCreate) => http.post<Post>("/posts", input, { auth: true }),
  update: (id: string, changes: PostUpdate) => http.patch<Post>(`/posts/${encodeURIComponent(id)}`, changes, { auth: true }),
  remove: (id: string) => http.delete<void>(`/posts/${encodeURIComponent(id)}`, { auth: true }),

  like: (id: string) => http.post<void>(`/posts/${encodeURIComponent(id)}/like`, undefined, { auth: true }),
  unlike: (id: string) => http.delete<void>(`/posts/${encodeURIComponent(id)}/like`, { auth: true }),

  trendingTags: () => http.get<TrendingTag[]>("/tags/trending", { auth: true }),
};
