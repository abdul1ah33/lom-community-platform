import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useId, useState, type InputHTMLAttributes } from "react";
import { Icon, type IconName } from "./Icon";
import styles from "./TextField.module.css";

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  label: string;
  icon?: IconName;
  error?: string;
}

/** Input with a floating label, animated focus beam, and inline error. Passwords get a reveal toggle. */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, icon, error, type = "text", className, ...rest },
  ref,
) {
  const id = useId();
  const errorId = `${id}-error`;
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={`${styles.field} ${error ? styles.invalid : ""} ${className ?? ""}`}>
      <div className={styles.control}>
        {icon && <Icon name={icon} size={18} className={styles.icon} />}
        <input
          ref={ref}
          id={id}
          type={isPassword && revealed ? "text" : type}
          className={styles.input}
          placeholder=" "
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {isPassword && (
          <button
            type="button"
            className={styles.reveal}
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? "Hide password" : "Show password"}
          >
            <Icon name={revealed ? "eyeOff" : "eye"} size={18} />
          </button>
        )}
        <span className={styles.beam} aria-hidden="true" />
      </div>

      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            className={styles.error}
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});
