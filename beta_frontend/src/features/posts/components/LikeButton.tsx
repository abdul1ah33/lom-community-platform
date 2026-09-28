import { useToast } from "@/components/feedback/ToastProvider";
import { HeartButton } from "@/components/ui/HeartButton";
import { useLikePost } from "../hooks/usePosts";
import type { Post } from "../types";

export function LikeButton({ post }: { post: Post }) {
  const like = useLikePost();
  const { notify } = useToast();

  return (
    <HeartButton
      liked={post.viewer.liked}
      count={post.stats.likes}
      onToggle={() =>
        like.mutate(
          { id: post.id, like: !post.viewer.liked },
          { onError: () => notify("That like didn't go through.", "error") },
        )
      }
    />
  );
}
