"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { Cursor } from "@/components/cursor";
import { SmoothScroll } from "@/components/smooth-scroll";

/** Client-side app shell: motion defaults, Lenis smooth scroll, custom cursor. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    // "user": transform/layout animations are skipped when the OS asks for reduced motion.
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        {children}
        <Cursor />
      </SmoothScroll>
    </MotionConfig>
  );
}
