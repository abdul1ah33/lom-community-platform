import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { softBlur } from "@/lib/performance/performanceTier";
import { SEFIROT } from "../data/codex";
import { useAscensionSpoilers } from "../hooks/useAscension";
import { Sealed } from "./Sealed";
import styles from "./SefirotOrbit.module.css";

const R = 42; // ring radius in % of the box

/**
 * The nine Sefirot as a constellation: nodes on a slowly turning ring, threads of
 * light drawn to the centre. Choosing a node opens its page beside the ring.
 * A sealed Sefirah shows no name, only its place on the ring.
 */
export function SefirotOrbit() {
  const spoilers = useAscensionSpoilers();
  const [active, setActive] = useState(0);
  const sefirah = SEFIROT[active];
  const key = (id: string) => `ascension:sefirah:${id}`;
  const sealed = (i: number) => spoilers.isSealed(key(SEFIROT[i].id), SEFIROT[i].sealUntil);

  const points = SEFIROT.map((_, i) => {
    const a = (i / SEFIROT.length) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + Math.cos(a) * R, y: 50 + Math.sin(a) * R };
  });

  return (
    <div className={styles.wrap}>
      <div className={styles.orbit}>
        <svg viewBox="0 0 100 100" className={styles.threads} aria-hidden="true">
          <defs>
            <radialGradient id="sefirot-core">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="40%" stopColor="#e2c07e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d11f3c" stopOpacity="0" />
            </radialGradient>
          </defs>
          <motion.circle
            cx="50"
            cy="50"
            r={R}
            className={styles.ringLine}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          {points.map((p, i) => (
            <motion.line
              key={i}
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              className={`${styles.thread} ${i === active ? styles.threadActive : ""}`}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.6 + i * 0.08 }}
            />
          ))}
          <circle cx="50" cy="50" r="9" fill="url(#sefirot-core)" className={styles.core} />
        </svg>

        {points.map((p, i) => (
          <motion.button
            key={SEFIROT[i].id}
            type="button"
            className={`${styles.node} ${i === active ? styles.nodeActive : ""} ${SEFIROT[i].pillar && !sealed(i) ? styles.pillar : ""}`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            aria-label={sealed(i) ? `Sealed Sefirah ${i + 1}` : SEFIROT[i].name}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1 + i * 0.07 }}
          >
            <span className={styles.orb} />
            <span className={styles.nodeLabel}>{sealed(i) ? "✦" : SEFIROT[i].name}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={sefirah.id + String(sealed(active))}
          className={styles.panel}
          initial={{ opacity: 0, x: 30, ...softBlur(6) }}
          animate={{ opacity: 1, x: 0, ...softBlur(0) }}
          exit={{ opacity: 0, x: -20, ...softBlur(6) }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.kicker}>Sefirah {active + 1} of 9</span>
          {sealed(active) ? (
            <>
              <h3 className={styles.name}>Hidden in the fog</h3>
              <Sealed until={sefirah.sealUntil} onReveal={() => spoilers.reveal(key(sefirah.id))} lines={5} />
            </>
          ) : (
            <>
              <h3 className={styles.name}>
                {sefirah.name}
                {sefirah.pillar && <span className={styles.badge}>Pillar</span>}
              </h3>
              <p className={styles.look}>{sefirah.look}</p>
              {sefirah.about.map((a) => (
                <p key={a} className={styles.about}>
                  {a}
                </p>
              ))}
              <dl className={styles.facts}>
                <div>
                  <dt>Pathways</dt>
                  <dd>
                    {sefirah.pathways.map((p) => (
                      <span key={p}>{p}</span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt>Its Great Old One</dt>
                  <dd>
                    {sefirah.oldOne.map((p) => (
                      <span key={p}>{p}</span>
                    ))}
                  </dd>
                </div>
              </dl>
            </>
          )}
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
