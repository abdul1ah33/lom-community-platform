import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import styles from "./ActionMenu.module.css";

interface ActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  /** What the actions apply to, e.g. "post" → "Edit post". */
  noun?: string;
  size?: "md" | "sm";
}

/** "⋯" Edit / Delete menu on the author's own content. Closes on outside click or Escape. */
export function ActionMenu({ onEdit, onDelete, noun = "post", size = "md" }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (action: () => void) => () => {
    setOpen(false);
    action();
  };

  return (
    <div ref={rootRef} className={styles.root} onClick={(event) => event.stopPropagation()}>
      <button
        type="button"
        className={`${styles.trigger} ${size === "sm" ? styles.small : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${noun[0].toUpperCase()}${noun.slice(1)} options`}
      >
        <Icon name="more" size={18} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            className={styles.menu}
            initial={{ opacity: 0, scale: 0.92, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            <button type="button" role="menuitem" onClick={choose(onEdit)} autoFocus>
              <Icon name="edit" size={16} /> Edit {noun}
            </button>
            <button type="button" role="menuitem" className={styles.danger} onClick={choose(onDelete)}>
              <Icon name="trash" size={16} /> Delete {noun}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
