import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { PointerEvent } from "react";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { Icon } from "@/components/ui/Icon";
import { RevealText } from "@/components/ui/RevealText";
import type { User } from "@/features/auth";
import { MemberArcana } from "./MemberArcana";
import styles from "./HomeHero.module.css";

function greeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 5) return "The night is deep";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

interface HomeHeroProps {
  user: User;
  onLogout: () => void;
}

export function HomeHero({ user, onLogout }: HomeHeroProps) {
  const spotX = useMotionValue(-500);
  const spotY = useMotionValue(-500);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${spotX}px ${spotY}px, rgb(226 192 126 / 0.12), transparent 60%)`;

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    spotX.set(event.clientX - rect.left);
    spotY.set(event.clientY - rect.top);
  };

  return (
    <motion.section
      className={styles.hero}
      onPointerMove={onPointerMove}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      aria-labelledby="home-greeting"
    >
      <motion.div className={styles.spotlight} style={{ background: spotlight }} aria-hidden="true" />
      <div className={styles.sigil} aria-hidden="true">
        <ArcaneSigil size={560} />
      </div>

      <button type="button" className={styles.mobileLogout} onClick={onLogout} aria-label="Log out">
        <Icon name="logout" size={18} />
      </button>

      <div className={styles.copy}>
        <motion.span
          className={styles.badge}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className={styles.pulse} /> Seat confirmed at the Tarot Club
        </motion.span>

        <h1 id="home-greeting" className={styles.title}>
          <RevealText text={`${greeting()},`} className={styles.titleLine} delay={0.7} stagger={0.025} />
          <RevealText text={user.username} className={styles.name} delay={1.05} stagger={0.05} />
        </h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          You stand above the Gray Fog. Below, the community gathers: theories to argue,
          pathways to study, chapters to survive. Spoilers stay sealed until you are ready.
        </motion.p>

        <motion.div
          className={styles.stats}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 1.7 } } }}
        >
          {[
            { value: "22", label: "Pathways" },
            { value: "10", label: "Sequences each" },
            { value: "1", label: "Gray Fog" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className={styles.stat}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className={styles.arcana}
        initial={{ opacity: 0, rotateY: -90, x: 60 }}
        animate={{ opacity: 1, rotateY: 0, x: 0 }}
        transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <MemberArcana user={user} />
      </motion.div>
    </motion.section>
  );
}
