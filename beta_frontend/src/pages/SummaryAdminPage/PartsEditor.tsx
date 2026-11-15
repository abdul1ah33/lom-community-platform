import { useState } from "react";
import { useToast } from "@/components/feedback/ToastProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  formatMonth,
  readingMinutes,
  roman,
  summaryLibrary,
  useSummaryEdit,
  type SummaryChapter,
  type SummaryPart,
  type SummaryVolume,
} from "@/features/summaries";
import { ChapterDialog } from "./ChapterDialog";
import { ConfirmDialog } from "./ConfirmDialog";
import { PartDialog } from "./PartDialog";
import styles from "./SummaryAdminPage.module.css";

interface PartsEditorProps {
  volume: SummaryVolume;
  /** The whole library, to suggest the next chapter number. */
  volumes: SummaryVolume[];
}

type Editing =
  | { kind: "chapter"; part: SummaryPart; chapter: SummaryChapter | null }
  | { kind: "part"; part: SummaryPart | null }
  | null;

type Deleting = { kind: "chapter"; part: SummaryPart; chapter: SummaryChapter } | { kind: "part"; part: SummaryPart } | null;

/** The volume's parts (folios on the shelf) and the chapters in each. */
export function PartsEditor({ volume, volumes }: PartsEditorProps) {
  const { notify } = useToast();
  const [editing, setEditing] = useState<Editing>(null);
  const [deleting, setDeleting] = useState<Deleting>(null);
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set(volume.parts.slice(0, -1).map((p) => p.id)));

  const deletePart = useSummaryEdit(summaryLibrary.deletePart);
  const deleteChapter = useSummaryEdit(({ partId, number }: { partId: string; number: number }) =>
    summaryLibrary.deleteChapter(partId, number),
  );

  const toggle = (id: string) =>
    setCollapsed((all) => {
      const next = new Set(all);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  /** After the last chapter in this part, else after the volume's last, else the volume's first. */
  const suggestNumber = (part: SummaryPart) => {
    const inPart = part.chapters.at(-1)?.number;
    if (inPart) return inPart + 1;
    const before = volume.parts.filter((p) => p.number < part.number).flatMap((p) => p.chapters);
    return before.length ? Math.max(...before.map((c) => c.number)) + 1 : volume.startChapter;
  };
  const taken = new Set(volumes.flatMap((v) => v.parts.flatMap((p) => p.chapters.map((c) => c.number))));

  const confirmDelete = () => {
    if (!deleting) return;
    const done = (message: string) => () => {
      setDeleting(null);
      notify(message);
    };
    if (deleting.kind === "part") {
      deletePart.mutate(deleting.part.id, { onSuccess: done(`Part ${roman(deleting.part.number)} was removed.`) });
    } else {
      deleteChapter.mutate(
        { partId: deleting.part.id, number: deleting.chapter.number },
        { onSuccess: done(`Chapter ${deleting.chapter.number} was removed.`) },
      );
    }
  };

  return (
    <section className={styles.card} aria-labelledby="parts-heading">
      <div className={styles.cardHead}>
        <div>
          <span className={styles.kicker}>Folios</span>
          <h2 id="parts-heading" className={styles.cardTitle}>
            Parts & chapters
          </h2>
        </div>
        <Button type="button" variant="ghost" icon={<Icon name="plus" size={16} />} onClick={() => setEditing({ kind: "part", part: null })}>
          New part
        </Button>
      </div>

      {volume.parts.length === 0 && (
        <div className={styles.empty}>
          <Icon name="scroll" size={22} />
          <p>
            No parts yet. A part is one folio on the shelf, holding a run of chapters. Add the first one, then write its
            chapters.
          </p>
        </div>
      )}

      <div className={styles.parts}>
        {volume.parts.map((part) => {
          const open = !collapsed.has(part.id);
          const range = part.chapters.length
            ? `Ch. ${part.chapters[0].number}–${part.chapters.at(-1)!.number}`
            : "No chapters yet";
          return (
            <article key={part.id} className={styles.part}>
              <header className={styles.partHead}>
                <button type="button" className={styles.partToggle} onClick={() => toggle(part.id)} aria-expanded={open}>
                  <Icon name="chevronRight" size={16} className={open ? styles.turned : undefined} />
                  <span className={styles.partNumeral}>{roman(part.number)}</span>
                  <span className={styles.partInfo}>
                    <strong>
                      Part {roman(part.number)} · {range}
                    </strong>
                    <span>
                      {part.chapters.length} chapters · {part.words.toLocaleString()} words · ~{readingMinutes(part.words)} min ·{" "}
                      {formatMonth(part.writtenAt)}
                      {part.chapters.length === 0 && " · hidden from readers until it has a chapter"}
                    </span>
                  </span>
                </button>
                <div className={styles.partActions}>
                  <button type="button" className={styles.iconButton} onClick={() => setEditing({ kind: "part", part })} title="Part settings & prelude" aria-label={`Part ${part.number} settings`}>
                    <Icon name="settings" size={16} />
                  </button>
                  <button type="button" className={`${styles.iconButton} ${styles.danger}`} onClick={() => setDeleting({ kind: "part", part })} title="Delete part" aria-label={`Delete part ${part.number}`}>
                    <Icon name="trash" size={16} />
                  </button>
                </div>
              </header>

              {open && (
                <div className={styles.partBody}>
                  {part.prelude && (
                    <div className={styles.chapterRow}>
                      <span className={styles.chapterNum}>
                        <Icon name="sparkle" size={13} />
                      </span>
                      <span className={styles.chapterName}>
                        {part.prelude.title} <em>(prelude)</em>
                      </span>
                      <div className={styles.rowActions}>
                        <button type="button" className={styles.iconButton} onClick={() => setEditing({ kind: "part", part })} aria-label="Edit prelude" title="Edit prelude">
                          <Icon name="edit" size={15} />
                        </button>
                      </div>
                    </div>
                  )}
                  <ol className={styles.chapterList}>
                    {part.chapters.map((chapter) => (
                      <li key={chapter.number} className={styles.chapterRow}>
                        <span className={styles.chapterNum}>{chapter.number}</span>
                        <span className={styles.chapterName}>{chapter.title}</span>
                        <div className={styles.rowActions}>
                          <button
                            type="button"
                            className={styles.iconButton}
                            onClick={() => setEditing({ kind: "chapter", part, chapter })}
                            aria-label={`Edit chapter ${chapter.number}`}
                            title="Edit"
                          >
                            <Icon name="edit" size={15} />
                          </button>
                          <button
                            type="button"
                            className={`${styles.iconButton} ${styles.danger}`}
                            onClick={() => setDeleting({ kind: "chapter", part, chapter })}
                            aria-label={`Delete chapter ${chapter.number}`}
                            title="Delete"
                          >
                            <Icon name="trash" size={15} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <button type="button" className={styles.addChapter} onClick={() => setEditing({ kind: "chapter", part, chapter: null })}>
                    <Icon name="plus" size={16} /> Add chapter {taken.has(suggestNumber(part)) ? "" : suggestNumber(part)}
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {editing?.kind === "chapter" && (
        <ChapterDialog
          part={editing.part}
          chapter={editing.chapter}
          suggestedNumber={suggestNumber(editing.part)}
          volumeNumber={volume.number}
          onClose={() => setEditing(null)}
        />
      )}
      {editing?.kind === "part" && (
        <PartDialog
          volume={volume}
          part={editing.part}
          onClose={() => setEditing(null)}
          onCreated={(part) => setCollapsed((all) => new Set([...all, ...volume.parts.map((p) => p.id)].filter((id) => id !== part.id)))}
        />
      )}

      <ConfirmDialog
        open={deleting !== null}
        title={deleting?.kind === "part" ? `Delete Part ${roman(deleting.part.number)}?` : `Delete chapter ${deleting?.chapter.number ?? ""}?`}
        message={
          deleting?.kind === "part"
            ? `The part and all ${deleting.part.chapters.length} chapter summaries in it will be removed from the shelf.`
            : `The summary of “${deleting?.chapter.title ?? ""}” will be removed from the shelf.`
        }
        confirmLabel="Delete"
        pending={deletePart.isPending || deleteChapter.isPending}
        onCancel={() => setDeleting(null)}
        onConfirm={confirmDelete}
      />
    </section>
  );
}
