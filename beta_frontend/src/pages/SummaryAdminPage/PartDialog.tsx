import { useState, type FormEvent } from "react";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { useToast } from "@/components/feedback/ToastProvider";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { TextField } from "@/components/ui/TextField";
import {
  SummaryEditError,
  blocksToText,
  roman,
  summaryLibrary,
  textToBlocks,
  useSummaryEdit,
  useSummaryText,
  type PartDraft,
  type SummaryPart,
  type SummaryVolume,
} from "@/features/summaries";
import { FormatHelp } from "./FormatHelp";
import styles from "./SummaryAdminPage.module.css";

interface PartDialogProps {
  volume: SummaryVolume;
  /** null to add a new part at the end of the volume. */
  part: SummaryPart | null;
  onClose: () => void;
  onCreated: (part: SummaryPart) => void;
}

const FORM_ID = "part-form";
const today = () => new Date().toISOString().slice(0, 10);

/** A part's date and its optional prelude: notes read before the first chapter. */
export function PartDialog({ volume, part, onClose, onCreated }: PartDialogProps) {
  const { notify } = useToast();
  const save = useSummaryEdit((draft: PartDraft) =>
    part ? summaryLibrary.updatePart(part.id, draft) : summaryLibrary.addPart(volume.number, draft),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const nextNumber = Math.max(0, ...volume.parts.map((p) => p.number)) + 1;

  const onSave = (draft: PartDraft) => {
    setErrors({});
    save.mutate(draft, {
      onSuccess: (saved) => {
        notify(part ? `Part ${roman(saved.number)} saved.` : `Part ${roman(saved.number)} added. Now write its chapters.`);
        if (!part) onCreated(saved);
        onClose();
      },
      onError: (error) => {
        if (error instanceof SummaryEditError && error.field) setErrors({ [error.field]: error.message });
        else notify(error instanceof Error ? error.message : "The part couldn't be saved.", "error");
      },
    });
  };

  return (
    <Dialog
      open
      size="xl"
      onClose={save.isPending ? () => undefined : onClose}
      title={part ? `Part ${roman(part.number)} settings` : `New part: Part ${roman(nextNumber)}`}
      description={`Volume ${roman(volume.number)} · ${volume.name}`}
      footer={
        <>
          <Button type="button" variant="ghost" onClick={onClose} disabled={save.isPending}>
            Cancel
          </Button>
          <Button type="submit" form={FORM_ID} loading={save.isPending} loadingText="Saving…">
            {part ? "Save part" : "Add part"}
          </Button>
        </>
      }
    >
      {part ? <ExistingPart part={part} errors={errors} onSubmit={onSave} /> : <PartForm initial={{ writtenAt: today(), preludeTitle: "", prelude: "" }} errors={errors} onSubmit={onSave} />}
    </Dialog>
  );
}

function ExistingPart({ part, errors, onSubmit }: { part: SummaryPart; errors: Record<string, string>; onSubmit: (draft: PartDraft) => void }) {
  const text = useSummaryText(part);
  if (text.isError) return <p className={styles.fieldError}>This part's text couldn't be loaded. Close and try again.</p>;
  if (!text.data)
    return (
      <div className={styles.status}>
        <ArcaneSigil size={90} charged />
      </div>
    );
  return (
    <PartForm
      initial={{ writtenAt: part.writtenAt, preludeTitle: part.prelude?.title ?? "", prelude: blocksToText(text.data.prelude) }}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
}

interface PartFormProps {
  initial: { writtenAt: string; preludeTitle: string; prelude: string };
  errors: Record<string, string>;
  onSubmit: (draft: PartDraft) => void;
}

function PartForm({ initial, errors, onSubmit }: PartFormProps) {
  const [writtenAt, setWrittenAt] = useState(initial.writtenAt);
  const [preludeTitle, setPreludeTitle] = useState(initial.preludeTitle);
  const [prelude, setPrelude] = useState(initial.prelude);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ writtenAt: writtenAt || today(), preludeTitle, preludeBlocks: textToBlocks(prelude) });
  };

  return (
    <form id={FORM_ID} className={styles.chapterForm} onSubmit={submit} noValidate>
      <div className={styles.chapterFields}>
        <TextField label="Finished on" type="date" value={writtenAt} onChange={(e) => setWrittenAt(e.target.value)} />
        <TextField
          label="Prelude title (optional)"
          value={preludeTitle}
          onChange={(e) => setPreludeTitle(e.target.value)}
          error={errors.preludeTitle}
        />
      </div>
      <p className={styles.hint}>
        A prelude is read before the part's first chapter, for example a recap of the previous volume. Leave the title empty
        for a part without one.
      </p>
      <textarea
        className={`${styles.body} ${styles.bodyShort}`}
        value={prelude}
        onChange={(e) => setPrelude(e.target.value)}
        placeholder="Prelude text (optional)"
        aria-label="Prelude text"
      />
      <FormatHelp headings />
    </form>
  );
}
