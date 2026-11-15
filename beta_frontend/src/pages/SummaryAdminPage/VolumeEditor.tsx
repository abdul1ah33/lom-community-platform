import { useRef, useState, type DragEvent, type FormEvent } from "react";
import { useToast } from "@/components/feedback/ToastProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { TextField } from "@/components/ui/TextField";
import {
  SummaryEditError,
  VolumeTome,
  prepareCover,
  roman,
  summaryLibrary,
  useSummaryEdit,
  type SummaryVolume,
  type VolumeDraft,
} from "@/features/summaries";
import { ConfirmDialog } from "./ConfirmDialog";
import styles from "./SummaryAdminPage.module.css";

interface VolumeEditorProps {
  /** null while creating a new volume. */
  volume: SummaryVolume | null;
  nextNumber: number;
  onSaved: (number: number) => void;
  onDeleted: () => void;
}

/** A volume's details and cover, with the 3D book from the shelf as a live preview. */
export function VolumeEditor({ volume, nextNumber, onSaved, onDeleted }: VolumeEditorProps) {
  const { notify } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [number, setNumber] = useState(String(volume?.number ?? nextNumber));
  const [name, setName] = useState(volume?.name ?? "");
  const [startChapter, setStartChapter] = useState(volume ? String(volume.startChapter) : "");
  const [authors, setAuthors] = useState(volume?.authors.join(", ") ?? "");
  const [ongoing, setOngoing] = useState(volume?.ongoing ?? true);
  const [cover, setCover] = useState(volume?.cover ?? "");
  const [coverColor, setCoverColor] = useState(volume?.coverColor ?? "#14231f");
  const [processing, setProcessing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  const save = useSummaryEdit(({ draft, existing }: { draft: VolumeDraft; existing: number | null }) =>
    summaryLibrary.saveVolume(draft, existing),
  );
  const remove = useSummaryEdit(summaryLibrary.deleteVolume);

  const draft: VolumeDraft = {
    number: Number(number),
    name,
    startChapter: Number(startChapter),
    authors: authors
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean),
    ongoing,
    cover,
    coverColor,
  };
  const preview: SummaryVolume = { ...draft, number: draft.number || nextNumber, parts: [] };

  const takeFile = async (file: File | undefined) => {
    if (!file) return;
    setProcessing(true);
    try {
      const prepared = await prepareCover(file);
      setCover(prepared.dataUrl);
      setCoverColor(prepared.color);
      setErrors((e) => {
        const next = { ...e };
        delete next.cover;
        return next;
      });
    } catch (error) {
      setErrors((e) => ({ ...e, cover: error instanceof Error ? error.message : "That picture couldn't be used." }));
    } finally {
      setProcessing(false);
    }
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragging(false);
    void takeFile(event.dataTransfer.files[0]);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setErrors({});
    save.mutate(
      { draft, existing: volume?.number ?? null },
      {
        onSuccess: (saved) => {
          notify(volume ? `Volume ${roman(saved.number)} saved.` : `Volume ${roman(saved.number)} is on the shelf.`);
          onSaved(saved.number);
        },
        onError: (error) => {
          if (error instanceof SummaryEditError && error.field) setErrors({ [error.field]: error.message });
          else notify(error instanceof Error ? error.message : "The volume couldn't be saved.", "error");
        },
      },
    );
  };

  return (
    <section className={styles.card} aria-labelledby="volume-editor-heading">
      <div className={styles.cardHead}>
        <div>
          <span className={styles.kicker}>{volume ? `Volume ${roman(volume.number)}` : "New volume"}</span>
          <h2 id="volume-editor-heading" className={styles.cardTitle}>
            {volume ? "Details & cover" : "Put a new volume on the shelf"}
          </h2>
        </div>
        {volume && (
          <button type="button" className={styles.dangerLink} onClick={() => setConfirmDelete(true)}>
            <Icon name="trash" size={15} /> Delete volume
          </button>
        )}
      </div>

      <form className={styles.volumeGrid} onSubmit={onSubmit} noValidate>
        <div className={styles.fields}>
          <div className={styles.row}>
            <TextField
              label="Volume number"
              type="number"
              min={1}
              inputMode="numeric"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              error={errors.number}
            />
            <TextField
              label="Opens at chapter"
              type="number"
              min={1}
              inputMode="numeric"
              value={startChapter}
              onChange={(e) => setStartChapter(e.target.value)}
              error={errors.startChapter}
            />
          </div>
          <TextField label="Volume name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
          <TextField
            label="Written by (separate names with commas)"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            error={errors.authors}
          />

          <label className={styles.check}>
            <input type="checkbox" checked={ongoing} onChange={(e) => setOngoing(e.target.checked)} />
            <span>
              <strong>Still being written</strong>
              <small>Shows an empty “next part” folio and an inked tail on the timeline.</small>
            </span>
          </label>

          <div className={styles.coverRow}>
            <div>
              <span className={styles.fieldLabel}>Cover picture</span>
              <p className={styles.hint}>
                Any picture works: it is cropped from the centre to the book's 2:3 shape. Portrait art about 850 × 1280 looks
                best.
              </p>
              {errors.cover && <p className={styles.fieldError}>{errors.cover}</p>}
            </div>
            <div className={styles.coverActions}>
              <Button
                type="button"
                variant="ghost"
                onClick={() => fileRef.current?.click()}
                loading={processing}
                loadingText="Preparing…"
                icon={<Icon name="camera" size={16} />}
              >
                {cover ? "Replace cover" : "Upload cover"}
              </Button>
              <label className={styles.color} title="Colour of the spine and boards, sampled from the cover">
                <input type="color" value={coverColor} onChange={(e) => setCoverColor(e.target.value)} />
                <span>Board colour</span>
              </label>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(event) => {
                void takeFile(event.target.files?.[0]);
                event.target.value = "";
              }}
            />
          </div>

          <div className={styles.formActions}>
            <Button type="submit" loading={save.isPending} loadingText="Saving…" disabled={processing}>
              {volume ? "Save volume" : "Add to the shelf"}
            </Button>
          </div>
        </div>

        <div
          className={`${styles.preview} ${dragging ? styles.dragging : ""}`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          {cover ? (
            <div className={styles.tomeWrap}>
              <VolumeTome volume={preview} sealed={false} />
            </div>
          ) : (
            <button type="button" className={styles.dropzone} onClick={() => fileRef.current?.click()}>
              <Icon name="camera" size={28} />
              <strong>Drop the cover here</strong>
              <span>or click to choose a picture</span>
            </button>
          )}
          <span className={styles.previewLabel}>Preview, as it appears on the shelf</span>
        </div>
      </form>

      {volume && (
        <ConfirmDialog
          open={confirmDelete}
          title={`Delete Volume ${roman(volume.number)}?`}
          message={`“${volume.name}”, its cover and all ${volume.parts.reduce((n, p) => n + p.chapters.length, 0)} chapter summaries in it will be removed from the shelf.`}
          confirmLabel="Delete volume"
          pending={remove.isPending}
          onCancel={() => setConfirmDelete(false)}
          onConfirm={() =>
            remove.mutate(volume.number, {
              onSuccess: () => {
                setConfirmDelete(false);
                notify(`Volume ${roman(volume.number)} was removed.`);
                onDeleted();
              },
            })
          }
        />
      )}
    </section>
  );
}
