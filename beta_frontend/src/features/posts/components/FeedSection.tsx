import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "react-router-dom";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { useAuth } from "@/features/auth";
import { useComposer } from "../context/ComposerContext";
import { usePostFeed } from "../hooks/usePosts";
import type { FeedKind } from "../types";
import { PostList } from "./PostList";
import styles from "./FeedSection.module.css";

const TABS: { id: FeedKind; label: string }[] = [
  { id: "latest", label: "Latest" },
  { id: "following", label: "Following" },
];

/**
 * The home feed. Tab and tag filter live in the URL (`?feed=following&tag=Theory`)
 * so filtered views can be shared and survive a reload.
 */
export function FeedSection() {
  const { user } = useAuth();
  const { openComposer } = useComposer();
  const [params, setParams] = useSearchParams();
  const feed: FeedKind = params.get("feed") === "following" ? "following" : "latest";
  const tag = params.get("tag");
  const query = usePostFeed(feed, tag);

  const setParam = (key: string, value: string | null) =>
    setParams(
      (current) => {
        const next = new URLSearchParams(current);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true },
    );

  return (
    <section aria-labelledby="feed-title" className={styles.section}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Community feed</span>
          <h2 id="feed-title" className={styles.title}>
            Whispers from below the fog
          </h2>
        </div>
      </header>

      <button type="button" className={styles.prompt} onClick={() => openComposer()}>
        {user && <Avatar name={user.username} src={user.avatar_url} size={40} />}
        <span className={styles.promptText}>What stirs beneath the fog?</span>
        <span className={styles.promptButton}>
          <Icon name="plus" size={16} /> Post
        </span>
      </button>

      <div className={styles.toolbar}>
        <div className={styles.tabs} role="tablist" aria-label="Feed">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={feed === tab.id}
              className={`${styles.tab} ${feed === tab.id ? styles.active : ""}`}
              onClick={() => setParam("feed", tab.id === "latest" ? null : tab.id)}
            >
              {feed === tab.id && <motion.span layoutId="feed-tab" className={styles.pill} />}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {tag && (
            <motion.button
              type="button"
              className={styles.tagFilter}
              onClick={() => setParam("tag", null)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              aria-label={`Clear tag filter ${tag}`}
            >
              #{tag} <Icon name="x" size={13} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <PostList
        query={query}
        empty={
          feed === "following"
            ? { title: "A quiet table", body: "Follow members to fill this feed with their posts." }
            : tag
              ? { title: `Nothing tagged #${tag}`, body: "Be the first to post about it." }
              : { title: "The pages are still blank", body: "Be the first to share something with the community." }
        }
      />
    </section>
  );
}
