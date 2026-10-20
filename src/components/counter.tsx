"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { REDUCED_MOTION } from "@/lib/hooks";
import { EASE_OUT } from "@/lib/motion";

/**
 * Number that counts up from 0 the first time it scrolls into view.
 * The server renders the final value (correct without JS / for crawlers).
 */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(value);
  const display = useTransform(count, (v) => Math.round(v).toLocaleString("en-US"));
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const armed = useRef(false);

  // Arm on mount: park at 0 (still below the fold) unless motion is reduced.
  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    armed.current = true;
    count.set(0);
  }, [count]);

  useEffect(() => {
    if (!inView || !armed.current) return;
    const controls = animate(count, value, { duration: 1.8, ease: EASE_OUT });
    return () => controls.stop();
  }, [inView, count, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
