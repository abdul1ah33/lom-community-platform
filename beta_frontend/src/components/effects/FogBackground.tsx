import styles from "./FogBackground.module.css";

interface FogBackgroundProps {
  /** "intense" for full-bleed hero screens, "calm" behind content-heavy pages. */
  variant?: "intense" | "calm";
}

/** Drifting layers of gray fog with film grain and a vignette. Pure CSS, GPU-friendly. */
export function FogBackground({ variant = "intense" }: FogBackgroundProps) {
  return (
    <div className={`${styles.root} ${styles[variant]}`} aria-hidden="true">
      <div className={`${styles.blob} ${styles.crimson}`} />
      <div className={`${styles.blob} ${styles.violet}`} />
      <div className={`${styles.blob} ${styles.brass}`} />
      <div className={`${styles.fogBand} ${styles.bandA}`} />
      <div className={`${styles.fogBand} ${styles.bandB}`} />
      <div className={styles.grain} />
      <div className={styles.vignette} />
    </div>
  );
}
