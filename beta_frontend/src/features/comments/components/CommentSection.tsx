import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { usePostComments } from "../hooks/useComments";
import type { Comment } from "../types";
import { CommentComposer } from "./CommentComposer";
import { CommentThread } from "./CommentThread";
import styles from "./Comments.module.css";

interface CommentSectionProps {
  postId: string;
  count: number;
  /**
   * The post is a sealed spoiler for this reader. Comments carry no spoiler flag of
   * their own; they stay closed behind the post until it is revealed.
   */
  sealed: boolean;
  onReveal: () => void;
}

export function CommentSection({ postId, count, sealed, onReveal }: CommentSectionProps) {
  const query = usePostComments(postId, !sealed);
  const threads = query.data?.pages.flatMap((page) => page.items) ?? [];
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const sentinelRef = useInfiniteScroll<HTMLDivElement>(
    () => void query.fetchNextPage(),
    !!query.hasNextPage && !query.isFetchingNextPage,
  );

  // New comments glow for a moment so you can see where yours landed.
  useEffect(() => {
    if (!highlightId) return;
    const id = window.setTimeout(() => setHighlightId(null), 2600);
    return () => window.clearTimeout(id);
  }, [highlightId]);
  const onPosted = (comment: Comment) => setHighlightId(comment.id);

  return (
    <section className={styles.section} aria-labelledby="comments-title">
      <h2 id="comments-title" className={styles.title}>
        Comments <span>{count.toLocaleString()}</span>
      </h2>

      {sealed ? (
        <div className={styles.sealed}>
          <Icon name="lock" size={18} />
          <p>The conversation stays sealed with the post. Reveal the post to read and join it.</p>
          <Button type="button" variant="ghost" className={styles.smallButton} onClick={onReveal}>
            <Icon name="eye" size={15} /> Reveal post
          </Button>
        </div>
      ) : (
        <>
          <CommentComposer postId={postId} onPosted={onPosted} />

          {query.isPending ? (
            <div className={styles.list} aria-busy="true">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className={styles.skeleton} />
              ))}
            </div>
          ) : query.isError ? (
            <div className={styles.empty}>
              <p>The comments could not be loaded.</p>
              <Button variant="ghost" onClick={() => void query.refetch()}>
                Try again
              </Button>
            </div>
          ) : threads.length === 0 ? (
            <div className={styles.empty}>
              <p>No whispers yet. Be the first to speak.</p>
            </div>
          ) : (
            <div className={styles.list}>
              <AnimatePresence initial={false}>
                {threads.map((comment) => (
                  <CommentThread key={comment.id} comment={comment} highlightId={highlightId} onPosted={onPosted} />
                ))}
              </AnimatePresence>
              <div ref={sentinelRef} className={styles.more}>
                {query.hasNextPage && (
                  <Button variant="ghost" loading={query.isFetchingNextPage} onClick={() => void query.fetchNextPage()}>
                    Older comments
                  </Button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
