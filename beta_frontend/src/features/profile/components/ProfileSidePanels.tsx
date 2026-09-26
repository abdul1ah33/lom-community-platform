import type { ReactNode } from "react";
import { TOTAL_CHAPTERS } from "@/data/lore/reading";
import { arcanaFor } from "../arcana";
import type { UserProfile } from "../types";
import { AchievementSeals } from "./AchievementSeals";
import { ReadingProgressRing } from "./ReadingProgressRing";
import styles from "./ProfileSidePanels.module.css";

function Panel({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className={styles.panel}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </section>
  );
}

function relativeDays(iso: string) {
  const days = Math.round((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

export function ReadingPanel({ profile }: { profile: UserProfile }) {
  const { current_chapter, updated_at } = profile.reading_progress;
  const finished = current_chapter >= TOTAL_CHAPTERS;

  return (
    <Panel eyebrow="Reading progress" title={finished ? "Beyond the final page" : "Journey through the fog"}>
      <div className={styles.reading}>
        <ReadingProgressRing chapter={current_chapter} hue={arcanaFor(profile).hue} />
        <p className={styles.note}>
          {current_chapter === 0
            ? profile.viewer.is_self
              ? "Set your chapter so spoilers past it stay hidden."
              : "Hasn't shared their progress yet."
            : `Updated ${updated_at ? relativeDays(updated_at) : "recently"}. Spoilers past chapter ${current_chapter} stay sealed${profile.viewer.is_self ? " for you" : ""}.`}
        </p>
      </div>
    </Panel>
  );
}

export function SealsPanel({ profile }: { profile: UserProfile }) {
  return (
    <Panel eyebrow="Achievements" title={`Seals earned · ${profile.achievements.length}`}>
      <AchievementSeals achievements={profile.achievements} />
    </Panel>
  );
}
