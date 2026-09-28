import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useToast } from "@/components/feedback/ToastProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth";
import { ApiError } from "@/lib/http/ApiError";
import { useCreateComment } from "../hooks/useComments";
import { COMMENT_LIMITS, type Comment } from "../types";
import { MentionTextarea, type MentionTextareaHandle } from "./MentionTextarea";
import styles from "./Comments.module.css";

interface CommentComposerProps {
  postId: string;
  /** Set when replying: the top-level comment the reply belongs to. */
  parentId?: string | null;
  initialText?: string;
  compact?: boolean;
  onPosted?: (comment: Comment) => void;
  onCancel?: () => void;
}

export interface CommentComposerHandle {
  focus: () => void;
}

export const CommentComposer = forwardRef<CommentComposerHandle, CommentComposerProps>(function CommentComposer(
  { postId, parentId = null, initialText = "", compact = false, onPosted, onCancel },
  ref,
) {
  const { user } = useAuth();
  const { notify } = useToast();
  const create = useCreateComment(postId);
  const [text, setText] = useState(initialText);
  const inputRef = useRef<MentionTextareaHandle>(null);

  useImperativeHandle(ref, () => ({ focus: () => inputRef.current?.focus() }));

  const trimmed = text.trim();
  const submit = () => {
    if (!trimmed || create.isPending) return;
    create.mutate(
      { body: trimmed, parentId },
      {
        onSuccess: (comment) => {
          setText("");
          onPosted?.(comment);
        },
        onError: (error) => notify(error instanceof ApiError ? error.message : "Your comment didn't post.", "error"),
      },
    );
  };

  return (
    <div className={`${styles.composer} ${compact ? styles.composerCompact : ""}`}>
      {user && <Avatar name={user.username} src={user.avatar_url} size={compact ? 30 : 38} />}
      <div className={styles.composerBody}>
        <MentionTextarea
          ref={inputRef}
          value={text}
          onChange={setText}
          onSubmit={submit}
          placeholder={parentId ? "Write a reply…" : "Add to the conversation…"}
          ariaLabel={parentId ? "Reply" : "Comment"}
          maxLength={COMMENT_LIMITS.body}
          disabled={create.isPending}
        />
        {(trimmed || onCancel) && (
          <div className={styles.composerActions}>
            <span className={styles.counter}>
              {text.length > COMMENT_LIMITS.body - 100 && `${COMMENT_LIMITS.body - text.length} left · `}Ctrl + Enter
            </span>
            {onCancel && (
              <Button type="button" variant="ghost" className={styles.smallButton} onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button
              type="button"
              className={styles.smallButton}
              onClick={submit}
              loading={create.isPending}
              disabled={!trimmed}
            >
              {parentId ? "Reply" : "Comment"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
});
