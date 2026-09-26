import { AnimatePresence, motion } from "motion/react";
import { useToast } from "@/components/feedback/ToastProvider";
import { Icon } from "@/components/ui/Icon";
import { useLikePost } from "../hooks/usePosts";
import type { Post } from "../types";
import styles from "./PostCard.module.css";

const BURST = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2);

export function LikeButton({ post }: { post: Post }) {
  const like = useLikePost();
  const { notify } = useToast();
  const liked = post.viewer.liked;

  return (
    <button
      type="button"
      className={`${styles.action} ${liked ? styles.liked : ""}`}
      onClick={(event) => {
        event.stopPropagation();
        like.mutate({ id: post.id, like: !liked }, { onError: () => notify("That like didn't go through.", "error") });
      }}
      aria-pressed={liked}
      aria-label={liked ? `Unlike, ${post.stats.likes} likes` : `Like, ${post.stats.likes} likes`}
    >
      <span className={styles.heart}>
        <motion.span
          key={String(liked)}
          initial={{ scale: liked ? 0.4 : 1 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 12 }}
          style={{ display: "grid" }}
        >
          <Icon name="heart" size={19} fill={liked ? "currentColor" : "none"} />
        </motion.span>
        <AnimatePresence>
          {liked &&
            BURST.map((angle) => (
              <motion.span
                key={angle}
                className={styles.spark}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: Math.cos(angle) * 20, y: Math.sin(angle) * 20, opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
            ))}
        </AnimatePresence>
      </span>
      <motion.span key={post.stats.likes} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        {post.stats.likes.toLocaleString()}
      </motion.span>
    </button>
  );
}
