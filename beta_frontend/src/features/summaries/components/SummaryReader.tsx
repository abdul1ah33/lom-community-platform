import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { Icon } from "@/components/ui/Icon";
import { firstChapter, lastChapter, roman } from "../data/volumes";
import type { SummaryPart, SummaryVolume } from "../types";
import { folioLayoutId } from "./PartFolio";
import { WaxSeal } from "./WaxSeal";
import styles from "./SummaryReader.module.css";

interface SummaryReaderProps {
  volume: SummaryVolume;
  part: SummaryPart;
  /** Chapter to jump to, or null for the start of the PDF. */
  chapterNumber: number | null;
  volumeSealed: boolean;
  isPartSealed: (part: SummaryPart) => boolean;
  isTitleHidden: (part: SummaryPart, chapterNumber: number) => boolean;
  onSelectPart: (part: SummaryPart) => void;
  onSelectChapter: (chapterNumber: number | null) => void;
  onReveal: (part: SummaryPart) => void;
  onClose: () => void;
}

/**
 * Phones and some browsers (Android Chrome, Firefox with PDFs disabled) can't render a PDF
 * inside a page. There we keep the chapter index but open the PDF itself in a new tab.
 */
const canEmbedPdf = () =>
  navigator.pdfViewerEnabled !== false && !window.matchMedia("(pointer: coarse) and (max-width: 820px)").matches;

const pdfUrl = (part: SummaryPart, page: number) => `${part.file}#page=${page}&view=FitH&navpanes=0`;

/** Full-screen folio: chapter index on the left, the PDF on the right, parts switchable in place. */
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
  // The panel grows out of the card it was opened from, and shrinks back into it.
  const [openedFrom] = useState(part.id);
  const [embed] = useState(canEmbedPdf);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const sealed = isPartSealed(part);
  const chapter = part.chapters.find((c) => c.number === chapterNumber) ?? null;
  const page = chapter?.page ?? 1;
  const src = pdfUrl(part, page);
  const index = volume.parts.indexOf(part);
  const prev = volume.parts[index - 1];
  const next = volume.parts[index + 1];
  const hiddenAhead = part.chapters.some((c) => isTitleHidden(part, c.number));

  const q = filter.trim().toLowerCase();
  const chapters = q
    ? part.chapters.filter(
        (c) => String(c.number).startsWith(q) || (!isTitleHidden(part, c.number) && c.title.toLowerCase().includes(q)),
      )
    : part.chapters;

  // Keyboard: Escape closes, ← / → turn to the neighbouring part.
  const keys = useRef({ onClose, onSelectPart, prev, next });
  keys.current = { onClose, onSelectPart, prev, next };
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      const typing = event.target instanceof HTMLInputElement;
      const { onClose, onSelectPart, prev, next } = keys.current;
      if (event.key === "Escape") {
        if (typing && (event.target as HTMLInputElement).value) return;
        onClose();
      } else if (!typing && event.key === "ArrowLeft" && prev) onSelectPart(prev);
      else if (!typing && event.key === "ArrowRight" && next) onSelectPart(next);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => setLoading(true), [src]);

  // Keep the current chapter in view in the index.
  useEffect(() => {
    indexRef.current?.querySelector<HTMLElement>("[aria-current='true']")?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [chapterNumber, part.id]);

  const selectChapter = (n: number | null) => {
    onSelectChapter(n);
    if (!embed) {
      const target = n === null ? 1 : (part.chapters.find((c) => c.number === n)?.page ?? 1);
      window.open(pdfUrl(part, target), "_blank", "noopener");
    }
  };

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
          className={styles.inner}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.25, duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
        >
          <header className={styles.bar}>
            <button type="button" className={styles.back} onClick={onClose}>
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
                  initial={{ y: 18, opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -18, opacity: 0, filter: "blur(6px)" }}
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
              {!sealed && (
                <>
                  <a className={styles.action} href={part.file} download title="Download PDF" aria-label="Download PDF">
                    <Icon name="download" size={18} />
                  </a>
                  <a className={styles.action} href={src} target="_blank" rel="noreferrer" title="Open in a new tab" aria-label="Open in a new tab">
                    <Icon name="external" size={18} />
                  </a>
                </>
              )}
              <button type="button" className={styles.action} onClick={onClose} title="Close (Esc)" aria-label="Close">
                <Icon name="x" size={18} />
              </button>
            </div>
          </header>

          <div className={styles.body}>
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
                      className={`${styles.chapter} ${chapterNumber === null ? styles.current : ""}`}
                      onClick={() => selectChapter(null)}
                      aria-current={chapterNumber === null}
                      disabled={sealed}
                    >
                      {chapterNumber === null && <motion.span layoutId="reader-chapter" className={styles.currentGlow} />}
                      <span className={styles.chapterNum}>
                        <Icon name="sparkle" size={13} />
                      </span>
                      <span className={styles.chapterTitle}>{part.prelude.title}</span>
                      <span className={styles.chapterPage}>p.{part.prelude.page}</span>
                    </button>
                  </li>
                )}
                {chapters.map((c, i) => {
                  const hidden = sealed || isTitleHidden(part, c.number);
                  const current = c.number === chapterNumber;
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
                        onClick={() => selectChapter(c.number)}
                        aria-current={current}
                        disabled={sealed}
                      >
                        {current && <motion.span layoutId="reader-chapter" className={styles.currentGlow} />}
                        <span className={styles.chapterNum}>{c.number}</span>
                        <span className={styles.chapterTitle}>{hidden ? "Ahead of you" : c.title}</span>
                        <span className={styles.chapterPage}>p.{c.page}</span>
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
                  ) : embed ? (
                    <>
                      <iframe key={src} src={src} title={`Part ${part.number} summary PDF`} className={styles.pdf} onLoad={() => setLoading(false)} />
                      <AnimatePresence>
                        {loading && (
                          <motion.div className={styles.loading} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <ArcaneSigil size={140} charged />
                            <span>
                              Unfolding {chapter ? `chapter ${chapter.number}` : `Part ${roman(part.number)}`}…
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <div className={styles.fallback}>
                      <ArcaneSigil size={130} />
                      <h3>Read it full screen</h3>
                      <p>This browser opens PDFs on their own. Tap a chapter to open the summary at that page.</p>
                      <a className={styles.breakSeal} href={src} target="_blank" rel="noreferrer">
                        <Icon name="external" size={16} /> Open Part {roman(part.number)}
                      </a>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className={styles.turns}>
                <button type="button" onClick={() => prev && onSelectPart(prev)} disabled={!prev} aria-label="Previous part">
                  <Icon name="chevronLeft" size={18} />
                </button>
                <button type="button" onClick={() => next && onSelectPart(next)} disabled={!next} aria-label="Next part">
                  <Icon name="chevronRight" size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
