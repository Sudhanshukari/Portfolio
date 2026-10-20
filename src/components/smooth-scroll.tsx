"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode, type RefObject } from "react";
import { REDUCED_MOTION } from "@/lib/hooks";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

/**
 * Smooth scrolling via Lenis. Not started at all when the visitor prefers
 * reduced motion, so the page falls back to plain native scrolling.
 * `anchors: true` makes in-page links (#work, #contact...) glide too.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.1, stopInertiaOnNavigate: true });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContext value={lenisRef}>{children}</LenisContext>;
}

/**
 * Scroll the page to an element: glides through Lenis when it is running,
 * otherwise a plain jump (reduced motion). `offset` is in pixels (negative = stop above).
 */
export function useScrollTo() {
  const lenisRef = useContext(LenisContext);
  return useCallback(
    (el: HTMLElement, offset = 0) => {
      const lenis = lenisRef?.current;
      if (lenis) {
        lenis.scrollTo(el, { offset, duration: 1.2 });
      } else {
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "auto" });
      }
    },
    [lenisRef],
  );
}

/** How many overlays currently hold the scroll lock (the category panel and the lightbox stack). */
let lockCount = 0;

/**
 * Freeze page scrolling while `locked` is true (category panel, lightbox).
 * Counted, so closing the lightbox over an open panel keeps the page frozen.
 */
export function useScrollLock(locked: boolean) {
  const lenisRef = useContext(LenisContext);

  useEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    const lenis = lenisRef?.current;
    if (lockCount++ === 0) {
      const scrollbar = window.innerWidth - root.clientWidth;
      lenis?.stop();
      root.style.overflow = "hidden";
      if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
    }
    return () => {
      if (--lockCount > 0) return;
      root.style.overflow = "";
      root.style.paddingRight = "";
      lenis?.start();
    };
  }, [locked, lenisRef]);
}
