"use client";

import Image from "next/image";
import { useCallback, useEffect, useImperativeHandle, useRef, useState, type PointerEvent, type Ref } from "react";
import type { Project } from "@/content/site";

export type ZoomHandle = { toggle: () => void; reset: () => void };

type View = { s: number; x: number; y: number };
type Point = { x: number; y: number };
type Gesture =
  | { kind: "none" }
  | {
      kind: "pan" | "swipe";
      start: Point;
      from: View;
      moved: boolean;
      target: EventTarget | null;
      last: Point & { t: number };
      vx: number;
    }
  | { kind: "pinch"; dist: number; mid: Point; from: View };

const REST: View = { s: 1, x: 0, y: 0 };
const MAX_SCALE = 5;
const TAP_SCALE = 2.5;
const TAP_SLOP = 8;
const DOUBLE_TAP_MS = 320;
const SWIPE_DISTANCE = 70;
const SWIPE_VELOCITY = 0.45; // px per ms
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const midpoint = (a: Point, b: Point) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

/**
 * The lightbox image, with hand-rolled zoom on pointer events (no library):
 * click / tap zooms in where you point, drag pans while zoomed, two fingers pinch,
 * a double tap (or a click while zoomed) resets, the wheel zooms around the cursor.
 * Unzoomed, a horizontal swipe calls `onSwipe`; a tap beside the image calls `onClose`.
 */
