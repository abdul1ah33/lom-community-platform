import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { getPathway } from "@/data/lore/pathways";
import { useAuth } from "@/features/auth";
import { useRelations } from "../hooks/useProfile";
import { FollowButton } from "./FollowButton";
import styles from "./RelationsDialog.module.css";

export type RelationKind = "followers" | "following";

interface RelationsDialogProps {
  username: string;
  kind: RelationKind | null;
  onClose: () => void;
}

export function RelationsDialog({ username, kind, onClose }: RelationsDialogProps) {
  const { user: me } = useAuth();
  const query = useRelations(username, kind ?? "followers", kind !== null);
  const people = query.data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <Dialog
      open={kind !== null}
      onClose={onClose}
      title={kind === "following" ? "Following" : "Followers"}
      description={kind === "following" ? `Members ${username} follows` : `Members following ${username}`}
    >
      {query.isPending ? (
        <ul className={styles.list} aria-busy="true">
          {Array.from({ length: 4 }, (_, i) => (
            <li key={i} className={styles.skeleton} />
          ))}
        </ul>
      ) : query.isError ? (
        <p className={styles.empty}>This list could not be loaded. Try again in a moment.</p>
      ) : people.length === 0 ? (
        <p className={styles.empty}>
          {kind === "following" ? "Not following anyone yet." : "No followers yet. The table awaits."}
        </p>
      ) : (
        <ul className={styles.list}>
          {people.map((person, index) => {
            const pathway = getPathway(person.favorite_pathway);
            return (
              <motion.li
                key={person.id}
                className={styles.row}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(index, 10) * 0.04 }}
              >
                <Link to={`/u/${person.username}`} className={styles.person} onClick={onClose}>
                  <Avatar name={person.username} src={person.avatar_url} size={42} />
                  <span className={styles.names}>
                    <strong>{person.display_name ?? person.username}</strong>
                    <span>
                      @{person.username}
                      {pathway && <em> · {pathway.name}</em>}
                    </span>
                  </span>
                </Link>
                {me && me.id !== person.id && (
                  <FollowButton username={person.username} following={person.viewer_is_following} compact />
                )}
              </motion.li>
            );
          })}
        </ul>
      )}

      {query.hasNextPage && (
        <Button
          variant="ghost"
          className={styles.more}
          loading={query.isFetchingNextPage}
          onClick={() => void query.fetchNextPage()}
        >
          Show more
        </Button>
      )}
    </Dialog>
  );
}
