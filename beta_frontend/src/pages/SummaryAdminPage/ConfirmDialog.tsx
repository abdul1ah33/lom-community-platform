import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import styles from "./SummaryAdminPage.module.css";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  pending: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

/** "Are you sure?" before anything that can't be undone. */
export function ConfirmDialog({ open, title, message, confirmLabel, pending, onCancel, onConfirm }: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={pending ? () => undefined : onCancel}
      title={title}
      footer={
        <>
          <Button type="button" variant="ghost" onClick={onCancel} disabled={pending}>
            Keep it
          </Button>
          <Button type="button" loading={pending} loadingText="Working…" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className={styles.confirmText}>{message}</p>
    </Dialog>
  );
}
