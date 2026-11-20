import { motion, useTransform } from "motion/react";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import styles from "./FogPortrait.module.css";

const RUNES = "ABOVE THE GRAY FOG · EVERY POTION A STEP · EVERY STEP A PRICE · THE SEQUENCES AWAIT · ";

/**
 * The hero visual: a figure at a window above the fog, framed like a cathedral arch.
 * The picture drifts slowly, two fog banks roll across it, a crimson moon glows behind,
 * and a ring of runes turns around the frame. It leans gently toward the pointer.
 */
export function FogPortrait() {
  const { x, y } = usePointerParallax();
  const rotateY = useTransform(x, (v) => v * 8);
  const rotateX = useTransform(y, (v) => v * -6);
  const imageX = useTransform(x, (v) => v * -10);
  const imageY = useTransform(y, (v) => v * -8);

  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.moon} />

      <svg viewBox="0 0 400 400" className={styles.runes}>
        <defs>
          <path id="fog-portrait-ring" d="M200,200 m-185,0 a185,185 0 1,1 370,0 a185,185 0 1,1 -370,0" />
        </defs>
        <circle cx="200" cy="200" r="196" className={styles.ringLine} />
        <circle cx="200" cy="200" r="172" className={styles.ringLine} />
        <text className={styles.runeText}>
          <textPath href="#fog-portrait-ring" textLength="1150">
            {RUNES}
            {RUNES}
          </textPath>
        </text>
      </svg>

      <motion.div
        className={styles.frame}
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, y: 50, clipPath: "inset(100% 0% 0% 0% round 999px 999px 18px 18px)" }}
        animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 999px 999px 18px 18px)" }}
        transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src="/ascension/above-the-fog.jpg"
          alt=""
          className={styles.image}
          style={{ x: imageX, y: imageY }}
          draggable={false}
        />
        <span className={styles.tint} />
        <span className={`${styles.fog} ${styles.fogA}`} />
        <span className={`${styles.fog} ${styles.fogB}`} />
        <span className={styles.glint} />
        <span className={styles.border} />
      </motion.div>

      <div className={styles.mist} />
      <div className={styles.motes}>
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} style={{ "--m": i } as React.CSSProperties} />
        ))}
      </div>
    </div>
  );
}
