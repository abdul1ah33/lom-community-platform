import { motion } from "motion/react";
import { useToast } from "@/components/feedback/ToastProvider";
import { Icon } from "@/components/ui/Icon";
import { useBookmarkPost } from "../hooks/usePosts";
import type { Post } from "../types";
import styles from "./BookmarkButton.module.css";

/** Private save toggle: only the viewer ever sees what they bookmarked. */
export function BookmarkButton({ post }: { post: Post }) {
  const bookmark = useBookmarkPost();
  const { notify } = useToast();
  const saved = post.viewer.bookmarked;

  return (
    <button
      type="button"
      className={`${styles.button} ${saved ? styles.saved : ""}`}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved" : "Save post"}
      title={saved ? "Saved: only you can see this" : "Save for later"}
      onClick={(event) => {
        event.stopPropagation();
        bookmark.mutate(
          { id: post.id, save: !saved },
          {
            onSuccess: () => notify(saved ? "Removed from your saved posts." : "Saved. Find it in your profile's Saved tab."),
            onError: () => notify("That bookmark didn't go through.", "error"),
          },
        );
      }}
    >
      <motion.span
        key={String(saved)}
        initial={{ scale: saved ? 0.4 : 1, y: saved ? -6 : 0 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 14 }}
        style={{ display: "grid" }}
      >
        <Icon name="bookmark" size={19} fill={saved ? "currentColor" : "none"} />
      </motion.span>
    </button>
  );
}
