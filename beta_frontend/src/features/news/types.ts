/** The two tabs of the official bulletin board at lomworld.com/en/news. */
export type NewsCategory = "news" | "events";

export const NEWS_CATEGORIES: { id: NewsCategory; label: string }[] = [
  { id: "news", label: "Latest News" },
  { id: "events", label: "Events" },
];

/** One row of the official list: it only carries a title and a one-line teaser. */
export interface NewsSummary {
  id: string;
  title: string;
  teaser: string;
}

export interface NewsFeed {
  news: NewsSummary[];
  events: NewsSummary[];
}

/**
 * A post's body as plain data rather than the site's raw HTML, so it is styled
 * like the rest of the app and nothing from another site is ever injected as markup.
 */
export type NewsBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string }
  | { type: "video"; src: string };

export interface NewsPost {
  id: string;
  title: string;
  /** Publication date; null if the site left it out or changed its format. */
  date: Date | null;
  blocks: NewsBlock[];
  /** Where the post lives on the official site. */
  officialUrl: string;
}
