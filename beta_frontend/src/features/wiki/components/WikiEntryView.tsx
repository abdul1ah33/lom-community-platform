import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { Icon } from "@/components/ui/Icon";
import { fullDate } from "@/lib/format/relativeTime";
import { entryRevealKey, sectionRevealKey, useWikiSpoilers } from "../hooks/useWikiSpoilers";
import type { WikiEntry, WikiSection } from "../types";
import { FandomLink } from "./FandomLink";
import { categoryLabel } from "./WikiEntryCard";
import styles from "./WikiEntryView.module.css";

export function WikiEntryView({ entry }: { entry: WikiEntry }) {
  const spoilers = useWikiSpoilers();
  const key = entryRevealKey(entry);

  // The whole entry is past the reader: show only the seal, no title or text.
  if (spoilers.isSealed(key, entry.reveal_chapter)) {
    return (
      <div className={styles.sealedEntry}>
        <ArcaneSigil size={130} />
        <h1>This entry is sealed</h1>
        <p>
          It is safe from chapter {entry.reveal_chapter}. You're at{" "}
          {spoilers.chapter ? `chapter ${spoilers.chapter}` : "the start"}.
        </p>
        <button type="button" className={styles.reveal} onClick={() => spoilers.reveal(key)}>
          <Icon name="eye" size={15} /> Reveal anyway
        </button>
        <Link to="/wiki">Back to the wiki</Link>
      </div>
    );
  }

  return (
    <motion.article
      className={styles.entry}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className={styles.header}>
        <Link to={`/wiki?category=${entry.category}`} className={styles.category}>
          {categoryLabel(entry.category)}
        </Link>
        <h1>{entry.title}</h1>
        {entry.aliases.length > 0 && <p className={styles.aliases}>Also known as {entry.aliases.join(", ")}</p>}
      </header>

      <p className={styles.summary}>{entry.summary}</p>

      {entry.sections.map((section, index) => (
        <Section key={index} slug={entry.slug} index={index} section={section} />
      ))}

      {entry.sections.length === 0 && (
        <p className={styles.stub}>This entry is still a stub. More lore will be written in as the archive grows.</p>
      )}

      <footer className={styles.footer}>
        <span>Updated {fullDate(entry.updated_at)}</span>
        <FandomLink query={entry.title}>
          Read more on Fandom <Icon name="arrowRight" size={14} />
        </FandomLink>
      </footer>
    </motion.article>
  );
}

function Section({ slug, index, section }: { slug: string; index: number; section: WikiSection }) {
  const spoilers = useWikiSpoilers();
  const key = sectionRevealKey(slug, index);
  const sealed = spoilers.isSealed(key, section.spoiler_chapter);

  return (
    <section className={styles.section}>
      <h2>{section.heading}</h2>
      <div className={styles.bodyWrap}>
        <motion.p
          className={styles.body}
          animate={{ filter: sealed ? "blur(7px)" : "blur(0px)", opacity: sealed ? 0.5 : 1 }}
          transition={{ duration: 0.6 }}
          aria-hidden={sealed}
        >
          {section.body}
        </motion.p>
        <AnimatePresence>
          {sealed && (
            <motion.div
              className={styles.seal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.08, filter: "blur(6px)" }}
            >
              <span className={styles.sealText}>Spoiler for chapter {section.spoiler_chapter}</span>
              <button type="button" className={styles.reveal} onClick={() => spoilers.reveal(key)}>
                <Icon name="eye" size={15} /> Reveal anyway
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
