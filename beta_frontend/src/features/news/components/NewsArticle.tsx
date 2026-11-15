import { Icon } from "@/components/ui/Icon";
import { formatNewsDate } from "../format";
import type { NewsBlock, NewsPost } from "../types";
import styles from "./NewsArticle.module.css";

/** A post from the official site, typeset like the rest of the app. */
export function NewsArticle({ post }: { post: NewsPost }) {
  const date = formatNewsDate(post.date);

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <span className={styles.kicker}>Official Bulletin</span>
        <h1 className={styles.title}>{post.title}</h1>
        {date && (
          <time className={styles.date} dateTime={post.date!.toISOString()}>
            <Icon name="calendar" size={14} /> {date}
          </time>
        )}
        <div className={styles.ornament} aria-hidden="true">
          <span /> ✦ <span />
        </div>
      </header>

      <div className={styles.body}>
        {post.blocks.map((block, i) => (
          <Block key={i} block={block} officialUrl={post.officialUrl} />
        ))}
      </div>

      <footer className={styles.footer}>
        <a className={styles.source} href={post.officialUrl} target="_blank" rel="noreferrer">
          Read on lomworld.com <Icon name="external" size={14} />
        </a>
      </footer>
    </article>
  );
}

function Block({ block, officialUrl }: { block: NewsBlock; officialUrl: string }) {
  switch (block.type) {
    case "heading":
      return <h2 className={styles.heading}>{block.text}</h2>;
    case "paragraph":
      return <p className={styles.paragraph}>{block.text}</p>;
    case "image":
      return (
        <figure className={styles.figure}>
          {/* The image hosts refuse requests that carry another site's address as the referrer. */}
          <img src={block.src} alt="" loading="lazy" referrerPolicy="no-referrer" />
        </figure>
      );
    case "video":
      // The video host only plays for lomworld.com itself, so link out instead of a broken player.
      return (
        <a className={styles.video} href={officialUrl} target="_blank" rel="noreferrer">
          <span className={styles.play} aria-hidden="true">
            ▶
          </span>
          <span>
            <strong>Watch the video</strong>
            <small>Plays on the official site</small>
          </span>
          <Icon name="external" size={16} />
        </a>
      );
  }
}
