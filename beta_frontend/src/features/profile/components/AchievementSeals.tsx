import { motion } from "motion/react";
import type { Achievement } from "../types";
import styles from "./AchievementSeals.module.css";

const GLYPHS: Record<string, string> = {
  first_seat: "✦",
  chosen_path: "☽",
  chapter_100: "Ⅰ",
  halfway: "◐",
  finished: "✺",
  gathering: "❖",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

/** Earned achievements rendered as wax seals that stamp in one after another. */
export function AchievementSeals({ achievements }: { achievements: Achievement[] }) {
  if (achievements.length === 0) {
    return <p className={styles.empty}>No seals yet. They are earned by reading and taking part.</p>;
  }

  return (
    <motion.ul
      className={styles.grid}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
    >
      {achievements.map((achievement) => (
        <motion.li
          key={achievement.code}
          className={styles.item}
          variants={{
            hidden: { opacity: 0, scale: 1.8, rotate: -25 },
            visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 16 } },
          }}
          title={`${achievement.description} Earned ${formatDate(achievement.earned_at)}.`}
        >
          <span className={styles.seal} aria-hidden="true">
            {GLYPHS[achievement.code] ?? "✧"}
          </span>
          <span className={styles.text}>
            <strong>{achievement.title}</strong>
            <span>{achievement.description}</span>
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
