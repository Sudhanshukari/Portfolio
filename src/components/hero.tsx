"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Fragment, useRef, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight } from "@/components/icons";
import { Magnetic } from "@/components/magnetic";
import { site } from "@/content/site";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/hooks";

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

/** Circle the ring text runs along (r = 38 in a 100×100 box), and its length. */
const ORBIT_PATH = "M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0";
const ORBIT_LENGTH = 236;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useMediaQuery(REDUCED_MOTION);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Content drifts down and fades as the hero scrolls away (parallax).
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.15]);

  // One line per word.
  const words = site.name.split(" ").map((w) => Array.from(w));
  const letters = words.flat();
  const starts = words.map((_, wi) => words.slice(0, wi).reduce((n, w) => n + w.length, 0));
  const year = new Date().getFullYear();
  const lettersDone = 0.2 + letters.length * 0.06;

  return (
    <section ref={ref} id="top" aria-label="Intro" className="relative isolate overflow-hidden">
      {/* the colour fields come from the site-wide Backdrop; the grid is the hero's own */}
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />

      <motion.div
        style={{ y, opacity }}
        className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-12 pt-24 md:grid-cols-[1fr_auto] md:gap-12 md:px-8 md:pb-20 md:pt-32"
      >
        {/* portrait: above the text on phones, beside it from tablets up */}
        <figure className="relative order-first mx-auto w-[min(62vw,15rem)] shrink-0 md:order-last md:w-60 lg:w-72">
          <div
            aria-hidden="true"
            className="anim-fade-up absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-3xl border border-accent/60 md:translate-x-3 md:translate-y-3"
            style={delay(0.5)}
          />
          <div
            className="anim-portrait relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink-2 shadow-[0_0_60px_-10px_rgb(215_255_58/0.35)] ring-2 ring-accent"
            style={delay(0.2)}
          >
            <Image
              src={site.photos.profile.src}
              alt={site.photos.profile.alt}
              fill
              priority
              sizes="(min-width: 1024px) 288px, (min-width: 768px) 240px, 62vw"
              className="object-cover object-[50%_30%]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
            <figcaption className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-paper backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-accent" />
              {site.location}
            </figcaption>
          </div>

          {/* slowly turning text ring on the corner */}
          <div
            aria-hidden="true"
            className="anim-fade-up absolute -left-7 -top-7 size-20 rounded-full bg-ink/80 ring-1 ring-line backdrop-blur-md md:-left-9 md:-top-9 md:size-24"
            style={delay(0.9)}
          >
            <svg viewBox="0 0 100 100" className="anim-orbit absolute inset-0 size-full text-paper">
              <defs>
                <path id="hero-orbit" d={ORBIT_PATH} />
              </defs>
              <text className="fill-current text-[8.5px] font-semibold uppercase">
                <textPath href="#hero-orbit" textLength={ORBIT_LENGTH} lengthAdjust="spacing">
                  {`${site.role} ✦ ${site.location} ✦ `}
                </textPath>
              </text>
            </svg>
            <span className="absolute inset-0 grid place-items-center text-lg text-accent md:text-xl">✦</span>
          </div>
        </figure>

        <div className="min-w-0">
          {/* meta row */}
          <div
            className="anim-fade-up flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.18em] text-muted md:text-[11px]"
            style={delay(0.1)}
          >
            {site.availability.open ? (
              <span className="flex items-center gap-2 rounded-full border border-line bg-ink/40 px-3 py-1.5 text-paper backdrop-blur-sm">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                {site.availability.text}
              </span>
            ) : null}
            <span suppressHydrationWarning>Portfolio © {year}</span>
          </div>

          {/* name */}
          <h1 className="hero-name mt-5 select-none font-display font-extrabold md:mt-6">
            <span className="sr-only">
              {site.name}, {site.role}
            </span>
            <span aria-hidden="true" className="flex flex-col">
              {words.map((word, wi) => (
                <span key={wi} className="flex whitespace-nowrap">
                  {word.map((ch, i) => (
                    <span key={i} className="-mb-[0.06em] inline-block overflow-hidden pb-[0.06em]">
                      <span
                        className={`anim-rise inline-block ${/\d/.test(ch) ? "hero-digit" : "hero-letter"}`}
                        style={delay(0.15 + (starts[wi] + i) * 0.06)}
                      >
                        {ch}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h1>

          {/* role / intro / CTAs */}
          <p className="mt-5 font-display text-[clamp(1.05rem,1.6vw,1.35rem)] font-semibold leading-snug tracking-tight md:mt-6">
            <span className="anim-fade-up block" style={delay(lettersDone)}>
              {site.role} <span className="text-accent">—</span>
            </span>
            <span className="anim-fade-up block text-muted" style={delay(lettersDone + 0.08)}>
              {site.specialties.map((s, i) => (
                <Fragment key={s}>
                  {i > 0 && " · "}
                  <span className="whitespace-nowrap">{s}</span>
                </Fragment>
              ))}
            </span>
          </p>
          <p
            className="anim-fade-up mt-3 max-w-md text-sm leading-relaxed text-muted md:text-[15px]"
            style={delay(lettersDone + 0.16)}
          >
            {site.intro}
          </p>
          <div className="anim-fade-up mt-6 flex flex-wrap gap-2.5" style={delay(lettersDone + 0.24)}>
            <Magnetic>
              <a
                href="#work"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-paper transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0" />
                <span className="relative">View work</span>
                <ArrowDown className="relative size-4 transition-transform duration-500 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-line bg-ink/30 px-5 py-2.5 text-sm font-semibold text-paper backdrop-blur-sm transition-colors duration-500 hover:text-ink"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-paper transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0" />
                <span className="relative">Contact</span>
                <ArrowUpRight className="relative size-4 transition-transform duration-500 group-hover:rotate-45" />
              </a>
            </Magnetic>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
