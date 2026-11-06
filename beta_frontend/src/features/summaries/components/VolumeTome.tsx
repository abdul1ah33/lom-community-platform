import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useId } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { roman } from "../data/volumes";
import type { SummaryVolume } from "../types";
import styles from "./VolumeTome.module.css";

interface VolumeTomeProps {
  volume: SummaryVolume;
  sealed: boolean;
}

/**
 * The volume as a leather-bound book in 3D: cover, spine, page edges and back.
 * It turns toward the pointer anywhere on the page and floats when idle.
 */
export function VolumeTome({ volume, sealed }: VolumeTomeProps) {
  const reducedMotion = usePrefersReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 70, damping: 16, mass: 0.8 };
  const rotateY = useSpring(useTransform(px, [-1, 1], [12, 44]), spring);
  const rotateX = useSpring(useTransform(py, [-1, 1], [12, -8]), spring);

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (event: PointerEvent) => {
      px.set((event.clientX / window.innerWidth) * 2 - 1);
      py.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reducedMotion]);

  return (
    <div className={styles.stage} aria-hidden="true">
      <motion.div
        className={styles.float}
        initial={{ opacity: 0, y: 60, rotateZ: -8, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, rotateZ: 0, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div className={styles.book} style={{ rotateY, rotateX }}>
          <div className={styles.back} />
          <div className={styles.spine}>
            <span className={styles.spineBand} />
            <span className={styles.spineTitle}>{sealed ? "· · ·" : volume.name}</span>
            <span className={styles.spineNumber}>{roman(volume.number)}</span>
            <span className={styles.spineBand} />
          </div>
          <div className={styles.pagesSide} />
          <div className={styles.pagesTop} />
          <div className={styles.pagesBottom} />

          <div className={styles.cover}>
            <span className={styles.frame} />
            <span className={styles.corner} data-pos="tl" />
            <span className={styles.corner} data-pos="tr" />
            <span className={styles.corner} data-pos="bl" />
            <span className={styles.corner} data-pos="br" />
            <span className={styles.coverSheen} />

            <span className={styles.coverLabel}>Volume {roman(volume.number)}</span>
            <FacelessMask />
            <span className={`${styles.coverTitle} ${sealed ? styles.fogged : ""}`}>
              {sealed ? "Sealed" : volume.name}
            </span>
            <span className={styles.coverAuthors}>{volume.authors.join(" & ")}</span>
          </div>
        </motion.div>
      </motion.div>
      <div className={styles.shadow} />
    </div>
  );
}

/** A smooth, featureless mask with hollow hints of eyes, cracked across one cheek. */
function FacelessMask() {
  const id = useId().replace(/:/g, "");

  return (
    <svg viewBox="0 0 120 150" className={styles.mask}>
      <defs>
        <radialGradient id={`face-${id}`} cx="42%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#f6ead0" />
          <stop offset="55%" stopColor="#cdb58a" />
          <stop offset="100%" stopColor="#6b5428" />
        </radialGradient>
        <radialGradient id={`halo-${id}`}>
          <stop offset="0%" stopColor="#f0445c" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f0445c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="75" r="62" fill={`url(#halo-${id})`} className={styles.halo} />
      <path
        d="M60 12c26 0 40 22 40 52 0 34-18 72-40 72S20 98 20 64c0-30 14-52 40-52Z"
        fill={`url(#face-${id})`}
        stroke="#e2c07e"
        strokeWidth="1.2"
      />
      {/* Where features would be: only faint hollows remain. */}
      <ellipse cx="45" cy="64" rx="9" ry="4" fill="#3b2c12" opacity="0.28" />
      <ellipse cx="75" cy="64" rx="9" ry="4" fill="#3b2c12" opacity="0.28" />
      <path d="M52 104q8 3 16 0" stroke="#3b2c12" strokeOpacity="0.2" strokeWidth="1.4" fill="none" />
      <path
        d="M84 40l-7 14 6 6-9 12 4 9"
        stroke="#7c0d20"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.crack}
      />
    </svg>
  );
}
