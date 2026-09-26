import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useBlocker, useNavigate } from "react-router-dom";
import { useToast } from "@/components/feedback/ToastProvider";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { TextAreaField } from "@/components/ui/TextAreaField";
import { TextField } from "@/components/ui/TextField";
import { CHARACTER_SUGGESTIONS } from "@/data/lore/reading";
import { ApiError } from "@/lib/http/ApiError";
import { arcanaFor } from "../arcana";
import { diffDraft, draftFromProfile, validateDraft, type DraftErrors, type ProfileDraft } from "../editDraft";
import { useUpdateProfile } from "../hooks/useProfile";
import { PROFILE_LIMITS, type UserProfile } from "../types";
import { ArcanaCard } from "./ArcanaCard";
import { AvatarUploader } from "./AvatarUploader";
import { ChapterInput } from "./ChapterInput";
import { PathwayPicker } from "./PathwayPicker";
import { ReadingProgressRing } from "./ReadingProgressRing";
import styles from "./EditProfileForm.module.css";

function Section({ title, hint, id, children }: { title: string; hint: string; id: string; children: ReactNode }) {
  return (
    <motion.section
      className={styles.section}
      aria-labelledby={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className={styles.sectionHeader}>
        <h2 id={id}>{title}</h2>
        <p>{hint}</p>
      </header>
      {children}
    </motion.section>
  );
}

export function EditProfileForm({ profile }: { profile: UserProfile }) {
  const navigate = useNavigate();
  const { notify } = useToast();
  const update = useUpdateProfile();

  const [draft, setDraft] = useState<ProfileDraft>(() => draftFromProfile(profile));
  const [errors, setErrors] = useState<DraftErrors>({});
  const [savedTo, setSavedTo] = useState<string | null>(null);

  const changes = useMemo(() => diffDraft(draft, profile), [draft, profile]);
  const dirty = Object.keys(changes).length > 0;

  const set = <K extends keyof ProfileDraft>(field: K, value: ProfileDraft[K]) => {
    setDraft((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  // Guard against losing edits: in-app navigation and tab close.
  const blocker = useBlocker(({ currentLocation, nextLocation }) =>
    dirty && !update.isPending && currentLocation.pathname !== nextLocation.pathname,
  );
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  // Leave only after the saved draft has rendered clean, so the blocker lets us through.
  useEffect(() => {
    if (savedTo && !dirty) navigate(savedTo);
  }, [savedTo, dirty, navigate]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const clientErrors = validateDraft(draft);
    if (Object.keys(clientErrors).length) return setErrors(clientErrors);
    if (!dirty) return;

    update.mutate(changes, {
      onSuccess: (saved) => {
        setDraft(draftFromProfile(saved));
        notify("Profile saved. The fog remembers.");
        setSavedTo(`/u/${saved.username}`);
      },
      onError: (error) => {
        if (error instanceof ApiError && error.fieldErrors.length) {
          setErrors(Object.fromEntries(error.fieldErrors.map((f) => [f.field, f.message])) as DraftErrors);
        }
        notify(error instanceof ApiError ? error.message : "Could not save your profile.", "error");
      },
    });
  };

  // Preview against the chapter being edited, so pathways unseal live as the slider moves.
  const previewPathway = arcanaFor({ id: profile.id, favorite_pathway: draft.favorite_pathway }, draft.current_chapter);

  return (
    <form className={styles.layout} onSubmit={onSubmit} noValidate>
      <div className={styles.sections}>
        <Section id="edit-identity" title="Identity" hint="How the table sees you.">
          <AvatarUploader username={profile.username} avatarUrl={profile.avatar_url} />
          <div className={styles.twoCol}>
            <TextField
              label="Display name"
              icon="user"
              value={draft.display_name}
              maxLength={PROFILE_LIMITS.displayName}
              onChange={(e) => set("display_name", e.target.value)}
              error={errors.display_name}
            />
            <TextField
              label="Location"
              icon="mapPin"
              value={draft.location}
              maxLength={PROFILE_LIMITS.location}
              onChange={(e) => set("location", e.target.value)}
              error={errors.location}
            />
          </div>
          <TextAreaField
            label="Bio"
            value={draft.bio}
            maxLength={PROFILE_LIMITS.bio}
            placeholder="Your theories, your favourite arc, why you joined…"
            onChange={(e) => set("bio", e.target.value)}
            error={errors.bio}
            rows={4}
          />
        </Section>

        <Section id="edit-lore" title="Lore" hint="Your pathway colours your whole profile. Click it again to clear.">
          <PathwayPicker
            labelledBy="edit-lore"
            readerChapter={draft.current_chapter}
            value={draft.favorite_pathway}
            onChange={(slug) => set("favorite_pathway", slug)}
          />
          <TextField
            label="Favourite character"
            icon="heart"
            list="character-suggestions"
            value={draft.favorite_character}
            maxLength={PROFILE_LIMITS.favoriteCharacter}
            onChange={(e) => set("favorite_character", e.target.value)}
            error={errors.favorite_character}
          />
          <datalist id="character-suggestions">
            {CHARACTER_SUGGESTIONS.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </Section>

        <Section
          id="edit-reading"
          title="Reading progress"
          hint="The last chapter you finished. Spoilers beyond it will be hidden from your feed."
        >
          <ChapterInput
            id="chapter-input"
            value={draft.current_chapter}
            onChange={(chapter) => set("current_chapter", chapter)}
            error={errors.current_chapter}
          />
        </Section>
      </div>

      <aside className={styles.preview} aria-label="Live preview">
        <span className={styles.previewLabel}>Live preview</span>
        <ArcanaCard
          username={profile.username}
          avatarUrl={profile.avatar_url}
          pathway={previewPathway}
          size="lg"
        />
        <ReadingProgressRing chapter={draft.current_chapter} size={150} hue={previewPathway.hue} />
      </aside>

      <AnimatePresence>
        {dirty && (
          <motion.div
            className={styles.saveBar}
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <span className={styles.saveHint}>
              <span className={styles.dot} /> Unsaved changes
            </span>
            <div className={styles.saveActions}>
              <Button type="button" variant="ghost" onClick={() => setDraft(draftFromProfile(profile))} disabled={update.isPending}>
                Discard
              </Button>
              <Button type="submit" loading={update.isPending} loadingText="Saving…">
                Save changes
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog
        open={blocker.state === "blocked"}
        onClose={() => blocker.reset?.()}
        title="Leave without saving?"
        description="Your changes will be lost to the fog."
        footer={
          <>
            <Button type="button" variant="ghost" onClick={() => blocker.reset?.()}>
              Keep editing
            </Button>
            <Button type="button" onClick={() => blocker.proceed?.()}>
              Discard changes
            </Button>
          </>
        }
      >
        <p className={styles.dialogText}>You have edits that haven't been saved yet.</p>
      </Dialog>
    </form>
  );
}
