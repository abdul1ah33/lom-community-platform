import type { ReactNode } from "react";
import type { SummaryBlock } from "../types";
import styles from "./ChapterText.module.css";

interface ChapterTextProps {
  /** Small line above the title, e.g. "Chapter 214". */
  kicker: string;
  title: string;
  blocks: SummaryBlock[];
  /** Chapter navigation under the text. */
  children?: ReactNode;
}

/** The author's asides are whole paragraphs in brackets, e.g. "(Just wanted to show…)". */
const isAside = (text: string) => text.startsWith("(") && text.endsWith(")");

/** One chapter (or the prelude) of a summary, set as a page of a book. */
export function ChapterText({ kicker, title, blocks, children }: ChapterTextProps) {
  // The drop cap goes on the first ordinary paragraph only.
  const opening = blocks.findIndex((block) => typeof block === "string" && !isAside(block));

  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <span className={styles.kicker}>{kicker}</span>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.ornament} aria-hidden="true">
          <span />
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path d="M12 2 14.5 9.5 22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z" fill="currentColor" />
          </svg>
          <span />
        </span>
      </header>

      <div className={styles.text}>
        {blocks.map((block, i) => {
          if (typeof block === "string") {
            const className = i === opening ? styles.opening : isAside(block) ? styles.aside : undefined;
            return (
              <p key={i} className={className}>
                {block}
              </p>
            );
          }
          if ("heading" in block) {
            return (
              <h4 key={i} className={styles.subheading}>
                {block.heading}
              </h4>
            );
          }
          return (
            <blockquote key={i} className={styles.quote}>
              <span className={styles.quoteLabel}>From the novel</span>
              {block.quote.map((line, j) => (
                <p key={j}>{line}</p>
              ))}
            </blockquote>
          );
        })}
      </div>

      {children}
    </article>
  );
}
