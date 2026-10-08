import { Link, useNavigate, useParams } from "react-router-dom";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { Icon } from "@/components/ui/Icon";
import { FandomLink, WikiEntryView, useWikiEntry } from "@/features/wiki";
import { ApiError } from "@/lib/http/ApiError";
import styles from "./WikiPage.module.css";

export function WikiEntryPage() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const { data: entry, isPending, error } = useWikiEntry(slug);
  const notFound = error instanceof ApiError && error.status === 404;

  const back = () => (window.history.length > 1 ? navigate(-1) : navigate("/wiki"));

  return (
    <div className={`${styles.page} ${styles.narrow}`}>
      <button type="button" className={styles.back} onClick={back}>
        <Icon name="arrowRight" size={16} style={{ transform: "scaleX(-1)" }} /> Back
      </button>

      {isPending ? (
        <div className={styles.skeleton} aria-busy="true" aria-label="Loading entry" />
      ) : error || !entry ? (
        <div className={styles.state}>
          <ArcaneSigil size={140} />
          <h1>{notFound ? "Not in our archive" : "The archive is shrouded"}</h1>
          <p>{notFound ? "We have no entry by that name yet." : "This entry could not be loaded. Try again in a moment."}</p>
          {notFound && (
            // The slug is the best guess at what the reader was looking for.
            <FandomLink query={slug.replace(/-/g, " ")}>
              Search Fandom instead <Icon name="arrowRight" size={14} />
            </FandomLink>
          )}
          <Link to="/wiki">Back to the wiki</Link>
        </div>
      ) : (
        <WikiEntryView entry={entry} />
      )}
    </div>
  );
}
