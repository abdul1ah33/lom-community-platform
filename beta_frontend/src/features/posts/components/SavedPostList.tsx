import { useBookmarks } from "../hooks/usePosts";
import { PostList } from "./PostList";

/** The signed-in reader's bookmarks, most recently saved first (profile "Saved" tab, /bookmarks). */
export function SavedPostList({ embedded = false }: { embedded?: boolean }) {
  const query = useBookmarks();
  return (
    <PostList
      query={query}
      embedded={embedded}
      empty={{
        title: "Nothing bookmarked",
        body: "Press the bookmark on any post to keep it here. Saved posts are private to you.",
      }}
    />
  );
}
