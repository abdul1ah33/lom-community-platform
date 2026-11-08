import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";
import { RevealText } from "@/components/ui/RevealText";
import {
  ChapterSearch,
  ChapterTimeline,
  GhostFolio,
  PartFolio,
  SummaryReader,
  VOLUMES,
  VolumeTome,
  findPart,
  firstChapter,
  lastChapter,
  readingMinutes,
  roman,
  useSummarySpoilers,
  type SummaryPart,
} from "@/features/summaries";
import styles from "./SummariesPage.module.css";

/**
 * The summaries shelf. The open folio lives in the URL (`?part=v2-p1&ch=240`), so a
 * chapter can be linked to directly and the browser's back button closes the reader.
 */
export function SummariesPage() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const spoilers = useSummarySpoilers();
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const openedHere = useRef(false);

  const volume = VOLUMES[0];
  const volumeSealed = spoilers.isVolumeSealed(volume);
  const open = findPart(params.get("part"));
  const chParam = params.get("ch");
  const chapterNumber = chParam && /^\d+$/.test(chParam) ? Number(chParam) : null;

  const chapters = volume.parts.reduce((n, p) => n + p.chapters.length, 0);
  const pages = volume.parts.reduce((n, p) => n + p.pages, 0);
  const minutes = volume.parts.reduce((n, p) => n + readingMinutes(p.words), 0);

  // "Continue": the part that holds the reader's chapter, else the first part.
  const current = volume.parts.find((p) => spoilers.chapter >= firstChapter(p) && spoilers.chapter <= lastChapter(p));
  const continueTarget = current ?? volume.parts[0];

  const openPart = (part: SummaryPart, chapter?: number | null) => {
    const next: Record<string, string> = { part: part.id };
    if (chapter != null) next.ch = String(chapter);
    // The first open adds a history entry; moving around inside the reader replaces it.
    setParams(next, { replace: open !== null });
    if (open === null) openedHere.current = true;
  };

  const closeReader = () => {
    if (openedHere.current) {
      openedHere.current = false;
      navigate(-1);
    } else {
      setParams({}, { replace: true });
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.copy}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Icon name="scroll" size={15} /> The Chronicle
          </motion.span>

          <h1 className={styles.title}>
            <RevealText text="Volume" className={styles.titleSmall} delay={0.3} stagger={0.04} />
            <RevealText text="Summaries" className={styles.titleBig} charClassName={styles.glyph} delay={0.55} stagger={0.05} />
          </h1>

          <motion.p
            className={styles.lead}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.9 }}
          >
            Every chapter, distilled by <strong>{volume.authors.join(" & ")}</strong>. Pick a folio, jump straight to any
            chapter, and read it right here. Parts past your chapter stay sealed until you break them open.
          </motion.p>

          <motion.div
            className={styles.stats}
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 1.3 } } }}
          >
            {[
              { value: volume.parts.length, label: "Parts" },
              { value: chapters, label: "Chapters" },
              { value: pages, label: "Pages" },
              { value: Math.round(minutes / 60), label: "Hours of reading", prefix: "~" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className={styles.stat}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              >
                <strong>
                  {stat.prefix}
                  <CountUp value={stat.value} />
                </strong>
                <span>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            <button
              type="button"
              className={styles.primary}
              onClick={() => openPart(continueTarget, current ? spoilers.chapter : null)}
            >
              <span className={styles.shine} aria-hidden="true" />
              {current ? `Continue at chapter ${spoilers.chapter}` : `Begin with Part ${roman(continueTarget.number)}`}
              <Icon name="arrowRight" size={17} />
            </button>
          </motion.div>
        </div>

        <VolumeTome volume={volume} sealed={volumeSealed} />
      </section>

      <motion.section
        className={styles.volumeCard}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        aria-labelledby="volume-heading"
      >
        <div className={styles.volumeHead}>
          <div>
            <span className={styles.kicker}>Volume {roman(volume.number)}</span>
            <h2 id="volume-heading" className={styles.volumeName}>
              {volumeSealed ? <span className={styles.fog}>Sealed name</span> : volume.name}
            </h2>
            {volumeSealed && (
              <button type="button" className={styles.linkish} onClick={() => spoilers.revealVolume(volume)}>
                Reveal the volume's cover and name
              </button>
            )}
          </div>
          <div className={styles.searchWrap}>
            <ChapterSearch
              isTitleHidden={spoilers.isTitleHidden}
              onJump={(part, chapter) => openPart(part, chapter.number)}
            />
          </div>
        </div>

        <ChapterTimeline
          volume={volume}
          chapter={spoilers.chapter}
          isSealed={spoilers.isPartSealed}
          highlighted={highlighted}
          onHighlight={setHighlighted}
          onOpen={(part) => openPart(part)}
        />
      </motion.section>

      <motion.section
        className={styles.folios}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        aria-label="Parts"
      >
        {volume.parts.map((part) => (
          <PartFolio
            key={part.id}
            part={part}
            chapter={spoilers.chapter}
            sealed={spoilers.isPartSealed(part)}
            titleHidden={(n) => spoilers.isTitleHidden(part, n)}
            highlighted={highlighted === part.id}
            onHighlight={setHighlighted}
            onOpen={() => openPart(part)}
            onReveal={() => spoilers.revealPart(part)}
          />
        ))}
        {volume.ongoing && <GhostFolio number={volume.parts.length + 1} />}
      </motion.section>

      <AnimatePresence>
        {open && (
          <SummaryReader
            key="reader"
            volume={open.volume}
            part={open.part}
            chapterNumber={chapterNumber}
            volumeSealed={spoilers.isVolumeSealed(open.volume)}
            isPartSealed={spoilers.isPartSealed}
            isTitleHidden={spoilers.isTitleHidden}
            onSelectPart={(part) => openPart(part)}
            onSelectChapter={(n) => openPart(open.part, n)}
            onReveal={spoilers.revealPart}
            onClose={closeReader}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
