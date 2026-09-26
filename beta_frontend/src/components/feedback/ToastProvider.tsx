import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/ui/Icon";
import styles from "./Toast.module.css";

type ToastTone = "success" | "error";

interface Toast {
  id: number;
  tone: ToastTone;
  message: string;
}

interface ToastContextValue {
  notify: (message: string, tone?: ToastTone) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => setToasts((all) => all.filter((t) => t.id !== id)), []);

  const notify = useCallback(
    (message: string, tone: ToastTone = "success") => {
      const id = ++nextId;
      setToasts((all) => [...all.slice(-2), { id, tone, message }]);
      window.setTimeout(() => dismiss(id), 4200);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className={styles.stack} role="status" aria-live="polite">
          <AnimatePresence initial={false}>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                layout
                className={`${styles.toast} ${styles[toast.tone]}`}
                initial={{ opacity: 0, y: 24, scale: 0.9, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 60, filter: "blur(6px)" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              >
                <span className={styles.icon}>
                  <Icon name={toast.tone === "success" ? "check" : "alert"} size={16} />
                </span>
                <span>{toast.message}</span>
                <button type="button" onClick={() => dismiss(toast.id)} aria-label="Dismiss">
                  ×
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside <ToastProvider>.");
  return context;
}
