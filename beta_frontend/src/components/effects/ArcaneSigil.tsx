import { useId } from "react";
import styles from "./ArcaneSigil.module.css";

const RUNE_TEXT =
  "FOOL · DOOR · ERROR · VISIONARY · SUN · TYRANT · WHITE TOWER · HANGED MAN · DARKNESS · DEATH · TWILIGHT GIANT · DEMONESS · RED PRIEST · HERMIT · PARAGON · WHEEL OF FORTUNE · MOTHER · MOON · ABYSS · CHAINED · BLACK EMPEROR · JUSTICIAR · ";

interface ArcaneSigilProps {
  size?: number | string;
  className?: string;
  /** Speeds the rotation up, e.g. while a form is submitting. */
  charged?: boolean;
}

/**
 * A slowly turning ritual circle: the 22 pathways inscribed on the outer ring,
 * a counter-rotating dial of sequence ticks, and a seven-pointed star at its core.
 */
export function ArcaneSigil({ size = 520, className, charged = false }: ArcaneSigilProps) {
  const id = useId().replace(/:/g, "");
  const textPath = `sigil-text-${id}`;
  const glow = `sigil-glow-${id}`;
  const core = `sigil-core-${id}`;

  const ticks = Array.from({ length: 72 }, (_, i) => i);
  const starPoints = Array.from({ length: 7 }, (_, i) => {
    const angle = (i * 3 * 2 * Math.PI) / 7 - Math.PI / 2;
    return `${200 + Math.cos(angle) * 108},${200 + Math.sin(angle) * 108}`;
  }).join(" ");

  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={`${styles.sigil} ${charged ? styles.charged : ""} ${className ?? ""}`}
      aria-hidden="true"
    >
      <defs>
        <path id={textPath} d="M200,200 m-178,0 a178,178 0 1,1 356,0 a178,178 0 1,1 -356,0" />
        <filter id={glow} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id={core}>
          <stop offset="0%" stopColor="#ff7b8c" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#d11f3c" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7c0d20" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g filter={`url(#${glow})`}>
        <g className={styles.ringOuter}>
          <circle cx="200" cy="200" r="194" className={styles.line} />
          <circle cx="200" cy="200" r="164" className={styles.line} />
          <text className={styles.runes}>
            <textPath href={`#${textPath}`} textLength="1110">
              {RUNE_TEXT}
            </textPath>
          </text>
        </g>

        <g className={styles.ringTicks}>
          {ticks.map((i) => (
            <line
              key={i}
              x1="200"
              y1={i % 6 === 0 ? 44 : 50}
              x2="200"
              y2="58"
              transform={`rotate(${i * 5} 200 200)`}
              className={i % 6 === 0 ? styles.tickMajor : styles.tick}
            />
          ))}
          <circle cx="200" cy="200" r="138" className={styles.lineDashed} />
        </g>

        <g className={styles.star}>
          <polygon points={starPoints} className={styles.starLine} />
          <circle cx="200" cy="200" r="108" className={styles.line} />
          <circle cx="200" cy="200" r="64" className={styles.lineFaint} />
        </g>
      </g>

      <circle cx="200" cy="200" r="54" fill={`url(#${core})`} className={styles.core} />
      <circle cx="200" cy="200" r="16" className={styles.eye} />
    </svg>
  );
}
