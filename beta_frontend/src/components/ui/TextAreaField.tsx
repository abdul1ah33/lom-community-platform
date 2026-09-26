import { useId, type TextareaHTMLAttributes } from "react";
import styles from "./TextAreaField.module.css";

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  value: string;
  maxLength: number;
  error?: string;
}

/** Textarea with a label, a live character counter that warms up near the limit, and inline error. */
export function TextAreaField({ label, value, maxLength, error, className, ...rest }: TextAreaFieldProps) {
  const id = useId();
  const remaining = maxLength - value.length;
  const tone = remaining < 0 ? styles.over : remaining <= 20 ? styles.near : "";

  return (
    <div className={`${styles.field} ${error ? styles.invalid : ""} ${className ?? ""}`}>
      <div className={styles.top}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <span className={`${styles.counter} ${tone}`} aria-live="polite">
          {value.length}/{maxLength}
        </span>
      </div>
      <textarea
        id={id}
        value={value}
        className={styles.textarea}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
