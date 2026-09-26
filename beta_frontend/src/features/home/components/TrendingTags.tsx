import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useTrendingTags } from "@/features/posts";
import { SectionHeader } from "./SectionHeader";
import styles from "./TrendingTags.module.css";

/** Most-used tags across recent posts; each one filters the home feed. */
export function TrendingTags() {
  const { data: tags, isPending, isError } = useTrendingTags();

  return (
    <section className={styles.card} aria-labelledby="tags-title">
      <SectionHeader id="tags-title" eyebrow="Trending" title="Tags in the fog" />
      {isPending ? (
        <div className={styles.list} aria-busy="true">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className={styles.skeleton} style={{ width: 64 + ((i * 23) % 50) }} />
          ))}
        </div>
      ) : isError || !tags?.length ? (
        <p className={styles.empty}>No tags yet. Add some to your posts.</p>
      ) : (
        <motion.ul
          className={styles.list}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {tags.map(({ tag, count }, index) => (
            <motion.li
              key={tag}
              variants={{ hidden: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1 } }}
              whileHover={{ y: -3, rotate: index % 2 ? 2 : -2 }}
            >
              <Link to={`/?tag=${encodeURIComponent(tag)}`} className={styles.tag}>
                #{tag} <span>{count}</span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </section>
  );
}
