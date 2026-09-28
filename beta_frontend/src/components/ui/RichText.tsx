import { Fragment } from "react";
import { Link } from "react-router-dom";

/** Same rules as usernames at sign-up: 3–50 letters, digits or underscores. */
const MENTION = /(^|[^\w@])@([A-Za-z0-9_]{3,50})/g;

/** Plain text with `@username` mentions turned into profile links. Never renders HTML. */
export function RichText({ text }: { text: string }) {
  const parts: (string | { username: string })[] = [];
  let last = 0;

  for (const match of text.matchAll(MENTION)) {
    const start = match.index + match[1].length;
    parts.push(text.slice(last, start), { username: match[2] });
    last = start + match[2].length + 1;
  }
  parts.push(text.slice(last));

  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <Fragment key={i}>{part}</Fragment>
        ) : (
          <Link
            key={i}
            to={`/u/${part.username}`}
            onClick={(event) => event.stopPropagation()}
            style={{ color: "var(--brass-200)", textDecoration: "none", fontWeight: 600 }}
          >
            @{part.username}
          </Link>
        ),
      )}
    </>
  );
}
