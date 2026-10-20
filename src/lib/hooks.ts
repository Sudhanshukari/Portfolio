"use client";

import { useSyncExternalStore } from "react";

/** Fancy pointer effects only where they make sense: a real mouse, and motion allowed. */
export const FINE_POINTER = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Subscribe to a CSS media query. Returns `serverValue` during SSR and
 * hydration, then the live value (no hydration mismatch, no effect+setState).
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}
