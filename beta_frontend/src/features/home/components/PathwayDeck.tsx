import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { PATHWAYS, toRoman, type Pathway } from "@/data/lore/pathways";
import { usePathwaySpoilers } from "@/features/profile";
import { SectionHeader } from "./SectionHeader";
import styles from "./PathwayDeck.module.css";

/**
 * A scrollable deck of the 22 pathways. Pathways the reader has met flip to show
 * their Sequence 9; the rest stay sealed until their chapter (or "Reveal").
 */
export function PathwayDeck() {
  const trackRef = useRef<HTMLUListElement>(null);
  const spoilers = usePathwaySpoilers();
  const revealedCount = PATHWAYS.filter((p) => !spoilers.isSealed(p)).length;

  const scrollBy = (direction: 1 | -1) =>
    trackRef.current?.scrollBy({ left: direction * 480, behavior: "smooth" });

  return (
    <section aria-labelledby="pathways-title">
      <SectionHeader
        id="pathways-title"
        eyebrow="Wiki preview"
        title="The 22 Pathways"
        aside={
          <div className={styles.aside}>
            <span className={styles.progress} title={`You're at chapter ${spoilers.chapter}`}>
              <span className={styles.progressBar}>
                <motion.span
                  className={styles.progressFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${(revealedCount / PATHWAYS.length) * 100}%` }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
              {revealedCount} / {PATHWAYS.length} revealed
            </span>
            <div className={styles.controls}>
              <button type="button" onClick={() => scrollBy(-1)} aria-label="Scroll pathways left">
                <Icon name="arrowRight" size={18} style={{ transform: "scaleX(-1)" }} />
              </button>
              <button type="button" onClick={() => scrollBy(1)} aria-label="Scroll pathways right">
                <Icon name="arrowRight" size={18} />
              </button>
            </div>
          </div>
        }
      />

      <ul ref={trackRef} className={styles.track}>
        {PATHWAYS.map((pathway, index) => (
          <motion.li
            key={pathway.slug}
            className={styles.slot}
            initial={{ opacity: 0, y: 40, rotate: -6 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "0px -40px" }}
            transition={{ duration: 0.7, delay: Math.min(index, 8) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {spoilers.isSealed(pathway) ? (
                <SealedCard key="sealed" pathway={pathway} onReveal={() => spoilers.reveal(pathway)} />
              ) : (
                <PathwayCard key="open" pathway={pathway} />
              )}
            </AnimatePresence>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

function PathwayCard({ pathway }: { pathway: Pathway }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.button
      type="button"
      className={styles.card}
      style={{ "--hue": pathway.hue } as React.CSSProperties}
      onClick={() => setFlipped((v) => !v)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      aria-pressed={flipped}
      aria-label={`${pathway.name} pathway. Sequence 9: ${pathway.sequence9}`}
      initial={{ opacity: 0, filter: "blur(12px)", scale: 0.92 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.span
        className={styles.inner}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        <span className={`${styles.face} ${styles.front}`}>
          <span className={styles.numeral}>{toRoman(pathway.number)}</span>
          <span className={styles.glyph} aria-hidden="true">
            <span />
          </span>
          <span className={styles.name}>{pathway.name}</span>
        </span>
        <span className={`${styles.face} ${styles.back}`}>
          <span className={styles.kicker}>Sequence 9</span>
          <span className={styles.seq}>{pathway.sequence9}</span>
          <span className={styles.hint}>Potion formula sealed</span>
        </span>
      </motion.span>
    </motion.button>
  );
}

/** Nothing identifying is rendered here: no name, no Sequence, no colour. */
function SealedCard({ pathway, onReveal }: { pathway: Pathway; onReveal: () => void }) {
  return (
    <motion.div
      className={`${styles.card} ${styles.sealed}`}
      exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
      transition={{ duration: 0.35 }}
      role="group"
      aria-label={`Sealed pathway, revealed at chapter ${pathway.revealChapter}`}
    >
      <span className={`${styles.face} ${styles.sealedFace}`}>
        <span className={styles.numeral}>{toRoman(pathway.number)}</span>
        <span className={styles.wax} aria-hidden="true">
          ✦
        </span>
        <span className={styles.sealedText}>
          <strong>Sealed</strong>
          <span>Revealed at ch. {pathway.revealChapter}</span>
        </span>
        <button type="button" className={styles.reveal} onClick={onReveal}>
          <Icon name="eye" size={13} /> Reveal
        </button>
      </span>
    </motion.div>
  );
}
