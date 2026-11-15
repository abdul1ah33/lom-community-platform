import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { Icon } from "@/components/ui/Icon";
import { coverImage, formatNewsDate, leadText } from "../format";
import { useNewsFeed, useNewsPost } from "../hooks/useNews";
import { NEWS_CATEGORIES, type NewsCategory, type NewsSummary } from "../types";
import styles from "./NewsBoard.module.css";

const OFFICIAL_BOARD = "https://www.lomworld.com/en/news";

/** The official bulletin board: Latest News and Events, newest first, as the site orders them. */
export function NewsBoard() {
  const [category, setCategory] = useState<NewsCategory>("news");
  const { data: feed, isPending, error, refetch } = useNewsFeed();

  if (isPending) return <div className={styles.skeleton} aria-busy="true" aria-label="Loading news" />;

  if (error || !feed) {
    return (
      <div className={styles.state}>
        <ArcaneSigil size={120} />
        <h2>The bulletin board is shrouded</h2>
        <p>The official site could not be reached. Try again in a moment.</p>
        <div className={styles.stateActions}>
          <button type="button" className={styles.chip} onClick={() => refetch()}>
            Try again
          </button>
          <a href={OFFICIAL_BOARD} target="_blank" rel="noreferrer">
            Open lomworld.com <Icon name="external" size={14} />
          </a>
        </div>
      </div>
    );
  }

  const [featured, ...rest] = feed[category];

  return (
    <div className={styles.board}>
      <div className={styles.chips} role="tablist" aria-label="Bulletin sections">
        {NEWS_CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={category === c.id}
            className={`${styles.chip} ${category === c.id ? styles.chipActive : ""}`}
            onClick={() => setCategory(c.id)}
          >
            {c.label} <span className={styles.count}>{feed[c.id].length}</span>
          </button>
        ))}
      </div>

      {featured ? (
        <>
          <FeaturedPost key={featured.id} summary={featured} />
          {rest.length > 0 && (
            <ul className={styles.grid}>
              {rest.map((item, i) => (
                <NewsCard key={item.id} item={item} index={i} label={category === "news" ? "News" : "Event"} />
              ))}
            </ul>
          )}
        </>
      ) : (
        <p className={styles.empty}>Nothing posted here yet.</p>
      )}
    </div>
  );
}

/** The newest post, opened up front: its cover, date and opening lines. */
function FeaturedPost({ summary }: { summary: NewsSummary }) {
  // Loading the full post here also warms the cache for when the reader opens it.
  const { data: post } = useNewsPost(summary.id);
  const cover = post && coverImage(post);
  const date = post && formatNewsDate(post.date);
  const lead = (post && leadText(post)) || summary.teaser;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      <Link to={`/news/${summary.id}`} className={`${styles.featured} ${cover ? "" : styles.featuredPlain}`}>
        {cover && (
          <div className={styles.cover}>
            <img src={cover} alt="" referrerPolicy="no-referrer" />
          </div>
        )}
        <div className={styles.featuredText}>
          <span className={styles.label}>
            <Icon name="sparkle" size={12} /> Latest{date ? ` · ${date}` : ""}
          </span>
          <strong className={styles.featuredTitle}>{summary.title}</strong>
          {lead && <span className={styles.lead}>{lead}</span>}
          <span className={styles.more}>
            Read the announcement <Icon name="arrowRight" size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function NewsCard({ item, index, label }: { item: NewsSummary; index: number; label: string }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index, 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/news/${item.id}`} className={styles.card}>
        <span className={styles.label}>{label}</span>
        <strong className={styles.title}>{item.title}</strong>
        {item.teaser && <span className={styles.teaser}>{item.teaser}</span>}
        <span className={styles.more}>
          Read <Icon name="arrowRight" size={14} />
        </span>
      </Link>
    </motion.li>
  );
}
