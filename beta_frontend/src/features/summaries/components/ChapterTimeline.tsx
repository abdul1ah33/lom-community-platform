import { motion } from "motion/react";
import { firstChapter, lastChapter, roman } from "../data/volumes";
import type { SummaryPart, SummaryVolume } from "../types";
import styles from "./ChapterTimeline.module.css";

interface ChapterTimelineProps {
  volume: SummaryVolume;
  chapter: number;
  isSealed: (part: SummaryPart) => boolean;
  highlighted: string | null;
  onHighlight: (id: string | null) => void;
  onOpen: (part: SummaryPart) => void;
}

/** Share of the track kept for the "still being written" tail of an ongoing volume. */
const TAIL = 0.1;

/**
 * The volume as one chapter track: a segment per part, the reader's own position
 * pinned on it, and an inked tail when more parts are still coming.
 */
export function ChapterTimeline({ volume, chapter, isSealed, highlighted, onHighlight, onOpen }: ChapterTimelineProps) {
  const from = volume.startChapter;
  const to = lastChapter(volume.parts[volume.parts.length - 1]);
  const span = to - from + 1;
  const covered = volume.ongoing ? 1 - TAIL : 1;
  const at = (n: number) => ((n - from) / span) * covered * 100;

  const before = chapter < from;
  const beyond = chapter > to;
  const marker = before ? 0 : beyond ? covered * 100 : at(chapter + 0.5);
  const markerLabel = before ? "Not here yet" : beyond ? `Past ch. ${to}` : `You · ch. ${chapter}`;

  return (
    <div className={styles.timeline}>
      <div className={styles.track}>
        <motion.div
          className={styles.read}
          initial={{ width: 0 }}
          animate={{ width: `${marker}%` }}
          transition={{ duration: 1.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />

        {volume.parts.map((part, index) => {
          const sealed = isSealed(part);
          const left = at(firstChapter(part));
          const width = at(lastChapter(part) + 1) - left;
          return (
            <motion.button
              key={part.id}
              type="button"
              className={`${styles.segment} ${sealed ? styles.sealed : ""} ${highlighted === part.id ? styles.lit : ""}`}
              style={{ left: `${left}%`, width: `${width}%` }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onPointerEnter={() => onHighlight(part.id)}
              onPointerLeave={() => onHighlight(null)}
              onFocus={() => onHighlight(part.id)}
              onBlur={() => onHighlight(null)}
              onClick={() => onOpen(part)}
              aria-label={`Part ${part.number}, chapters ${firstChapter(part)} to ${lastChapter(part)}${sealed ? " (sealed)" : ""}`}
            >
              <span className={styles.numeral}>{roman(part.number)}</span>
            </motion.button>
          );
        })}

        {volume.ongoing && (
          <motion.span
            className={styles.tail}
            style={{ left: `${covered * 100}%`, width: `${TAIL * 100}%` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            title="Being written"
          />
        )}

        <motion.div
          className={styles.marker}
          initial={{ left: "0%", opacity: 0 }}
          animate={{ left: `${marker}%`, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.pin} />
          {/* Near either end, keep the label inside the track instead of centring it. */}
          <span
            className={styles.markerLabel}
            style={{ translate: marker < 12 ? "-14px 0" : marker > 88 ? "calc(-100% + 14px) 0" : undefined }}
          >
            {markerLabel}
          </span>
        </motion.div>
      </div>

      <div className={styles.ticks} aria-hidden="true">
        {volume.parts.map((part) => (
          <span key={part.id} style={{ left: `${at(firstChapter(part))}%` }}>
            {firstChapter(part)}
          </span>
        ))}
        <span style={{ left: `${covered * 100}%` }}>{to}</span>
        {volume.ongoing && (
          <span className={styles.tailLabel} style={{ left: "100%" }}>
            …
          </span>
        )}
      </div>
    </div>
  );
}
