import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type DragEvent } from "react";
import { useToast } from "@/components/feedback/ToastProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { Spinner } from "@/components/ui/Spinner";
import { ApiError } from "@/lib/http/ApiError";
import { resizeImage } from "@/lib/image/resizeImage";
import { useAvatarMutations } from "../hooks/useProfile";
import { PROFILE_LIMITS } from "../types";
import styles from "./AvatarUploader.module.css";

const ACCEPTED = ["image/png", "image/jpeg", "image/webp", "image/gif"];

interface AvatarUploaderProps {
  username: string;
  avatarUrl: string | null;
}

/** Drag-and-drop or click to replace the avatar. Uploads immediately, separate from the form's Save. */
export function AvatarUploader({ username, avatarUrl }: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, remove } = useAvatarMutations();
  const { notify } = useToast();
  const [dragging, setDragging] = useState(false);
  const busy = upload.isPending || remove.isPending;

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) return notify("Use a PNG, JPEG, WebP or GIF image.", "error");
    if (file.size > PROFILE_LIMITS.avatarBytes * 5) return notify("That image is too large (max 10 MB before resizing).", "error");

    const blob = await resizeImage(file);
    if (blob.size > PROFILE_LIMITS.avatarBytes) return notify("Avatar must be 2 MB or smaller.", "error");

    upload.mutate(blob, {
      onSuccess: () => notify("A new face above the Gray Fog."),
      onError: (error) => notify(error instanceof ApiError ? error.message : "Upload failed.", "error"),
    });
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragging(false);
    void handleFile(event.dataTransfer.files[0]);
  };

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={`${styles.drop} ${dragging ? styles.dragging : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        disabled={busy}
        aria-label="Upload a new avatar"
      >
        <Avatar name={username} src={avatarUrl} size={104} ring />
        <span className={styles.overlay}>
          <Icon name="camera" size={22} />
        </span>
        <AnimatePresence>
          {busy && (
            <motion.span className={styles.busy} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Spinner size={26} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <div className={styles.copy}>
        <strong>Profile picture</strong>
        <span>Drop an image here or click the portrait. PNG, JPEG, WebP or GIF, resized to 512 px.</span>
        <div className={styles.buttons}>
          <button type="button" className={styles.link} onClick={() => inputRef.current?.click()} disabled={busy}>
            <Icon name="camera" size={15} /> Upload new
          </button>
          {avatarUrl && (
            <button
              type="button"
              className={`${styles.link} ${styles.danger}`}
              disabled={busy}
              onClick={() =>
                remove.mutate(undefined, {
                  onSuccess: () => notify("Avatar removed."),
                  onError: () => notify("Could not remove the avatar.", "error"),
                })
              }
            >
              <Icon name="trash" size={15} /> Remove
            </button>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="visually-hidden"
        tabIndex={-1}
        onChange={(event) => {
          void handleFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
    </div>
  );
}
