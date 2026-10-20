"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/hooks";

/**
 * The cover photo between the skills tapes and the work boxes. On phones the
 * photo sits a little taller than its frame and drifts inside it while
 * scrolling; on desktop the frame takes the photo's own 4:3 shape so nothing
 * is cropped.
 */
export function CoverPhoto() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useMediaQuery(REDUCED_MOTION);
  const desktop = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-4%", "4%"]);
  const { cover } = site.photos;

  return (
    <section ref={ref} aria-label="Cover photo" className="mx-auto max-w-6xl px-5 pt-2 md:px-8 md:pt-4">
      <Reveal>
        <figure className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-ink-2 md:mx-auto md:aspect-[4/3] md:max-w-3xl">
          <motion.div style={{ y: desktop ? 0 : y }} className="absolute inset-x-0 -inset-y-[4%] md:inset-y-0">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 768px) 768px, calc(100vw - 2.5rem)"
              className="object-cover object-top"
            />
          </motion.div>
          {cover.caption && (
            <>
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />
              <figcaption className="absolute bottom-3 left-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-paper md:bottom-5 md:left-6 md:text-[11px]">
                <span className="size-1.5 rounded-full bg-accent" />
                {cover.caption}
              </figcaption>
            </>
          )}
        </figure>
      </Reveal>
    </section>
  );
}
