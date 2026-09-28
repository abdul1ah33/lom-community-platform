import { Link, useNavigate, useParams } from "react-router-dom";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { Icon } from "@/components/ui/Icon";
import { CommentSection } from "@/features/comments";
import { PostCard, PostCardSkeleton, usePost, useSpoilerGate, type Post } from "@/features/posts";
import { ApiError } from "@/lib/http/ApiError";
import styles from "./PostPage.module.css";

export function PostPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { data: post, isPending, error } = usePost(id);

  const back = () => (window.history.length > 1 ? navigate(-1) : navigate("/"));

  return (
    <div className={styles.page}>
      <button type="button" className={styles.back} onClick={back}>
        <Icon name="arrowRight" size={16} style={{ transform: "scaleX(-1)" }} /> Back
      </button>

      {isPending ? (
        <PostCardSkeleton />
      ) : error || !post ? (
        <div className={styles.state}>
          <ArcaneSigil size={140} />
          <h1>{error instanceof ApiError && error.status === 404 ? "Lost to the fog" : "The fog is too thick"}</h1>
          <p>
            {error instanceof ApiError && error.status === 404
              ? "This post does not exist, or its author removed it."
              : "The post could not be loaded. Try again in a moment."}
          </p>
          <Link to="/">Return home</Link>
        </div>
      ) : (
        <>
          <PostCard post={post} variant="full" onDeleted={() => navigate("/", { replace: true })} />
          <PostComments post={post} />
        </>
      )}
    </div>
  );
}

/** Comments stay closed while the post itself is a sealed spoiler for this reader. */
function PostComments({ post }: { post: Post }) {
  const gate = useSpoilerGate(post);
  return (
    <CommentSection postId={post.id} count={post.stats.comments} sealed={gate.state !== "clear"} onReveal={gate.reveal} />
  );
}
