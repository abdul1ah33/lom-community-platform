import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  id: string;
  aside?: ReactNode;
}

export function SectionHeader({ eyebrow, title, id, aside }: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
      </div>
      {aside}
    </header>
  );
}
