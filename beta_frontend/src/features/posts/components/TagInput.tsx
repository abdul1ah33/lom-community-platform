import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { PATHWAYS } from "@/data/lore/pathways";
import { usePathwaySpoilers } from "@/features/profile";
import { POST_LIMITS } from "../types";
import styles from "./TagInput.module.css";

const GENERAL_TAGS = ["Theory", "Discussion", "Fan Art", "Re-read", "Donghua", "Tarot Club"];

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

/** Chips input: Enter or comma adds a tag, Backspace on an empty field removes the last one. */
export function TagInput({ value, onChange }: TagInputProps) {
  const id = useId();
  const spoilers = usePathwaySpoilers();
  // Only suggest pathway names the writer has already reached.
  const suggestions = [...GENERAL_TAGS, ...PATHWAYS.filter((p) => !spoilers.isSealed(p)).map((p) => p.name)];
  const [draft, setDraft] = useState("");
  const full = value.length >= POST_LIMITS.tags;

  const add = (raw: string) => {
    const tag = raw.trim().replace(/^#/, "").slice(0, POST_LIMITS.tagLength);
    if (!tag || full || value.some((t) => t.toLowerCase() === tag.toLowerCase())) return setDraft("");
    onChange([...value, tag]);
    setDraft("");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      add(draft);
    } else if (event.key === "Backspace" && !draft && value.length) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        Tags <span>{value.length}/{POST_LIMITS.tags}</span>
      </label>
      <div className={styles.box}>
        <AnimatePresence initial={false}>
          {value.map((tag) => (
            <motion.span
              key={tag}
              layout
              className={styles.chip}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
            >
              #{tag}
              <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))} aria-label={`Remove tag ${tag}`}>
                <Icon name="x" size={12} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
        <input
          id={id}
          className={styles.input}
          value={draft}
          list={`${id}-suggestions`}
          placeholder={full ? "Tag limit reached" : value.length ? "Add another…" : "Theory, Backlund, Sun…"}
          disabled={full}
          maxLength={POST_LIMITS.tagLength}
          onChange={(event) => {
            // Picking a datalist suggestion fills the field in one go: add it straight away.
            const next = event.target.value;
            if (suggestions.includes(next)) add(next);
            else setDraft(next);
          }}
          onKeyDown={onKeyDown}
          onBlur={() => draft && add(draft)}
        />
        <datalist id={`${id}-suggestions`}>
          {suggestions.filter((s) => !value.includes(s)).map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
      </div>
    </div>
  );
}
