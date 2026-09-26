import { AnimatePresence, motion, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { CrimsonMoon } from "@/components/effects/CrimsonMoon";
import { FogBackground } from "@/components/effects/FogBackground";
import { ParticleField } from "@/components/effects/ParticleField";
import { TiltCard } from "@/components/effects/TiltCard";
import { VeilTransition } from "@/components/effects/VeilTransition";
import { Icon, type IconName } from "@/components/ui/Icon";
import { RevealText } from "@/components/ui/RevealText";
import { useToast } from "@/components/feedback/ToastProvider";
import { useAuth } from "@/features/auth";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { useUpdateProfile } from "@/features/profile";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import styles from "./LoginPage.module.css";

const WHISPERS = [
  "Every reader is a Beyonder waiting for the right potion.",
  "Spoilers stay sealed until you reach the chapter.",
  "Theories, pathways and the long bronze table, all in one place.",
  "Praise the Fool, who does not belong to this era.",
];

const FEATURES: { icon: IconName; label: string }[] = [
  { icon: "sparkle", label: "Spoiler-safe feed" },
  { icon: "book", label: "22 Pathways wiki" },
  { icon: "bookmark", label: "Reading tracker" },
];

/** idle → pending (request in flight) → ascending (success transition) → navigate. */
type Phase = "idle" | "pending" | "ascending";

export function LoginPage() {
  const { status } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const [phase, setPhase] = useState<Phase>("idle");
  const updateProfile = useUpdateProfile();
  const { notify } = useToast();

  // After sign-up, store the reading progress entered in the form before entering,
  // so the very first feed already hides the right spoilers.
  const onAuthenticated = async (chapter: number | null) => {
    if (chapter) {
      try {
        await updateProfile.mutateAsync({ current_chapter: chapter });
      } catch {
        notify("Your account is ready, but your chapter wasn't saved. Set it on your profile.", "error");
      }
    }
    setPhase("ascending");
  };
  const [whisper, setWhisper] = useState(0);
  const { x, y } = usePointerParallax();

  const sigilX = useTransform(x, (v) => v * -18);
  const sigilY = useTransform(y, (v) => v * -18);
  const moonX = useTransform(x, (v) => v * 30);
  const moonY = useTransform(y, (v) => v * 22);

  useEffect(() => {
    const id = window.setInterval(() => setWhisper((i) => (i + 1) % WHISPERS.length), 5200);
    return () => window.clearInterval(id);
  }, []);

  // Already signed in (e.g. opened /login in a new tab): skip straight in.
  if (status === "authenticated" && phase === "idle") return <Navigate to={from} replace />;

  return (
    <main className={styles.page}>
      <FogBackground variant="intense" />
      <ParticleField density={1.1} />

      <motion.div className={styles.moon} style={{ x: moonX, y: moonY }}>
        <CrimsonMoon size={150} />
      </motion.div>

      <div className={styles.layout}>
        <section className={styles.brand} aria-labelledby="brand-title">
          <motion.div
            className={styles.sigil}
            style={{ x: sigilX, y: sigilY }}
            initial={{ opacity: 0, scale: 0.7, rotate: -40 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            <ArcaneSigil size="min(620px, 90vw)" charged={phase !== "idle"} />
          </motion.div>

          <div className={styles.brandContent}>
            <motion.p
              className={styles.eyebrow}
              initial={{ opacity: 0, letterSpacing: "0.9em" }}
              animate={{ opacity: 1, letterSpacing: "0.42em" }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Above the Gray Fog
            </motion.p>

            <h1 id="brand-title" className={styles.title}>
              <RevealText text="Lord of the" className={styles.titleSmall} delay={0.3} />
              <RevealText
                text="Mysteries"
                className={styles.titleBig}
                charClassName={styles.glyph}
                delay={0.75}
                stagger={0.07}
              />
            </h1>

            <div className={styles.whisper} aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.p
                  key={whisper}
                  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                  transition={{ duration: 0.6 }}
                >
                  {WHISPERS[whisper]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.ul
              className={styles.features}
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 1.6 } } }}
            >
              {FEATURES.map((feature) => (
                <motion.li
                  key={feature.label}
                  className={styles.feature}
                  variants={{
                    hidden: { opacity: 0, y: 14, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                >
                  <Icon name={feature.icon} size={15} />
                  {feature.label}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>

        <motion.section
          className={styles.panel}
          initial={{ opacity: 0, y: 40, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Sign in"
        >
          <TiltCard>
            <AuthForm
              onPendingChange={(pending) => setPhase(pending ? "pending" : "idle")}
              onSuccess={(_user, { chapter }) => void onAuthenticated(chapter)}
            />
          </TiltCard>
          <p className={styles.footnote}>
            Beta build · By entering you agree to keep spoilers behind the veil.
          </p>
        </motion.section>
      </div>

      {phase === "ascending" && (
        <VeilTransition
          mode="cover"
          onComplete={() => navigate(from, { replace: true, state: { ascended: true } })}
        />
      )}
    </main>
  );
}
