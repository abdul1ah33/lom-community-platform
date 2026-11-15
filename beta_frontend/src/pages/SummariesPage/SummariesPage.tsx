import { AnimatePresence, motion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";
import { RevealText } from "@/components/ui/RevealText";
import {
  ChapterSearch,
  ChapterTimeline,
  GhostFolio,
  PartFolio,
  SummaryReader,
  VolumeTome,
  findPart,
  firstChapter,
  lastChapter,
  publishedVolume,
  readingMinutes,
  roman,
  useCanEditSummaries,
  useSummaryLibrary,
  useSummarySpoilers,
  type SummaryPart,
  type SummaryVolume,
} from "@/features/summaries";
import styles from "./SummariesPage.module.css";

/** The summaries shelf, read from the library the summary desk edits. */
export function SummariesPage() {
  const library = useSummaryLibrary();
  const volumes = useMemo(() => library.data?.map(publishedVolume), [library.data]);

  if (library.isError) {
    return (
      <div className={styles.status}>
        <ArcaneSigil size={120} />
        <p>The shelf couldn't be opened.</p>
        <button type="button" className={styles.linkish} onClick={() => library.refetch()}>
          Try again
        </button>
      </div>
    );
  }
  if (!volumes) {
    return (
      <div className={styles.status}>
        <ArcaneSigil size={120} charged />
      </div>
    );
  }
  if (volumes.length === 0) {
    return (
      <div className={styles.status}>
        <ArcaneSigil size={120} />
        <p>No summaries are on the shelf yet. The quill is still moving.</p>
        <EditLink />
      </div>
    );
  }
  return <Shelf volumes={volumes} />;
}

/** Only shown to the accounts allowed into the summary desk. */
function EditLink() {
  if (!useCanEditSummaries()) return null;
  return (
    <Link to="/admin/summaries" className={styles.secondary}>
      <Icon name="quill" size={16} /> Edit summaries
    </Link>
  );
}

/**
 * The open volume and folio live in the URL (`?vol=2&part=v2-p1&ch=240`), so a chapter
 * can be linked to directly and the browser's back button closes the reader.
 */
function Shelf({ volumes }: { volumes: SummaryVolume[] }) {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const spoilers = useSummarySpoilers();
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const openedHere = useRef(false);

  const open = findPart(volumes, params.get("part"));
  // The volume in the URL, else the one holding the reader's chapter, else the first.
  const reading = [...volumes].reverse().find((v) => v.startChapter <= spoilers.chapter) ?? volumes[0];
  const volume = open?.volume ?? volumes.find((v) => String(v.number) === params.get("vol")) ?? reading;
  const volumeSealed = spoilers.isVolumeSealed(volume);
  const hasParts = volume.parts.length > 0;
  const chParam = params.get("ch");
  const chapterNumber = chParam && /^\d+$/.test(chParam) ? Number(chParam) : null;

  const chapters = volume.parts.reduce((n, p) => n + p.chapters.length, 0);
  const words = volume.parts.reduce((n, p) => n + p.words, 0);
  const minutes = volume.parts.reduce((n, p) => n + readingMinutes(p.words), 0);

  // "Continue": the part that holds the reader's chapter, else the first part.
  const current = volume.parts.find((p) => spoilers.chapter >= firstChapter(p) && spoilers.chapter <= lastChapter(p));
  const continueTarget = current ?? volume.parts[0];

  const showVolume = (target: SummaryVolume) => setParams({ vol: String(target.number) }, { replace: true });

  const openPart = (part: SummaryPart, chapter?: number | null) => {
    const owner = findPart(volumes, part.id)?.volume ?? volume;
    const next: Record<string, string> = { vol: String(owner.number), part: part.id };
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
      setParams({ vol: String(volume.number) }, { replace: true });
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

          {volumes.length > 1 && (
            <nav className={styles.volumeTabs} aria-label="Volumes">
              {volumes.map((v) => (
                <button
                  key={v.number}
                  type="button"
                  className={`${styles.volumeTab} ${v === volume ? styles.volumeTabActive : ""}`}
                  aria-current={v === volume}
                  onClick={() => showVolume(v)}
                >
                  {v === volume && (
                    <motion.span layoutId="volume-tab" className={styles.volumeTabGlow} transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                  )}
                  <span>Vol. {roman(v.number)}</span>
                </button>
              ))}
            </nav>
          )}

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
              { value: Math.round(words / 1000), label: "Thousand words" },
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
            {continueTarget && (
              <button
                type="button"
                className={styles.primary}
                onClick={() => openPart(continueTarget, current ? spoilers.chapter : null)}
              >
                <span className={styles.shine} aria-hidden="true" />
                {current ? `Continue at chapter ${spoilers.chapter}` : `Begin with Part ${roman(continueTarget.number)}`}
                <Icon name="arrowRight" size={17} />
              </button>
            )}
            <EditLink />
          </motion.div>
        </div>

        <VolumeTome key={volume.number} volume={volume} sealed={volumeSealed} />
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
              volumes={volumes}
              isTitleHidden={spoilers.isTitleHidden}
              onJump={(part, chapter) => openPart(part, chapter.number)}
            />
          </div>
        </div>

        {hasParts ? (
          <ChapterTimeline
            key={volume.number}
            volume={volume}
            chapter={spoilers.chapter}
            isSealed={spoilers.isPartSealed}
            highlighted={highlighted}
            onHighlight={setHighlighted}
            onOpen={(part) => openPart(part)}
          />
        ) : (
          <p className={styles.emptyVolume}>The first part of this volume is still being written.</p>
        )}
      </motion.section>

      <motion.section
        key={volume.number}
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
