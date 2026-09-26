import { motion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useToast } from "@/components/feedback/ToastProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { useAuth } from "@/features/auth";
import { useMyProfile } from "@/features/profile";
import { ApiError } from "@/lib/http/ApiError";
import { useCreatePost, useUpdatePost } from "../hooks/usePosts";
import { POST_LIMITS, type Post } from "../types";
import { SpoilerToggle } from "./SpoilerToggle";
import { TagInput } from "./TagInput";
import styles from "./PostComposer.module.css";

export interface ComposerDraft {
  body: string;
  tags: string[];
  spoiler: boolean;
  chapter: number;
}

interface PostComposerProps {
  open: boolean;
  /** Set when editing an existing post. */
  editing: Post | null;
  draft: ComposerDraft;
  onDraftChange: (draft: ComposerDraft) => void;
  onClose: () => void;
  onPublished: () => void;
}

/** Circular character budget, like a tiny reading-progress ring. */
function CharacterRing({ used }: { used: number }) {
  const ratio = Math.min(used / POST_LIMITS.body, 1);
  const remaining = POST_LIMITS.body - used;
  const r = 10;
  const c = 2 * Math.PI * r;
  const tone = remaining < 0 ? "var(--crimson-400)" : remaining < 100 ? "var(--brass-300)" : "var(--teal-400)";

  return (
    <span className={styles.ring} aria-label={`${remaining} characters left`}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r={r} className={styles.ringTrack} />
        <motion.circle
          cx="12"
          cy="12"
          r={r}
          stroke={tone}
          className={styles.ringFill}
          strokeDasharray={c}
          animate={{ strokeDashoffset: c * (1 - ratio) }}
        />
      </svg>
      {remaining < 100 && <span style={{ color: tone }}>{remaining}</span>}
    </span>
  );
}

export function PostComposer({ open, editing, draft, onDraftChange, onClose, onPublished }: PostComposerProps) {
  const { user } = useAuth();
  const { data: me } = useMyProfile();
  const { notify } = useToast();
  const create = useCreatePost();
  const update = useUpdatePost();
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pending = create.isPending || update.isPending;

  const set = (patch: Partial<ComposerDraft>) => {
    onDraftChange({ ...draft, ...patch });
    setError(null);
  };

  // Grow the textarea with its content.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 360)}px`;
  }, [draft.body, open]);

  useEffect(() => {
    if (open) window.setTimeout(() => textareaRef.current?.focus(), 60);
  }, [open]);

  const trimmed = draft.body.trim();
  const tooLong = draft.body.length > POST_LIMITS.body;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!trimmed) return setError("Write something before you post.");
    if (tooLong) return setError(`Keep it under ${POST_LIMITS.body} characters.`);

    const input = { body: trimmed, tags: draft.tags, spoiler_chapter: draft.spoiler ? draft.chapter : null };
    const onError = (err: unknown) => {
      const field = err instanceof ApiError ? err.fieldErrors[0] : undefined;
      setError(field?.message ?? (err instanceof ApiError ? err.message : "Could not publish. Try again."));
    };

    if (editing) {
      update.mutate(
        { id: editing.id, changes: input },
        { onSuccess: () => (notify("Post updated."), onPublished()), onError },
      );
    } else {
      create.mutate(input, {
        onSuccess: () => (notify("Your words rise above the fog."), onPublished()),
        onError,
      });
    }
  };

  const readerChapter = me?.reading_progress.current_chapter ?? 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      size="lg"
      title={editing ? "Edit post" : "Share with the table"}
      description={editing ? undefined : "Theories, reactions, questions. Mark spoilers so nobody gets hurt."}
    >
      <form id="post-composer" className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.writer}>
          {user && <Avatar name={user.username} src={user.avatar_url} size={42} />}
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            value={draft.body}
            placeholder="What stirs beneath the fog?"
            aria-label="Post text"
            aria-invalid={!!error}
            onChange={(event) => set({ body: event.target.value })}
            onKeyDown={(event) => {
              // Ctrl/Cmd + Enter posts, as in most social apps.
              if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) onSubmit(event);
            }}
          />
        </div>

        <TagInput value={draft.tags} onChange={(tags) => set({ tags })} />

        <SpoilerToggle
          enabled={draft.spoiler}
          chapter={draft.chapter}
          onToggle={(spoiler) => set({ spoiler, chapter: draft.chapter || readerChapter || 1 })}
          onChapterChange={(chapter) => set({ chapter })}
        />

        {error && (
          <motion.p className={styles.error} role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
            {error}
          </motion.p>
        )}

        <footer className={styles.footer}>
          <CharacterRing used={draft.body.length} />
          <span className={styles.hint}>Ctrl + Enter to post</span>
          <Button type="button" variant="ghost" onClick={onClose} disabled={pending}>
            {editing ? "Cancel" : "Close"}
          </Button>
          <Button type="submit" loading={pending} loadingText={editing ? "Saving…" : "Posting…"} disabled={!trimmed || tooLong}>
            {editing ? "Save" : "Post"}
          </Button>
        </footer>
      </form>
    </Dialog>
  );
}
