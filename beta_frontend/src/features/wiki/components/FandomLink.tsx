import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";
import { useReaderChapter } from "@/features/profile";
import { FANDOM_HOME, fandomSearchUrl } from "../fandom";
import styles from "./FandomLink.module.css";

interface FandomLinkProps {
  /** What to search for on Fandom; without it the link opens the Fandom main page. */
  query?: string;
  children: ReactNode;
  className?: string;
}

/** Opens the Fandom wiki in a new tab, but only after warning that it isn't spoiler-filtered. */
export function FandomLink({ query, children, className }: FandomLinkProps) {
  const [open, setOpen] = useState(false);
  const chapter = useReaderChapter();
  const href = query?.trim() ? fandomSearchUrl(query) : FANDOM_HOME;

  return (
    <>
      <button type="button" className={className ?? styles.link} onClick={() => setOpen(true)}>
        {children}
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Leaving the spoiler shield"
        description="The Fandom wiki is written by fans for readers who have finished the story."
        footer={
          <>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Stay here
            </Button>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.go}
              onClick={() => setOpen(false)}
            >
              Open Fandom <Icon name="arrowRight" size={16} />
            </a>
          </>
        }
      >
        <p className={styles.warning}>
          <Icon name="flame" size={16} />
          <span>
            Nothing there is hidden by chapter. Articles, infoboxes and even search snippets can reveal events past{" "}
            {chapter ? <strong>chapter {chapter}</strong> : "where you are"}.
          </span>
        </p>
      </Dialog>
    </>
  );
}
