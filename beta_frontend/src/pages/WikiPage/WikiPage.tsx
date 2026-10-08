import { useReaderChapter } from "@/features/profile";
import { WikiBrowser } from "@/features/wiki";
import styles from "./WikiPage.module.css";

export function WikiPage() {
  const chapter = useReaderChapter();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>The Archive</span>
        <h1>Wiki</h1>
        <p>
          Spoiler-safe lore, sealed to your reading progress
          {chapter ? ` (chapter ${chapter})` : ""}. Anything past it stays hidden until you choose to reveal it.
        </p>
      </header>
      <WikiBrowser />
    </div>
  );
}
