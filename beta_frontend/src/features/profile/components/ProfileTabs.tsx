import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import type { UserProfile } from "../types";
import styles from "./ProfileTabs.module.css";

type TabId = "posts" | "comments" | "saved";

const EMPTY_COPY: Record<TabId, { title: string; body: string }> = {
  posts: {
    title: "The pages are still blank",
    body: "Posts arrive with the next module. Theories, fan art and chapter reactions will gather here.",
  },
  comments: {
    title: "No whispers yet",
    body: "Replies to other members' posts will be collected here.",
  },
  saved: {
    title: "Nothing bookmarked",
    body: "Saved posts are private to you. Only you can see this tab.",
  },
};

export function ProfileTabs({ profile }: { profile: UserProfile }) {
  const tabs: { id: TabId; label: string; count?: number }[] = [
    { id: "posts", label: "Posts", count: profile.stats.posts },
    { id: "comments", label: "Comments", count: profile.stats.comments },
    ...(profile.viewer.is_self ? [{ id: "saved" as const, label: "Saved" }] : []),
  ];
  const [active, setActive] = useState<TabId>("posts");
  const copy = EMPTY_COPY[active];

  return (
    <section className={styles.card} aria-label="Activity">
      <div className={styles.tabs} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active === tab.id}
            aria-controls="profile-tabpanel"
            className={`${styles.tab} ${active === tab.id ? styles.active : ""}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
            {tab.count !== undefined && <span className={styles.count}>{tab.count}</span>}
            {active === tab.id && (
              <motion.span layoutId="profile-tab-underline" className={styles.underline} />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          id="profile-tabpanel"
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          className={styles.panel}
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.emblem} aria-hidden="true">
            <ArcaneSigil size={120} />
          </div>
          <h3>{copy.title}</h3>
          <p>{copy.body}</p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
