import { useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { VeilTransition } from "@/components/effects/VeilTransition";
import { useAuth } from "@/features/auth";
import { FeedPreview, HomeHero, PathwayDeck, RoadmapCard, TrendingTags } from "@/features/home";
import styles from "./HomePage.module.css";

export interface ShellContext {
  onLogout: () => void;
}

export function HomePage() {
  const { user } = useAuth();
  const { onLogout } = useOutletContext<ShellContext>();
  const location = useLocation();
  const navigate = useNavigate();

  // Arriving straight from the login transition: finish it by dissolving the veil.
  const [showVeil, setShowVeil] = useState(
    () => (location.state as { ascended?: boolean } | null)?.ascended === true,
  );

  const finishVeil = () => {
    setShowVeil(false);
    // Drop the flag so a page reload doesn't replay the transition.
    navigate(location.pathname, { replace: true, state: null });
  };

  if (!user) return null;

  return (
    <>
      {showVeil && <VeilTransition mode="reveal" onComplete={finishVeil} />}

      <div className={styles.page}>
        <HomeHero user={user} onLogout={onLogout} />

        <div className={styles.columns}>
          <div className={styles.main}>
            <PathwayDeck />
            <FeedPreview />
          </div>
          <aside className={styles.aside}>
            <RoadmapCard />
            <TrendingTags />
          </aside>
        </div>
      </div>
    </>
  );
}
