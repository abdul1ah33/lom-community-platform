import type { SummaryBlock, SummaryChapter, SummaryPart, SummaryText, SummaryVolume } from "../types";
import { keyValueStore } from "./keyValueStore";
import { SEED_VOLUMES } from "./volumes";

/**
 * The summaries library, kept in the browser until the backend has a summaries API.
 * Volumes, parts and the chapter index live under one key; each part's text under its
 * own, written only once that part is edited (until then the bundled text is used).
 * When the backend arrives, these functions become HTTP calls and nothing else changes.
 */

export interface VolumeDraft {
  number: number;
  name: string;
  startChapter: number;
  authors: string[];
  ongoing: boolean;
  cover: string;
  coverColor: string;
}

export interface PartDraft {
  writtenAt: string;
  /** Empty means the part has no prelude. */
  preludeTitle: string;
  preludeBlocks: SummaryBlock[];
}

export interface ChapterDraft {
  number: number;
  title: string;
  blocks: SummaryBlock[];
}

/** A rejected edit; `field` names the form field to show it under. */
export class SummaryEditError extends Error {
  constructor(
    message: string,
    readonly field?: string,
  ) {
    super(message);
  }
}

const VOLUMES_KEY = "volumes";
const textKey = (partId: string) => `text:${partId}`;
const EXPORT_FORMAT = "lom-summaries";

const bundledText = import.meta.glob<SummaryText>("./text/*.json", { import: "default" });

const emptyText = (): SummaryText => ({ prelude: [], chapters: {} });

async function readVolumes(): Promise<SummaryVolume[]> {
  return (await keyValueStore.get<SummaryVolume[]>(VOLUMES_KEY)) ?? structuredClone(SEED_VOLUMES);
}

async function writeVolumes(volumes: SummaryVolume[]) {
  volumes.sort((a, b) => a.number - b.number);
  for (const volume of volumes) volume.parts.sort((a, b) => a.number - b.number);
  await keyValueStore.set(VOLUMES_KEY, volumes);
}

async function readText(partId: string): Promise<SummaryText> {
  const stored = await keyValueStore.get<SummaryText>(textKey(partId));
  if (stored) return stored;
  const load = bundledText[`./text/${partId}.json`];
  return load ? structuredClone(await load()) : emptyText();
}

const blockWords = (block: SummaryBlock): string[] =>
  typeof block === "string" ? [block] : "heading" in block ? [block.heading] : block.quote;

export function countWords(blocks: SummaryBlock[]) {
  return blocks.flatMap(blockWords).reduce((n, text) => n + (text.match(/\S+/g)?.length ?? 0), 0);
}

const textWords = (text: SummaryText) =>
  countWords(text.prelude) + Object.values(text.chapters).reduce((n, blocks) => n + countWords(blocks), 0);

// Edits run one at a time, so two quick saves can't overwrite each other.
let queue: Promise<unknown> = Promise.resolve();
function exclusive<T>(task: () => Promise<T>): Promise<T> {
  const result = queue.then(task);
  queue = result.catch(() => undefined);
  return result;
}

function locatePart(volumes: SummaryVolume[], partId: string) {
  for (const volume of volumes) {
    const part = volume.parts.find((p) => p.id === partId);
    if (part) return { volume, part };
  }
  throw new SummaryEditError("That part no longer exists. It may have been deleted in another tab.");
}

function chapterOwner(volumes: SummaryVolume[], number: number) {
  for (const volume of volumes) {
    for (const part of volume.parts) {
      if (part.chapters.some((c) => c.number === number)) return { volume, part };
    }
  }
  return null;
}

function checkVolume(draft: VolumeDraft) {
  if (!Number.isInteger(draft.number) || draft.number < 1)
    throw new SummaryEditError("Use a whole number, 1 or more.", "number");
  if (!draft.name.trim()) throw new SummaryEditError("Give the volume its name.", "name");
  if (!Number.isInteger(draft.startChapter) || draft.startChapter < 1)
    throw new SummaryEditError("Use the chapter number the volume opens with.", "startChapter");
  if (draft.authors.length === 0) throw new SummaryEditError("Name at least one author.", "authors");
  if (!draft.cover) throw new SummaryEditError("Add the volume's cover picture.", "cover");
}

function checkChapter(draft: ChapterDraft) {
  if (!Number.isInteger(draft.number) || draft.number < 1)
    throw new SummaryEditError("Use the chapter's number in the novel.", "number");
  if (!draft.title.trim()) throw new SummaryEditError("Give the chapter its title.", "title");
  if (countWords(draft.blocks) === 0) throw new SummaryEditError("Write the chapter's summary first.", "body");
}

/** Saves a part's text and keeps its word count in step with it. */
async function writeText(part: SummaryPart, text: SummaryText) {
  await keyValueStore.set(textKey(part.id), text);
  part.words = textWords(text);
}

