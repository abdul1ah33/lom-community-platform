import { Link } from "react-router-dom";
import { Icon } from "@/components/ui/Icon";
import { RevealText } from "@/components/ui/RevealText";
import { EditProfileForm, useMyProfile } from "@/features/profile";
import styles from "./EditProfilePage.module.css";

export function EditProfilePage() {
  const { data: profile, isPending, isError } = useMyProfile();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        {profile && (
          <Link to={`/u/${profile.username}`} className={styles.back}>
            <Icon name="arrowRight" size={16} style={{ transform: "scaleX(-1)" }} /> Back to profile
          </Link>
        )}
        <h1 className={styles.title}>
          <RevealText text="Edit your seat at the table" charClassName={styles.glyph} stagger={0.025} />
        </h1>
        <p className={styles.subtitle}>Changes to your picture save instantly; everything else waits for Save.</p>
      </header>

      {isPending ? (
        <div className={styles.loading} aria-busy="true" />
      ) : isError || !profile ? (
        <p className={styles.error}>Your profile could not be loaded. Refresh to try again.</p>
      ) : (
        // Keyed by id so switching accounts never reuses a stale draft.
        <EditProfileForm key={profile.id} profile={profile} />
      )}
    </div>
  );
}
