import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import type { PreviewPost } from "../data/previewFeed";
import styles from "./PostCard.module.css";

const BURST = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2);

export function PostCard({ post, index }: { post: PreviewPost; index: number }) {
  const [liked, setLiked] = useState(false);
  const [revealed, setRevealed] = useState(!post.spoilerChapter);
  const likes = post.likes + (liked ? 1 : 0);

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
    >
      <header className={styles.header}>
        <Avatar name={post.author} size={40} />
        <div className={styles.meta}>
          <strong>{post.author}</strong>
          <span>{post.postedAgo} ago</span>
        </div>
        {post.spoilerChapter && (
          <span className={styles.spoilerTag}>
            <Icon name="flame" size={13} /> Spoiler · Ch. {post.spoilerChapter}
          </span>
        )}
      </header>

      <div className={styles.bodyWrap}>
        <motion.p
          className={styles.body}
          animate={{ filter: revealed ? "blur(0px)" : "blur(6px)", opacity: revealed ? 1 : 0.55 }}
          transition={{ duration: 0.6 }}
          aria-hidden={!revealed}
        >
          {post.body}
        </motion.p>

        <AnimatePresence>
          {!revealed && (
            <motion.button
              type="button"
              className={styles.reveal}
              onClick={() => setRevealed(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(6px)" }}
            >
              <Icon name="eye" size={16} /> Reveal spoiler for Chapter {post.spoilerChapter}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <ul className={styles.tags}>
        {post.tags.map((tag) => (
          <li key={tag}>#{tag}</li>
        ))}
      </ul>

      <footer className={styles.actions}>
        <button
          type="button"
          className={`${styles.action} ${liked ? styles.liked : ""}`}
          onClick={() => setLiked((v) => !v)}
          aria-pressed={liked}
          aria-label={liked ? "Unlike" : "Like"}
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
          <motion.span key={likes} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            {likes}
          </motion.span>
        </button>

        <span className={styles.action}>
          <Icon name="comment" size={19} /> {post.comments}
        </span>

        <button type="button" className={`${styles.action} ${styles.save}`} aria-label="Bookmark">
          <Icon name="bookmark" size={19} />
        </button>
      </footer>
    </motion.article>
  );
}
