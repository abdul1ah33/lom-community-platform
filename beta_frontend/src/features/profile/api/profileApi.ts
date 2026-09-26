import { http } from "@/lib/http/client";
import type { Page, ProfileUpdate, UserProfile, UserSummary } from "../types";

const user = (username: string) => `/users/${encodeURIComponent(username)}`;

/** Thin wrappers over `/api/v1/users/*` (contract: docs/api-contracts/profiles.md). */
export const profileApi = {
  get: (username: string, signal?: AbortSignal) => http.get<UserProfile>(user(username), { auth: true, signal }),

  update: (changes: ProfileUpdate) => http.patch<UserProfile>("/users/me", changes, { auth: true }),

  uploadAvatar: (file: Blob, filename = "avatar.jpg") => {
    const form = new FormData();
    form.append("file", file, filename);
    return http.post<UserProfile>("/users/me/avatar", form, { auth: true });
  },

  removeAvatar: () => http.delete<UserProfile>("/users/me/avatar", { auth: true }),

  follow: (username: string) => http.post<void>(`${user(username)}/follow`, undefined, { auth: true }),
  unfollow: (username: string) => http.delete<void>(`${user(username)}/follow`, { auth: true }),

  followers: (username: string, cursor?: string | null) =>
    http.get<Page<UserSummary>>(`${user(username)}/followers${cursor ? `?cursor=${cursor}` : ""}`, { auth: true }),
  following: (username: string, cursor?: string | null) =>
    http.get<Page<UserSummary>>(`${user(username)}/following${cursor ? `?cursor=${cursor}` : ""}`, { auth: true }),
};
