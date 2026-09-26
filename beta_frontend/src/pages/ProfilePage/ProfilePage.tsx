import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { useAuth } from "@/features/auth";
import {
  ProfileHeader,
  ProfileTabs,
  ReadingPanel,
  RelationsDialog,
  SealsPanel,
  useProfile,
  type RelationKind,
} from "@/features/profile";
import { UserPostList } from "@/features/posts";
import { ApiError } from "@/lib/http/ApiError";
import styles from "./ProfilePage.module.css";

/** `/profile` → the signed-in user's own `/u/:username`. */
export function MyProfileRedirect() {
  const { user } = useAuth();
  return user ? <Navigate to={`/u/${user.username}`} replace /> : null;
}

export function ProfilePage() {
  const { username = "" } = useParams();
  const { data: profile, isPending, error } = useProfile(username);
  const [relations, setRelations] = useState<RelationKind | null>(null);

  if (isPending) return <ProfileSkeleton />;

  if (error || !profile) {
    const notFound = error instanceof ApiError && error.status === 404;
    return (
      <div className={styles.state}>
        <ArcaneSigil size={160} />
        <h1>{notFound ? "No one sits in that chair" : "The fog is too thick"}</h1>
        <p>
          {notFound
            ? `There is no member called @${username}.`
            : "This profile could not be loaded. Try again in a moment."}
        </p>
        <Link to="/">Return home</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <ProfileHeader profile={profile} onOpenRelations={setRelations} />

      <div className={styles.columns}>
        <div className={styles.main}>
          <ProfileTabs
            key={profile.username}
            profile={profile}
            posts={<UserPostList username={profile.username} isSelf={profile.viewer.is_self} />}
          />
        </div>
        <aside className={styles.aside}>
          <ReadingPanel profile={profile} />
          <SealsPanel profile={profile} />
        </aside>
      </div>

      <RelationsDialog username={profile.username} kind={relations} onClose={() => setRelations(null)} />
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className={styles.page} aria-busy="true" aria-label="Loading profile">
      <div className={`${styles.skeleton} ${styles.skeletonHeader}`} />
      <div className={styles.columns}>
        <div className={`${styles.skeleton} ${styles.skeletonBlock}`} />
        <div className={`${styles.skeleton} ${styles.skeletonBlock}`} />
      </div>
    </div>
  );
}
