"use client";

import { motion, type Variants } from "motion/react";
import { Fragment, type ReactNode } from "react";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

/** Fade + rise into view once. `data-reveal` lets the no-JS fallback show it. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li";
}) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
    >
      {children}
    </Tag>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const word: Variants = {
  hidden: { y: "110%", rotate: 4 },
  show: { y: "0%", rotate: 0, transition: { duration: 1, ease: EASE_OUT } },
};

type Part = { text: string; accent: boolean };

/**
 * Split into words (each word animates as one unit), keeping the "_accent_"
 * state per fragment so "_loud_." stays one word: italic "loud" + plain ".".
 */
function tokenize(text: string): Part[][] {
  let accent = false;
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((word) =>
      word.split("_").flatMap((fragment, i) => {
        if (i > 0) accent = !accent;
        return fragment ? [{ text: fragment, accent }] : [];
      }),
    )
    .filter((parts) => parts.length > 0);
}

const ACCENT = "font-serif font-normal italic tracking-normal text-accent";

/**
 * Section heading whose words slide up from a mask, one after another.
 * Supports the "_accent_" convention from site.ts.
 */
export function RevealHeading({
  text,
  className,
  as = "h2",
  id,
}: {
  text: string;
  className?: string;
  as?: "h2" | "h3" | "p";
  id?: string;
}) {
  const Tag = motion[as];
  const words = tokenize(text);
  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={container}
    >
      {words.map((parts, i) => (
        <Fragment key={i}>
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] pr-[0.06em] align-top">
            <motion.span data-reveal variants={word} className="inline-block origin-bottom-left">
              {parts.map((p, j) => (
                <span key={j} className={p.accent ? ACCENT : undefined}>
                  {p.text}
                </span>
              ))}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
