import styles from "./Paragraphs.module.css";

/** Renders codex text: plain lines become paragraphs, "• " lines become a bullet list. */
export function Paragraphs({ lines }: { lines: string[] }) {
  const groups: (string | string[])[] = [];
  for (const line of lines) {
    if (line.startsWith("• ")) {
      const last = groups[groups.length - 1];
      if (Array.isArray(last)) last.push(line.slice(2));
      else groups.push([line.slice(2)]);
    } else {
      groups.push(line);
    }
  }

  return (
    <div className={styles.prose}>
      {groups.map((group, i) =>
        Array.isArray(group) ? (
          <ul key={i}>
            {group.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{group}</p>
        ),
      )}
    </div>
  );
}
