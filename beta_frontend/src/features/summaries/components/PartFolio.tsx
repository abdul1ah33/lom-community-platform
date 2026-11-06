import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { firstChapter, formatMonth, lastChapter, readingMinutes, roman } from "../data/volumes";
import type { SummaryPart } from "../types";
import { WaxSeal } from "./WaxSeal";
import styles from "./PartFolio.module.css";

interface PartFolioProps {
  part: SummaryPart;
  chapter: number;
  sealed: boolean;
  titleHidden: (chapterNumber: number) => boolean;
  highlighted: boolean;
  onHighlight: (id: string | null) => void;
  onOpen: () => void;
  onReveal: () => void;
}

export const folioLayoutId = (partId: string) => `folio-${partId}`;

/**
 * One summary part as a folio of loose pages. Hovering fans the pages out behind
 * it; a part past the reader's chapter is held shut by a wax seal that breaks on request.
 */
export function PartFolio({
  part,
  chapter,
  sealed,
  titleHidden,
  highlighted,
  onHighlight,
  onOpen,
  onReveal,
}: PartFolioProps) {
  const reducedMotion = usePrefersReducedMotion();
  const first = part.chapters[0];
  const last = part.chapters[part.chapters.length - 1];
  const read = part.chapters.filter((c) => c.number <= chapter).length;
  const progress = read / part.chapters.length;

  // Lean toward the cursor, with a brass glare under it.
  const rx = useSpring(0, { stiffness: 160, damping: 18 });
  const ry = useSpring(0, { stiffness: 160, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgb(226 192 126 / 0.16), transparent 45%)`;

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    gx.set(x * 100);
    gy.set(y * 100);
    rx.set((0.5 - y) * 10);
    ry.set((x - 0.5) * 12);
  };

  const onPointerLeave = () => {
    rx.set(0);
    ry.set(0);
    onHighlight(null);
  };

  return (
    <motion.article
      className={`${styles.folio} ${highlighted ? styles.lit : ""} ${sealed ? styles.isSealed : ""}`}
      variants={{
        hidden: { opacity: 0, y: 60, rotateX: 24 },
        visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
      }}
      onPointerEnter={() => onHighlight(part.id)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className={styles.sheets} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <motion.div className={styles.tilt} style={{ rotateX: rx, rotateY: ry }}>
        <motion.div layoutId={folioLayoutId(part.id)} className={styles.card}>
          <motion.span className={styles.glare} style={{ background: glare }} aria-hidden="true" />
          <span className={styles.orbit} aria-hidden="true" />

          <motion.div
            className={styles.content}
            animate={{ filter: sealed ? "blur(7px) saturate(0.4)" : "blur(0px) saturate(1)", opacity: sealed ? 0.55 : 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden={sealed}
          >
            <header className={styles.head}>
              <div>
                <span className={styles.label}>Part</span>
                <span className={styles.numeral}>{roman(part.number)}</span>
              </div>
              <span className={styles.date}>
                <Icon name="quill" size={14} /> {formatMonth(part.writtenAt)}
              </span>
            </header>

            <p className={styles.range}>
              Chapters <strong>{firstChapter(part)}</strong>
              <span className={styles.dash} />
              <strong>{lastChapter(part)}</strong>
            </p>

            <p className={styles.arc}>
              From <q>{first.title}</q> to{" "}
              <q className={titleHidden(last.number) ? styles.hiddenTitle : undefined}>
                {titleHidden(last.number) ? "a chapter ahead of you" : last.title}
              </q>
            </p>

            <dl className={styles.meta}>
              <div>
                <dt>Pages</dt>
                <dd>{part.pages}</dd>
              </div>
              <div>
                <dt>Chapters</dt>
                <dd>{part.chapters.length}</dd>
              </div>
              <div>
                <dt>Read time</dt>
                <dd>~{readingMinutes(part.words)}m</dd>
              </div>
            </dl>

            <div className={styles.progress}>
              <div className={styles.bar}>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: progress }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <span>
                {read === part.chapters.length
                  ? "You've read every chapter here"
                  : read === 0
                    ? "Ahead of your reading"
                    : `${read} of ${part.chapters.length} chapters read`}
              </span>
            </div>

            <span className={styles.cta}>
              Open folio <Icon name="arrowRight" size={16} />
            </span>
          </motion.div>

          {!sealed && <button type="button" className={styles.hit} onClick={onOpen} aria-label={`Open part ${part.number}`} />}

          <AnimatePresence>
            {sealed && (
              <motion.div
                key="seal"
                className={styles.sealLayer}
                exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.4 } }}
              >
                <WaxSeal size={92} />
                <p className={styles.sealText}>
                  Sealed until chapter <strong>{firstChapter(part)}</strong>
                </p>
                <button type="button" className={styles.break} onClick={onReveal}>
                  Break the seal
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

/** Placeholder for the next part while it is still being written. */
export function GhostFolio({ number }: { number: number }) {
  return (
    <motion.article
      className={`${styles.folio} ${styles.ghost}`}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      <div className={styles.ghostCard}>
        <span className={styles.ghostNumeral}>{roman(number)}</span>
        <span className={styles.quill}>
          <Icon name="quill" size={26} />
        </span>
        <p>
          Part {roman(number)} is still being inked.
          <span>Check back soon.</span>
        </p>
      </div>
    </motion.article>
  );
}
