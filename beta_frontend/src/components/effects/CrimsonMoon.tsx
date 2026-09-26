import styles from "./CrimsonMoon.module.css";

interface CrimsonMoonProps {
  size?: number;
  className?: string;
}

/** A glowing blood-red moon with a slow breathing halo. */
export function CrimsonMoon({ size = 180, className }: CrimsonMoonProps) {
  return (
    <div
      className={`${styles.moon} ${className ?? ""}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className={styles.halo} />
      <span className={styles.body} />
    </div>
  );
}
