import type { NewsPost } from "./types";

const longDate = new Intl.DateTimeFormat("en", { dateStyle: "long" });

export const formatNewsDate = (date: Date | null) => (date ? longDate.format(date) : null);

export const coverImage = (post: NewsPost) => post.blocks.find((b) => b.type === "image")?.src ?? null;

/** The first real paragraph, for the featured card's preview. */
export const leadText = (post: NewsPost) => post.blocks.find((b) => b.type === "paragraph")?.text ?? null;
