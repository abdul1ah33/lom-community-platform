import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import type { CSSProperties, PointerEvent } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { toRoman, type Pathway } from "@/data/lore/pathways";
import styles from "./ArcanaCard.module.css";

interface ArcanaCardProps {
  username: string;
  avatarUrl: string | null;
  pathway: Pathway;
  /** Small caps line above the pathway name. */
  kicker?: string;
  size?: "md" | "lg";
  /** The pathway is past the viewer's chapter: hide its name, Sequence and colour. */
  sealed?: boolean;
  onReveal?: () => void;
}

/** Neutral hue for sealed cards, so the colour doesn't hint at the pathway. */
const SEALED_HUE = 250;

/** A member's holographic tarot card: tilts toward the cursor with a foil sheen. */
export function ArcanaCard({
  username,
  avatarUrl,
  pathway,
  kicker = "Your arcana",
  size = "md",
  sealed = false,
  onReveal,
}: ArcanaCardProps) {
  const hue = sealed ? SEALED_HUE : pathway.hue;
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [14, -14]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-18, 18]), { stiffness: 150, damping: 15 });
  const foilX = useTransform(px, [0, 1], [0, 100]);
  const foilY = useTransform(py, [0, 1], [0, 100]);
  const foilAngle = useTransform(px, [0, 1], [100, 260]);
  const foil = useMotionTemplate`radial-gradient(circle at ${foilX}% ${foilY}%, rgb(255 255 255 / 0.35), transparent 45%), linear-gradient(${foilAngle}deg, hsl(${hue} 90% 60% / 0.25), hsl(${(hue + 120) % 360} 90% 60% / 0.2), hsl(${(hue + 240) % 360} 90% 60% / 0.25))`;

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ "--hue": hue } as CSSProperties} className={size === "lg" ? styles.large : undefined}>
      <motion.div
        className={styles.card}
        style={{ rotateX, rotateY }}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        whileHover={{ scale: 1.04 }}
      >
        <div className={styles.frame}>
          <span className={styles.numeral}>{sealed ? "?" : toRoman(pathway.number)}</span>

          <div className={styles.emblem}>
            <span className={styles.rays} aria-hidden="true" />
            <Avatar name={username} src={avatarUrl} size={92} />
          </div>

          <div className={styles.caption}>
            <span className={styles.kicker}>{kicker}</span>
            {sealed ? (
              <>
                <strong className={styles.pathway}>Sealed arcana</strong>
                <span className={styles.sequence}>Revealed at chapter {pathway.revealChapter}</span>
                {onReveal && (
                  <button type="button" className={styles.reveal} onClick={onReveal}>
                    <Icon name="eye" size={13} /> Reveal
                  </button>
                )}
              </>
            ) : (
              <>
                {/* Keyed so the name cross-fades when the pathway changes (edit preview). */}
                <motion.strong
                  key={pathway.slug}
                  className={styles.pathway}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  The {pathway.name}
                </motion.strong>
                <span className={styles.sequence}>Sequence 9 · {pathway.sequence9}</span>
              </>
            )}
          </div>

          <span className={styles.owner}>{username}</span>
        </div>
        <motion.span className={styles.foil} style={{ background: foil }} aria-hidden="true" />
      </motion.div>
    </div>
  );
}
