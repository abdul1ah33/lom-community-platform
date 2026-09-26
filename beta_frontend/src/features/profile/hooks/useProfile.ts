import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { profileApi } from "../api/profileApi";
import type { ProfileUpdate, UserProfile } from "../types";

export const profileKeys = {
  all: ["profiles"] as const,
  detail: (username: string) => ["profiles", username.toLowerCase()] as const,
  relations: (username: string, kind: "followers" | "following") =>
    ["profiles", username.toLowerCase(), kind] as const,
};

export function useProfile(username: string | undefined) {
  return useQuery({
    queryKey: profileKeys.detail(username ?? ""),
    queryFn: ({ signal }) => profileApi.get(username!, signal),
    enabled: !!username,
  });
}

/** The signed-in user's own profile. */
export function useMyProfile() {
  const { user } = useAuth();
  return useProfile(user?.username);
}

/**
 * Shared success path for every mutation that returns the updated profile:
 * refresh the cache and mirror avatar/bio into the auth user (sidebar, cards).
 */
function useApplyProfile() {
  const queryClient = useQueryClient();
  const { updateUser } = useAuth();

  return (profile: UserProfile) => {
    queryClient.setQueryData(profileKeys.detail(profile.username), profile);
    updateUser({ avatar_url: profile.avatar_url, bio: profile.bio });
  };
}

export function useUpdateProfile() {
  const apply = useApplyProfile();
  return useMutation({
    mutationFn: (changes: ProfileUpdate) => profileApi.update(changes),
    onSuccess: apply,
  });
}

export function useAvatarMutations() {
  const apply = useApplyProfile();
  const upload = useMutation({ mutationFn: (file: Blob) => profileApi.uploadAvatar(file), onSuccess: apply });
  const remove = useMutation({ mutationFn: () => profileApi.removeAvatar(), onSuccess: apply });
  return { upload, remove };
}

/** Follow / unfollow with an optimistic update and rollback on failure. */
export function useFollow(username: string) {
  const queryClient = useQueryClient();
  const key = profileKeys.detail(username);

  return useMutation({
    mutationFn: (follow: boolean) => (follow ? profileApi.follow(username) : profileApi.unfollow(username)),
    onMutate: async (follow) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<UserProfile>(key);
      if (previous) {
        queryClient.setQueryData<UserProfile>(key, {
          ...previous,
          viewer: { ...previous.viewer, is_following: follow },
          stats: { ...previous.stats, followers: previous.stats.followers + (follow ? 1 : -1) },
        });
      }
      return { previous };
    },
    onError: (_error, _follow, context) => {
      if (context?.previous) queryClient.setQueryData(key, context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: profileKeys.all }),
  });
}

export function useRelations(username: string, kind: "followers" | "following", enabled: boolean) {
  return useInfiniteQuery({
    queryKey: profileKeys.relations(username, kind),
    queryFn: ({ pageParam }) =>
      kind === "followers" ? profileApi.followers(username, pageParam) : profileApi.following(username, pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (page) => page.next_cursor,
    enabled,
  });
}
