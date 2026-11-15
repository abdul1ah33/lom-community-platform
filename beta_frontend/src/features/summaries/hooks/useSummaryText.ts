import { useQuery } from "@tanstack/react-query";
import type { SummaryPart, SummaryText } from "../types";

/**
 * Each part's text is a separate chunk, so Vite only downloads it when that part is opened.
 * When the summaries move to the backend, swap this for a fetch and nothing else changes.
 */
const files = import.meta.glob<SummaryText>("../data/text/*.json", { import: "default" });

function loadSummaryText(partId: string): Promise<SummaryText> {
  const load = files[`../data/text/${partId}.json`];
  if (!load) return Promise.reject(new Error(`No summary text for part ${partId}`));
  return load();
}

export function useSummaryText(part: SummaryPart) {
  return useQuery({
    queryKey: ["summary-text", part.id],
    queryFn: () => loadSummaryText(part.id),
    // The text never changes while the site is open.
    staleTime: Infinity,
  });
}
