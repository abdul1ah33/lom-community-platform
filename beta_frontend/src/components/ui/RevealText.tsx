import { motion } from "motion/react";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** Seconds between each character. */
  stagger?: number;
  as?: "h1" | "h2" | "p" | "span";
}

/** Characters rise out of a blur one by one. Screen readers get the whole string at once. */
export function RevealText({ text, className, delay = 0, stagger = 0.045, as = "span" }: RevealTextProps) {
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {Array.from(text).map((char, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          style={{ display: "inline-block", whiteSpace: "pre" }}
          variants={{
            hidden: { opacity: 0, y: "0.6em", filter: "blur(10px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  );
}
