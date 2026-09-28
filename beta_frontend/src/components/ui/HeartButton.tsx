import { AnimatePresence, motion } from "motion/react";
import { Icon } from "./Icon";
import styles from "./HeartButton.module.css";

const BURST = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2);

interface HeartButtonProps {
  liked: boolean;
  count: number;
  onToggle: () => void;
  size?: "md" | "sm";
  disabled?: boolean;
}

/** Like toggle with a spring pop, a spark burst on like and a rolling counter. */
export function HeartButton({ liked, count, onToggle, size = "md", disabled }: HeartButtonProps) {
  const iconSize = size === "sm" ? 16 : 19;

  return (
    <button
      type="button"
      className={`${styles.button} ${styles[size]} ${liked ? styles.liked : ""}`}
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      disabled={disabled}
      aria-pressed={liked}
      aria-label={liked ? `Unlike, ${count} likes` : `Like, ${count} likes`}
    >
      <span className={styles.heart}>
        <motion.span
          key={String(liked)}
          initial={{ scale: liked ? 0.4 : 1 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 12 }}
          style={{ display: "grid" }}
        >
          <Icon name="heart" size={iconSize} fill={liked ? "currentColor" : "none"} />
        </motion.span>
        <AnimatePresence>
          {liked &&
            BURST.map((angle) => (
              <motion.span
                key={angle}
                className={styles.spark}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: Math.cos(angle) * iconSize, y: Math.sin(angle) * iconSize, opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
            ))}
        </AnimatePresence>
      </span>
      <motion.span key={count} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        {count.toLocaleString()}
      </motion.span>
    </button>
  );
}
