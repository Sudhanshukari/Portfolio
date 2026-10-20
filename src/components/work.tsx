"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { CategoryCard } from "@/components/category-card";
import { CategoryPanel, type PanelGroup } from "@/components/category-panel";
import { Lightbox } from "@/components/lightbox";
import { Reveal, RevealHeading } from "@/components/reveal";
import { categories, categoryBoxes, site, type Project } from "@/content/site";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/hooks";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

type Group = PanelGroup & { id: string; cover: Project; wide: boolean };

const pad = (n: number) => String(n).padStart(2, "0");

/** One box per category, in the order of `categories`; empty categories are left out. */
const groups: Group[] = categories
  .map((category) => ({ category, projects: site.projects.filter((p) => p.category === category) }))
  .filter((g) => g.projects.length > 0)
  .map((g, i) => {
    const box = categoryBoxes[g.category];
    return {
      ...g,
      id: `work-${g.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      number: pad(i + 1),
      cover: g.projects.find((p) => p.slug === box?.cover) ?? g.projects[0],
      wide: box?.wide ?? false,
    };
  });

/** History entries made by an open panel carry this key, so Back closes the panel instead of leaving the site. */
const STATE_KEY = "workCategory";

const panelInHistory = () => typeof (window.history.state as Record<string, unknown> | null)?.[STATE_KEY] === "string";

export function Work() {
  const [current, setCurrent] = useState<number | null>(null);
  const [piece, setPiece] = useState<number | null>(null);
  const reduce = useMediaQuery(REDUCED_MOTION);

  // The open panel lives in the URL (#work-banners): Back closes it, and a shared link opens it.
  useEffect(() => {
    const sync = () => {
      const id = (window.history.state as Record<string, unknown> | null)?.[STATE_KEY];
      const i = groups.findIndex((g) => g.id === id);
      setCurrent(i >= 0 ? i : null);
      setPiece(null);
    };
    const linked = groups.findIndex((g) => `#${g.id}` === window.location.hash);
    if (linked >= 0) {
      // Put a plain #work entry underneath, so closing a shared link lands on the work section.
      window.history.replaceState(window.history.state, "", "#work");
      window.history.pushState({ ...window.history.state, [STATE_KEY]: groups[linked].id }, "", `#${groups[linked].id}`);
      sync();
    }
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const openGroup = (i: number) => {
    window.history.pushState({ ...window.history.state, [STATE_KEY]: groups[i].id }, "", `#${groups[i].id}`);
    setCurrent(i);
    setPiece(null);
  };

  const switchGroup = useCallback(
    (dir: 1 | -1) => {
      if (current === null) return;
      const i = current + dir;
      if (i < 0 || i >= groups.length) return;
      window.history.replaceState({ ...window.history.state, [STATE_KEY]: groups[i].id }, "", `#${groups[i].id}`);
      setCurrent(i);
      setPiece(null);
    },
    [current],
  );

  const closeGroup = useCallback(() => {
    if (panelInHistory()) window.history.back();
    else setCurrent(null);
  }, []);

  const closePiece = useCallback(() => setPiece(null), []);

  const group = current === null ? null : groups[current];

  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
      <div className="grid gap-4 md:grid-cols-12 md:items-end md:gap-8">
        <div className="md:col-span-6">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted">(01) — Work</p>
          </Reveal>
          <RevealHeading
            id="work-title"
            text={site.headings.work}
            className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[0.92] tracking-[-0.04em]"
          />
        </div>
        <Reveal className="md:col-span-6" delay={0.1}>
          <p className="max-w-md text-sm leading-relaxed text-muted md:ml-auto">{site.headings.workIntro}</p>
        </Reveal>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 md:mt-10 md:gap-x-4 md:gap-y-5 lg:grid-cols-4 xl:grid-cols-6">
        {groups.map((g, i) => (
          <motion.li
            key={g.id}
            data-reveal
            className={g.wide ? "col-span-2" : undefined}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: (i % 6) * 0.06 }}
          >
            <CategoryCard
              id={g.id}
              number={g.number}
              category={g.category}
              cover={g.cover}
              count={g.projects.length}
              wide={g.wide}
              onOpen={() => openGroup(i)}
            />
          </motion.li>
        ))}
      </ul>

      <CategoryPanel
        group={group}
        total={pad(groups.length)}
        prev={current !== null && current > 0 ? groups[current - 1] : null}
        next={current !== null && current < groups.length - 1 ? groups[current + 1] : null}
        paused={piece !== null}
        onClose={closeGroup}
        onSwitch={switchGroup}
        onOpenPiece={setPiece}
      />

      <Lightbox projects={group ? group.projects : []} index={piece} onClose={closePiece} onNavigate={setPiece} />
    </section>
  );
}
