import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState, type KeyboardEvent } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { commentsApi } from "../api/commentsApi";
import styles from "./MentionTextarea.module.css";

/** `@partial` immediately before the caret, at the start or after whitespace. */
const MENTION_AT_CARET = /(^|\s)@([A-Za-z0-9_]{0,50})$/;

interface MentionTextareaProps {
  value: string;
  onChange: (value: string) => void;
  /** Ctrl/Cmd + Enter. */
  onSubmit: () => void;
  placeholder: string;
  ariaLabel: string;
  maxLength: number;
  disabled?: boolean;
  /** Focus on mount with the caret at the end (e.g. when an edit starts). */
  autoFocus?: boolean;
}

export interface MentionTextareaHandle {
  focus: () => void;
}

/** Auto-growing textarea with @mention autocomplete (↑/↓ to move, Enter/Tab to pick, Esc to close). */
export const MentionTextarea = forwardRef<MentionTextareaHandle, MentionTextareaProps>(function MentionTextarea(
  { value, onChange, onSubmit, placeholder, ariaLabel, maxLength, disabled, autoFocus = false },
  ref,
) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const listId = useId();
  const [caret, setCaret] = useState(0);
  const [active, setActive] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useImperativeHandle(ref, () => ({
    focus: () => {
      const el = textareaRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    },
  }));

  useEffect(() => {
    const el = textareaRef.current;
    if (!autoFocus || !el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
    // Mount only.
  }, []);

  // Grow with content.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
  }, [value]);

  const match = MENTION_AT_CARET.exec(value.slice(0, caret));
  const partial = match && !dismissed ? match[2] : null;
  const query = useDebouncedValue(partial, 150);

  const { data: candidates = [] } = useQuery({
    queryKey: ["mention-search", query],
    queryFn: ({ signal }) => commentsApi.searchUsers(query ?? "", signal),
    enabled: query !== null,
    staleTime: 60_000,
  });
  const open = partial !== null && candidates.length > 0;

  useEffect(() => setActive(0), [query]);

  const pick = (username: string) => {
    if (!match) return;
    const before = value.slice(0, caret - match[2].length - 1);
    const after = value.slice(caret);
    const insert = `@${username} `;
    onChange(before + insert + after);
    const nextCaret = before.length + insert.length;
    requestAnimationFrame(() => {
      textareaRef.current?.setSelectionRange(nextCaret, nextCaret);
      setCaret(nextCaret);
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (open) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const step = event.key === "ArrowDown" ? 1 : -1;
        setActive((i) => (i + step + candidates.length) % candidates.length);
        return;
      }
      if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault();
        pick(candidates[active].username);
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setDismissed(true);
        return;
      }
    }
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className={styles.root}>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel}
        maxLength={maxLength}
        disabled={disabled}
        rows={1}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        onChange={(event) => {
          onChange(event.target.value);
          setCaret(event.target.selectionStart);
          setDismissed(false);
        }}
        onSelect={(event) => setCaret(event.currentTarget.selectionStart)}
        onKeyDown={onKeyDown}
        onBlur={() => window.setTimeout(() => setDismissed(true), 120)}
        onFocus={() => setDismissed(false)}
      />

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            className={styles.list}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.14 }}
          >
            {candidates.map((user, i) => (
              <li
                key={user.id}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                className={i === active ? styles.active : undefined}
                onMouseDown={(event) => {
                  event.preventDefault(); // keep focus in the textarea
                  pick(user.username);
                }}
                onMouseEnter={() => setActive(i)}
              >
                <Avatar name={user.username} src={user.avatar_url} size={28} />
                <span>
                  <strong>{user.display_name ?? user.username}</strong>
                  <em>@{user.username}</em>
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
});
