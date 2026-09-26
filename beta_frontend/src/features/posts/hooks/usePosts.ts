import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type InfiniteData,
  type QueryClient,
} from "@tanstack/react-query";
import { profileKeys } from "@/features/profile/hooks/useProfile";
import type { Page } from "@/features/profile/types";
import { postsApi } from "../api/postsApi";
import type { FeedKind, Post, PostCreate, PostUpdate } from "../types";

export const postKeys = {
  all: ["posts"] as const,
  lists: ["posts", "list"] as const,
  feed: (feed: FeedKind, tag: string | null) => ["posts", "list", "feed", feed, tag ?? ""] as const,
  byUser: (username: string) => ["posts", "list", "user", username.toLowerCase()] as const,
  detail: (id: string) => ["posts", "detail", id] as const,
  trending: ["tags", "trending"] as const,
};

type PostList = InfiniteData<Page<Post>, string | null>;

/** Applies `update` to a post wherever it is cached: every list page and its detail entry. */
function patchPostEverywhere(queryClient: QueryClient, id: string, update: (post: Post) => Post | null) {
  queryClient.setQueriesData<PostList>({ queryKey: postKeys.lists }, (data) =>
    data && {
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        items: page.items.flatMap((post) => {
          if (post.id !== id) return [post];
          const next = update(post);
          return next ? [next] : [];
        }),
      })),
    },
  );
  queryClient.setQueryData<Post>(postKeys.detail(id), (post) => (post ? (update(post) ?? undefined) : post));
}

export function usePostFeed(feed: FeedKind, tag: string | null) {
  return useInfiniteQuery({
    queryKey: postKeys.feed(feed, tag),
    queryFn: ({ pageParam }) => postsApi.feed(feed, tag, pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (page) => page.next_cursor,
  });
}

export function useUserPosts(username: string) {
  return useInfiniteQuery({
    queryKey: postKeys.byUser(username),
    queryFn: ({ pageParam }) => postsApi.byUser(username, pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (page) => page.next_cursor,
  });
}

export function usePost(id: string | undefined) {
  return useQuery({
    queryKey: postKeys.detail(id ?? ""),
    queryFn: () => postsApi.get(id!),
    enabled: !!id,
  });
}

export function useTrendingTags() {
  return useQuery({ queryKey: postKeys.trending, queryFn: postsApi.trendingTags, staleTime: 60_000 });
}

/** New posts and edits change feeds, counts and trending tags, so refresh them all. */
function useInvalidateAfterWrite() {
  const queryClient = useQueryClient();
  return () => {
    void queryClient.invalidateQueries({ queryKey: postKeys.lists });
    void queryClient.invalidateQueries({ queryKey: postKeys.trending });
    void queryClient.invalidateQueries({ queryKey: profileKeys.all });
  };
}

export function useCreatePost() {
  const invalidate = useInvalidateAfterWrite();
  return useMutation({ mutationFn: (input: PostCreate) => postsApi.create(input), onSuccess: invalidate });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const invalidate = useInvalidateAfterWrite();
  return useMutation({
    mutationFn: ({ id, changes }: { id: string; changes: PostUpdate }) => postsApi.update(id, changes),
    onSuccess: (post) => {
      patchPostEverywhere(queryClient, post.id, () => post);
      invalidate();
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  const invalidate = useInvalidateAfterWrite();
  return useMutation({
    mutationFn: (id: string) => postsApi.remove(id),
    onSuccess: (_void, id) => {
      patchPostEverywhere(queryClient, id, () => null);
      queryClient.removeQueries({ queryKey: postKeys.detail(id) });
      invalidate();
    },
  });
}

/** Optimistic like toggle, applied to every cached copy of the post and rolled back on failure. */
export function useLikePost() {
  const queryClient = useQueryClient();
  const toggle = (liked: boolean) => (post: Post) => ({
    ...post,
    viewer: { ...post.viewer, liked },
    stats: { ...post.stats, likes: post.stats.likes + (liked ? 1 : -1) },
  });

  return useMutation({
    mutationFn: ({ id, like }: { id: string; like: boolean }) => (like ? postsApi.like(id) : postsApi.unlike(id)),
    onMutate: async ({ id, like }) => {
      await queryClient.cancelQueries({ queryKey: postKeys.all });
      patchPostEverywhere(queryClient, id, toggle(like));
    },
    onError: (_error, { id, like }) => patchPostEverywhere(queryClient, id, toggle(!like)),
  });
}

/** Fetches a server-redacted spoiler's text and stores it in every cached copy. */
export function useRevealPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => postsApi.get(id, true),
    onSuccess: (post) => patchPostEverywhere(queryClient, post.id, () => post),
  });
}
