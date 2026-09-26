import type { CSSProperties } from "react";
import { TOTAL_CHAPTERS } from "@/data/lore/reading";
import styles from "./ChapterInput.module.css";

interface ChapterInputProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

const clamp = (n: number) => Math.min(Math.max(Math.round(n) || 0, 0), TOTAL_CHAPTERS);

/** Slider for quick scrubbing plus an exact number box, kept in sync. */
export function ChapterInput({ id, value, onChange, error }: ChapterInputProps) {
  const percent = (value / TOTAL_CHAPTERS) * 100;

  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <input
          id={id}
          type="range"
          min={0}
          max={TOTAL_CHAPTERS}
          value={value}
          onChange={(event) => onChange(clamp(Number(event.target.value)))}
          className={styles.slider}
          style={{ "--fill": `${percent}%` } as CSSProperties}
          aria-valuetext={value ? `Chapter ${value}` : "Not started"}
        />
        <label className={styles.number}>
          <span className="visually-hidden">Exact chapter</span>
          <span aria-hidden="true">Ch.</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={TOTAL_CHAPTERS}
            value={value}
            onChange={(event) => onChange(clamp(Number(event.target.value)))}
            aria-invalid={!!error}
          />
        </label>
      </div>
      <div className={styles.scale} aria-hidden="true">
        <span>Not started</span>
        <span>Chapter {TOTAL_CHAPTERS}</span>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
