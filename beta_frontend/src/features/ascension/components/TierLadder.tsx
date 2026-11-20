import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { TIERS } from "../data/codex";
import { useAscensionSpoilers } from "../hooks/useAscension";
import { Paragraphs } from "./Paragraphs";
import { Sealed } from "./Sealed";
import styles from "./TierLadder.module.css";

/**
 * The climb from mortal to Great Old One. A beam of light fills the spine of the
 * ladder as the reader scrolls, and each rung lights up as the beam reaches it.
 */
export function TierLadder() {
  const ref = useRef<HTMLOListElement>(null);
  const spoilers = useAscensionSpoilers();
  const [open, setOpen] = useState<string | null>("low");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <ol ref={ref} className={styles.ladder}>
      <span className={styles.spine} aria-hidden="true">
        <motion.span className={styles.spineFill} style={{ scaleY: fill }} />
      </span>

      {TIERS.map((tier, i) => {
        const key = `ascension:tier:${tier.id}`;
        const sealed = spoilers.isSealed(key, tier.sealUntil);
        const nameKey = `ascension:tier-name:${tier.id}`;
        const nameSealed = tier.nameSealUntil !== undefined && spoilers.isSealed(nameKey, tier.nameSealUntil);
        const expanded = open === tier.id && !nameSealed;
        return (
          <motion.li
            key={tier.id}
            className={`${styles.rung} ${i % 2 ? styles.right : styles.left}`}
            style={{ "--i": i } as React.CSSProperties}
            initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className={styles.node}
              aria-hidden="true"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.2 }}
            />
            <div className={`${styles.card} ${expanded ? styles.cardOpen : ""}`}>
              {nameSealed ? (
                <div className={styles.sealedHead}>
                  <Sealed until={tier.nameSealUntil!} onReveal={() => spoilers.reveal(nameKey)} lines={3} compact />
                </div>
              ) : (
                <button
                  type="button"
                  className={styles.head}
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : tier.id)}
                >
                  <span className={styles.seq}>{tier.sequences}</span>
                  <span className={styles.name}>{tier.name}</span>
                  {tier.alias && <span className={styles.alias}>{tier.alias}</span>}
                  <span className={styles.summary}>{tier.summary}</span>
                  <Icon name="chevronRight" size={18} className={styles.chevron} />
                </button>
              )}
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    className={styles.detail}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className={styles.detailInner}>
                      {sealed ? (
                        <Sealed until={tier.sealUntil} onReveal={() => spoilers.reveal(key)} />
                      ) : (
                        <Paragraphs lines={tier.detail} />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
