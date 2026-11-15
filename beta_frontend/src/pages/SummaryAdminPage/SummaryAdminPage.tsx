import { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { useToast } from "@/components/feedback/ToastProvider";
import { Icon } from "@/components/ui/Icon";
import {
  SummaryEditError,
  roman,
  summaryLibrary,
  useCanEditSummaries,
  useSummaryEdit,
  useSummaryLibrary,
} from "@/features/summaries";
import { ConfirmDialog } from "./ConfirmDialog";
import { PartsEditor } from "./PartsEditor";
import { VolumeEditor } from "./VolumeEditor";
import styles from "./SummaryAdminPage.module.css";

/**
 * The summary desk: where the summaries' author adds volumes with their cover art,
 * and writes, edits and deletes chapters. Everything saves straight into the library
 * the shelf reads, so a change shows on /summaries at once.
 */
export function SummaryAdminPage() {
  const canEdit = useCanEditSummaries();
  if (!canEdit) {
    return (
      <div className={styles.status}>
        <ArcaneSigil size={120} />
        <h1>This desk is for the summaries' authors</h1>
        <p>Your account can read the summaries, but not edit them.</p>
        <Link to="/summaries" className={styles.ghostLink}>
          <Icon name="chevronLeft" size={16} /> Back to the shelf
        </Link>
      </div>
    );
  }
  return <Desk />;
}

function Desk() {
  const library = useSummaryLibrary();
  const { notify } = useToast();
  const [params, setParams] = useSearchParams();
  const importRef = useRef<HTMLInputElement>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const importFile = useSummaryEdit(summaryLibrary.importFile);
  const reset = useSummaryEdit(summaryLibrary.reset);

  if (library.isError) {
    return (
      <div className={styles.status}>
        <p>The library couldn't be opened.</p>
        <button type="button" className={styles.ghostLink} onClick={() => library.refetch()}>
          Try again
        </button>
      </div>
    );
  }
  if (!library.data) {
    return (
      <div className={styles.status}>
        <ArcaneSigil size={120} charged />
      </div>
    );
  }

  const volumes = library.data;
  const selectedParam = params.get("vol");
  const creating = selectedParam === "new" || volumes.length === 0;
  const volume = creating ? null : (volumes.find((v) => String(v.number) === selectedParam) ?? volumes[volumes.length - 1]);
  const nextNumber = Math.max(0, ...volumes.map((v) => v.number)) + 1;

  const select = (value: number | "new") => setParams({ vol: String(value) }, { replace: true });

  const onExport = async () => {
    const blob = await summaryLibrary.exportFile();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `lom-summaries-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const onImport = (file: File | undefined) => {
    if (!file) return;
    importFile.mutate(file, {
      onSuccess: () => {
        notify("Library restored from the file.");
        setParams({}, { replace: true });
      },
      onError: (error) => notify(error instanceof SummaryEditError ? error.message : "That file couldn't be read.", "error"),
    });
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>
            <Icon name="quill" size={15} /> Summary desk
          </span>
          <h1 className={styles.title}>
            Edit the <span className={styles.glyph}>Chronicle</span>
          </h1>
          <p className={styles.subtitle}>
            Add a volume with its cover, then write its chapters. Every save appears on the shelf straight away.
          </p>
        </div>
        <div className={styles.toolbar}>
          <Link to={volume ? `/summaries?vol=${volume.number}` : "/summaries"} className={styles.ghostLink}>
            <Icon name="eye" size={16} /> View the shelf
          </Link>
          <button type="button" className={styles.ghostLink} onClick={onExport} title="Download everything as one file">
            <Icon name="download" size={16} /> Back up
          </button>
          <button
            type="button"
            className={styles.ghostLink}
            onClick={() => importRef.current?.click()}
            disabled={importFile.isPending}
            title="Replace the library with a backup file"
          >
            <Icon name="external" size={16} /> Restore
          </button>
          <input
            ref={importRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(event) => {
              onImport(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
        </div>
      </header>

      <div className={styles.layout}>
        <nav className={styles.shelf} aria-label="Volumes">
          {volumes.map((v) => (
            <button
              key={v.number}
              type="button"
              className={`${styles.shelfItem} ${v === volume ? styles.shelfActive : ""}`}
              onClick={() => select(v.number)}
              aria-current={v === volume}
            >
              <img src={v.cover} alt="" className={styles.thumb} style={{ background: v.coverColor }} />
              <span className={styles.shelfText}>
                <span className={styles.shelfKicker}>Volume {roman(v.number)}</span>
                <span className={styles.shelfName}>{v.name}</span>
                <span className={styles.shelfMeta}>
                  {v.parts.length} {v.parts.length === 1 ? "part" : "parts"} ·{" "}
                  {v.parts.reduce((n, p) => n + p.chapters.length, 0)} chapters
                </span>
              </span>
            </button>
          ))}
          <button
            type="button"
            className={`${styles.shelfItem} ${styles.shelfNew} ${creating ? styles.shelfActive : ""}`}
            onClick={() => select("new")}
            aria-current={creating}
          >
            <span className={styles.thumbNew}>
              <Icon name="plus" size={20} />
            </span>
            <span className={styles.shelfText}>
              <span className={styles.shelfName}>New volume</span>
              <span className={styles.shelfMeta}>With its own cover</span>
            </span>
          </button>
          <button type="button" className={styles.resetLink} onClick={() => setConfirmReset(true)}>
            Reset to the shipped shelf
          </button>
        </nav>

        <div className={styles.main}>
          <VolumeEditor
            key={volume ? volume.number : "new"}
            volume={volume}
            nextNumber={nextNumber}
            onSaved={(n) => select(n)}
            onDeleted={() => setParams({}, { replace: true })}
          />
          {volume && <PartsEditor volume={volume} volumes={volumes} />}
        </div>
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Reset the library?"
        message="Every volume, part and chapter added or changed on this desk will be removed, and the shelf goes back to what ships with the site. Back up first if you might want them again."
        confirmLabel="Reset"
        pending={reset.isPending}
        onCancel={() => setConfirmReset(false)}
        onConfirm={() =>
          reset.mutate(undefined, {
            onSuccess: () => {
              setConfirmReset(false);
              setParams({}, { replace: true });
              notify("The shelf is back to how it ships.");
            },
          })
        }
      />
    </div>
  );
}
