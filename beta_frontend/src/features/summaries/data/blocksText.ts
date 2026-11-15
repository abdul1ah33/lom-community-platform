import type { SummaryBlock } from "../types";

/**
 * The plain-text format the summary desk writes in, so the author never has to touch JSON:
 *
 *   A blank line starts a new paragraph.
 *   > Lines starting with ">" are a passage quoted from the novel
 *   > (one quote block per run of them, one line per paragraph inside it).
 *   ## A line starting with "##" is a small heading (used in preludes).
 *   (A paragraph wrapped in brackets is shown as the author's aside.)
 */
export function textToBlocks(source: string): SummaryBlock[] {
  const blocks: SummaryBlock[] = [];
  let paragraph: string[] = [];
  let quote: string[] | null = null;

  const flushParagraph = () => {
    if (paragraph.length) blocks.push(paragraph.join(" "));
    paragraph = [];
  };
  const flushQuote = () => {
    if (quote?.length) blocks.push({ quote });
    quote = null;
  };

  for (const raw of source.replace(/\r\n?/g, "\n").split("\n")) {
    const line = raw.trim();
    if (line.startsWith(">")) {
      flushParagraph();
      const text = line.replace(/^>\s?/, "").trim();
      quote ??= [];
      if (text) quote.push(text);
    } else if (line.startsWith("##")) {
      flushParagraph();
      flushQuote();
      const heading = line.replace(/^#+\s*/, "").trim();
      if (heading) blocks.push({ heading });
    } else if (!line) {
      flushParagraph();
      flushQuote();
    } else {
      flushQuote();
      paragraph.push(line);
    }
  }
  flushParagraph();
  flushQuote();
  return blocks;
}

export function blocksToText(blocks: SummaryBlock[]): string {
  return blocks
    .map((block) => {
      if (typeof block === "string") return block;
      if ("heading" in block) return `## ${block.heading}`;
      return block.quote.map((line) => `> ${line}`).join("\n");
    })
    .join("\n\n");
}
