import { motion } from "motion/react";
import { Fragment } from "react";

interface RevealTextProps {
  text: string;
  className?: string;
  /** Applied to every character span, e.g. for a per-glyph gradient fill. */
  charClassName?: string;
  delay?: number;
  /** Seconds between each character. */
  stagger?: number;
  as?: "h1" | "h2" | "p" | "span";
}

const charVariants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/**
 * Characters rise out of a blur one by one. Letters are grouped into
 * unbreakable words so lines only wrap at spaces. Screen readers get the
 * whole string at once.
 */
export function RevealText({
  text,
  className,
  charClassName,
  delay = 0,
  stagger = 0.045,
  as = "span",
}: RevealTextProps) {
  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, w) => (
        <Fragment key={w}>
          {/* Very long "words" (e.g. 50-char usernames) may still break so they never overflow on phones. */}
          <span aria-hidden="true" style={word.length <= 16 ? { display: "inline-block", whiteSpace: "nowrap" } : undefined}>
            {Array.from(word).map((char, c) => (
              <motion.span key={c} className={charClassName} style={{ display: "inline-block" }} variants={charVariants}>
                {char}
              </motion.span>
            ))}
          </span>
          {/* The space lives between word boxes: inside an inline-block it would be trimmed. */}
          {w < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
