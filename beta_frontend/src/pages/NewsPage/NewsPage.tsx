import { NewsBoard } from "@/features/news";
import styles from "./NewsPage.module.css";

export function NewsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Bulletin Board</span>
        <h1>Official News</h1>
        <p>Announcements and events from lomworld.com, the official Lord of Mysteries site, read fresh from the source.</p>
      </header>
      <NewsBoard />
    </div>
  );
}
