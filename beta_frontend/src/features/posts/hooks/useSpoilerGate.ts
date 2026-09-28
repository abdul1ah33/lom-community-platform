import { useEffect } from "react";
import { useReaderChapter } from "@/features/profile";
import { useRevealStore } from "@/lib/spoilers/revealStore";
import type { Post } from "../types";
import { useRevealPost } from "./usePosts";

/** Posts whose withheld text is being fetched, shared so several gates on one post fetch once. */
const fetchingText = new Set<string>();

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

  // Revealed but still withheld by the server (just revealed, or a refetch brought back a
  // redacted copy): fetch the text once, however many gates are showing this post.
  const needsText = revealed && post.redacted && !author;
  useEffect(() => {
    if (!needsText || fetchingText.has(post.id)) return;
    fetchingText.add(post.id);
    reveal.mutate(post.id, { onSettled: () => fetchingText.delete(post.id) });
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
    // Marking it revealed is enough: the effect above fetches withheld text if needed.
    reveal: () => store.add(key),
  };
}
