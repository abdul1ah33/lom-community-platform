import { motion } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import styles from "./Sealed.module.css";

interface SealedProps {
  /** Chapter the content opens at; past book one it reads "sequel". */
  until: number;
  onReveal: () => void;
  /** Number of placeholder lines to draw. */
  lines?: number;
  compact?: boolean;
}

/**
 * Stands in for spoiler text. Nothing of the real content is rendered, only
 * fog-coloured bars, so it can't be read by selecting, zooming or a screen reader.
 */
export function Sealed({ until, onReveal, lines = 3, compact = false }: SealedProps) {
  const label = until >= 1500 ? "Beyond book one" : `Opens at chapter ${until}`;
  return (
    <motion.div
      className={`${styles.sealed} ${compact ? styles.compact : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      role="group"
      aria-label={`Sealed spoiler. ${label}.`}
    >
      <div className={styles.bars} aria-hidden="true">
        {Array.from({ length: lines }, (_, i) => (
          <span key={i} style={{ width: `${92 - ((i * 37) % 45)}%` }} />
        ))}
      </div>
      <div className={styles.overlay}>
        <span className={styles.wax} aria-hidden="true">
          ✦
        </span>
        <span className={styles.label}>{label}</span>
        <button type="button" className={styles.reveal} onClick={onReveal}>
          <Icon name="eye" size={13} /> Reveal
        </button>
      </div>
    </motion.div>
  );
}
