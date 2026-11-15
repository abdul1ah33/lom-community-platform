import { useSyncExternalStore } from "react";

/**
 * How much eye candy this device can afford.
 *
 * "full": the whole show.
 * "low":  older or low-memory phones, or any device that could not keep a smooth
 *         frame rate. The ambient background holds still and decorative loops stop.
 *
 * The tier is written to <html data-perf="..."> so CSS can react to it, and is
 * remembered so a slow phone starts in "low" on its next visit instead of lagging
 * through the first few seconds again.
 */
export type PerfTier = "full" | "low";

const STORAGE_KEY = "lom.perf_tier";

/** Phones and tablets: no hover, finger-sized pointer. */
export const isTouchDevice =
  typeof window !== "undefined" && window.matchMedia("(hover: none) and (pointer: coarse)").matches;

let tier: PerfTier = "full";
const listeners = new Set<() => void>();

function setTier(next: PerfTier) {
  if (next === tier) return;
  tier = next;
  document.documentElement.dataset.perf = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* storage unavailable: the tier only lasts for this page */
  }
  listeners.forEach((listener) => listener());
}

/** Hardware hints. Only Chromium reports memory, so the frame-rate probe covers the rest. */
function looksLowEnd(): boolean {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return true;
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) return true;
  return isTouchDevice && nav.hardwareConcurrency > 0 && nav.hardwareConcurrency <= 4;
}

/**
 * Counts frames for two seconds once the page has settled. Under 40 fps means the
 * effects cost more than the device has, so it drops to "low".
 */
function probeFrameRate() {
  const DURATION = 2000;
  let start = 0;
  let last = 0;
  let frames = 0;

  const tick = (now: number) => {
    // A long gap means the tab was hidden, not that the device is slow: give up.
    if (last && now - last > 500) return;
    if (!start) start = now;
    last = now;
    frames += 1;

    if (now - start < DURATION) {
      requestAnimationFrame(tick);
      return;
    }
    const fps = ((frames - 1) * 1000) / (now - start);
    if (fps < 40) setTier("low");
  };

  window.setTimeout(() => requestAnimationFrame(tick), 2500);
}

/** Call once before the first render, so the first paint already uses the right tier. */
export function initPerformanceTier() {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }

  const initial: PerfTier = saved === "low" || looksLowEnd() ? "low" : "full";
  tier = initial;
  document.documentElement.dataset.perf = initial;

  if (initial === "full") probeFrameRate();
}

export function getPerfTier(): PerfTier {
  return tier;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Re-renders when the frame-rate probe downgrades the device. */
export function usePerfTier(): PerfTier {
  return useSyncExternalStore(subscribe, getPerfTier, getPerfTier);
}

/**
 * A blur for enter/exit animations, or nothing on phones and slow devices.
 * Animating `filter` repaints the element on every frame, which is what makes
 * older phones stutter; the fade and slide still play without it.
 *
 *   initial={{ opacity: 0, y: 12, ...softBlur(6) }}
 *   animate={{ opacity: 1, y: 0, ...softBlur(0) }}
 *
 * Not for spoiler seals: those blurs hide text and must always apply.
 */
export function softBlur(px: number): { filter?: string } {
  return isTouchDevice || tier === "low" ? {} : { filter: `blur(${px}px)` };
}
