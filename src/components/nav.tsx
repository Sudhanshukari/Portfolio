"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useState } from "react";
import { site } from "@/content/site";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

/** Minimal sticky nav: hides while scrolling down, returns on scroll up. */
export function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 });
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
  });

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-accent"
        style={{ scaleX: progress }}
      />
      <motion.header
        className="fixed inset-x-0 top-0 z-[75] mix-blend-difference"
        initial={false}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 text-white md:px-8 md:py-4"
        >
          <a href="#top" className="whitespace-nowrap font-display text-sm font-extrabold tracking-tight sm:text-base" aria-label={`${site.name}, back to top`}>
            {site.name}
            <span className="text-accent">.</span>
          </a>
          <ul className="flex items-center gap-4 text-[13px] font-medium sm:gap-5 md:gap-7">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group relative inline-block overflow-hidden py-1">
                  <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-full">
                    {l.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-full block py-1 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-full"
                  >
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>
    </>
  );
}
