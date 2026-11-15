import { useQuery } from "@tanstack/react-query";
import { summaryLibrary } from "../data/library";
import type { SummaryPart } from "../types";
import { summaryKeys } from "./useSummaryLibrary";

/** One part's written text, loaded when that part is opened. */
export function useSummaryText(part: SummaryPart) {
  return useQuery({
    queryKey: summaryKeys.text(part.id),
    queryFn: () => summaryLibrary.text(part.id),
    // Only the summary desk changes it, and it refreshes this query when it does.
    staleTime: Infinity,
  });
}
