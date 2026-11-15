import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { env } from "@/config/env";
import { summaryLibrary } from "../data/library";

export const summaryKeys = {
  all: ["summaries"] as const,
  library: () => ["summaries", "library"] as const,
  text: (partId: string) => ["summaries", "text", partId] as const,
};

/** Every volume with its parts and chapter index (not the chapter text). */
export function useSummaryLibrary() {
  return useQuery({ queryKey: summaryKeys.library(), queryFn: summaryLibrary.volumes, staleTime: Infinity });
}

/** Wraps a library edit so the shelf and any open text refresh once it lands. */
export function useSummaryEdit<TArgs, TResult>(edit: (args: TArgs) => Promise<TResult>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: edit,
    onSettled: () => queryClient.invalidateQueries({ queryKey: summaryKeys.all }),
  });
}

/**
 * Who may use the summary desk: the usernames in VITE_SUMMARY_EDITORS. There is no
 * backend to enforce it yet, so this only decides what the site shows; since edits stay
 * in the editor's own browser, nobody else's shelf can be changed anyway.
 */
export function useCanEditSummaries() {
  const { user } = useAuth();
  return !!user && env.summaryEditors.includes(user.username.toLowerCase());
}
