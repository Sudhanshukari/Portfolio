"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, CloseIcon, PlayIcon } from "@/components/icons";
import { useScrollLock } from "@/components/smooth-scroll";
import type { Category, Project } from "@/content/site";
import { trapTab } from "@/lib/focus-trap";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/hooks";
import { EASE_OUT } from "@/lib/motion";

/** Very tall pieces (listing strips, catalogue pages) are cropped to this width/height ratio in the grid; the viewer shows them whole. */
const MIN_RATIO = 0.62;

export type PanelGroup = { category: Category; number: string; projects: Project[] };

/**
 * Full-screen panel with every piece of one category, opened from its box.
 * Esc or the close button closes it (unless the lightbox is open on top: `paused`).
 * Prev/next at the bottom move to the neighbouring category without closing.
 */
export function CategoryPanel({
  group,
  total,
  prev,
  next,
  paused,
  onClose,
  onSwitch,
  onOpenPiece,
}: {
  group: PanelGroup | null;
  total: string;
  prev: PanelGroup | null;
  next: PanelGroup | null;
  paused: boolean;
  onClose: () => void;
  onSwitch: (dir: 1 | -1) => void;
  onOpenPiece: (index: number) => void;
}) {
  const open = group !== null;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useMediaQuery(REDUCED_MOTION);

  useScrollLock(open);

  // Move focus into the panel, and back to the box that opened it on close.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    return () => opener?.focus({ preventScroll: true });
  }, [open]);

  // A new category starts at the top.
  const category = group?.category;
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [category]);

  useEffect(() => {
    if (!open || paused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else {
        trapTab(e, panelRef.current);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, paused, onClose]);

  return (
    <AnimatePresence>
      {group ? (
        <motion.div
          key="category-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="category-title"
          data-lenis-prevent
          className="fixed inset-0 z-[85] overflow-y-auto overscroll-contain bg-ink"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
        >
          <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-ink/85 px-5 py-3 backdrop-blur-md md:px-8">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent md:text-[11px]">
                {group.number} / {total} · {group.projects.length} {group.projects[0]?.video ? "video" : "piece"}{group.projects.length === 1 ? "" : "s"}
              </p>
              <h2
                id="category-title"
                className="mt-0.5 truncate font-display text-xl font-extrabold leading-none tracking-[-0.03em] md:text-2xl"
              >
                {group.category}
              </h2>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={`Close ${group.category}`}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-ink transition-colors hover:border-accent hover:bg-accent hover:text-ink"
            >
              <CloseIcon className="size-4" />
            </button>
          </header>

          <ul
            key={group.category}
            className="columns-2 gap-3 px-5 pb-10 pt-5 sm:columns-3 md:px-8 md:pt-6 lg:columns-4 xl:columns-5 2xl:columns-6"
          >
            {group.projects.map((project, i) => {
              const tall = project.width / project.height < MIN_RATIO;
              return (
                <motion.li
                  key={project.slug}
                  className="mb-3 break-inside-avoid"
                  initial={reduce ? false : { opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 + Math.min(i, 12) * 0.04 }}
                >
                  <button
                    type="button"
                    onClick={() => onOpenPiece(i)}
                    aria-haspopup="dialog"
                    aria-label={`${project.video ? "Play" : "View"} ${project.title}${project.year ? ` (${project.year})` : ""}`}
                    data-cursor={project.video ? "Play" : "View"}
                    className="group relative block w-full overflow-hidden rounded-xl bg-ink-2 ring-1 ring-line"
                  >
                    <span
                      className="relative block"
                      style={{ aspectRatio: tall ? `${MIN_RATIO}` : `${project.width} / ${project.height}` }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                        className={`object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04] ${tall ? "object-top" : ""}`}
                        draggable={false}
                      />
                      {project.video ? (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink/60 text-paper ring-1 ring-paper/30 backdrop-blur-sm transition-colors duration-300 group-hover:bg-accent group-hover:text-ink md:size-11"
                        >
                          <PlayIcon className="ml-0.5 size-4 md:size-5" />
                        </span>
                      ) : null}
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-2 bg-gradient-to-t from-ink/90 to-transparent p-2.5 pt-8 text-left text-xs font-medium opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:block">
                        {project.title}
                      </span>
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </ul>

          {prev || next ? (
            <nav
              aria-label="Other categories"
              className="flex items-center justify-between gap-4 border-t border-line px-5 py-5 md:px-8"
            >
              {prev ? (
                <button
                  type="button"
                  onClick={() => onSwitch(-1)}
                  className="group flex min-w-0 items-center gap-3 text-left"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                    <ArrowLeft className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.2em] text-muted">Previous</span>
                    <span className="block truncate font-display text-base font-bold tracking-tight md:text-lg">
                      {prev.category}
                    </span>
                  </span>
                </button>
              ) : (
                <span />
              )}
              {next ? (
                <button
                  type="button"
                  onClick={() => onSwitch(1)}
                  className="group flex min-w-0 items-center gap-3 text-right"
                >
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.2em] text-muted">Next</span>
                    <span className="block truncate font-display text-base font-bold tracking-tight md:text-lg">
                      {next.category}
                    </span>
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                    <ArrowRight className="size-4" />
                  </span>
                </button>
              ) : null}
            </nav>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
