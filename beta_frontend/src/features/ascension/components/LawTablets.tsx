import { AnimatePresence, motion } from "motion/react";
import { TiltCard } from "@/components/effects/TiltCard";
import { LAWS } from "../data/codex";
import { useAscensionSpoilers } from "../hooks/useAscension";
import { Sealed } from "./Sealed";
import styles from "./LawTablets.module.css";

const NUMERALS = ["I", "II", "III"];

/** The three laws of Beyonder characteristics, as tilting stone tablets. */
export function LawTablets() {
  const spoilers = useAscensionSpoilers();

  return (
    <motion.div
      className={styles.grid}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    >
      {LAWS.map((law, i) => {
        const key = `ascension:${law.id}`;
        const sealed = spoilers.isSealed(key, law.sealUntil);
        return (
          <motion.div
            key={law.id}
            variants={{
              hidden: { opacity: 0, y: 50, rotateX: 25 },
              visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <TiltCard className={styles.tablet}>
              <span className={styles.numeral} aria-hidden="true">
                {NUMERALS[i]}
              </span>
              <span className={styles.kicker}>Law of</span>
              <h3 className={styles.title}>{law.title}</h3>
              <p className={styles.teaser}>{law.teaser}</p>
              <AnimatePresence mode="wait" initial={false}>
                {sealed ? (
                  <Sealed key="sealed" until={law.sealUntil} onReveal={() => spoilers.reveal(key)} compact />
                ) : (
                  <motion.div key="open" className={styles.body} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {law.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </TiltCard>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
