import { Marquee } from "@/components/marquee";
import { site } from "@/content/site";

/** Two crossing "tapes": tools on the lime band, specialties on the dark one. */
export function SkillsStrip() {
  const specialties = [...site.specialties, ...site.specialties];
  return (
    <section aria-label="Tools and skills" className="relative overflow-hidden py-8 md:py-10">
      <div className="relative z-10 -mx-[5%] -rotate-1 bg-accent py-2 text-ink md:py-2.5">
        <h2 className="sr-only">Tools I use</h2>
        <Marquee
          items={site.skills}
          duration={45}
          itemClassName="font-display text-base font-extrabold uppercase tracking-tight md:text-xl"
          separatorClassName="text-xs md:text-sm"
        />
      </div>
      <div className="relative -mx-[5%] -mt-2 rotate-[0.8deg] border-y border-line bg-ink-2 py-2 md:py-2.5">
        <Marquee
          items={specialties}
          reverse
          duration={55}
          reduced="wrap"
          itemClassName="font-display text-base font-extrabold uppercase tracking-tight text-paper/80 md:text-xl"
          separatorClassName="text-accent text-xs md:text-sm"
        />
      </div>
    </section>
  );
}
