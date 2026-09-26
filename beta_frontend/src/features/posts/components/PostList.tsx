import type { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import type { ReactNode } from "react";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { Button } from "@/components/ui/Button";
import type { Page } from "@/features/profile/types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import type { Post } from "../types";
import { PostCard, PostCardSkeleton } from "./PostCard";
import styles from "./PostList.module.css";

interface PostListProps {
  query: UseInfiniteQueryResult<InfiniteData<Page<Post>, unknown>>;
  empty: { title: string; body: ReactNode };
  /** Inside another card (profile tabs): empty/error states drop their own surface. */
  embedded?: boolean;
}

/** Infinite list of posts: skeletons, empty and error states, auto-loads as you near the end. */
export function PostList({ query, empty, embedded = false }: PostListProps) {
  const stateClass = `${styles.state} ${embedded ? styles.embedded : ""}`;
  const posts = query.data?.pages.flatMap((page) => page.items) ?? [];
  const sentinelRef = useInfiniteScroll<HTMLDivElement>(
    () => void query.fetchNextPage(),
    !!query.hasNextPage && !query.isFetchingNextPage,
  );

  if (query.isPending) {
    return (
      <div className={styles.list} aria-busy="true" aria-label="Loading posts">
        {Array.from({ length: 3 }, (_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className={stateClass}>
        <h3>The fog is too thick</h3>
        <p>Posts could not be loaded.</p>
        <Button variant="ghost" onClick={() => void query.refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={stateClass}>
        <ArcaneSigil size={110} />
        <h3>{empty.title}</h3>
        <p>{empty.body}</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      <AnimatePresence initial={false}>
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index % 10} />
        ))}
      </AnimatePresence>

      <div ref={sentinelRef} className={styles.end}>
        {query.isFetchingNextPage ? (
          <PostCardSkeleton />
        ) : query.hasNextPage ? (
          <Button variant="ghost" onClick={() => void query.fetchNextPage()}>
            Load more
          </Button>
        ) : (
          <span className={styles.bottom}>✦ You have reached the bottom of the fog ✦</span>
        )}
      </div>
    </div>
  );
}
