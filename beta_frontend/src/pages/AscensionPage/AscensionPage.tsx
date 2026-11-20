import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";
import { RevealText } from "@/components/ui/RevealText";
import {
  BESTOWAL,
  CONCEPTS,
  CodexTomes,
  DIVINE_PATHWAYS,
  LawTablets,
  OUTER_PATHWAYS,
  PathwayCodex,
  PathwayGrid,
  SEFIROT,
  SefirotOrbit,
  SequenceSpire,
  TierLadder,
  getPathwayMeta,
  type PathwayMeta,
} from "@/features/ascension";
import styles from "./AscensionPage.module.css";

type Deck = "divine" | "outer";

/**
 * Ascension: the Beyonder power system, from the first potion to Above the Sequences.
 * The open pathway and Sequence live in the URL (`?path=seer&seq=7`), so a Sequence
 * can be linked to and the back button closes the codex.
 */
export function AscensionPage() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const openedHere = useRef(false);
  const open = getPathwayMeta(params.get("path"));
  const seqParam = params.get("seq");
  const level = seqParam !== null && /^-?\d$/.test(seqParam) ? Number(seqParam) : null;
  const [deck, setDeck] = useState<Deck>(open?.kind ?? "divine");

  const openPathway = (meta: PathwayMeta) => {
    setParams({ path: meta.slug }, { replace: false });
    openedHere.current = true;
  };
  const selectLevel = (n: number) => open && setParams({ path: open.slug, seq: String(n) }, { replace: true });
  const close = () => {
    if (openedHere.current) {
      openedHere.current = false;
      navigate(-1);
    } else {
      setParams({}, { replace: true });
    }
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

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
            <Icon name="flame" size={15} /> The Beyonder Codex
          </motion.span>

          <h1 className={styles.title}>
            <RevealText text="The Path of" className={styles.titleSmall} delay={0.3} stagger={0.04} />
            <RevealText
              text="Ascension"
              className={styles.titleBig}
              charClassName={styles.glyph}
              delay={0.6}
              stagger={0.06}
            />
          </h1>

          <motion.p
            className={styles.lead}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.9 }}
          >
            How a mortal drinks a potion and starts the long, dangerous climb from <strong>Sequence 9</strong> to a
            throne <strong>above the Sequences</strong>. The laws, the ladder, every pathway and the Sefirot they lead
            to, retold for this community. Anything past your chapter stays sealed until you break it open.
          </motion.p>

          <motion.div
            className={styles.stats}
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 1.4 } } }}
          >
            {[
              { value: DIVINE_PATHWAYS.length, label: "Divine pathways" },
              { value: DIVINE_PATHWAYS.length * 10, label: "Sequences" },
              { value: SEFIROT.length, label: "Sefirot" },
              { value: OUTER_PATHWAYS.length, label: "Outer Deities" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className={styles.stat}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              >
                <strong>
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
            transition={{ delay: 1.7 }}
          >
            <button type="button" className={styles.primary} onClick={() => scrollTo("pathways")}>
              <span className={styles.shine} aria-hidden="true" />
              Choose a pathway <Icon name="arrowRight" size={17} />
            </button>
            <button type="button" className={styles.secondary} onClick={() => scrollTo("ladder")}>
              Climb the ladder
            </button>
          </motion.div>
        </div>
        <SequenceSpire />
      </section>

      <Section
        id="laws"
        eyebrow="Chapter I"
        title="The Three Laws"
        lead="Three rules every Beyonder characteristic obeys, and that even gods can't escape."
      >
        <LawTablets />
      </Section>

      <Section
        id="ladder"
        eyebrow="Chapter II"
        title="The Ladder"
        lead="From the first potion to the throne of a Great Old One. Scroll to climb, tap a rung to read it."
      >
        <TierLadder />
      </Section>

      <Section
        id="codex"
        eyebrow="Chapter III"
        title="The Codex"
        lead="How potions, acting, rituals and anchors keep a Beyonder sane, and what it costs."
      >
        <CodexTomes blocks={CONCEPTS} />
      </Section>

      <Section
        id="pathways"
        eyebrow="Chapter IV"
        title="The Pathways"
        lead="Open a pathway to climb its ten Sequences: the potion, the formula, the ritual, the acting and every power."
        aside={
          <nav className={styles.deckTabs} aria-label="Pathway families">
            {(
              [
                ["divine", "Paths of the Divine"],
                ["outer", "Outer Deities"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={`${styles.deckTab} ${deck === id ? styles.deckTabActive : ""}`}
                aria-current={deck === id}
                onClick={() => setDeck(id)}
              >
                {deck === id && (
                  <motion.span
                    layoutId="deck-tab"
                    className={styles.deckGlow}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span>{label}</span>
              </button>
            ))}
          </nav>
        }
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={deck}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <PathwayGrid pathways={deck === "divine" ? DIVINE_PATHWAYS : OUTER_PATHWAYS} onOpen={openPathway} />
          </motion.div>
        </AnimatePresence>
      </Section>

      <Section
        id="sefirot"
        eyebrow="Chapter V"
        title="The Sefirot"
        lead="Nine sources of power on Earth. Each one feeds a family of pathways and belongs to a Great Old One."
      >
        <SefirotOrbit />
      </Section>

      <Section
        id="bestowal"
        eyebrow="Chapter VI"
        title="Other Roads to Power"
        lead="The potions are the only correct path, but not the only one."
      >
        <CodexTomes blocks={BESTOWAL} />
      </Section>

      <p className={styles.source}>
        Retold in our own words from the official <em>Lord of the Mysteries World Research Handbook</em>.
      </p>

      <AnimatePresence>
        {open && <PathwayCodex key={open.slug} meta={open} level={level} onSelect={selectLevel} onClose={close} />}
      </AnimatePresence>
    </div>
  );
}

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  aside?: ReactNode;
  children: ReactNode;
}

function Section({ id, eyebrow, title, lead, aside, children }: SectionProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <motion.header
        className={styles.sectionHead}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <span className={styles.sectionEyebrow}>{eyebrow}</span>
          <h2 id={`${id}-title`} className={styles.sectionTitle}>
            {title}
          </h2>
          <p className={styles.sectionLead}>{lead}</p>
        </div>
        {aside}
      </motion.header>
      {children}
    </section>
  );
}
