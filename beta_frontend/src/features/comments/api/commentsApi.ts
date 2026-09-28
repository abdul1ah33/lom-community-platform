import type { Page } from "@/features/profile/types";
import { http } from "@/lib/http/client";
import type { Comment, CommentCreate, MentionCandidate, ProfileComment } from "../types";

const enc = encodeURIComponent;
const cursorQs = (cursor: string | null) => (cursor ? `?cursor=${enc(cursor)}` : "");

/** Thin wrappers over the comments endpoints (contract: docs/api-contracts/comments.md). */
export const commentsApi = {
  forPost: (postId: string, cursor: string | null) =>
    http.get<Page<Comment>>(`/posts/${enc(postId)}/comments${cursorQs(cursor)}`, { auth: true }),

  replies: (commentId: string, cursor: string | null) =>
    http.get<Page<Comment>>(`/comments/${enc(commentId)}/replies${cursorQs(cursor)}`, { auth: true }),

  byUser: (username: string, cursor: string | null) =>
    http.get<Page<ProfileComment>>(`/users/${enc(username)}/comments${cursorQs(cursor)}`, { auth: true }),

  create: (postId: string, input: CommentCreate) =>
    http.post<Comment>(`/posts/${enc(postId)}/comments`, input, { auth: true }),

  update: (id: string, body: string) => http.patch<Comment>(`/comments/${enc(id)}`, { body }, { auth: true }),
  remove: (id: string) => http.delete<void>(`/comments/${enc(id)}`, { auth: true }),

  like: (id: string) => http.post<void>(`/comments/${enc(id)}/like`, undefined, { auth: true }),
  unlike: (id: string) => http.delete<void>(`/comments/${enc(id)}/like`, { auth: true }),

  searchUsers: (q: string, signal?: AbortSignal) =>
    http.get<MentionCandidate[]>(`/search/users?q=${enc(q)}&limit=6`, { auth: true, signal }),
};
