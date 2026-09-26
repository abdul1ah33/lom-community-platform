import { TOTAL_CHAPTERS } from "@/data/lore/reading";
import type { FieldError } from "@/lib/http/ApiError";

export type AuthMode = "login" | "register";

export interface AuthFormValues {
  username: string;
  email: string;
  password: string;
  /** Register only: last chapter read, as typed. Empty = not started. */
  chapter: string;
}

export type AuthFormErrors = Partial<Record<keyof AuthFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Client-side checks that mirror the backend's pydantic constraints (UserCreate / LoginRequest). */
export function validateAuthForm(mode: AuthMode, values: AuthFormValues): AuthFormErrors {
  const errors: AuthFormErrors = {};

  if (mode === "register") {
    const username = values.username.trim();
    if (username.length < 3) errors.username = "At least 3 characters, Beyonder.";
    else if (username.length > 50) errors.username = "No more than 50 characters.";
  }

  if (!values.email.trim()) errors.email = "Your email is required.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "That doesn't look like a valid email.";

  if (mode === "register" && values.chapter.trim()) {
    const chapter = Number(values.chapter);
    if (!Number.isInteger(chapter) || chapter < 0 || chapter > TOTAL_CHAPTERS)
      errors.chapter = `Enter a chapter from 0 to ${TOTAL_CHAPTERS}.`;
  }

  if (!values.password) errors.password = "Your password is required.";
  else if (mode === "register" && values.password.length < 8) errors.password = "Use at least 8 characters.";
  else if (values.password.length > 128) errors.password = "No more than 128 characters.";

  return errors;
}

/** Maps backend 422 `details` (e.g. `{ field: "email", ... }`) onto form fields. */
export function mapServerFieldErrors(fieldErrors: FieldError[]): AuthFormErrors {
  const errors: AuthFormErrors = {};
  for (const { field, message } of fieldErrors) {
    if (field === "username" || field === "email" || field === "password") errors[field] = message;
    else if (field === "current_chapter") errors.chapter = message;
  }
  return errors;
}
