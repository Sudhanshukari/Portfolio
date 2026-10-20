"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CloseIcon, ZoomIcon } from "@/components/icons";
import { useScrollLock } from "@/components/smooth-scroll";
import { ZoomImage, type ZoomHandle } from "@/components/zoom-image";
import type { Project } from "@/content/site";
import { trapTab } from "@/lib/focus-trap";
import { EASE_OUT } from "@/lib/motion";

const slide: Variants = {
  enter: (dir: number) => ({ x: dir * 90, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.55, ease: EASE_OUT } },
  exit: (dir: number) => ({ x: dir * -90, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }),
};

/**
 * Full-screen project viewer.
 * Keyboard: Esc closes, Left/Right navigate, Tab stays inside, the zoom button toggles zoom.
 * Pointer: click / tap to zoom in, drag to pan, pinch, double tap to reset (see ZoomImage);
 * unzoomed, swipe left/right to browse. Focus returns to the card that opened it.
 */
export function Lightbox({
  projects,
  index,
  onClose,
  onNavigate,
}: {
  projects: Project[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const open = index !== null;
  const project = open ? projects[index] : null;
  const [direction, setDirection] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const zoomRef = useRef<ZoomHandle>(null);

  useScrollLock(open);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null || projects.length < 2) return;
      setDirection(dir);
      onNavigate((index + dir + projects.length) % projects.length);
    },
    [index, projects.length, onNavigate],
  );

  // Move focus into the dialog, and back to the opener on close.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    return () => opener?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else {
        trapTab(e, dialogRef.current);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  // A video that slides out (or the whole viewer closing) keeps playing during its exit
  // animation: pause every video that isn't the current piece.
  const currentSlug = project?.slug;
  useEffect(() => {
    dialogRef.current?.querySelectorAll("video").forEach((v) => {
      if (v.dataset.slug !== currentSlug) v.pause();
    });
  }, [currentSlug]);

  const counter = (n: number) => String(n).padStart(2, "0");

  return (
    <AnimatePresence>
      {project && index !== null ? (
        <motion.div
          key="lightbox"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          aria-describedby="lightbox-desc"
          data-lenis-prevent
          className="fixed inset-0 z-[90] flex flex-col bg-ink/[0.97] lg:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* top bar (mobile) */}
          <div className="flex items-center justify-between px-5 pt-4 lg:hidden">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">
              {counter(index + 1)} / {counter(projects.length)}
            </span>
          </div>

          {/* image stage */}
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={project.slug}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                {project.video ? (
                  <div
                    className="flex size-full items-center justify-center p-4 pt-16 lg:p-10"
                    style={{ containerType: "size" }}
                  >
                    {/* Videos play as they are: no zoom/pan. Sized to fit the stage at the video's own ratio. */}
                    <video
                      key={project.video}
                      data-slug={project.slug}
                      src={project.video}
                      poster={project.image}
                      controls
                      autoPlay
                      playsInline
                      preload="metadata"
                      className="rounded-lg bg-black"
                      style={{
                        aspectRatio: `${project.width} / ${project.height}`,
                        width: `min(100cqw, ${(100 * project.width) / project.height}cqh)`,
                      }}
                    />
                  </div>
                ) : (
                  <ZoomImage
                    ref={(handle) => {
                      // The outgoing slide unmounts after the new one mounts: keep the newest handle.
                      if (handle) zoomRef.current = handle;
                    }}
                    project={project}
                    canSwipe={projects.length > 1}
                    onSwipe={go}
                    onClose={onClose}
                    onZoomChange={setZoomed}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* info panel */}
          <div className="flex shrink-0 flex-col gap-4 border-t border-line px-5 pb-6 pt-5 lg:w-[320px] lg:border-l lg:border-t-0 lg:px-6 lg:py-6">
            <div className="hidden items-center justify-between lg:flex">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">
                {counter(index + 1)} / {counter(projects.length)}
              </span>
            </div>
            <div className="lg:mt-auto">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">
                {project.category}
                {project.year ? ` · ${project.year}` : null}
              </p>
              <h2 id="lightbox-title" className="mt-2 font-display text-xl font-bold tracking-tight lg:text-2xl">
                {project.title}
              </h2>
              <p id="lightbox-desc" className="mt-3 text-sm leading-relaxed text-muted lg:text-base">
                {project.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={projects.length < 2}
                aria-label="Previous project"
                className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-paper hover:bg-paper hover:text-ink disabled:opacity-30"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={projects.length < 2}
                aria-label="Next project"
                className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-paper hover:bg-paper hover:text-ink disabled:opacity-30"
              >
                <ArrowRight className="size-4" />
              </button>
              {project.video ? (
                <p className="ml-auto hidden text-right text-xs leading-relaxed text-muted lg:block">
                  <kbd className="font-sans">←</kbd> <kbd className="font-sans">→</kbd> browse · <kbd className="font-sans">Esc</kbd> close
                </p>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => zoomRef.current?.toggle()}
                    aria-label={zoomed ? "Zoom out" : "Zoom in"}
                    aria-pressed={zoomed}
                    className={`grid size-10 place-items-center rounded-full border transition-colors ${zoomed ? "border-accent bg-accent text-ink" : "border-line hover:border-accent hover:bg-accent hover:text-ink"}`}
                  >
                    <ZoomIcon out={zoomed} className="size-4" />
                  </button>
                  <p className="ml-auto text-right text-xs text-muted lg:hidden">
                    {zoomed ? "Drag to pan · double-tap to reset" : "Tap to zoom · pinch"}
                  </p>
                  <p className="ml-auto hidden text-right text-xs leading-relaxed text-muted lg:block">
                    {zoomed ? "Drag to pan · click to reset" : "Click to zoom"}
                    <br />
                    <kbd className="font-sans">←</kbd> <kbd className="font-sans">→</kbd> browse · <kbd className="font-sans">Esc</kbd> close
                  </p>
                </>
              )}
            </div>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            className="absolute right-4 top-3 z-10 grid size-10 place-items-center rounded-full border border-line bg-ink transition-colors hover:border-accent hover:bg-accent hover:text-ink lg:right-6 lg:top-6"
          >
            <CloseIcon className="size-4" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
