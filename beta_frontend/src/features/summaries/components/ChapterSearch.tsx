import { AnimatePresence, motion } from "motion/react";
import { useId, useMemo, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { ALL_PARTS, roman } from "../data/volumes";
import type { SummaryChapter, SummaryPart } from "../types";
import styles from "./ChapterSearch.module.css";

interface ChapterSearchProps {
  isTitleHidden: (part: SummaryPart, chapterNumber: number) => boolean;
  onJump: (part: SummaryPart, chapter: SummaryChapter) => void;
}

const MAX_RESULTS = 6;

/**
 * "Which part has chapter 300?" Type a chapter number or words from a title.
 * Titles past the reader are never matched or shown, so searching can't spoil.
 */
export function ChapterSearch({ isTitleHidden, onJump }: ChapterSearchProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listId = useId();

  const q = query.trim().toLowerCase();
  const asNumber = /^\d+$/.test(q) ? Number(q) : null;

  const results = useMemo(() => {
    if (!q) return [];
    const out: { part: SummaryPart; chapter: SummaryChapter; hidden: boolean }[] = [];
    for (const { part } of ALL_PARTS) {
      for (const chapter of part.chapters) {
        const hidden = isTitleHidden(part, chapter.number);
        const hit =
          asNumber !== null
            ? String(chapter.number).startsWith(q)
            : !hidden && chapter.title.toLowerCase().includes(q);
        if (hit) out.push({ part, chapter, hidden });
      }
    }
    // An exact chapter number goes first.
    return out.sort((a, b) => Number(b.chapter.number === asNumber) - Number(a.chapter.number === asNumber)).slice(0, MAX_RESULTS);
  }, [q, asNumber, isTitleHidden]);

  const jump = (index: number) => {
    const result = results[index];
    if (!result) return;
    onJump(result.part, result.chapter);
    setQuery("");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      jump(active);
    } else if (event.key === "Escape") {
      setQuery("");
    }
  };

  return (
    <div className={styles.search}>
      <label className={styles.field}>
        <Icon name="search" size={18} />
        <span className="visually-hidden">Find a chapter</span>
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Jump to a chapter: try 300 or “Bishop”"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls={listId}
          aria-activedescendant={results.length ? `${listId}-${active}` : undefined}
          autoComplete="off"
        />
        <kbd className={styles.kbd}>↵</kbd>
      </label>

      <AnimatePresence>
        {q && (
          <motion.ul
            id={listId}
            role="listbox"
            className={styles.results}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {results.length === 0 ? (
              <li className={styles.empty}>
                {asNumber !== null
                  ? `Chapter ${asNumber} isn't summarized yet. The quill is still moving.`
                  : "No chapter titles match (titles ahead of you are never searched)."}
              </li>
            ) : (
              results.map(({ part, chapter, hidden }, index) => (
                <motion.li
                  key={`${part.id}-${chapter.number}`}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={index === active}
                  className={`${styles.result} ${index === active ? styles.active : ""}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onPointerEnter={() => setActive(index)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => jump(index)}
                >
                  <span className={styles.num}>{chapter.number}</span>
                  <span className={`${styles.title} ${hidden ? styles.hidden : ""}`}>
                    {hidden ? "Title hidden: ahead of you" : chapter.title}
                  </span>
                  <span className={styles.part}>
                    Part {roman(part.number)} · p.{chapter.page}
                  </span>
                </motion.li>
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
