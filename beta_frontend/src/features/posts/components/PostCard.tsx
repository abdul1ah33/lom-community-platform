import { motion } from "motion/react";
import { useState, type MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/feedback/ToastProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { ActionMenu } from "@/components/ui/ActionMenu";
import { Icon } from "@/components/ui/Icon";
import { getPathway } from "@/data/lore/pathways";
import { usePathwaySpoilers } from "@/features/profile";
import { fullDate, relativeTime } from "@/lib/format/relativeTime";
import { useComposer } from "../context/ComposerContext";
import { useDeletePost } from "../hooks/usePosts";
import type { Post } from "../types";
import { BookmarkButton } from "./BookmarkButton";
import { LikeButton } from "./LikeButton";
import { PostBody, SpoilerBadge } from "./PostBody";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: Post;
  /** Position in the list, for the staggered entrance. */
  index?: number;
  /** "full" on the post page: no clamping, not clickable. */
  variant?: "feed" | "full";
  /** Called after the post is deleted (e.g. to leave the post page). */
  onDeleted?: () => void;
}

export function PostCard({ post, index = 0, variant = "feed", onDeleted }: PostCardProps) {
  const navigate = useNavigate();
  const { openComposer } = useComposer();
  const { notify } = useToast();
  const remove = useDeletePost();
  const [confirming, setConfirming] = useState(false);
  const spoilers = usePathwaySpoilers();
  const authorPathway = getPathway(post.author.favorite_pathway);
  // The author's pathway label is itself a spoiler if the reader hasn't reached it.
  const pathway = authorPathway && !spoilers.isSealed(authorPathway) ? authorPathway : undefined;
  const isFeed = variant === "feed";
  const href = `/p/${post.id}`;

  const openPost = (event: MouseEvent<HTMLElement>) => {
    if (!isFeed) return;
    // Clicks inside portalled dialogs still bubble through React; only count clicks on the card itself.
    if (!event.currentTarget.contains(event.target as Node)) return;
    // Don't hijack text selection.
    if (window.getSelection()?.toString()) return;
    navigate(href);
  };

  return (
    <motion.article
      layout="position"
      className={`${styles.card} ${isFeed ? styles.clickable : styles.full}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
      transition={{ duration: 0.55, delay: Math.min(index, 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onClick={openPost}
    >
      <header className={styles.header}>
        <Link to={`/u/${post.author.username}`} className={styles.author} onClick={(e) => e.stopPropagation()}>
          <Avatar name={post.author.username} src={post.author.avatar_url} size={42} />
          <div className={styles.meta}>
            <strong>
              {post.author.display_name ?? post.author.username}
              {pathway && <span className={styles.pathway}> · {pathway.name}</span>}
            </strong>
            <span>
              @{post.author.username} ·{" "}
              <time dateTime={post.created_at} title={fullDate(post.created_at)}>
                {relativeTime(post.created_at)}
              </time>
              {post.edited_at && <em title={`Edited ${fullDate(post.edited_at)}`}> · edited</em>}
            </span>
          </div>
        </Link>
        <div className={styles.headerEnd}>
          <SpoilerBadge post={post} />
          {post.viewer.is_author && <ActionMenu onEdit={() => openComposer(post)} onDelete={() => setConfirming(true)} />}
        </div>
      </header>

      <PostBody post={post} clamp={isFeed} />

      {post.tags.length > 0 && (
        <ul className={styles.tags}>
          {post.tags.map((tag) => (
            <li key={tag}>
              <Link to={`/?tag=${encodeURIComponent(tag)}`} onClick={(e) => e.stopPropagation()}>
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <footer className={styles.actions}>
        <LikeButton post={post} />
        <Link to={href} className={styles.action} onClick={(e) => e.stopPropagation()} aria-label={`${post.stats.comments} comments`}>
          <Icon name="comment" size={19} /> {post.stats.comments.toLocaleString()}
        </Link>
        <BookmarkButton post={post} />
      </footer>

      <Dialog
        open={confirming}
        onClose={() => setConfirming(false)}
        title="Delete this post?"
        description="It will vanish into the fog for good, along with its likes."
        footer={
          <>
            <Button type="button" variant="ghost" onClick={() => setConfirming(false)} disabled={remove.isPending}>
              Keep it
            </Button>
            <Button
              type="button"
              loading={remove.isPending}
              loadingText="Deleting…"
              onClick={() =>
                remove.mutate(post.id, {
                  onSuccess: () => {
                    setConfirming(false);
                    notify("Post deleted.");
                    onDeleted?.();
                  },
                  onError: () => notify("Could not delete the post.", "error"),
                })
              }
            >
              Delete
            </Button>
          </>
        }
      >
        <p className={styles.confirmText}>This can't be undone.</p>
      </Dialog>
    </motion.article>
  );
}

export function PostCardSkeleton() {
  return (
    <div className={`${styles.card} ${styles.skeleton}`} aria-hidden="true">
      <div className={styles.skeletonHeader}>
        <span className={styles.skeletonAvatar} />
        <span className={styles.skeletonLine} style={{ width: "40%" }} />
      </div>
      <span className={styles.skeletonLine} />
      <span className={styles.skeletonLine} style={{ width: "85%" }} />
      <span className={styles.skeletonLine} style={{ width: "60%" }} />
    </div>
  );
}
