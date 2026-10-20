import type { CSSProperties } from "react";
import { CopyEmail } from "@/components/copy-email";
import { ArrowUpRight, BrandIcon } from "@/components/icons";
import { Magnetic } from "@/components/magnetic";
import { Marquee } from "@/components/marquee";
import { Reveal, RevealHeading } from "@/components/reveal";
import { site } from "@/content/site";

export function Contact() {
  // Scale the email to always fit on one line, whatever its length.
  const emailSize = {
    fontSize: `clamp(1.15rem, calc((100vw - 2.5rem) / (${site.email.length} * 0.58)), 2.75rem)`,
  } as CSSProperties;

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative border-t border-line pb-14 md:pb-20">
      <Marquee
        items={Array(6).fill("Let's work together")}
        duration={30}
        reduced="single"
        className="border-b border-line bg-ink/40 py-3 backdrop-blur-sm md:py-4"
        itemClassName="font-display text-[clamp(1.5rem,3.5vw,2.75rem)] font-extrabold uppercase leading-none tracking-[-0.03em]"
        separatorClassName="text-accent text-[clamp(1rem,2.2vw,1.75rem)]"
      />

      <div className="mx-auto max-w-6xl px-5 pt-12 md:px-8 md:pt-16">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">(04) — Contact</p>
        </Reveal>
        <RevealHeading
          id="contact-title"
          text={site.headings.contact}
          className="mt-3 max-w-2xl font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[0.95] tracking-[-0.035em]"
        />

        <Reveal className="mt-8 md:mt-10" delay={0.1}>
          <p className="text-[13px] text-muted">Drop me a line</p>
          <a
            href={`mailto:${site.email}`}
            style={emailSize}
            className="group relative mt-2 inline-block max-w-full overflow-hidden break-all font-display font-extrabold leading-[1.1] tracking-[-0.04em]"
          >
            <span className="block transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-full">
              {site.email}
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 block translate-y-full text-accent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-0"
            >
              {site.email}
            </span>
          </a>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <CopyEmail email={site.email} />
            <span className="text-[13px] text-muted">{site.location}</span>
          </div>
        </Reveal>

        <ul className="mt-10 grid max-w-3xl grid-cols-2 gap-2.5 sm:grid-cols-3 md:mt-12">
          {site.socials.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 0.06}>
              <Magnetic strength={0.18} className="w-full">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex min-h-[3.75rem] w-full items-center gap-3 overflow-hidden rounded-xl border border-line bg-ink/40 px-3.5 py-3 backdrop-blur-sm transition-colors duration-500 hover:border-accent hover:text-ink md:px-4"
                >
                  <span className="absolute inset-0 translate-y-full bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0" />
                  <BrandIcon name={s.icon} className="relative size-4 shrink-0" />
                  <span className="relative min-w-0">
                    <span className="block text-sm font-semibold">{s.label}</span>
                    {s.handle ? (
                      <span className="block truncate text-xs text-muted transition-colors group-hover:text-ink/70">
                        {s.handle}
                      </span>
                    ) : null}
                  </span>
                  <ArrowUpRight className="relative ml-auto size-4 shrink-0 transition-transform duration-500 group-hover:rotate-45" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Magnetic>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
