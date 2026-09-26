import { useUserPosts } from "../hooks/usePosts";
import { PostList } from "./PostList";

/** A member's own posts, newest first (profile "Posts" tab). */
export function UserPostList({ username, isSelf }: { username: string; isSelf: boolean }) {
  const query = useUserPosts(username);
  return (
    <PostList
      query={query}
      embedded
      empty={
        isSelf
          ? { title: "The pages are still blank", body: "Your first theory is one click away: press the + button." }
          : { title: "The pages are still blank", body: `@${username} hasn't posted yet.` }
      }
    />
  );
}
