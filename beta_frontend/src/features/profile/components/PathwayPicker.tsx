import { motion } from "motion/react";
import { useRef, type CSSProperties, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { PATHWAYS, toRoman, type PathwaySlug } from "@/data/lore/pathways";
import { usePathwaySpoilers } from "../hooks/useSpoilerProgress";
import styles from "./PathwayPicker.module.css";

interface PathwayPickerProps {
  value: PathwaySlug | null;
  onChange: (value: PathwaySlug | null) => void;
  labelledBy: string;
  /** Chapter to judge spoilers against (the draft value on the edit page). */
  readerChapter: number;
}

/**
 * Radio group of the 22 pathways as mini tarot cards. Arrow keys move the
 * selection; clicking the chosen card again clears it. Pathways past the reader's
 * chapter show as sealed; the first click reveals, the next one selects.
 */
export function PathwayPicker({ value, onChange, labelledBy, readerChapter }: PathwayPickerProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  const spoilers = usePathwaySpoilers();
  // Your current choice always stays visible, even if you lower your chapter.
  const isSealed = (slug: PathwaySlug) =>
    slug !== value && spoilers.isSealed(PATHWAYS.find((p) => p.slug === slug)!, readerChapter);
  const open = PATHWAYS.filter((p) => !isSealed(p.slug));
  const selectedIndex = open.findIndex((p) => p.slug === value);

  const onKeyDown = (event: KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step || open.length === 0) return;
    event.preventDefault();
    // Arrow keys move between revealed pathways only.
    const next = open[(Math.max(selectedIndex, 0) + step + open.length) % open.length];
    onChange(next.slug);
    groupRef.current?.querySelector<HTMLButtonElement>(`[data-slug="${next.slug}"]`)?.focus();
  };

  return (
    <div ref={groupRef} className={styles.grid} role="radiogroup" aria-labelledby={labelledBy} onKeyDown={onKeyDown}>
      {PATHWAYS.map((pathway) => {
        if (isSealed(pathway.slug)) {
          return (
            <button
              key={pathway.slug}
              type="button"
              className={`${styles.option} ${styles.sealed}`}
              onClick={() => spoilers.reveal(pathway)}
              aria-label={`Sealed pathway, revealed at chapter ${pathway.revealChapter}. Click to reveal.`}
            >
              <span className={styles.numeral}>{toRoman(pathway.number)}</span>
              <span className={styles.lock}>
                <Icon name="lock" size={14} /> Ch. {pathway.revealChapter}
              </span>
            </button>
          );
        }

        const selected = pathway.slug === value;
        const tabbable = selected || (selectedIndex === -1 && pathway.slug === open[0]?.slug);
        return (
          <button
            key={pathway.slug}
            type="button"
            role="radio"
            data-slug={pathway.slug}
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
