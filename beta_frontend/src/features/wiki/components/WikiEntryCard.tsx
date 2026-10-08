import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { Icon } from "@/components/ui/Icon";
import { entryRevealKey, useWikiSpoilers } from "../hooks/useWikiSpoilers";
import { WIKI_CATEGORIES, type WikiEntrySummary } from "../types";
import styles from "./WikiEntryCard.module.css";

export const categoryLabel = (id: string) => WIKI_CATEGORIES.find((c) => c.id === id)?.label ?? id;

export function WikiEntryCard({ entry, index = 0 }: { entry: WikiEntrySummary; index?: number }) {
  const spoilers = useWikiSpoilers();
  const key = entryRevealKey(entry);
  const sealed = spoilers.isSealed(key, entry.reveal_chapter);

  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: Math.min(index, 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {sealed ? (
          // Nothing identifying here: no title, no summary.
          <motion.div
            key="sealed"
            className={`${styles.card} ${styles.sealed}`}
            exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
            role="group"
            aria-label={`Sealed ${categoryLabel(entry.category)} entry, revealed at chapter ${entry.reveal_chapter}`}
          >
            <span className={styles.category}>{categoryLabel(entry.category)}</span>
            <span className={styles.wax} aria-hidden="true">
              ✦
            </span>
            <span className={styles.sealText}>Sealed until chapter {entry.reveal_chapter}</span>
            <button type="button" className={styles.reveal} onClick={() => spoilers.reveal(key)}>
              <Icon name="eye" size={13} /> Reveal
            </button>
          </motion.div>
        ) : (
          <motion.div key="open" initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0px)" }}>
            <Link to={`/wiki/${entry.slug}`} className={styles.card}>
              <span className={styles.category}>{categoryLabel(entry.category)}</span>
              <strong className={styles.title}>{entry.title}</strong>
              <span className={styles.summary}>{entry.summary}</span>
              <span className={styles.more}>
                Read entry <Icon name="arrowRight" size={14} />
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
