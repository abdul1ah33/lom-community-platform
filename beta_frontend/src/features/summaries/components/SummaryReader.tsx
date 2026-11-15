import { AnimatePresence, motion } from "motion/react";
import { type UIEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { Icon } from "@/components/ui/Icon";
import { firstChapter, lastChapter, roman } from "../data/volumes";
import { useSummaryText } from "../hooks/useSummaryText";
import type { SummaryPart, SummaryVolume } from "../types";
import { ChapterText } from "./ChapterText";
import { folioLayoutId } from "./PartFolio";
import { WaxSeal } from "./WaxSeal";
import styles from "./SummaryReader.module.css";
import { softBlur } from "@/lib/performance/performanceTier";

interface SummaryReaderProps {
  volume: SummaryVolume;
  part: SummaryPart;
  /** Chapter to show, or null for the part's opening (its prelude, else its first chapter). */
  chapterNumber: number | null;
  volumeSealed: boolean;
  isPartSealed: (part: SummaryPart) => boolean;
  isTitleHidden: (part: SummaryPart, chapterNumber: number) => boolean;
  onSelectPart: (part: SummaryPart) => void;
  onSelectChapter: (chapterNumber: number | null) => void;
  onReveal: (part: SummaryPart) => void;
  onClose: () => void;
}

/** Full-screen folio: chapter index on the left, the chapter's text on the right, parts switchable in place. */
export function SummaryReader({
  volume,
  part,
  chapterNumber,
  volumeSealed,
  isPartSealed,
  isTitleHidden,
  onSelectPart,
  onSelectChapter,
  onReveal,
  onClose,
}: SummaryReaderProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLOListElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const lastScroll = useRef(0);
  const [chromeHidden, setChromeHidden] = useState(false);
  // The panel grows out of the card it was opened from, and shrinks back into it.
  const [openedFrom] = useState(part.id);
  const [filter, setFilter] = useState("");
  const text = useSummaryText(part);

  const sealed = isPartSealed(part);
  const index = volume.parts.indexOf(part);
  const prevPart = volume.parts[index - 1];
  const nextPart = volume.parts[index + 1];
  const hiddenAhead = part.chapters.some((c) => isTitleHidden(part, c.number));

  // What is on the page: a chapter of this part, or null for the prelude.
  const chapter = part.chapters.find((c) => c.number === chapterNumber) ?? (part.prelude ? null : part.chapters[0]);
  const shown = chapter?.number ?? null;

  // Reading order inside the part, for the previous / next links under the text.
  const order: (number | null)[] = [...(part.prelude ? [null] : []), ...part.chapters.map((c) => c.number)];
  const position = order.indexOf(shown);
  const before = position > 0 ? order[position - 1] : undefined;
  const after = position < order.length - 1 ? order[position + 1] : undefined;

  const q = filter.trim().toLowerCase();
  const chapters = q
    ? part.chapters.filter(
        (c) => String(c.number).startsWith(q) || (!isTitleHidden(part, c.number) && c.title.toLowerCase().includes(q)),
      )
    : part.chapters;

  const titleOf = (n: number) =>
    isTitleHidden(part, n) ? "Ahead of you" : (part.chapters.find((c) => c.number === n)?.title ?? "");

  // Keyboard: Escape closes, ← / → turn the page (into the neighbouring part at either end).
  const goBack = () => (before !== undefined ? onSelectChapter(before) : prevPart && onSelectPart(prevPart));
  const goOn = () => (after !== undefined ? onSelectChapter(after) : nextPart && onSelectPart(nextPart));
  const keys = useRef({ onClose, goBack, goOn, sealed });
  keys.current = { onClose, goBack, goOn, sealed };
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      const typing = event.target instanceof HTMLInputElement;
      const { onClose, goBack, goOn, sealed } = keys.current;
      if (event.key === "Escape") {
        if (typing && (event.target as HTMLInputElement).value) return;
        onClose();
      } else if (typing || sealed) {
        return;
      } else if (event.key === "ArrowLeft") goBack();
      else if (event.key === "ArrowRight") goOn();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, []);

  // Keep the current chapter in view in the index, and start every chapter at its top.
  useEffect(() => {
    indexRef.current?.querySelector<HTMLElement>("[aria-current='true']")?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    pageRef.current?.scrollTo({ top: 0 });
    lastScroll.current = 0;
    setChromeHidden(false);
  }, [shown, part.id]);

  // On phones the chrome floats over the text, so the text needs to know how tall it is.
  useEffect(() => {
    const chrome = chromeRef.current;
    const inner = innerRef.current;
    if (!chrome || !inner) return;
    const observer = new ResizeObserver(() => inner.style.setProperty("--chrome-h", `${chrome.offsetHeight}px`));
    observer.observe(chrome);
    return () => observer.disconnect();
  }, []);

  // Reading down hides the chrome, scrolling up brings it back. Small jitters are ignored.
  const onPageScroll = (event: UIEvent<HTMLDivElement>) => {
    const y = event.currentTarget.scrollTop;
    const delta = y - lastScroll.current;
    if (y < (chromeRef.current?.offsetHeight ?? 0)) setChromeHidden(false);
    else if (delta > 8) setChromeHidden(true);
    else if (delta < -8) setChromeHidden(false);
    else return; // keep measuring from the last real move
    lastScroll.current = y;
  };

  const blocks = text.data && (chapter ? text.data.chapters[chapter.number] : text.data.prelude);

  return createPortal(
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.1 } }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        ref={panelRef}
        layoutId={folioLayoutId(openedFrom)}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={`Volume ${volume.number}, part ${part.number} summary`}
        tabIndex={-1}
        transition={{ type: "spring", stiffness: 210, damping: 30 }}
      >
        <motion.div
          ref={innerRef}
          className={styles.inner}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.25, duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
        >
          {/* Top bar and chapter list. On phones they slide away while reading down, and come back on the way up. */}
          <div ref={chromeRef} className={styles.chrome} data-hidden={chromeHidden || undefined}>
            <header className={styles.bar}>
              <button type="button" className={styles.back} onClick={onClose} aria-label="Back to the shelf">
                <Icon name="chevronLeft" size={18} />
                <span>Shelf</span>
              </button>

              <div className={styles.heading}>
                <span className={styles.eyebrow}>
                  Volume {roman(volume.number)}
                  {volumeSealed ? "" : ` · ${volume.name}`}
                </span>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.h2
                    key={part.id}
                    className={styles.title}
                    initial={{ y: 18, opacity: 0, ...softBlur(6) }}
                    animate={{ y: 0, opacity: 1, ...softBlur(0) }}
                    exit={{ y: -18, opacity: 0, ...softBlur(6) }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Part {roman(part.number)}
                    <span>
                      Ch. {firstChapter(part)}–{lastChapter(part)}
                    </span>
                  </motion.h2>
                </AnimatePresence>
              </div>

              <nav className={styles.parts} aria-label="Parts">
                {volume.parts.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`${styles.pill} ${p.id === part.id ? styles.pillActive : ""}`}
                    onClick={() => onSelectPart(p)}
                    aria-current={p.id === part.id}
                    title={isPartSealed(p) ? `Part ${p.number} (sealed)` : `Part ${p.number}`}
                  >
                    {p.id === part.id && (
                      <motion.span layoutId="reader-part-pill" className={styles.pillGlow} transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                    )}
                    <span className={styles.pillText}>{roman(p.number)}</span>
                    {isPartSealed(p) && <Icon name="lock" size={11} className={styles.pillLock} />}
                  </button>
                ))}
              </nav>

              <div className={styles.actions}>
                <button type="button" className={styles.action} onClick={onClose} title="Close (Esc)" aria-label="Close">
                  <Icon name="x" size={18} />
                </button>
              </div>
            </header>
            <aside className={styles.index}>
              <label className={styles.filter}>
                <Icon name="search" size={15} />
                <span className="visually-hidden">Filter chapters</span>
                <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter chapters" />
              </label>

              <ol ref={indexRef} className={styles.chapters}>
                {part.prelude && !q && (
                  <li>
                    <button
                      type="button"
                      className={`${styles.chapter} ${shown === null ? styles.current : ""}`}
                      onClick={() => onSelectChapter(null)}
                      aria-current={shown === null}
                      disabled={sealed}
                    >
                      {shown === null && <motion.span layoutId="reader-chapter" className={styles.currentGlow} />}
                      <span className={styles.chapterNum}>
                        <Icon name="sparkle" size={13} />
                      </span>
                      <span className={styles.chapterTitle}>{part.prelude.title}</span>
                    </button>
                  </li>
                )}
                {chapters.map((c, i) => {
                  const hidden = sealed || isTitleHidden(part, c.number);
                  const current = c.number === shown;
                  return (
                    <motion.li
                      key={`${part.id}-${c.number}`}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: Math.min(i, 18) * 0.018 + 0.3 }}
                    >
                      <button
                        type="button"
                        className={`${styles.chapter} ${current ? styles.current : ""} ${hidden ? styles.ahead : ""}`}
                        onClick={() => onSelectChapter(c.number)}
                        aria-current={current}
                        disabled={sealed}
                      >
                        {current && <motion.span layoutId="reader-chapter" className={styles.currentGlow} />}
                        <span className={styles.chapterNum}>{c.number}</span>
                        <span className={styles.chapterTitle}>{hidden ? "Ahead of you" : c.title}</span>
                      </button>
                    </motion.li>
                  );
                })}
                {chapters.length === 0 && <li className={styles.none}>No chapter matches “{filter}”.</li>}
              </ol>

              {hiddenAhead && !sealed && (
                <button type="button" className={styles.revealAhead} onClick={() => onReveal(part)}>
                  <Icon name="eye" size={15} /> Show titles ahead of you
                </button>
              )}
            </aside>
          </div>

          <div className={styles.viewer}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${part.id}-${sealed}`}
                className={styles.sheet}
                initial={{ rotateY: -70, opacity: 0, x: 40 }}
                animate={{ rotateY: 0, opacity: 1, x: 0 }}
                exit={{ rotateY: 50, opacity: 0, x: -40 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                {sealed ? (
                  <div className={styles.sealed}>
                    <WaxSeal size={150} />
                    <h3>This folio is sealed</h3>
                    <p>
                      Part {roman(part.number)} summarizes chapters {firstChapter(part)} to {lastChapter(part)}, past where
                      you are in the story. Break the seal only if you don't mind spoilers.
                    </p>
                    <button type="button" className={styles.breakSeal} onClick={() => onReveal(part)}>
                      Break the seal
                    </button>
                  </div>
                ) : text.isError ? (
                  <div className={styles.sealed}>
                    <ArcaneSigil size={130} />
                    <h3>The page wouldn't unfold</h3>
                    <p>Part {roman(part.number)} couldn't be loaded. Check your connection and try again.</p>
                    <button type="button" className={styles.breakSeal} onClick={() => text.refetch()}>
                      Try again
                    </button>
                  </div>
                ) : !blocks ? (
                  <div className={styles.loading}>
                    <ArcaneSigil size={140} charged />
                    <span>Unfolding {chapter ? `chapter ${chapter.number}` : part.prelude?.title}…</span>
                  </div>
                ) : (
                  <div ref={pageRef} className={styles.page} onScroll={onPageScroll}>
                    <motion.div
                      key={shown ?? "prelude"}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ChapterText
                        kicker={chapter ? `Chapter ${chapter.number}` : `Volume ${roman(volume.number)} · Prelude`}
                        title={chapter ? chapter.title : (part.prelude?.title ?? "")}
                        blocks={blocks}
                      >
                        <nav className={styles.turns} aria-label="Chapters">
                          {before !== undefined ? (
                            <button type="button" onClick={() => onSelectChapter(before)}>
                              <span className={styles.turnLabel}>
                                <Icon name="chevronLeft" size={14} /> {before === null ? "Prelude" : `Chapter ${before}`}
                              </span>
                              <span className={styles.turnTitle}>{before === null ? part.prelude?.title : titleOf(before)}</span>
                            </button>
                          ) : prevPart ? (
                            <button type="button" onClick={() => onSelectPart(prevPart)}>
                              <span className={styles.turnLabel}>
                                <Icon name="chevronLeft" size={14} /> Previous part
                              </span>
                              <span className={styles.turnTitle}>Part {roman(prevPart.number)}</span>
                            </button>
                          ) : (
                            <span />
                          )}
                          {after != null ? (
                            <button type="button" className={styles.turnNext} onClick={() => onSelectChapter(after)}>
                              <span className={styles.turnLabel}>
                                Chapter {after} <Icon name="chevronRight" size={14} />
                              </span>
                              <span className={styles.turnTitle}>{titleOf(after)}</span>
                            </button>
                          ) : nextPart ? (
                            <button type="button" className={styles.turnNext} onClick={() => onSelectPart(nextPart)}>
                              <span className={styles.turnLabel}>
                                Next part <Icon name="chevronRight" size={14} />
                              </span>
                              <span className={styles.turnTitle}>
                                Part {roman(nextPart.number)} · Ch. {firstChapter(nextPart)}–{lastChapter(nextPart)}
                              </span>
                            </button>
                          ) : (
                            <p className={styles.endNote}>
                              {volume.ongoing ? "The quill is still moving. More chapters are on the way." : "The end of the volume."}
                            </p>
                          )}
                        </nav>
                      </ChapterText>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
