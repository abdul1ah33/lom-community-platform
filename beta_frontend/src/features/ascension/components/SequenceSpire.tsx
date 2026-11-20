import { motion, useTransform } from "motion/react";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import styles from "./SequenceSpire.module.css";

const LEVELS = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

/**
 * The hero visual: ten rings of light stacked into a spire, Sequence 9 at the base and
 * a blazing crown at Sequence 0. Each ring spins on its own; sparks drift upwards.
 * Everything moves with CSS transforms only, so it stays on the GPU.
 */
export function SequenceSpire() {
  const { x, y } = usePointerParallax();
  const rotateY = useTransform(x, (v) => v * 14);
  const rotateX = useTransform(y, (v) => 62 - v * 6);

  return (
    <div className={styles.stage} aria-hidden="true">
      <motion.div className={styles.spire} style={{ rotateX, rotateY }}>
        {LEVELS.map((n, i) => (
          <div
            key={n}
            className={styles.level}
            style={
              {
                "--i": i,
                "--size": `${300 - i * 22}px`,
                "--lift": `${i * 34}px`,
                "--speed": `${18 - i * 1.1}s`,
                "--dir": i % 2 ? "reverse" : "normal",
              } as React.CSSProperties
            }
          >
            <span className={styles.ring}>
              {Array.from({ length: 6 }, (_, t) => (
                <i key={t} style={{ "--t": t } as React.CSSProperties} />
              ))}
            </span>
            <span className={styles.numeral}>{n}</span>
          </div>
        ))}
        <div className={styles.crown} />
      </motion.div>

      <div className={styles.beam} />
      <div className={styles.sparks}>
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} style={{ "--s": i } as React.CSSProperties} />
        ))}
      </div>
    </div>
  );
}
