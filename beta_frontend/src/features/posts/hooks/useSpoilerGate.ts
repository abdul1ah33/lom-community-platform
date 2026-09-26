import { useEffect } from "react";
import { useReaderChapter } from "@/features/profile";
import { useRevealStore } from "@/lib/spoilers/revealStore";
import type { Post } from "../types";
import { useRevealPost } from "./usePosts";

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
 * Authors always see their own posts. Reveals are remembered for the session.
 */
export function useSpoilerGate(post: Post) {
  const readerChapter = useReaderChapter();
  const store = useRevealStore();
  const reveal = useRevealPost();
  const key = `post:${post.id}`;
  const revealed = store.has(key);

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
      store.add(key);
      if (post.redacted) reveal.mutate(post.id);
    },
  };
}
