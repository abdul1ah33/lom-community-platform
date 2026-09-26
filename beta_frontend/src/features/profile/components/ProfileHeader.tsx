import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { Avatar } from "@/components/ui/Avatar";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";
import { RevealText } from "@/components/ui/RevealText";
import { arcanaFor } from "../arcana";
import { usePathwaySpoilers } from "../hooks/useSpoilerProgress";
import type { UserProfile } from "../types";
import { ArcanaCard } from "./ArcanaCard";
import { FollowButton } from "./FollowButton";
import type { RelationKind } from "./RelationsDialog";
import styles from "./ProfileHeader.module.css";

interface ProfileHeaderProps {
  profile: UserProfile;
  onOpenRelations: (kind: RelationKind) => void;
}

function joinedLabel(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

export function ProfileHeader({ profile, onOpenRelations }: ProfileHeaderProps) {
  const spoilers = usePathwaySpoilers();
  const pathway = arcanaFor(profile, spoilers.chapter);
  // Someone else's favourite pathway may be past your chapter.
  const sealed = !profile.viewer.is_self && spoilers.isSealed(pathway);
  const name = profile.display_name ?? profile.username;

  const stats: { label: string; value: number; relation?: RelationKind }[] = [
    { label: "Posts", value: profile.stats.posts },
    { label: "Followers", value: profile.stats.followers, relation: "followers" },
    { label: "Following", value: profile.stats.following, relation: "following" },
    { label: "Likes", value: profile.stats.likes_received },
  ];

  return (
    <motion.section
      className={styles.header}
      style={{ "--hue": sealed ? 350 : pathway.hue } as CSSProperties}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      aria-labelledby="profile-name"
    >
      <div className={styles.sigil} aria-hidden="true">
        <ArcaneSigil size={620} />
      </div>

      <div className={styles.identity}>
        <motion.div
          className={styles.avatar}
          initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.15 }}
        >
          <Avatar name={profile.username} src={profile.avatar_url} size={116} ring />
        </motion.div>

        <div className={styles.names}>
          <h1 id="profile-name" className={styles.name}>
            <RevealText key={name} text={name} charClassName={styles.glyph} delay={0.25} stagger={0.035} />
          </h1>
          <span className={styles.handle}>@{profile.username}</span>
        </div>

        <ul className={styles.meta}>
          {profile.location && (
            <li>
              <Icon name="mapPin" size={15} /> {profile.location}
            </li>
          )}
          <li>
            <Icon name="calendar" size={15} /> Joined {joinedLabel(profile.joined_at)}
          </li>
          {profile.favorite_character && (
            <li>
              <Icon name="heart" size={15} /> {profile.favorite_character}
            </li>
          )}
        </ul>

        {profile.bio ? (
          <p className={styles.bio}>{profile.bio}</p>
        ) : (
          profile.viewer.is_self && <p className={styles.bioEmpty}>Add a bio so the table knows who you are.</p>
        )}

        <div className={styles.stats}>
          {stats.map((stat) =>
            stat.relation ? (
              <button
                key={stat.label}
                type="button"
                className={`${styles.stat} ${styles.statButton}`}
                onClick={() => onOpenRelations(stat.relation!)}
              >
                <CountUp value={stat.value} className={styles.statValue} />
                <span>{stat.label}</span>
              </button>
            ) : (
              <div key={stat.label} className={styles.stat}>
                <CountUp value={stat.value} className={styles.statValue} />
                <span>{stat.label}</span>
              </div>
            ),
          )}
        </div>

        <div className={styles.actions}>
          {profile.viewer.is_self ? (
            <Link to="/profile/edit" className={styles.editLink}>
              <Icon name="edit" size={17} /> Edit profile
            </Link>
          ) : (
            <FollowButton username={profile.username} following={profile.viewer.is_following} />
          )}
        </div>
      </div>

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, rotateY: 90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <ArcanaCard
          username={profile.username}
          avatarUrl={profile.avatar_url}
          pathway={pathway}
          kicker={profile.viewer.is_self ? "Your arcana" : "Their arcana"}
          size="lg"
          sealed={sealed}
          onReveal={() => spoilers.reveal(pathway)}
        />
      </motion.div>
    </motion.section>
  );
}
