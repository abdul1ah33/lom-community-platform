import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { Icon } from "@/components/ui/Icon";
import { RevealText } from "@/components/ui/RevealText";
import { softBlur } from "@/lib/performance/performanceTier";
import { useAscensionSpoilers, usePathwayDetail, sequenceSealUntil } from "../hooks/useAscension";
import type { PathwayMeta, Sequence } from "../types";
import { Sealed } from "./Sealed";
import styles from "./PathwayCodex.module.css";

interface PathwayCodexProps {
  meta: PathwayMeta;
  /** Selected Sequence number; null means the lowest one. */
  level: number | null;
  onSelect: (n: number) => void;
  onClose: () => void;
}

export const sequenceLabel = (n: number) => (n < 0 ? "Above" : `Seq. ${n}`);

/**
 * A pathway opened up: the ladder of Sequences on the left (Sequence 0 at the top),
 * the chosen Sequence's potion, ritual, acting and powers on the right. Arrow keys
 * climb and descend; the panel slides in the direction of travel.
 */
export function PathwayCodex({ meta, level, onSelect, onClose }: PathwayCodexProps) {
  const detail = usePathwayDetail(meta.slug);
  const spoilers = useAscensionSpoilers();
  const panelRef = useRef<HTMLDivElement>(null);
  const previous = useRef<number | null>(null);

  const sequences = detail.data?.sequences ?? [];
  const current = sequences.find((s) => s.n === level) ?? sequences[0];
  const index = current ? sequences.indexOf(current) : 0;
  // Climbing (towards Sequence 0) slides the new page up; descending slides it down.
  const direction = previous.current === null || !current ? 1 : current.n < previous.current ? 1 : -1;
  useEffect(() => {
    previous.current = current?.n ?? null;
    // Keeps the chosen rung visible when the rail scrolls (the phone layout).
    panelRef.current?.querySelector('[aria-current="true"]')?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [current?.n]);

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const stepRef = useRef<(delta: number) => void>(() => {});
  stepRef.current = (delta) => {
    const next = sequences[index + delta];
    if (next) onSelect(next.n);
  };

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
      if (event.key === "ArrowUp") {
        event.preventDefault();
        stepRef.current(1);
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        stepRef.current(-1);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, []);

  // The rail lists Sequence 0 (or the Great Old One) at the top.
  const rail = [...sequences].reverse();
  const climbed = sequences.length > 1 ? index / (sequences.length - 1) : 0;

  return createPortal(
    <motion.div
      className={styles.overlay}
      style={{ "--hue": meta.hue } as React.CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
    >
      <div className={styles.aura} aria-hidden="true" />
      <motion.div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={`${meta.god} pathway`}
        tabIndex={-1}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>{meta.kind === "outer" ? "Outer Deity pathway" : "Path of the Divine"}</span>
            <h2 className={styles.title}>
              <RevealText text={meta.god} charClassName={styles.glyph} delay={0.15} stagger={0.035} />
            </h2>
            <p className={styles.motto}>{meta.motto}</p>
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close pathway">
            <Icon name="x" size={20} />
          </button>
        </header>

        {detail.isPending ? (
          <div className={styles.loading}>
            <ArcaneSigil size={110} charged />
          </div>
        ) : !current ? (
          <div className={styles.loading}>
            <ArcaneSigil size={110} />
            <p>This pathway's pages are still being transcribed.</p>
          </div>
        ) : (
          <div className={styles.body}>
            <nav className={styles.rail} aria-label="Sequences">
              <div className={styles.railList}>
                <span className={styles.railTrack} aria-hidden="true">
                  <motion.span
                    className={styles.railFill}
                    initial={false}
                    animate={{ scaleY: climbed }}
                    transition={{ type: "spring", stiffness: 120, damping: 22 }}
                  />
                </span>
                {rail.map((s) => {
                  const sealed = spoilers.isSequenceSealed(meta, s.n);
                  const active = s === current;
                  return (
                    <button
                      key={s.n}
                      type="button"
                      className={`${styles.step} ${active ? styles.stepActive : ""}`}
                      aria-current={active}
                      onClick={() => onSelect(s.n)}
                    >
                      {active && (
                        <motion.span
                          layoutId={`step-${meta.slug}`}
                          className={styles.stepGlow}
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className={styles.stepNo}>{s.n < 0 ? "∞" : s.n}</span>
                      <span className={styles.stepName}>{sealed ? "Sealed" : s.name}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            <div className={styles.stageWrap}>
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.article
                  key={current.n}
                  className={styles.stage}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, y: d * 60, ...softBlur(8) }),
                    center: { opacity: 1, y: 0, ...softBlur(0) },
                    leave: (d: number) => ({ opacity: 0, y: d * -60, ...softBlur(8) }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="leave"
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  {spoilers.isSequenceSealed(meta, current.n) ? (
                    <div className={styles.sealedStage}>
                      <span className={styles.bigNo}>{sequenceLabel(current.n)}</span>
                      <Sealed
                        until={sequenceSealUntil(meta, current.n)}
                        onReveal={() => spoilers.revealSequence(meta, current.n)}
                        lines={6}
                      />
                    </div>
                  ) : (
                    <SequencePage sequence={current} />
                  )}
                </motion.article>
              </AnimatePresence>

              <div className={styles.pager}>
                <button type="button" onClick={() => stepRef.current(-1)} disabled={index === 0}>
                  <Icon name="chevronLeft" size={16} style={{ rotate: "-90deg" }} /> Descend
                </button>
                <span>
                  {index + 1} / {sequences.length}
                </span>
                <button type="button" onClick={() => stepRef.current(1)} disabled={index === sequences.length - 1}>
                  Ascend <Icon name="chevronLeft" size={16} style={{ rotate: "90deg" }} />
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  );
}

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

function SequencePage({ sequence: s }: { sequence: Sequence }) {
  const ingredients = (s.main?.length ?? 0) + (s.sub?.length ?? 0) > 0;
  return (
    <motion.div
      className={styles.page}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
    >
      <motion.div className={styles.pageHead} variants={item}>
        <Vial />
        <div>
          <span className={styles.bigNo}>{s.n < 0 ? "Above the Sequences" : `Sequence ${s.n}`}</span>
          <h3 className={styles.seqName}>{s.name}</h3>
          {s.potion && <p className={styles.potion}>{s.potion}</p>}
        </div>
      </motion.div>

      {ingredients && (
        <motion.section className={styles.block} variants={item}>
          <h4>Formula</h4>
          <div className={styles.formula}>
            {s.main && s.main.length > 0 && (
              <div>
                <span className={styles.formulaLabel}>Main</span>
                <ul className={styles.chips}>
                  {s.main.map((m) => (
                    <li key={m} className={styles.chipMain}>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {s.sub && s.sub.length > 0 && (
              <div>
                <span className={styles.formulaLabel}>Supplementary</span>
                <ul className={styles.chips}>
                  {s.sub.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {s.ritual && (
        <motion.section className={`${styles.block} ${styles.ritual}`} variants={item}>
          <h4>
            <Icon name="flame" size={15} /> Advancement ritual
          </h4>
          <p>{s.ritual}</p>
        </motion.section>
      )}

      {s.acting && s.acting.length > 0 && (
        <motion.section className={styles.block} variants={item}>
          <h4>Acting</h4>
          <ul className={styles.acting}>
            {s.acting.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </motion.section>
      )}

      {s.powers.length > 0 && (
        <motion.section className={styles.block} variants={item}>
          <h4>Powers</h4>
          <div className={styles.powers}>
            {s.powers.map((p) => (
              <motion.div key={p.name} className={styles.power} variants={item}>
                <strong>{p.name}</strong>
                <p>{p.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {s.notes && s.notes.length > 0 && (
        <motion.dl className={styles.notes} variants={item}>
          {s.notes.map((n) => (
            <div key={n.label}>
              <dt>{n.label}</dt>
              <dd>{n.text}</dd>
            </div>
          ))}
        </motion.dl>
      )}
    </motion.div>
  );
}

/** A potion flask whose liquid sloshes and bubbles in the pathway's colour. */
function Vial() {
  return (
    <span className={styles.vial} aria-hidden="true">
      <span className={styles.neck} />
      <span className={styles.flask}>
        <span className={styles.liquid}>
          <i />
          <i />
          <i />
        </span>
      </span>
    </span>
  );
}
