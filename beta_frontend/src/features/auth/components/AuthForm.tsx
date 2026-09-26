import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { TextField } from "@/components/ui/TextField";
import { TOTAL_CHAPTERS } from "@/data/lore/reading";
import { ApiError } from "@/lib/http/ApiError";
import { useAuth } from "../hooks/useAuth";
import type { User } from "../types";
import {
  mapServerFieldErrors,
  validateAuthForm,
  type AuthFormErrors,
  type AuthFormValues,
  type AuthMode,
} from "../validation";
import styles from "./AuthForm.module.css";

interface AuthFormProps {
  /** `chapter` is the reading progress entered at sign-up (null when signing in or left blank). */
  onSuccess: (user: User, details: { chapter: number | null }) => void;
  /** Lets the page react (e.g. speed up the sigil) while a request is in flight. */
  onPendingChange?: (pending: boolean) => void;
}

const TABS: { mode: AuthMode; label: string }[] = [
  { mode: "login", label: "Sign in" },
  { mode: "register", label: "Join the Club" },
];

const COPY = {
  login: {
    title: "Welcome back",
    subtitle: "The Gray Fog parts for those who know the way.",
    submit: "Enter the Fog",
    pending: "Opening the gate…",
  },
  register: {
    title: "Join the Tarot Club",
    subtitle: "Take your seat at the long bronze table.",
    submit: "Claim your seat",
    pending: "Inscribing your name…",
  },
} as const;

const EMPTY: AuthFormValues = { username: "", email: "", password: "", chapter: "" };

export function AuthForm({ onSuccess, onPendingChange }: AuthFormProps) {
  const { login, register } = useAuth();
  const shake = useAnimationControls();

  const [mode, setMode] = useState<AuthMode>("login");
  const [values, setValues] = useState<AuthFormValues>(EMPTY);
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [banner, setBanner] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const copy = COPY[mode];

  const setPendingState = (next: boolean) => {
    setPending(next);
    onPendingChange?.(next);
  };

  const fail = (fieldErrors: AuthFormErrors, message: string | null) => {
    setErrors(fieldErrors);
    setBanner(message);
    void shake.start({ x: [0, -12, 10, -8, 6, -3, 0], transition: { duration: 0.5 } });
  };

  const switchMode = (next: AuthMode) => {
    if (next === mode || pending) return;
    setMode(next);
    setErrors({});
    setBanner(null);
  };

  const onChange = (field: keyof AuthFormValues) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (pending) return;

    const clientErrors = validateAuthForm(mode, values);
    if (Object.keys(clientErrors).length > 0) return fail(clientErrors, null);

    setBanner(null);
    setPendingState(true);
    try {
      const email = values.email.trim();
      const user =
        mode === "login"
          ? await login({ email, password: values.password })
          : await register({ username: values.username.trim(), email, password: values.password });
      const chapter = mode === "register" && values.chapter.trim() ? Number(values.chapter) : null;
      onSuccess(user, { chapter });
    } catch (error) {
      setPendingState(false);
      if (!(error instanceof ApiError)) return fail({}, "Something unexpected happened. Please try again.");

      switch (error.code) {
        case "EMAIL_ALREADY_EXISTS":
          return fail({ email: error.message }, null);
        case "USERNAME_ALREADY_EXISTS":
          return fail({ username: error.message }, null);
        case "VALIDATION_ERROR":
          return fail(mapServerFieldErrors(error.fieldErrors), error.message);
        default:
          return fail({}, error.message);
      }
    }
  };

  return (
    <motion.div animate={shake} className={styles.root}>
      <div className={styles.tabs} role="tablist" aria-label="Authentication mode">
        {TABS.map((tab) => (
          <button
            key={tab.mode}
            type="button"
            role="tab"
            aria-selected={mode === tab.mode}
            className={`${styles.tab} ${mode === tab.mode ? styles.tabActive : ""}`}
            onClick={() => switchMode(tab.mode)}
          >
            {mode === tab.mode && (
              <motion.span
                layoutId="auth-tab-pill"
                className={styles.pill}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.header
          key={mode}
          className={styles.header}
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
          transition={{ duration: 0.3 }}
        >
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
        </motion.header>
      </AnimatePresence>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <AnimatePresence initial={false}>
          {mode === "register" && (
            <motion.div
              key="username"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
            >
              <TextField
                label="Codename"
                icon="user"
                autoComplete="username"
                value={values.username}
                onChange={onChange("username")}
                error={errors.username}
                disabled={pending}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <TextField
          label="Email"
          icon="mail"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={onChange("email")}
          error={errors.email}
          disabled={pending}
        />
        <TextField
          label="Password"
          icon="lock"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          value={values.password}
          onChange={onChange("password")}
          error={errors.password}
          disabled={pending}
        />

        <AnimatePresence initial={false}>
          {mode === "register" && (
            <motion.div
              key="chapter"
              className={styles.chapter}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <TextField
                label="Last chapter you read"
                icon="book"
                type="number"
                inputMode="numeric"
                min={0}
                max={TOTAL_CHAPTERS}
                value={values.chapter}
                onChange={onChange("chapter")}
                error={errors.chapter}
                disabled={pending}
              />
              <p className={styles.chapterHint}>
                Optional. Posts and pathways past this chapter stay sealed. Leave empty if you haven't started.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {mode === "login" && (
          <div className={styles.row}>
            <span className={styles.hint}>Sessions stay open on this device.</span>
            <button type="button" className={styles.link} title="Password reset is coming soon">
              Forgot password?
            </button>
          </div>
        )}

        <AnimatePresence>
          {banner && (
            <motion.div
              role="alert"
              className={styles.banner}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
            >
              <Icon name="alert" size={18} />
              <span>{banner}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          loading={pending}
          loadingText={copy.pending}
          icon={<Icon name="arrowRight" size={18} />}
          className={styles.submit}
        >
          {copy.submit}
        </Button>
      </form>
    </motion.div>
  );
}
