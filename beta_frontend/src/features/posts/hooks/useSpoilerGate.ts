import { useEffect, useState } from "react";
import { useMyProfile } from "@/features/profile";
import type { Post } from "../types";
import { useRevealPost } from "./usePosts";

/** Posts the reader chose to reveal stay revealed for the rest of the browser session (reloads included). */
const STORAGE_KEY = "lom.revealed_spoilers";

const revealedThisSession: Set<string> = (() => {
  try {
    return new Set(JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]") as string[]);
  } catch {
    return new Set<string>();
  }
})();

function rememberReveal(id: string) {
  revealedThisSession.add(id);
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...revealedThisSession]));
  } catch {
    /* storage unavailable: remembered until reload */
  }
}

export type SpoilerState =
  /** Not a spoiler, or the reader has already passed the chapter. */
  | "clear"
  /** A spoiler past the reader's progress: hidden until they choose to reveal. */
  | "sealed"
  /** Revealed, but the server had withheld the text and it is still loading. */
  | "revealing";

/**
 * Decides whether a post's text may be shown. Two layers, so both work together:
 * - Browser: `spoiler_chapter` is compared with the reader's saved chapter.
 * - Server: when the API already withheld the text (`redacted`), revealing
 *   fetches it with `?reveal=true`.
 * Authors always see their own posts.
 */
export function useSpoilerGate(post: Post) {
  const { data: me } = useMyProfile();
  const reveal = useRevealPost();
  const [revealed, setRevealed] = useState(() => revealedThisSession.has(post.id));

  // Until the profile loads, assume chapter 0: better to over-hide than to spoil.
  const readerChapter = me?.reading_progress.current_chapter ?? 0;
  const beyondProgress = post.spoiler_chapter !== null && readerChapter < post.spoiler_chapter;
  const author = post.viewer.is_author;

  // A refetch can bring back a redacted copy of a post revealed earlier; fetch its text again.
  const needsText = revealed && post.redacted && !author;
  useEffect(() => {
    if (needsText && !reveal.isPending) reveal.mutate(post.id);
    // Deliberately keyed on the flag only: re-running on `reveal` identity would refetch in a loop.
  }, [needsText, post.id]);

  let state: SpoilerState = "clear";
  if (!author && (post.redacted || beyondProgress)) {
    state = !revealed ? "sealed" : post.redacted ? "revealing" : "clear";
  }

  return {
    state,
    readerChapter,
    revealError: reveal.isError,
    reveal: () => {
      rememberReveal(post.id);
      setRevealed(true);
      if (post.redacted) reveal.mutate(post.id);
    },
  };
}
