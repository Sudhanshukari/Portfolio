"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { FINE_POINTER, useMediaQuery } from "@/lib/hooks";

type CursorState = { kind: "default" | "hover" | "label"; label?: string };

const INTERACTIVE = "[data-cursor], a, button, [role='button'], label, summary, select";

/** Dot + trailing ring. Only mounted for a real mouse with motion allowed. */
export function Cursor() {
  const enabled = useMediaQuery(FINE_POINTER);
  return enabled ? <CursorImpl /> : null;
}

function CursorImpl() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 520, damping: 42, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 520, damping: 42, mass: 0.6 });
  const [state, setState] = useState<CursorState>({ kind: "default" });
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = (e.target as Element | null)?.closest?.(INTERACTIVE);
      const label = target?.getAttribute("data-cursor") || undefined;
      const next: CursorState = !target ? { kind: "default" } : label ? { kind: "label", label } : { kind: "hover" };
      setState((prev) => (prev.kind === next.kind && prev.label === next.label ? prev : next));
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  const ringSize = state.kind === "hover" ? 64 : 36;
  const isLabel = state.kind === "label";

  return (
    <>
      {/* Blend layer: the whole fixed layer uses `difference`, so the ring and
          dot invert whatever sits under them (works on light and dark work). */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference">
        <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
          <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: visible && !isLabel ? 1 : 0,
            backgroundColor: state.kind === "hover" ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
            scale: pressed ? 0.8 : 1,
          }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          />
        </motion.div>
        <motion.div className="absolute left-0 top-0" style={{ x, y }}>
          <motion.div
            className="size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            animate={{ opacity: visible && state.kind === "default" ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          />
        </motion.div>
      </div>

      {/* Label bubble, e.g. "View" over work cards (no blending, keeps brand colour). */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[101]">
        <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
          <AnimatePresence>
            {isLabel && visible ? (
              <motion.div
                key="label"
                className="grid size-22 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-[11px] font-semibold uppercase tracking-[0.18em] text-ink"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: pressed ? 0.85 : 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
              >
                {state.label}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
