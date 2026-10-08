import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useWikiSearch } from "../hooks/useWiki";
import { WIKI_CATEGORIES, type WikiCategory } from "../types";
import { FandomLink } from "./FandomLink";
import { WikiEntryCard } from "./WikiEntryCard";
import styles from "./WikiBrowser.module.css";

const isCategory = (value: string | null): value is WikiCategory => WIKI_CATEGORIES.some((c) => c.id === value);

/**
 * Search and browse. Query and category live in the URL (`/wiki?q=klein&category=characters`)
 * so searches can be shared and survive a reload.
 */
export function WikiBrowser() {
  const [params, setParams] = useSearchParams();
  const rawCategory = params.get("category");
  const category = isCategory(rawCategory) ? rawCategory : null;
  const [input, setInput] = useState(params.get("q") ?? "");
  const q = useDebouncedValue(input.trim(), 250);
  const query = useWikiSearch(q, category);
  const entries = query.data?.pages.flatMap((page) => page.items) ?? [];

  const setParam = (key: string, value: string | null) =>
    setParams(
      (current) => {
        const next = new URLSearchParams(current);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true },
    );

  // Mirror the debounced search into the URL.
  useEffect(() => {
    if ((params.get("q") ?? "") !== q) setParam("q", q || null);
    // Only the debounced value should trigger this.
  }, [q]);

  return (
    <div className={styles.browser}>
      <label className={styles.search}>
        <Icon name="search" size={19} />
        <input
          type="search"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Search characters, pathways, places…"
          aria-label="Search the wiki"
          autoFocus
        />
        {input && (
          <button type="button" className={styles.clear} onClick={() => setInput("")} aria-label="Clear search">
            <Icon name="x" size={16} />
          </button>
        )}
      </label>

      <div className={styles.chips} role="group" aria-label="Category">
        {[{ id: null, label: "All" }, ...WIKI_CATEGORIES].map((c) => (
          <button
            key={c.id ?? "all"}
            type="button"
            className={`${styles.chip} ${category === c.id ? styles.chipActive : ""}`}
            aria-pressed={category === c.id}
            onClick={() => setParam("category", c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {query.isPending ? (
        <ul className={styles.grid} aria-busy="true" aria-label="Loading entries">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i} className={styles.skeleton} />
          ))}
        </ul>
      ) : query.isError ? (
        <div className={styles.state}>
          <h3>The archive is shrouded</h3>
          <p>Entries could not be loaded.</p>
          <Button variant="ghost" onClick={() => void query.refetch()}>
            Try again
          </Button>
        </div>
      ) : entries.length === 0 ? (
        <div className={styles.state}>
          <ArcaneSigil size={110} />
          <h3>No entry in our archive{q ? ` for “${q}”` : ""}</h3>
          <p>Our spoiler-safe wiki is still growing. The Fandom wiki may have it.</p>
        </div>
      ) : (
        <>
          <ul className={`${styles.grid} ${query.isPlaceholderData ? styles.stale : ""}`}>
            <AnimatePresence initial={false}>
              {entries.map((entry, index) => (
                <WikiEntryCard key={entry.slug} entry={entry} index={index} />
              ))}
            </AnimatePresence>
          </ul>
          {query.hasNextPage && (
            <Button
              variant="ghost"
              className={styles.more}
              loading={query.isFetchingNextPage}
              onClick={() => void query.fetchNextPage()}
            >
              Load more
            </Button>
          )}
        </>
      )}

      <aside className={styles.fallback}>
        <Icon name="book" size={20} />
        <p>
          {q ? "Not what you were looking for?" : "Looking for something we haven't written yet?"}
          <span>The community Fandom wiki covers everything, but it isn't spoiler-safe.</span>
        </p>
        <FandomLink query={q || undefined}>
          {q ? `Search Fandom for “${q}”` : "Browse the Fandom wiki"} <Icon name="arrowRight" size={14} />
        </FandomLink>
      </aside>
    </div>
  );
}
