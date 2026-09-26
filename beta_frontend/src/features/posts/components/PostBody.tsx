import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { Spinner } from "@/components/ui/Spinner";
import { useReaderChapter } from "@/features/profile";
import { useSpoilerGate } from "../hooks/useSpoilerGate";
import type { Post } from "../types";
import styles from "./PostBody.module.css";

/** Placeholder lines shown when the server withheld the text, so nothing real leaks. */
const SEALED_FILLER = "The fog hides these words until you have read far enough to see them clearly. ".repeat(2);

interface PostBodyProps {
  post: Post;
  /** Clamp long text in feeds; the post page shows everything. */
  clamp?: boolean;
}

export function PostBody({ post, clamp = false }: PostBodyProps) {
  const gate = useSpoilerGate(post);
  const hidden = gate.state !== "clear";
  const text = post.body ?? SEALED_FILLER;

  return (
    <div className={styles.wrap}>
      <motion.p
        className={`${styles.body} ${clamp ? styles.clamp : ""}`}
        animate={{ filter: hidden ? "blur(7px)" : "blur(0px)", opacity: hidden ? 0.5 : 1 }}
        transition={{ duration: 0.6 }}
        aria-hidden={hidden}
      >
        {text}
      </motion.p>

      <AnimatePresence>
        {hidden && (
          <motion.div
            className={styles.seal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: "blur(6px)" }}
          >
            {gate.state === "revealing" ? (
              <span className={styles.revealing}>
                <Spinner size={16} /> Lifting the fog…
              </span>
            ) : (
              <>
                <span className={styles.sealText}>
                  Spoiler for chapter {post.spoiler_chapter}
                  <em> · you're at {gate.readerChapter ? `chapter ${gate.readerChapter}` : "the start"}</em>
                </span>
                <button
                  type="button"
                  className={styles.reveal}
                  onClick={(event) => {
                    event.stopPropagation();
                    gate.reveal();
                  }}
                >
                  <Icon name="eye" size={15} /> Reveal anyway
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {gate.revealError && <p className={styles.error}>The fog would not lift. Try again in a moment.</p>}
    </div>
  );
}

export function SpoilerBadge({ post }: { post: Post }) {
  const readerChapter = useReaderChapter();
  if (post.spoiler_chapter === null) return null;
  const read = readerChapter >= post.spoiler_chapter;

  return (
    <span className={`${styles.badge} ${read ? styles.badgeSafe : ""}`}>
      <Icon name="flame" size={13} />
      {read ? `Ch. ${post.spoiler_chapter} · read` : `Spoiler · Ch. ${post.spoiler_chapter}`}
    </span>
  );
}
