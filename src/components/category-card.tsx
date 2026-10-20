"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type PointerEvent } from "react";
import { ArrowUpRight, PlayIcon } from "@/components/icons";
import type { Category, Project } from "@/content/site";
import { FINE_POINTER, useMediaQuery } from "@/lib/hooks";

const TILT = 5; // max degrees
const SPRING = { stiffness: 160, damping: 18, mass: 0.5 };
/**
 * Box shapes. A wide box is 16:10 when it has a row to itself (phones); on desktop
 * it shares a row with 4:5 boxes, so it takes their height instead of its own.
 */
const BOX_SHAPE = { normal: "aspect-[4/5]", wide: "aspect-[16/10] lg:aspect-auto lg:min-h-40 lg:flex-1" } as const;

/**
 * One category box in the Work section: its cover piece, name and count, with
 * two sheets peeking out behind it so it reads as a stack. Hover zooms and tilts.
 * The whole box is one button that opens the category panel.
 */
export function CategoryCard({
  id,
  number,
  category,
  cover,
  count,
  wide,
  onOpen,
}: {
  id: string;
  number: string;
  category: Category;
  cover: Project;
  count: number;
  wide: boolean;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const fine = useMediaQuery(FINE_POINTER);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, SPRING);
  const rotateY = useSpring(ry, SPRING);

  function onMove(e: PointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!fine || !el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * TILT * 2);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * TILT * 2);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  const isVideo = Boolean(cover.video);
  const pieces = `${count} ${isVideo ? "video" : "piece"}${count === 1 ? "" : "s"}`;

  return (
    <article id={id} ref={ref} className="group relative flex h-full flex-col pt-2" onPointerMove={onMove} onPointerLeave={onLeave}>
      {/* the stack behind the box */}
      <div
        aria-hidden="true"
        className="absolute inset-x-6 top-0 h-8 rounded-t-xl bg-paper/[0.06] ring-1 ring-line transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-3 top-1 h-8 rounded-t-xl bg-paper/[0.1] ring-1 ring-line transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5"
      />

      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1100 }}
        className={`relative overflow-hidden rounded-xl bg-ink-2 ring-1 ring-line ${BOX_SHAPE[wide ? "wide" : "normal"]}`}
      >
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]">
          <Image
            src={cover.image}
            alt=""
            fill
            sizes={wide ? "(min-width: 640px) 40vw, 100vw" : "(min-width: 1280px) 190px, (min-width: 640px) 30vw, 50vw"}
            className={`object-cover ${cover.width / cover.height < 0.62 ? "object-top" : ""}`}
            draggable={false}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink from-5% via-ink/60 via-35% to-transparent to-70%" />

        {isVideo ? (
          <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink md:text-[10px]">
            <PlayIcon className="size-2.5 md:size-3" />
            Motion
          </span>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 md:p-3.5">
          <div className="min-w-0">
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-accent md:text-[10px]">{number}</p>
            <h3 className="mt-0.5 font-display text-[15px] font-extrabold leading-[1.05] tracking-[-0.02em] md:text-base">
              {category}
            </h3>
            <p className="mt-1 text-[11px] text-paper/70">{pieces}</p>
          </div>
          <span
            aria-hidden="true"
            className="hidden size-7 shrink-0 place-items-center rounded-full border border-paper/25 bg-ink/40 backdrop-blur-sm transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-ink sm:grid"
          >
            <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </div>
      </motion.div>

      {/* Stretched button: the whole box is one accessible control. */}
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={`Open ${category}, ${pieces}`}
        data-cursor="Open"
        className="absolute inset-0 z-10 rounded-xl"
      />
    </article>
  );
}
