import { motion } from "motion/react";
import { TRENDING_TAGS } from "../data/previewFeed";
import { SectionHeader } from "./SectionHeader";
import styles from "./TrendingTags.module.css";

export function TrendingTags() {
  return (
    <section className={styles.card} aria-labelledby="tags-title">
      <SectionHeader id="tags-title" eyebrow="Trending" title="Tags in the fog" />
      <motion.ul
        className={styles.list}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {TRENDING_TAGS.map((tag, index) => (
          <motion.li
            key={tag}
            variants={{ hidden: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1 } }}
            whileHover={{ y: -3, rotate: index % 2 ? 2 : -2 }}
          >
            #{tag}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
