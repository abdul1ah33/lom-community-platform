import { motion } from "motion/react";
import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { PATHWAYS, toRoman, type Pathway } from "../data/pathways";
import { SectionHeader } from "./SectionHeader";
import styles from "./PathwayDeck.module.css";

/** A fanned, scrollable deck of the 22 pathways. Each card flips to show its Sequence 9. */
export function PathwayDeck() {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = (direction: 1 | -1) =>
    trackRef.current?.scrollBy({ left: direction * 480, behavior: "smooth" });

  return (
    <section aria-labelledby="pathways-title">
      <SectionHeader
        id="pathways-title"
        eyebrow="Wiki preview"
        title="The 22 Pathways"
        aside={
          <div className={styles.controls}>
            <button type="button" onClick={() => scrollBy(-1)} aria-label="Scroll pathways left">
              <Icon name="arrowRight" size={18} style={{ transform: "scaleX(-1)" }} />
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label="Scroll pathways right">
              <Icon name="arrowRight" size={18} />
            </button>
          </div>
        }
      />

      <ul ref={trackRef} className={styles.track}>
        {PATHWAYS.map((pathway, index) => (
          <PathwayCard key={pathway.number} pathway={pathway} index={index} />
        ))}
      </ul>
    </section>
  );
}

function PathwayCard({ pathway, index }: { pathway: Pathway; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.li
      className={styles.slot}
      initial={{ opacity: 0, y: 40, rotate: -6 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "0px -40px" }}
      transition={{ duration: 0.7, delay: Math.min(index, 8) * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        type="button"
        className={styles.card}
        style={{ "--hue": pathway.hue } as React.CSSProperties}
        onClick={() => setFlipped((v) => !v)}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        aria-pressed={flipped}
        aria-label={`${pathway.name} pathway. Sequence 9: ${pathway.sequence9}`}
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
      </button>
    </motion.li>
  );
}
