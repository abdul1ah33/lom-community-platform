import { PREVIEW_POSTS } from "../data/previewFeed";
import { PostCard } from "./PostCard";
import { SectionHeader } from "./SectionHeader";
import styles from "./FeedPreview.module.css";

export function FeedPreview() {
  return (
    <section aria-labelledby="feed-title">
      <SectionHeader
        id="feed-title"
        eyebrow="Community feed"
        title="Whispers from below the fog"
        aside={<span className={styles.preview}>Design preview · sample posts</span>}
      />
      <div className={styles.list}>
        {PREVIEW_POSTS.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </section>
  );
}
