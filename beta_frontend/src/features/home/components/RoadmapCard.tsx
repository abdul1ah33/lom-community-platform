import { motion } from "motion/react";
import { ROADMAP, type RoadmapStatus } from "../data/roadmap";
import { SectionHeader } from "./SectionHeader";
import styles from "./RoadmapCard.module.css";

const STATUS_LABEL: Record<RoadmapStatus, string> = {
  live: "Live",
  building: "In progress",
  planned: "Planned",
};

/** The MVP development order, drawn as a glowing timeline. */
export function RoadmapCard() {
  return (
    <section className={styles.card} aria-labelledby="roadmap-title">
      <SectionHeader id="roadmap-title" eyebrow="The ascension" title="Road to launch" />

      <div className={styles.timeline}>
        <motion.span
          className={styles.progress}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 0.18 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        />
        <ol className={styles.steps}>
          {ROADMAP.map((step, index) => (
            <motion.li
              key={step.phase}
              className={`${styles.step} ${styles[step.status]}`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * index, duration: 0.5 }}
            >
              <span className={styles.node} aria-hidden="true" />
              <div>
                <div className={styles.row}>
                  <strong>
                    Phase {step.phase} · {step.title}
                  </strong>
                  <span className={styles.status}>{STATUS_LABEL[step.status]}</span>
                </div>
                <p>{step.items}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