export function ZoomImage({
  project,
  ref,
  canSwipe,
  onSwipe,
  onClose,
  onZoomChange,
}: {
  project: Project;
  ref?: Ref<ZoomHandle>;
  canSwipe: boolean;
  onSwipe: (dir: 1 | -1) => void;
  onClose: () => void;
  onZoomChange: (zoomed: boolean) => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [view, setView] = useState<View>(REST);
  const [animate, setAnimate] = useState(false);
  const viewRef = useRef<View>(REST);
  const pointers = useRef(new Map<number, Point>());
  const gesture = useRef<Gesture>({ kind: "none" });
  const lastTap = useRef<(Point & { t: number }) | null>(null);

  /** Keep the image covering the stage edges: pan only as far as the zoomed image overflows. */
  const fit = useCallback((v: View): View => {
    const stage = stageRef.current;
    const img = imgRef.current;
    if (!stage || !img || v.s <= 1) return v;
    const mx = Math.max(0, (img.offsetWidth * v.s - stage.clientWidth) / 2);
    const my = Math.max(0, (img.offsetHeight * v.s - stage.clientHeight) / 2);
    return { s: v.s, x: clamp(v.x, -mx, mx), y: clamp(v.y, -my, my) };
  }, []);

  const apply = useCallback((v: View, smooth: boolean) => {
    viewRef.current = v;
    setAnimate(smooth);
    setView(v);
  }, []);

  /** Point relative to the stage centre (= the untransformed image centre). */
  const local = useCallback((p: Point): Point => {
    const r = stageRef.current!.getBoundingClientRect();
    return { x: p.x - (r.left + r.width / 2), y: p.y - (r.top + r.height / 2) };
  }, []);

  /** Scale to `s`, keeping the image point under `p` (client coords) where it is. */
  const zoomAt = useCallback(
    (p: Point, s: number, smooth: boolean) => {
      const v = viewRef.current;
      const next = clamp(s, 1, MAX_SCALE);
      if (next === 1) return apply(REST, smooth);
      const q = local(p);
      const k = next / v.s;
      apply(fit({ s: next, x: q.x - k * (q.x - v.x), y: q.y - k * (q.y - v.y) }), smooth);
    },
    [apply, fit, local],
  );

  /** Tap zoom: 2.5x, or enough to fill the stage width for tall, narrow pieces. */
  const tapScale = useCallback(() => {
    const stage = stageRef.current;
    const img = imgRef.current;
    if (!stage || !img || !img.offsetWidth) return TAP_SCALE;
    return clamp(Math.max(TAP_SCALE, (stage.clientWidth * 0.9) / img.offsetWidth), 1, MAX_SCALE);
  }, []);

  const centre = useCallback((): Point => {
    const r = stageRef.current!.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      toggle: () => (viewRef.current.s > 1 ? apply(REST, true) : zoomAt(centre(), tapScale(), true)),
      reset: () => apply(REST, true),
    }),
    [apply, zoomAt, centre, tapScale],
  );

  const zoomed = view.s > 1.001;
  useEffect(() => onZoomChange(zoomed), [zoomed, onZoomChange]);

  // Wheel / trackpad pinch zooms around the cursor (needs a non-passive listener).
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0025));
      zoomAt({ x: e.clientX, y: e.clientY }, viewRef.current.s * factor, false);
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  // Re-fit after a resize or rotation.
  useEffect(() => {
    const onResize = () => apply(fit(viewRef.current), false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [apply, fit]);

  const startSingle = (p: Point, target: EventTarget | null, moved: boolean) => {
    gesture.current = {
      kind: viewRef.current.s > 1 ? "pan" : "swipe",
      start: p,
      from: viewRef.current,
      moved,
      target,
      last: { ...p, t: performance.now() },
      vx: 0,
    };
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = { x: e.clientX, y: e.clientY };
    pointers.current.set(e.pointerId, p);
    setAnimate(false);
    if (pointers.current.size === 1) {
      startSingle(p, e.target, false);
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      if (viewRef.current.s <= 1) apply(REST, false); // drop any half-done swipe offset
      gesture.current = { kind: "pinch", dist: Math.max(dist(a, b), 1), mid: midpoint(a, b), from: viewRef.current };
    }
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    const p = { x: e.clientX, y: e.clientY };
    pointers.current.set(e.pointerId, p);
    const g = gesture.current;

    if (g.kind === "pinch" && pointers.current.size >= 2) {
      const [a, b] = [...pointers.current.values()];
      const s = clamp((g.from.s * dist(a, b)) / g.dist, 0.6, MAX_SCALE);
      const m0 = local(g.mid);
      const m = local(midpoint(a, b));
      const lx = (m0.x - g.from.x) / g.from.s;
      const ly = (m0.y - g.from.y) / g.from.s;
      apply(fit({ s, x: m.x - s * lx, y: m.y - s * ly }), false);
      return;
    }
    if (g.kind !== "pan" && g.kind !== "swipe") return;

    const dx = p.x - g.start.x;
    const dy = p.y - g.start.y;
    if (!g.moved && Math.hypot(dx, dy) > TAP_SLOP) g.moved = true;
    if (!g.moved) return;
    const now = performance.now();
    if (now > g.last.t) g.vx = (p.x - g.last.x) / (now - g.last.t);
    g.last = { ...p, t: now };

    if (g.kind === "pan") apply(fit({ s: g.from.s, x: g.from.x + dx, y: g.from.y + dy }), false);
    else if (canSwipe) apply({ s: 1, x: dx, y: 0 }, false);
  };

  const onTap = (e: PointerEvent<HTMLDivElement>, target: EventTarget | null) => {
    const now = performance.now();
    const p = { x: e.clientX, y: e.clientY };
    const prev = lastTap.current;
    if (prev && now - prev.t < DOUBLE_TAP_MS && dist(prev, p) < 40) {
      lastTap.current = null;
      apply(REST, true);
      return;
    }
    lastTap.current = { ...p, t: now };
    if (viewRef.current.s > 1) {
      // Mouse: a click while zoomed zooms back out. Touch: double tap does that.
      if (e.pointerType === "mouse") apply(REST, true);
      return;
    }
    if (target === imgRef.current) zoomAt(p, tapScale(), true);
    else onClose();
  };

  const onPointerEnd = (e: PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.delete(e.pointerId);
    const g = gesture.current;

    if (g.kind === "pinch") {
      if (pointers.current.size === 1) {
        // One finger left: carry on panning from here, never as a tap or swipe.
        const [rest] = [...pointers.current.values()];
        startSingle(rest, null, true);
        if (viewRef.current.s <= 1) gesture.current = { kind: "none" };
      }
      if (viewRef.current.s <= 1.02) apply(REST, true);
      if (pointers.current.size === 0) gesture.current = { kind: "none" };
      return;
    }
    if (pointers.current.size > 0) return;
    gesture.current = { kind: "none" };
    if (g.kind !== "pan" && g.kind !== "swipe") return;

    if (!g.moved) {
      if (e.type === "pointerup") onTap(e, g.target);
      return;
    }
    if (g.kind === "swipe") {
      const dx = e.clientX - g.start.x;
      if (canSwipe && (Math.abs(dx) > SWIPE_DISTANCE || Math.abs(g.vx) > SWIPE_VELOCITY)) {
        const back = Math.abs(dx) > SWIPE_DISTANCE ? dx > 0 : g.vx > 0;
        onSwipe(back ? -1 : 1);
      } else {
        apply(REST, true);
      }
    }
  };

  return (
    <div
      ref={stageRef}
      data-cursor={zoomed ? "Drag" : "Zoom"}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      className={`absolute inset-0 flex touch-none select-none items-center justify-center overflow-hidden p-4 sm:p-8 lg:p-12 ${zoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
    >
      <Image
        ref={imgRef}
        src={project.image}
        alt={`${project.title} — ${project.category}`}
        width={project.width}
        height={project.height}
        sizes={zoomed ? "300vw" : "(min-width: 1024px) 70vw, 100vw"}
        loading="eager"
        draggable={false}
        style={{
          transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.s})`,
          transition: animate ? `transform 0.45s ${EASE}` : "none",
        }}
        className={`h-auto max-h-full w-auto max-w-full select-none object-contain shadow-2xl shadow-black/60 will-change-transform ${zoomed ? "rounded-none" : "rounded-xl"}`}
      />
    </div>
  );
}
