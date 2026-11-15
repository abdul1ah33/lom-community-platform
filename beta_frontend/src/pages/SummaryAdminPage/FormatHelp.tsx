import styles from "./SummaryAdminPage.module.css";

/** The few writing rules the summaries' text follows, under every editor. */
export function FormatHelp({ headings = false }: { headings?: boolean }) {
  return (
    <ul className={styles.formatHelp}>
      <li>
        <kbd>Empty line</kbd> new paragraph
      </li>
      <li>
        <kbd>&gt; text</kbd> passage quoted from the novel
      </li>
      <li>
        <kbd>( text )</kbd> a whole paragraph in brackets is your aside, in italics
      </li>
      {headings && (
        <li>
          <kbd>## text</kbd> small heading
        </li>
      )}
    </ul>
  );
}
