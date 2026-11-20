import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { softBlur } from "@/lib/performance/performanceTier";
import { useAscensionSpoilers } from "../hooks/useAscension";
import type { PathwayMeta } from "../types";
import styles from "./PathwayGrid.module.css";

interface PathwayGridProps {
  pathways: PathwayMeta[];
  onOpen: (meta: PathwayMeta) => void;
}

/** Tarot-like cards for each pathway. Sealed ones show nothing but their number. */
export function PathwayGrid({ pathways, onOpen }: PathwayGridProps) {
  const spoilers = useAscensionSpoilers();

  return (
    <motion.ul
      className={styles.grid}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
    >
      {pathways.map((meta, i) => {
        const sealed = spoilers.isPathwaySealed(meta);
        return (
          <motion.li
            key={meta.slug}
            variants={{
              hidden: { opacity: 0, y: 40, rotateY: -30 },
              visible: { opacity: 1, y: 0, rotateY: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {sealed ? (
                <motion.div
                  key="sealed"
                  className={`${styles.card} ${styles.sealed}`}
                  exit={{ opacity: 0, scale: 1.08, ...softBlur(10) }}
                  role="group"
                  aria-label="Sealed pathway"
                >
                  <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.wax} aria-hidden="true">
                    ✦
                  </span>
                  <span className={styles.sealedText}>
                    {meta.kind === "outer" ? "Beyond book one" : `Opens at ch. ${spoilers.pathwayUntil(meta)}`}
                  </span>
                  <button type="button" className={styles.reveal} onClick={() => spoilers.revealPathway(meta)}>
                    <Icon name="eye" size={13} /> Reveal
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="open"
                  type="button"
                  className={styles.card}
                  style={{ "--hue": meta.hue } as React.CSSProperties}
                  onClick={() => onOpen(meta)}
                  initial={{ opacity: 0, scale: 0.92, ...softBlur(10) }}
                  animate={{ opacity: 1, scale: 1, ...softBlur(0) }}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={`${meta.god} pathway, starting as ${meta.first}`}
                >
                  <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.halo} aria-hidden="true">
                    <span />
                    <span />
                  </span>
                  <span className={styles.god}>{meta.god}</span>
                  <span className={styles.first}>
                    <span>Seq. 9</span> {meta.first}
                  </span>
                  <span className={styles.motto}>{meta.motto}</span>
                  <span className={styles.cta}>
                    Open the ladder <Icon name="arrowRight" size={14} />
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
