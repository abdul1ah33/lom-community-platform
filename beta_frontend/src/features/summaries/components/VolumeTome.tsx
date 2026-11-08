import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, type CSSProperties } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { SummaryVolume } from "../types";
import { WaxSeal } from "./WaxSeal";
import styles from "./VolumeTome.module.css";

interface VolumeTomeProps {
  volume: SummaryVolume;
  /** Fogs the cover art until the reader reaches this volume. */
  sealed: boolean;
}

/**
 * The volume as a hardcover book in 3D, wrapped in its real cover art: boards with
 * thickness, a foil-stamped spine and a page block. It turns toward the pointer
 * anywhere on the page, floats when idle, and the light on the cover moves with it.
 */
export function VolumeTome({ volume, sealed }: VolumeTomeProps) {
  const reducedMotion = usePrefersReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 70, damping: 16, mass: 0.8 };
  // Always turned enough to show the spine, never so far the cover stops being readable.
  const rotateY = useSpring(useTransform(px, [-1, 1], [23, 40]), spring);
  const rotateX = useSpring(useTransform(py, [-1, 1], [9, -7]), spring);
  const glareX = useSpring(useTransform(px, [-1, 1], ["-34%", "34%"]), spring);

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      px.set((event.clientX / window.innerWidth) * 2 - 1);
      py.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reducedMotion]);

  return (
    <div className={styles.stage} style={{ "--board": volume.coverColor } as CSSProperties} aria-hidden="true">
      <div className={styles.aura} />
      <motion.div
        className={styles.float}
        initial={{ opacity: 0, y: 60, rotateZ: -8, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, rotateZ: 0, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div className={styles.book} style={{ rotateY, rotateX }}>
          <div className={styles.backBoard} />
          <div className={styles.pagesSide} />
          <div className={styles.pagesTop} />
          <div className={styles.pagesBottom} />
          <div className={styles.spine}>
            <SpineEye />
            <span className={styles.spineTitle}>Lord of Mysteries</span>
            <SpineStar number={volume.number} />
          </div>

          {/* Stacked sheets just behind the cover give the board its thickness. */}
          <div className={styles.boardLayer} data-layer="3" />
          <div className={styles.boardLayer} data-layer="2" />
          <div className={styles.boardLayer} data-layer="1" />

          <div className={`${styles.cover} ${sealed ? styles.fogged : ""}`}>
            <img className={styles.art} src={volume.cover} alt="" draggable={false} decoding="async" />
            <span className={styles.hinge} />
            <span className={styles.lighting} />
            <span className={styles.sheen} />
            <motion.span className={styles.glare} style={{ x: glareX }} />
            <AnimatePresence>
              {sealed && (
                <motion.div key="seal" className={styles.seal} exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.4 } }}>
                  <WaxSeal size={168} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
      <div className={styles.shadow} />
    </div>
  );
}

/** The gold hanging eyes from the top of the cover art, in foil. */
function SpineEye() {
  return (
    <svg viewBox="0 0 24 40" className={styles.spineEye}>
      <path d="M12 1c7 9 8 21 0 38C4 22 5 10 12 1Z" fill="currentColor" />
      <circle cx="12" cy="17" r="5" fill="var(--board)" />
      <circle cx="12" cy="17" r="2" fill="currentColor" />
    </svg>
  );
}

/** The compass star that carries the volume number on the cover. */
function SpineStar({ number }: { number: number }) {
  return (
    <svg viewBox="0 0 40 40" className={styles.spineStar}>
      <path
        d="M20 1l3.2 12 7.5-6.5L27 16l12 4-12 4 3.7 9.5L23.2 27 20 39l-3.2-12-7.5 6.5L13 24 1 20l12-4-3.7-9.5L16.8 13z"
        fill="currentColor"
      />
      <circle cx="20" cy="20" r="8.5" fill="var(--board)" stroke="currentColor" strokeWidth="1" />
      <text x="20" y="24.5" textAnchor="middle" className={styles.spineNumber}>
        {number}
      </text>
    </svg>
  );
}
