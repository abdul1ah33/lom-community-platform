import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { CodexBlock } from "../data/codex";
import { useAscensionSpoilers } from "../hooks/useAscension";
import { Paragraphs } from "./Paragraphs";
import { Sealed } from "./Sealed";
import styles from "./CodexTomes.module.css";

/**
 * A shelf of tomes. Opening one swings its cover aside (a 3D page turn) and
 * unrolls the text; only one stays open at a time.
 */
export function CodexTomes({ blocks }: { blocks: CodexBlock[] }) {
  const spoilers = useAscensionSpoilers();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <motion.div
      className={styles.shelf}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
    >
      {blocks.map((block, i) => {
        const key = `ascension:${block.id}`;
        const sealed = spoilers.isSealed(key, block.sealUntil);
        const expanded = open === block.id;
        return (
          <motion.article
            key={block.id}
            layout
            className={`${styles.tome} ${expanded ? styles.open : ""}`}
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          >
            <motion.button
              layout="position"
              type="button"
              className={styles.cover}
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : block.id)}
            >
              <span className={styles.spine} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.titles}>
                <span className={styles.title}>{block.title}</span>
                <span className={styles.teaser}>{block.teaser}</span>
              </span>
              <span className={styles.sigil} aria-hidden="true">
                ✦
              </span>
            </motion.button>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  className={styles.page}
                  initial={{ opacity: 0, rotateX: -70, y: -10 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  exit={{ opacity: 0, rotateX: -50, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {sealed ? (
                    <Sealed until={block.sealUntil} onReveal={() => spoilers.reveal(key)} lines={4} />
                  ) : (
                    <Paragraphs lines={block.body} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </motion.div>
  );
}
