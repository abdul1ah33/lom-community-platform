import { motion } from "motion/react";
import { ArcaneSigil } from "./ArcaneSigil";
import styles from "./VeilTransition.module.css";

interface VeilTransitionProps {
  /**
   * "cover": the veil bursts out from the centre until it fills the screen.
   * "reveal": starts covering the screen and dissolves to show the page.
   * The login page covers, the home page reveals, so the two read as one motion.
   */
  mode: "cover" | "reveal";
  onComplete?: () => void;
}

const FULL = "circle(150% at 50% 50%)";
const NONE = "circle(0% at 50% 50%)";

export function VeilTransition({ mode, onComplete }: VeilTransitionProps) {
  const covering = mode === "cover";

  return (
    <motion.div
      className={styles.veil}
      initial={{ clipPath: covering ? NONE : FULL, opacity: 1 }}
      animate={covering ? { clipPath: FULL } : { opacity: 0 }}
      transition={
        covering
          ? { duration: 1.1, ease: [0.76, 0, 0.24, 1] }
          : { duration: 0.9, delay: 0.35, ease: "easeOut" }
      }
      onAnimationComplete={onComplete}
      aria-hidden="true"
    >
      <motion.div
        className={styles.sigil}
        initial={covering ? { scale: 0.4, rotate: -90, opacity: 0 } : { scale: 1, opacity: 1 }}
        animate={covering ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 2.4, opacity: 0 }}
        transition={{ duration: covering ? 1.1 : 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <ArcaneSigil size="min(70vmin, 520px)" charged />
      </motion.div>
    </motion.div>
  );
}
