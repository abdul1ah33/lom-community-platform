import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Spinner } from "@/components/ui/Spinner";
import { useReplies } from "../hooks/useComments";
import type { Comment } from "../types";
import { CommentComposer, type CommentComposerHandle } from "./CommentComposer";
import { CommentItem } from "./CommentItem";
import styles from "./Comments.module.css";

interface CommentThreadProps {
  comment: Comment;
  highlightId: string | null;
  onPosted: (comment: Comment) => void;
}

/** A top-level comment, its replies (loaded on demand) and an inline reply box. */
export function CommentThread({ comment, highlightId, onPosted }: CommentThreadProps) {
  const [expanded, setExpanded] = useState(false);
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const composerRef = useRef<CommentComposerHandle>(null);
  const replies = useReplies(comment.id, expanded);
  const items = replies.data?.pages.flatMap((page) => page.items) ?? [];
  const count = comment.stats.replies;

  useEffect(() => {
    if (replyTo) requestAnimationFrame(() => composerRef.current?.focus());
  }, [replyTo]);

  // Replying to someone pre-fills their @mention (not needed for your own comment).
  const startReply = (target: Comment) => {
    setExpanded(true);
    setReplyTo(target);
  };

  return (
    <div className={styles.thread}>
      <CommentItem comment={comment} onReply={startReply} highlight={highlightId === comment.id} />

      {(count > 0 || replyTo) && (
        <div className={`${styles.replies} ${expanded ? styles.repliesOpen : ""}`}>
          {count > 0 && !expanded && (
            <button type="button" className={styles.toggleReplies} onClick={() => setExpanded(true)}>
              <span className={styles.line} aria-hidden="true" />
              View {count} {count === 1 ? "reply" : "replies"}
            </button>
          )}

          {expanded && replies.isPending && (
            <span className={styles.loadingReplies}>
              <Spinner size={14} /> Loading replies…
            </span>
          )}

          <AnimatePresence initial={false}>
            {items.map((reply) => (
              <CommentItem key={reply.id} comment={reply} onReply={startReply} highlight={highlightId === reply.id} />
            ))}
          </AnimatePresence>

          {expanded && replies.hasNextPage && (
            <button type="button" className={styles.toggleReplies} onClick={() => void replies.fetchNextPage()}>
              <span className={styles.line} aria-hidden="true" />
              {replies.isFetchingNextPage ? "Loading…" : "Show more replies"}
            </button>
          )}

          {expanded && count > 0 && !replies.hasNextPage && !replyTo && (
            <button type="button" className={styles.toggleReplies} onClick={() => setExpanded(false)}>
              <span className={styles.line} aria-hidden="true" />
              <Icon name="arrowRight" size={12} style={{ transform: "rotate(-90deg)" }} /> Hide replies
            </button>
          )}

          <AnimatePresence>
            {replyTo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: "visible" }}
              >
                <CommentComposer
                  // Remount per target so the @mention prefill updates.
                  key={replyTo.id}
                  ref={composerRef}
                  postId={comment.post_id}
                  parentId={comment.id}
                  initialText={replyTo.viewer.is_author ? "" : `@${replyTo.author.username} `}
                  compact
                  onCancel={() => setReplyTo(null)}
                  onPosted={(reply) => {
                    setReplyTo(null);
                    onPosted(reply);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
