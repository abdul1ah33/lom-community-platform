import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useReaderChapter } from "@/features/profile";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useRevealStore } from "@/lib/spoilers/revealStore";
import { useUserComments } from "../hooks/useComments";
import type { ProfileComment } from "../types";
import { CommentItem } from "./CommentItem";
import styles from "./Comments.module.css";

/** A member's comments (profile "Comments" tab), each linking back to its post. */
export function UserCommentList({ username, isSelf }: { username: string; isSelf: boolean }) {
  const query = useUserComments(username);
  const comments = query.data?.pages.flatMap((page) => page.items) ?? [];
  const sentinelRef = useInfiniteScroll<HTMLDivElement>(
    () => void query.fetchNextPage(),
    !!query.hasNextPage && !query.isFetchingNextPage,
  );

  if (query.isPending) {
    return (
      <div className={styles.list} aria-busy="true">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className={styles.skeleton} />
        ))}
      </div>
    );
  }

  if (query.isError || comments.length === 0) {
    return (
      <div className={styles.emptyTab}>
        <ArcaneSigil size={110} />
        <h3>{query.isError ? "The fog is too thick" : "No whispers yet"}</h3>
        <p>
          {query.isError
            ? "Comments could not be loaded."
            : isSelf
              ? "Your replies to other members' posts will gather here."
              : `@${username} hasn't commented yet.`}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {comments.map((comment, index) => (
        <ProfileCommentRow key={comment.id} comment={comment} index={index} />
      ))}
      <div ref={sentinelRef} className={styles.more}>
        {query.hasNextPage && (
          <Button variant="ghost" loading={query.isFetchingNextPage} onClick={() => void query.fetchNextPage()}>
            Load more
          </Button>
        )}
      </div>
    </div>
  );
}

/**
 * Comments carry no spoiler flag, but a comment on a sealed spoiler post stays
 * sealed with it, exactly as it would on the post page.
 */
function ProfileCommentRow({ comment, index }: { comment: ProfileComment; index: number }) {
  const readerChapter = useReaderChapter();
  const store = useRevealStore();
  const { post } = comment;
  const sealed =
    !comment.viewer.is_author &&
    post.spoiler_chapter !== null &&
    readerChapter < post.spoiler_chapter &&
    !store.has(`post:${post.id}`);

  return (
    <motion.div
      className={styles.profileRow}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index, 6) * 0.05 }}
    >
      <Link to={`/p/${post.id}`} className={styles.context}>
        <Icon name="comment" size={13} /> On @{post.author_username}'s post
        {post.spoiler_chapter !== null && <span className={styles.contextSpoiler}>· spoiler ch. {post.spoiler_chapter}</span>}
        <Icon name="arrowRight" size={13} />
      </Link>
      {sealed ? (
        <div className={styles.sealedRow}>
          <Icon name="lock" size={15} /> Sealed with its post until you reach chapter {post.spoiler_chapter}.
        </div>
      ) : (
        <CommentItem comment={comment} />
      )}
    </motion.div>
  );
}
