import { motion } from "motion/react";
import { useId } from "react";
import { CountUp } from "@/components/ui/CountUp";
import { TOTAL_CHAPTERS } from "@/data/lore/reading";
import styles from "./ReadingProgressRing.module.css";

interface ReadingProgressRingProps {
  chapter: number;
  size?: number;
  /** Hue of the chosen pathway, used for the ring's glow. */
  hue?: number;
}

/** A glowing dial that fills to the reader's current chapter. */
export function ReadingProgressRing({ chapter, size = 180, hue = 350 }: ReadingProgressRingProps) {
  const gradientId = useId();
  const ratio = Math.min(Math.max(chapter / TOTAL_CHAPTERS, 0), 1);
  const radius = 76;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.round(ratio * 100);

  return (
    <div
      className={styles.ring}
      style={{ width: size, height: size, fontSize: size / 180 }}
      role="img"
      aria-label={chapter ? `Chapter ${chapter} of ${TOTAL_CHAPTERS}, ${percent}% read` : "Not started yet"}
    >
      <svg viewBox="0 0 180 180" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--brass-200)" />
            <stop offset="100%" stopColor={`hsl(${hue} 85% 58%)`} />
          </linearGradient>
        </defs>
        <circle cx="90" cy="90" r={radius} className={styles.track} />
        {Array.from({ length: 60 }, (_, i) => (
          <line
            key={i}
            x1="90"
            y1="4"
            x2="90"
            y2={i % 5 === 0 ? 10 : 7}
            transform={`rotate(${i * 6} 90 90)`}
            className={styles.tick}
          />
        ))}
        <motion.circle
          cx="90"
          cy="90"
          r={radius}
          stroke={`url(#${gradientId})`}
          className={styles.progress}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - ratio) }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: `drop-shadow(0 0 6px hsl(${hue} 85% 55% / 0.8))` }}
        />
      </svg>

      <div className={styles.label}>
        {chapter > 0 ? (
          <>
            <span className={styles.caption}>Chapter</span>
            <CountUp value={chapter} className={styles.value} />
            <span className={styles.caption}>{percent}% read</span>
          </>
        ) : (
          <>
            <span className={styles.value}>—</span>
            <span className={styles.caption}>Not started</span>
          </>
        )}
      </div>
    </div>
  );
}
