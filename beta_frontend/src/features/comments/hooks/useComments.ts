import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  type InfiniteData,
  type QueryClient,
} from "@tanstack/react-query";
import { usePostCacheUpdater } from "@/features/posts/hooks/usePosts";
import { profileKeys } from "@/features/profile/hooks/useProfile";
import type { Page } from "@/features/profile/types";
import { commentsApi } from "../api/commentsApi";
import type { Comment } from "../types";

export const commentKeys = {
  all: ["comments"] as const,
  forPost: (postId: string) => ["comments", "post", postId] as const,
  replies: (commentId: string) => ["comments", "replies", commentId] as const,
  byUser: (username: string) => ["comments", "user", username.toLowerCase()] as const,
};

type CommentPages = InfiniteData<Page<Comment>, string | null>;

/** Applies `update` to a comment in every cached list (post threads, reply lists, profiles). */
function patchCommentEverywhere(queryClient: QueryClient, id: string, update: (c: Comment) => Comment | null) {
  queryClient.setQueriesData<CommentPages>({ queryKey: commentKeys.all }, (data) =>
    data && {
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        items: page.items.flatMap((comment) => {
          if (comment.id !== id) return [comment];
          const next = update(comment);
          return next ? [{ ...comment, ...next }] : [];
        }),
      })),
    },
  );
}

const infinite = <T,>(fetchPage: (cursor: string | null) => Promise<Page<T>>) => ({
  queryFn: ({ pageParam }: { pageParam: string | null }) => fetchPage(pageParam),
  initialPageParam: null as string | null,
  getNextPageParam: (page: Page<T>) => page.next_cursor,
});

export function usePostComments(postId: string, enabled = true) {
  return useInfiniteQuery({
    queryKey: commentKeys.forPost(postId),
    ...infinite((cursor) => commentsApi.forPost(postId, cursor)),
    enabled,
  });
}

export function useReplies(commentId: string, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: commentKeys.replies(commentId),
    ...infinite((cursor) => commentsApi.replies(commentId, cursor)),
    enabled,
  });
}

export function useUserComments(username: string) {
  return useInfiniteQuery({
    queryKey: commentKeys.byUser(username),
    ...infinite((cursor) => commentsApi.byUser(username, cursor)),
  });
}

/** Keeps the post's comment count (feed, profile, post page) in step with the thread. */
function useCommentCount() {
  const updatePost = usePostCacheUpdater();
  const queryClient = useQueryClient();
  return (postId: string, delta: number) => {
    updatePost(postId, (post) => ({ ...post, stats: { ...post.stats, comments: Math.max(0, post.stats.comments + delta) } }));
    void queryClient.invalidateQueries({ queryKey: profileKeys.all });
  };
}

export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();
  const adjustCount = useCommentCount();

  return useMutation({
    mutationFn: (input: { body: string; parentId: string | null }) =>
      commentsApi.create(postId, { body: input.body, parent_id: input.parentId }),
    onSuccess: (comment) => {
      if (comment.parent_id === null) {
        // Newest first: slot the new comment in at the very top.
        queryClient.setQueryData<CommentPages>(commentKeys.forPost(postId), (data) =>
          data && {
            ...data,
            pages: data.pages.map((page, i) => (i === 0 ? { ...page, items: [comment, ...page.items] } : page)),
          },
        );
      } else {
        // Replies are oldest first: append to the last loaded page, and bump the parent's count.
        queryClient.setQueryData<CommentPages>(commentKeys.replies(comment.parent_id), (data) =>
          data && {
            ...data,
            pages: data.pages.map((page, i) =>
              i === data.pages.length - 1 && !page.next_cursor ? { ...page, items: [...page.items, comment] } : page,
            ),
          },
        );
        patchCommentEverywhere(queryClient, comment.parent_id, (parent) => ({
          ...parent,
          stats: { ...parent.stats, replies: parent.stats.replies + 1 },
        }));
      }
      adjustCount(postId, 1);
      void queryClient.invalidateQueries({ queryKey: ["comments", "user"] });
    },
  });
}

export function useUpdateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: string }) => commentsApi.update(id, body),
    onSuccess: (comment) => patchCommentEverywhere(queryClient, comment.id, () => comment),
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const adjustCount = useCommentCount();

  return useMutation({
    mutationFn: (comment: Comment) => commentsApi.remove(comment.id),
    onSuccess: (_void, comment) => {
      // Mirrors the server: a top-level comment with replies becomes a placeholder, others vanish.
      const keepsPlaceholder = comment.parent_id === null && comment.stats.replies > 0;
      patchCommentEverywhere(queryClient, comment.id, (c) =>
        keepsPlaceholder ? { ...c, body: null, deleted: true } : null,
      );
      if (comment.parent_id) {
        patchCommentEverywhere(queryClient, comment.parent_id, (parent) => ({
          ...parent,
          stats: { ...parent.stats, replies: Math.max(0, parent.stats.replies - 1) },
        }));
      }
      adjustCount(comment.post_id, -1);
    },
  });
}

export function useLikeComment() {
  const queryClient = useQueryClient();
  const toggle = (liked: boolean) => (c: Comment) => ({
    ...c,
    viewer: { ...c.viewer, liked },
    stats: { ...c.stats, likes: c.stats.likes + (liked ? 1 : -1) },
  });

  return useMutation({
    mutationFn: ({ id, like }: { id: string; like: boolean }) => (like ? commentsApi.like(id) : commentsApi.unlike(id)),
    onMutate: ({ id, like }) => patchCommentEverywhere(queryClient, id, toggle(like)),
    onError: (_e, { id, like }) => patchCommentEverywhere(queryClient, id, toggle(!like)),
  });
}
