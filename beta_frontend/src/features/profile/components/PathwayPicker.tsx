import { motion } from "motion/react";
import { useRef, type CSSProperties, type KeyboardEvent } from "react";
import { PATHWAYS, toRoman, type PathwaySlug } from "@/data/lore/pathways";
import styles from "./PathwayPicker.module.css";

interface PathwayPickerProps {
  value: PathwaySlug | null;
  onChange: (value: PathwaySlug | null) => void;
  labelledBy: string;
}

/**
 * Radio group of the 22 pathways as mini tarot cards. Arrow keys move the
 * selection; clicking the chosen card again clears it.
 */
export function PathwayPicker({ value, onChange, labelledBy }: PathwayPickerProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  const selectedIndex = PATHWAYS.findIndex((p) => p.slug === value);

  const onKeyDown = (event: KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (Math.max(selectedIndex, 0) + step + PATHWAYS.length) % PATHWAYS.length;
    onChange(PATHWAYS[next].slug);
    groupRef.current?.querySelectorAll<HTMLButtonElement>("[role=radio]")[next]?.focus();
  };

  return (
    <div ref={groupRef} className={styles.grid} role="radiogroup" aria-labelledby={labelledBy} onKeyDown={onKeyDown}>
      {PATHWAYS.map((pathway, index) => {
        const selected = pathway.slug === value;
        const tabbable = selected || (selectedIndex === -1 && index === 0);
        return (
          <button
            key={pathway.slug}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={tabbable ? 0 : -1}
            className={`${styles.option} ${selected ? styles.selected : ""}`}
            style={{ "--hue": pathway.hue } as CSSProperties}
            onClick={() => onChange(selected ? null : pathway.slug)}
          >
            {selected && (
              <motion.span
                layoutId="pathway-picker-glow"
                className={styles.glow}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span className={styles.numeral}>{toRoman(pathway.number)}</span>
            <span className={styles.name}>{pathway.name}</span>
          </button>
        );
      })}
    </div>
  );
}
