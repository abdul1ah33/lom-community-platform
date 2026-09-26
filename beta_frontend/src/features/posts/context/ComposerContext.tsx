import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { PostComposer, type ComposerDraft } from "../components/PostComposer";
import type { Post } from "../types";

interface ComposerContextValue {
  /** Opens the composer; pass a post to edit it instead of writing a new one. */
  openComposer: (post?: Post) => void;
}

const ComposerContext = createContext<ComposerContextValue | null>(null);

const EMPTY: ComposerDraft = { body: "", tags: [], spoiler: false, chapter: 0 };

/**
 * Hosts the single post composer for the signed-in shell. The new-post draft
 * survives closing the dialog, so an accidental click outside loses nothing.
 */
export function ComposerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [newDraft, setNewDraft] = useState<ComposerDraft>(EMPTY);
  const [editDraft, setEditDraft] = useState<ComposerDraft>(EMPTY);

  const openComposer = useCallback((post?: Post) => {
    if (post) {
      setEditing(post);
      setEditDraft({
        body: post.body ?? "",
        tags: post.tags,
        spoiler: post.spoiler_chapter !== null,
        chapter: post.spoiler_chapter ?? 0,
      });
    } else {
      setEditing(null);
    }
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openComposer }), [openComposer]);

  return (
    <ComposerContext.Provider value={value}>
      {children}
      <PostComposer
        open={open}
        editing={editing}
        draft={editing ? editDraft : newDraft}
        onDraftChange={editing ? setEditDraft : setNewDraft}
        onClose={() => setOpen(false)}
        onPublished={() => {
          setOpen(false);
          if (!editing) setNewDraft(EMPTY);
        }}
      />
    </ComposerContext.Provider>
  );
}

export function useComposer() {
  const context = useContext(ComposerContext);
  if (!context) throw new Error("useComposer must be used inside <ComposerProvider>.");
  return context;
}
