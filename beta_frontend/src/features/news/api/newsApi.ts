import { ApiError } from "@/lib/http/ApiError";
import type { NewsBlock, NewsFeed, NewsPost, NewsSummary } from "../types";

/**
 * Reads the official bulletin board straight from lomworld.com and turns its HTML into data.
 *
 * The browser can't fetch lomworld.com itself (the site sends no CORS headers), so requests
 * go to our own `/lomworld/*` path, which the Vite dev server and Vercel forward to the
 * mobile site. The mobile site is the simpler of the two to parse.
 */
const PROXY = "/lomworld";
const OFFICIAL_ORIGIN = "https://www.lomworld.com";

async function fetchDocument(path: string): Promise<Document> {
  let response: Response;
  try {
    response = await fetch(`${PROXY}${path}`, { headers: { Accept: "text/html" } });
  } catch {
    throw ApiError.network();
  }
  if (!response.ok) {
    throw new ApiError(response.status, response.status === 404 ? "NOT_FOUND" : "UPSTREAM_ERROR", "The official site did not answer.");
  }
  // DOMParser builds an inert document: no scripts run and no images are downloaded.
  return new DOMParser().parseFromString(await response.text(), "text/html");
}

/** If the site is redesigned and our selectors stop matching, fail loudly instead of showing nothing. */
function layoutChanged(): never {
  throw new ApiError(502, "UPSTREAM_LAYOUT", "The official site's layout changed and could not be read.");
}

const clean = (text: string | null | undefined) => (text ?? "").replace(/\s+/g, " ").trim();

function readList(list: Element | undefined): NewsSummary[] {
  if (!list) return [];
  return [...list.querySelectorAll("a[href]")].flatMap((link) => {
    const id = link.getAttribute("href")?.match(/\/news\/(\d+)/)?.[1];
    const title = clean(link.querySelector("h3")?.textContent);
    if (!id || !title) return [];
    return [{ id, title, teaser: clean(link.querySelector("p")?.textContent) }];
  });
}

/** The list page has two `<ul class="main-tab-list">`: Latest News first, then Event. */
export async function fetchNewsFeed(): Promise<NewsFeed> {
  const doc = await fetchDocument("/en/news");
  const [news, events] = [...doc.querySelectorAll("ul.main-tab-list")];
  const feed = { news: readList(news), events: readList(events) };
  if (!feed.news.length && !feed.events.length) layoutChanged();
  return feed;
}

/** Only absolute http(s) links get through, so a post can't smuggle in a `javascript:` URL. */
function safeUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;
  try {
    const url = new URL(raw, OFFICIAL_ORIGIN);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

/** A line that ends a sentence (or a label) is a real break; anything else was just wrapped. */
const ENDS_LINE = /[.!?:;。！？：；"”'’)）]$/;

/**
 * Text of an element with its `<br>`s turned into line breaks. The site also uses `<br>`
 * to hard-wrap long sentences, so a break mid-sentence is joined back up with a space.
 */
function textWithBreaks(node: Node): string {
  let text = "";
  for (const child of node.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) text += child.textContent ?? "";
    else if (child.nodeName === "BR") text += "\n";
    else if (child.nodeType === Node.ELEMENT_NODE) text += textWithBreaks(child);
  }
  const lines = text
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  return lines.reduce((joined, line, i) => (i === 0 ? line : joined + (ENDS_LINE.test(lines[i - 1]) ? "\n" : " ") + line), "");
}

function mediaBlock(media: Element): NewsBlock[] {
  const src = safeUrl(media.getAttribute("src") ?? media.querySelector("source")?.getAttribute("src"));
  if (!src) return [];
  return [media.tagName === "IMG" ? { type: "image", src } : { type: "video", src }];
}

const mediaInside = (el: Element) => [...el.querySelectorAll("img, video")].flatMap(mediaBlock);

/** Walks the post's `<article>`, flattening its wrapper divs into a list of blocks. */
function readBlocks(node: Element, out: NewsBlock[] = []): NewsBlock[] {
  for (const child of node.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = clean(child.textContent);
      if (text) out.push({ type: "paragraph", text });
      continue;
    }
    if (!(child instanceof Element)) continue;

    const tag = child.tagName;
    if (tag === "IMG" || tag === "VIDEO") {
      out.push(...mediaBlock(child));
    } else if (/^H[1-6]$/.test(tag) || tag === "P") {
      const text = textWithBreaks(child);
      if (text) out.push(/^H/.test(tag) ? { type: "heading", text } : { type: "paragraph", text });
      // A paragraph occasionally wraps a picture as well.
      out.push(...mediaInside(child));
    } else {
      readBlocks(child, out);
    }
  }
  return out;
}

/** "2026/4/28" → a local date. */
function parseDate(text: string): Date | null {
  const match = text.match(/(\d{4})\D(\d{1,2})\D(\d{1,2})/);
  return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : null;
}

export async function fetchNewsPost(id: string): Promise<NewsPost> {
  const doc = await fetchDocument(`/en/news/${encodeURIComponent(id)}`);
  const title = clean(doc.querySelector(".main .title")?.textContent);
  const article = doc.querySelector(".main article");
  if (!title || !article) layoutChanged();

  return {
    id,
    title,
    date: parseDate(clean(doc.querySelector(".main .date")?.textContent)),
    blocks: readBlocks(article),
    officialUrl: `${OFFICIAL_ORIGIN}/en/news/${id}`,
  };
}
