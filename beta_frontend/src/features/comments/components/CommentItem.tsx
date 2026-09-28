import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/feedback/ToastProvider";
import { ActionMenu } from "@/components/ui/ActionMenu";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { HeartButton } from "@/components/ui/HeartButton";
import { Icon } from "@/components/ui/Icon";
import { RichText } from "@/components/ui/RichText";
import { fullDate, relativeTime } from "@/lib/format/relativeTime";
import { ApiError } from "@/lib/http/ApiError";
import { useDeleteComment, useLikeComment, useUpdateComment } from "../hooks/useComments";
import { COMMENT_LIMITS, type Comment } from "../types";
import { MentionTextarea } from "./MentionTextarea";
import styles from "./Comments.module.css";

interface CommentItemProps {
  comment: Comment;
  /** Shown only in threads; profile lists link to the post instead. */
  onReply?: (comment: Comment) => void;
  /** Briefly glows, e.g. right after it was posted. */
  highlight?: boolean;
}

export function CommentItem({ comment, onReply, highlight = false }: CommentItemProps) {
  const { notify } = useToast();
  const like = useLikeComment();
  const update = useUpdateComment();
  const remove = useDeleteComment();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(comment.body ?? "");
  const [confirming, setConfirming] = useState(false);
  const isReply = comment.parent_id !== null;

  if (comment.deleted) {
    return (
      <div className={`${styles.item} ${styles.removed}`}>
        <span className={styles.removedIcon}>
          <Icon name="trash" size={14} />
        </span>
        <em>This comment was removed. Its replies remain below.</em>
      </div>
    );
  }

  const saveEdit = () => {
    const body = draft.trim();
    if (!body) return;
    if (body === comment.body) return setEditing(false);
    update.mutate(
      { id: comment.id, body },
      {
        onSuccess: () => setEditing(false),
        onError: (error) => notify(error instanceof ApiError ? error.message : "Could not save the edit.", "error"),
      },
    );
  };

  return (
    <motion.div
      layout="position"
      className={`${styles.item} ${highlight ? styles.highlight : ""}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, filter: "blur(6px)" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/u/${comment.author.username}`} className={styles.avatarLink} aria-hidden="true" tabIndex={-1}>
        <Avatar name={comment.author.username} src={comment.author.avatar_url} size={isReply ? 30 : 36} />
      </Link>

      <div className={styles.main}>
        <header className={styles.meta}>
          <Link to={`/u/${comment.author.username}`} className={styles.name}>
            {comment.author.display_name ?? comment.author.username}
          </Link>
          <span className={styles.handle}>@{comment.author.username}</span>
          <span className={styles.dot}>·</span>
          <time dateTime={comment.created_at} title={fullDate(comment.created_at)}>
            {relativeTime(comment.created_at)}
          </time>
          {comment.edited_at && <em title={`Edited ${fullDate(comment.edited_at)}`}>· edited</em>}
          {comment.viewer.is_author && !editing && (
            <span className={styles.menu}>
              <ActionMenu
                noun="comment"
                size="sm"
                onEdit={() => {
                  setDraft(comment.body ?? "");
                  setEditing(true);
                }}
                onDelete={() => setConfirming(true)}
              />
            </span>
          )}
        </header>

        {editing ? (
          <div className={styles.editor}>
            <MentionTextarea
              value={draft}
              onChange={setDraft}
              onSubmit={saveEdit}
              placeholder="Edit your comment"
              ariaLabel="Edit comment"
              autoFocus
              maxLength={COMMENT_LIMITS.body}
              disabled={update.isPending}
            />
            <div className={styles.composerActions}>
              <Button type="button" variant="ghost" className={styles.smallButton} onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button type="button" className={styles.smallButton} onClick={saveEdit} loading={update.isPending} disabled={!draft.trim()}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <p className={styles.body}>
            <RichText text={comment.body ?? ""} />
          </p>
        )}

        {!editing && (
          <footer className={styles.actions}>
            <HeartButton
              size="sm"
              liked={comment.viewer.liked}
              count={comment.stats.likes}
              onToggle={() =>
                like.mutate(
                  { id: comment.id, like: !comment.viewer.liked },
                  { onError: () => notify("That like didn't go through.", "error") },
                )
              }
            />
            {onReply && (
              <button type="button" className={styles.replyButton} onClick={() => onReply(comment)}>
                <Icon name="comment" size={15} /> Reply
              </button>
            )}
          </footer>
        )}
      </div>

      <Dialog
        open={confirming}
        onClose={() => setConfirming(false)}
        title="Delete this comment?"
        description={
          !isReply && comment.stats.replies > 0
            ? "Its replies will stay, under a “removed” placeholder."
            : "It will vanish from the thread."
        }
        footer={
          <>
            <Button type="button" variant="ghost" onClick={() => setConfirming(false)} disabled={remove.isPending}>
              Keep it
            </Button>
            <Button
              type="button"
              loading={remove.isPending}
              loadingText="Deleting…"
              onClick={() =>
                remove.mutate(comment, {
                  onSuccess: () => {
                    setConfirming(false);
                    notify("Comment deleted.");
                  },
                  onError: () => notify("Could not delete the comment.", "error"),
                })
              }
            >
              Delete
            </Button>
          </>
        }
      >
        <p className={styles.dialogText}>This can't be undone.</p>
      </Dialog>
    </motion.div>
  );
}
