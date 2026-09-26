import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import type { CSSProperties, PointerEvent } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { toRoman, type Pathway } from "@/data/lore/pathways";
import styles from "./ArcanaCard.module.css";

interface ArcanaCardProps {
  username: string;
  avatarUrl: string | null;
  pathway: Pathway;
  /** Small caps line above the pathway name. */
  kicker?: string;
  size?: "md" | "lg";
}

/** A member's holographic tarot card: tilts toward the cursor with a foil sheen. */
export function ArcanaCard({ username, avatarUrl, pathway, kicker = "Your arcana", size = "md" }: ArcanaCardProps) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [14, -14]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-18, 18]), { stiffness: 150, damping: 15 });
  const foilX = useTransform(px, [0, 1], [0, 100]);
  const foilY = useTransform(py, [0, 1], [0, 100]);
  const foilAngle = useTransform(px, [0, 1], [100, 260]);
  const foil = useMotionTemplate`radial-gradient(circle at ${foilX}% ${foilY}%, rgb(255 255 255 / 0.35), transparent 45%), linear-gradient(${foilAngle}deg, hsl(${pathway.hue} 90% 60% / 0.25), hsl(${(pathway.hue + 120) % 360} 90% 60% / 0.2), hsl(${(pathway.hue + 240) % 360} 90% 60% / 0.25))`;

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
    <div style={{ "--hue": pathway.hue } as CSSProperties} className={size === "lg" ? styles.large : undefined}>
      <motion.div
        className={styles.card}
        style={{ rotateX, rotateY }}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        whileHover={{ scale: 1.04 }}
      >
        <div className={styles.frame}>
          <span className={styles.numeral}>{toRoman(pathway.number)}</span>

          <div className={styles.emblem}>
            <span className={styles.rays} aria-hidden="true" />
            <Avatar name={username} src={avatarUrl} size={92} />
          </div>

          <div className={styles.caption}>
            <span className={styles.kicker}>{kicker}</span>
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
          </div>

          <span className={styles.owner}>{username}</span>
        </div>
        <motion.span className={styles.foil} style={{ background: foil }} aria-hidden="true" />
      </motion.div>
    </div>
  );
}
