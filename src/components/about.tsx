import { Counter } from "@/components/counter";
import { Reveal, RevealHeading } from "@/components/reveal";
import { ScrollText } from "@/components/scroll-text";
import { site } from "@/content/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl border-t border-line px-5 py-14 md:px-8 md:py-20">
      <div className="grid gap-6 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted">(03) — About</p>
          </Reveal>
          <RevealHeading
            id="about-title"
            text={site.headings.about}
            className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-extrabold leading-[0.98] tracking-[-0.03em]"
          />
        </div>
        <div className="md:col-span-8">
          <ScrollText
            text={site.about.statement}
            className="font-display text-[clamp(1.15rem,2vw,1.6rem)] font-semibold leading-[1.25] tracking-[-0.015em]"
          />
        </div>
      </div>

      {/* stats */}
      <dl className="mt-10 grid grid-cols-3 border-y border-line md:mt-14">
        {site.stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.08}
            className={`flex flex-col-reverse gap-1 py-5 md:py-7 ${i > 0 ? "border-l border-line pl-3 sm:pl-5" : ""}`}
          >
            <dt className="text-[10px] uppercase tracking-[0.16em] text-muted md:text-xs">{s.label}</dt>
            <dd className="font-display text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-none tracking-[-0.04em]">
              <Counter value={s.value} suffix={s.suffix} />
            </dd>
          </Reveal>
        ))}
      </dl>

      {/* bio + services */}
      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12">
        <div className="space-y-4 text-sm leading-relaxed text-muted md:col-span-5 md:text-[15px]">
          {site.about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted">What I do</h3>
          </Reveal>
          <ul className="mt-4 border-t border-line">
            {site.about.services.map((s, i) => (
              <Reveal
                key={s.title}
                as="li"
                delay={i * 0.06}
                className="group flex items-baseline gap-4 border-b border-line py-3 md:py-3.5"
              >
                <span className="text-[11px] tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                <div className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                  <p className="font-display text-base font-bold tracking-tight transition-colors group-hover:text-accent md:text-lg">
                    {s.title}
                  </p>
                  <p className="mt-0.5 text-[13px] text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
