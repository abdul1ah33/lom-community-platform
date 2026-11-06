import { motion } from "motion/react";
import { useId } from "react";
import styles from "./WaxSeal.module.css";

const LEFT = "polygon(0 0, 53% 0, 46% 22%, 56% 41%, 45% 60%, 54% 80%, 49% 100%, 0 100%)";
const RIGHT = "polygon(53% 0, 100% 0, 100% 100%, 49% 100%, 54% 80%, 45% 60%, 56% 41%, 46% 22%)";

/**
 * A crimson wax seal pressed with a seven-pointed star. It is drawn as two
 * halves along a jagged crack, so when it leaves (inside AnimatePresence) it
 * splits and the halves fall away.
 */
export function WaxSeal({ size = 96 }: { size?: number }) {
  return (
    <motion.div
      className={styles.seal}
      style={{ width: size, height: size }}
      initial="pressed"
      animate="pressed"
      exit="broken"
      aria-hidden="true"
    >
      <motion.div
        className={styles.half}
        style={{ clipPath: LEFT }}
        variants={{
          pressed: { x: 0, y: 0, rotate: 0, opacity: 1 },
          broken: { x: -70, y: 50, rotate: -40, opacity: 0, transition: { duration: 0.8, ease: [0.5, 0, 0.75, 0] } },
        }}
      >
        <SealArt />
      </motion.div>
      <motion.div
        className={styles.half}
        style={{ clipPath: RIGHT }}
        variants={{
          pressed: { x: 0, y: 0, rotate: 0, opacity: 1 },
          broken: { x: 70, y: 60, rotate: 35, opacity: 0, transition: { duration: 0.8, ease: [0.5, 0, 0.75, 0] } },
        }}
      >
        <SealArt />
      </motion.div>
      <motion.span
        className={styles.flash}
        variants={{
          pressed: { opacity: 0, scale: 0.4 },
          broken: { opacity: [0, 1, 0], scale: [0.4, 1.6, 2.2], transition: { duration: 0.6 } },
        }}
      />
    </motion.div>
  );
}

function SealArt() {
  const id = useId().replace(/:/g, "");
  const star = Array.from({ length: 7 }, (_, i) => {
    const angle = (i * 3 * 2 * Math.PI) / 7 - Math.PI / 2;
    return `${50 + Math.cos(angle) * 22},${50 + Math.sin(angle) * 22}`;
  }).join(" ");

  // A blobby outline so it reads as poured wax rather than a perfect circle.
  const blob = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const r = 46 + Math.sin(i * 2.7) * 2.2 + Math.cos(i * 1.3) * 1.4;
    return `${50 + Math.cos(angle) * r},${50 + Math.sin(angle) * r}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 100 100" className={styles.art}>
      <defs>
        <radialGradient id={`wax-${id}`} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#ff6b7f" />
          <stop offset="45%" stopColor="#c2142f" />
          <stop offset="100%" stopColor="#5a0716" />
        </radialGradient>
      </defs>
      <polygon points={blob} fill={`url(#wax-${id})`} />
      <circle cx="50" cy="50" r="33" fill="none" stroke="#3d0410" strokeOpacity="0.55" strokeWidth="3" />
      <circle cx="50" cy="50" r="33" fill="none" stroke="#ff8a9a" strokeOpacity="0.35" strokeWidth="1" transform="translate(-0.8 -0.8)" />
      <polygon points={star} fill="none" stroke="#3d0410" strokeOpacity="0.7" strokeWidth="2.2" strokeLinejoin="round" />
      <polygon
        points={star}
        fill="none"
        stroke="#ffb0bb"
        strokeOpacity="0.45"
        strokeWidth="0.9"
        strokeLinejoin="round"
        transform="translate(-0.7 -0.7)"
      />
      <circle cx="50" cy="50" r="4" fill="#3d0410" fillOpacity="0.6" />
      <ellipse cx="36" cy="28" rx="10" ry="5" fill="#fff" fillOpacity="0.18" transform="rotate(-30 36 28)" />
    </svg>
  );
}
