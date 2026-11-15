import { Link, useNavigate, useParams } from "react-router-dom";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { Icon } from "@/components/ui/Icon";
import { NewsArticle, useNewsPost } from "@/features/news";
import { ApiError } from "@/lib/http/ApiError";
import styles from "./NewsPage.module.css";

export function NewsPostPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { data: post, isPending, error } = useNewsPost(id);
  const notFound = error instanceof ApiError && error.status === 404;

  const back = () => (window.history.length > 1 ? navigate(-1) : navigate("/news"));

  return (
    <div className={`${styles.page} ${styles.narrow}`}>
      <button type="button" className={styles.back} onClick={back}>
        <Icon name="arrowRight" size={16} style={{ transform: "scaleX(-1)" }} /> Back
      </button>

      {isPending ? (
        <div className={styles.skeleton} aria-busy="true" aria-label="Loading post" />
      ) : error || !post ? (
        <div className={styles.state}>
          <ArcaneSigil size={140} />
          <h1>{notFound ? "No such announcement" : "The bulletin is shrouded"}</h1>
          <p>{notFound ? "The official site has no post at this address." : "This post could not be loaded. Try again in a moment."}</p>
          <Link to="/news">Back to the news</Link>
        </div>
      ) : (
        <NewsArticle post={post} />
      )}
    </div>
  );
}