export const summaryLibrary = {
  volumes: readVolumes,
  text: readText,

  /** Creates a volume (`existing` null) or updates the one numbered `existing`. */
  saveVolume: (draft: VolumeDraft, existing: number | null) =>
    exclusive(async () => {
      checkVolume(draft);
      const volumes = await readVolumes();
      const clash = volumes.find((v) => v.number === draft.number && v.number !== existing);
      if (clash) throw new SummaryEditError(`Volume ${draft.number} is already on the shelf.`, "number");

      const fields = {
        number: draft.number,
        name: draft.name.trim(),
        startChapter: draft.startChapter,
        authors: draft.authors,
        ongoing: draft.ongoing,
        cover: draft.cover,
        coverColor: draft.coverColor,
      };
      let volume = volumes.find((v) => v.number === existing);
      if (volume) Object.assign(volume, fields);
      else volumes.push((volume = { ...fields, parts: [] }));
      await writeVolumes(volumes);
      return volume;
    }),

  deleteVolume: (number: number) =>
    exclusive(async () => {
      const volumes = await readVolumes();
      const volume = volumes.find((v) => v.number === number);
      if (!volume) return;
      await Promise.all(volume.parts.map((p) => keyValueStore.delete(textKey(p.id))));
      await writeVolumes(volumes.filter((v) => v !== volume));
    }),

  addPart: (volumeNumber: number, draft: PartDraft) =>
    exclusive(async () => {
      const volumes = await readVolumes();
      const volume = volumes.find((v) => v.number === volumeNumber);
      if (!volume) throw new SummaryEditError("That volume no longer exists.");

      const number = Math.max(0, ...volume.parts.map((p) => p.number)) + 1;
      const taken = new Set(volumes.flatMap((v) => v.parts.map((p) => p.id)));
      let id = `v${volume.number}-p${number}`;
      // A deleted part's id may still be remembered by readers' spoiler reveals; never reuse one in use.
      while (taken.has(id)) id = `v${volume.number}-p${number}-${Math.random().toString(36).slice(2, 6)}`;

      const part: SummaryPart = {
        id,
        number,
        words: 0,
        writtenAt: draft.writtenAt,
        ...(draft.preludeTitle.trim() ? { prelude: { title: draft.preludeTitle.trim() } } : {}),
        chapters: [],
      };
      volume.parts.push(part);
      await writeText(part, { prelude: draft.preludeBlocks, chapters: {} });
      await writeVolumes(volumes);
      return part;
    }),

  updatePart: (partId: string, draft: PartDraft) =>
    exclusive(async () => {
      const volumes = await readVolumes();
      const { part } = locatePart(volumes, partId);
      const title = draft.preludeTitle.trim();
      if (!title && countWords(draft.preludeBlocks) > 0)
        throw new SummaryEditError("Give the prelude a title, or clear its text.", "preludeTitle");

      part.writtenAt = draft.writtenAt;
      if (title) part.prelude = { title };
      else delete part.prelude;
      const text = await readText(partId);
      await writeText(part, { ...text, prelude: title ? draft.preludeBlocks : [] });
      await writeVolumes(volumes);
      return part;
    }),

  deletePart: (partId: string) =>
    exclusive(async () => {
      const volumes = await readVolumes();
      const { volume, part } = locatePart(volumes, partId);
      volume.parts = volume.parts.filter((p) => p !== part);
      await keyValueStore.delete(textKey(partId));
      await writeVolumes(volumes);
    }),

  /** Adds a chapter to the part (`existing` null) or replaces chapter `existing` in it. */
  saveChapter: (partId: string, draft: ChapterDraft, existing: number | null) =>
    exclusive(async () => {
      checkChapter(draft);
      const volumes = await readVolumes();
      const { part } = locatePart(volumes, partId);
      const owner = draft.number === existing ? null : chapterOwner(volumes, draft.number);
      if (owner)
        throw new SummaryEditError(
          `Chapter ${draft.number} is already summarized in Volume ${owner.volume.number}, Part ${owner.part.number}.`,
          "number",
        );

      const text = await readText(partId);
      const chapter: SummaryChapter = { number: draft.number, title: draft.title.trim() };
      part.chapters = part.chapters.filter((c) => c.number !== existing);
      part.chapters.push(chapter);
      part.chapters.sort((a, b) => a.number - b.number);
      if (existing !== null) delete text.chapters[existing];
      text.chapters[draft.number] = draft.blocks;
      await writeText(part, text);
      await writeVolumes(volumes);
      return chapter;
    }),

  deleteChapter: (partId: string, number: number) =>
    exclusive(async () => {
      const volumes = await readVolumes();
      const { part } = locatePart(volumes, partId);
      const text = await readText(partId);
      part.chapters = part.chapters.filter((c) => c.number !== number);
      delete text.chapters[number];
      await writeText(part, text);
      await writeVolumes(volumes);
    }),

  /** Everything, texts included, as one JSON file: a backup, or a way to move the library between browsers. */
  exportFile: async () => {
    const volumes = await readVolumes();
    const texts: Record<string, SummaryText> = {};
    for (const { id } of volumes.flatMap((v) => v.parts)) texts[id] = await readText(id);
    const file = { format: EXPORT_FORMAT, version: 1, exportedAt: new Date().toISOString(), volumes, texts };
    return new Blob([JSON.stringify(file)], { type: "application/json" });
  },

  importFile: (file: File) =>
    exclusive(async () => {
      let data: { format?: unknown; volumes?: unknown; texts?: unknown };
      try {
        data = JSON.parse(await file.text());
      } catch {
        throw new SummaryEditError("That file isn't a summaries export.");
      }
      if (data.format !== EXPORT_FORMAT || !Array.isArray(data.volumes) || typeof data.texts !== "object" || !data.texts)
        throw new SummaryEditError("That file isn't a summaries export.");

      const volumes = data.volumes as SummaryVolume[];
      const texts = data.texts as Record<string, SummaryText>;
      await keyValueStore.clear();
      for (const part of volumes.flatMap((v) => v.parts)) {
        await keyValueStore.set(textKey(part.id), texts[part.id] ?? emptyText());
      }
      await writeVolumes(volumes);
    }),

  /** Back to the shelf as it ships with the site. */
  reset: () => exclusive(() => keyValueStore.clear()),
};
