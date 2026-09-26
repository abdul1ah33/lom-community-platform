import { useSyncExternalStore } from "react";

/**
 * Remembers which spoilers the reader chose to "reveal anyway" (posts, pathways, …)
 * for the rest of the browser session, reloads included. Keys are namespaced,
 * e.g. `post:<id>` or `pathway:<slug>`. Revealing in one place updates every
 * component showing the same thing.
 */
const STORAGE_KEY = "lom.revealed";

const revealed: Set<string> = (() => {
  try {
    return new Set(JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]") as string[]);
  } catch {
    return new Set<string>();
  }
})();

let version = 0;
const listeners = new Set<() => void>();

export const revealStore = {
  has: (key: string) => revealed.has(key),

  add(key: string) {
    if (revealed.has(key)) return;
    revealed.add(key);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...revealed]));
    } catch {
      /* storage unavailable: remembered until reload */
    }
    version++;
    listeners.forEach((listener) => listener());
  },
};

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Re-renders the caller whenever anything is revealed; read `revealStore.has()` afterwards. */
export function useRevealStore() {
  useSyncExternalStore(subscribe, () => version);
  return revealStore;
}
