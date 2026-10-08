import { Icon } from "@/components/ui/Icon";
import { SavedPostList } from "@/features/posts";
import styles from "./BookmarksPage.module.css";

export function BookmarksPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Icon name="bookmark" size={22} className={styles.icon} />
        <div>
          <h1>Saved posts</h1>
          <p>Your private shelf of theories and threads. Only you can see it.</p>
        </div>
      </header>
      <SavedPostList />
    </div>
  );
}
