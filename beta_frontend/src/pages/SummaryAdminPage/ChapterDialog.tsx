import { useState, type FormEvent } from "react";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { useToast } from "@/components/feedback/ToastProvider";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { TextField } from "@/components/ui/TextField";
import {
  ChapterText,
  SummaryEditError,
  blocksToText,
  countWords,
  roman,
  summaryLibrary,
  textToBlocks,
  useSummaryEdit,
  useSummaryText,
  type ChapterDraft,
  type SummaryChapter,
  type SummaryPart,
} from "@/features/summaries";
import { FormatHelp } from "./FormatHelp";
import styles from "./SummaryAdminPage.module.css";

interface ChapterDialogProps {
  part: SummaryPart;
  /** null to add a new chapter. */
  chapter: SummaryChapter | null;
  suggestedNumber: number;
  volumeNumber: number;
  onClose: () => void;
}

const FORM_ID = "chapter-form";

/** Write or rewrite one chapter's summary, with a preview set exactly as readers see it. */
export function ChapterDialog({ part, chapter, suggestedNumber, volumeNumber, onClose }: ChapterDialogProps) {
  const text = useSummaryText(part);
  const { notify } = useToast();
  const save = useSummaryEdit(({ draft, existing }: { draft: ChapterDraft; existing: number | null }) =>
    summaryLibrary.saveChapter(part.id, draft, existing),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSave = (draft: ChapterDraft) => {
    setErrors({});
    save.mutate(
      { draft, existing: chapter?.number ?? null },
      {
        onSuccess: (saved) => {
          notify(chapter ? `Chapter ${saved.number} saved.` : `Chapter ${saved.number} added to Part ${roman(part.number)}.`);
          onClose();
        },
        onError: (error) => {
          if (error instanceof SummaryEditError && error.field) setErrors({ [error.field]: error.message });
          else notify(error instanceof Error ? error.message : "The chapter couldn't be saved.", "error");
        },
      },
    );
  };

  const ready = chapter === null || text.data;

  return (
    <Dialog
      open
      size="xl"
      onClose={save.isPending ? () => undefined : onClose}
      title={chapter ? `Edit chapter ${chapter.number}` : "New chapter"}
      description={`Volume ${roman(volumeNumber)} · Part ${roman(part.number)}`}
      footer={
        <>
          <Button type="button" variant="ghost" onClick={onClose} disabled={save.isPending}>
            Cancel
          </Button>
          <Button type="submit" form={FORM_ID} loading={save.isPending} loadingText="Saving…" disabled={!ready}>
            {chapter ? "Save chapter" : "Add chapter"}
          </Button>
        </>
      }
    >
      {text.isError && chapter ? (
        <p className={styles.fieldError}>This chapter's text couldn't be loaded. Close and try again.</p>
      ) : !ready ? (
        <div className={styles.status}>
          <ArcaneSigil size={90} charged />
        </div>
      ) : (
        <ChapterForm
          initial={{
            number: chapter?.number ?? suggestedNumber,
            title: chapter?.title ?? "",
            body: chapter ? blocksToText(text.data?.chapters[chapter.number] ?? []) : "",
          }}
          errors={errors}
          onSubmit={onSave}
        />
      )}
    </Dialog>
  );
}

interface ChapterFormProps {
  initial: { number: number; title: string; body: string };
  errors: Record<string, string>;
  onSubmit: (draft: ChapterDraft) => void;
}

function ChapterForm({ initial, errors, onSubmit }: ChapterFormProps) {
  const [number, setNumber] = useState(String(initial.number));
  const [title, setTitle] = useState(initial.title);
  const [body, setBody] = useState(initial.body);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const blocks = textToBlocks(body);
  const words = countWords(blocks);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ number: Number(number), title, blocks });
  };

  return (
    <form id={FORM_ID} className={styles.chapterForm} onSubmit={submit} noValidate>
      <div className={styles.chapterFields}>
        <TextField
          label="Chapter number"
          type="number"
          min={1}
          inputMode="numeric"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          error={errors.number}
        />
        <TextField label="Chapter title" value={title} onChange={(e) => setTitle(e.target.value)} error={errors.title} />
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Editor view">
        <button type="button" role="tab" aria-selected={tab === "write"} className={tab === "write" ? styles.tabActive : ""} onClick={() => setTab("write")}>
          Write
        </button>
        <button type="button" role="tab" aria-selected={tab === "preview"} className={tab === "preview" ? styles.tabActive : ""} onClick={() => setTab("preview")}>
          Preview
        </button>
        <span className={styles.wordCount}>{words.toLocaleString()} words</span>
      </div>

      {tab === "write" ? (
        <>
          <textarea
            className={styles.body}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write the chapter's summary here. Leave an empty line between paragraphs."
            aria-label="Chapter summary"
            aria-invalid={!!errors.body}
            spellCheck
          />
          {errors.body && <p className={styles.fieldError}>{errors.body}</p>}
          <FormatHelp />
        </>
      ) : (
        <div className={styles.previewPage}>
          {blocks.length ? (
            <ChapterText kicker={`Chapter ${number}`} title={title || "Untitled"} blocks={blocks} />
          ) : (
            <p className={styles.hint}>Nothing written yet.</p>
          )}
        </div>
      )}
    </form>
  );
}
