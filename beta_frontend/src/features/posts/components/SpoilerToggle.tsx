import { AnimatePresence, motion } from "motion/react";
import { useId } from "react";
import { Icon } from "@/components/ui/Icon";
import { TOTAL_CHAPTERS } from "@/data/lore/reading";
import styles from "./SpoilerToggle.module.css";

interface SpoilerToggleProps {
  enabled: boolean;
  chapter: number;
  onToggle: (enabled: boolean) => void;
  onChapterChange: (chapter: number) => void;
}

const clamp = (n: number) => Math.min(Math.max(Math.round(n) || 1, 1), TOTAL_CHAPTERS);

/** "Contains spoilers" switch that reveals a chapter picker when on. */
export function SpoilerToggle({ enabled, chapter, onToggle, onChapterChange }: SpoilerToggleProps) {
  const labelId = useId();

  return (
    <div className={`${styles.root} ${enabled ? styles.on : ""}`}>
      <div className={styles.row}>
        <span className={styles.icon}>
          <Icon name="flame" size={17} />
        </span>
        <span className={styles.text}>
          <strong id={labelId}>Contains spoilers</strong>
          <span>Readers who haven't reached the chapter will see it sealed.</span>
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-labelledby={labelId}
          className={styles.switch}
          onClick={() => onToggle(!enabled)}
        >
          <motion.span layout className={styles.knob} transition={{ type: "spring", stiffness: 600, damping: 32 }} />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {enabled && (
          <motion.label
            className={styles.chapter}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <span>Spoils up to chapter</span>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={TOTAL_CHAPTERS}
              value={chapter}
              onChange={(event) => onChapterChange(clamp(Number(event.target.value)))}
            />
          </motion.label>
        )}
      </AnimatePresence>
    </div>
  );
}
