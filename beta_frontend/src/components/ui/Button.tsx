import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { Spinner } from "./Spinner";
import styles from "./Button.module.css";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "ghost";
  loading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  loading = false,
  loadingText,
  icon,
  children,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      className={`${styles.button} ${styles[variant]} ${className ?? ""}`}
      disabled={disabled || loading}
      aria-busy={loading}
      whileHover={disabled || loading ? undefined : { y: -2 }}
      whileTap={disabled || loading ? undefined : { scale: 0.97 }}
      {...rest}
    >
      <span className={styles.shine} aria-hidden="true" />
      <span className={styles.content}>
        {loading ? <Spinner size={16} /> : icon}
        <span>{loading && loadingText ? loadingText : children}</span>
      </span>
    </motion.button>
  );
}
