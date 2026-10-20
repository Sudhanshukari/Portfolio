import Image from "next/image";
import { Reveal, RevealHeading } from "@/components/reveal";
import { site } from "@/content/site";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Logo grid of the brands in `site.clients`. Logos sit as white silhouettes
 * on the dark page; hovering a cell turns it light and shows the logo in its
 * own colours. A client without a logo falls back to its name as a wordmark.
 */
export function Clients() {
  if (site.clients.length === 0) return null;
  return (
    <section id="clients" aria-labelledby="clients-title" className="mx-auto max-w-6xl border-t border-line px-5 py-14 md:px-8 md:py-20">
      <div className="grid gap-4 md:grid-cols-12 md:items-end md:gap-8">
        <div className="md:col-span-7">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted">(02) — Clients</p>
          </Reveal>
          <RevealHeading
            id="clients-title"
            text={site.headings.clients}
            className="mt-3 font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[0.95] tracking-[-0.035em]"
          />
        </div>
        <Reveal className="md:col-span-5" delay={0.1}>
          <p className="max-w-sm text-sm leading-relaxed text-muted md:ml-auto">{site.headings.clientsIntro}</p>
        </Reveal>
      </div>

      <ul className="mt-8 grid grid-cols-2 border-l border-t border-line bg-ink/40 backdrop-blur-sm md:mt-10 md:grid-cols-8">
        {site.clients.map((client, i) => (
          <Reveal
            as="li"
            key={client.name}
            delay={(i % 8) * 0.05}
            y={20}
            className={`group relative flex h-32 flex-col justify-between overflow-hidden border-b border-r border-line p-3 ${(client.logos?.length ?? 0) > 1 ? "col-span-2" : ""}`}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100 motion-reduce:transition-none"
            />
            <span aria-hidden="true" className="relative text-[10px] tracking-[0.2em] text-accent transition-colors duration-300 group-hover:text-ink/50">
              {pad(i + 1)}
            </span>
            {client.logos?.length ? (
              <span className="relative flex h-14 items-center justify-center gap-5 px-1 md:h-16">
                {client.logos.map((src) => (
                  <span key={src} className="relative h-full w-full">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 140px, 45vw"
                      className="object-contain opacity-85 brightness-0 invert transition duration-300 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0"
                    />
                  </span>
                ))}
              </span>
            ) : (
              <span className="relative text-center font-display text-lg font-extrabold leading-none tracking-[-0.03em] transition-colors duration-300 group-hover:text-ink md:text-xl">
                {client.name}
              </span>
            )}
            <span className="relative truncate text-center text-[9px] uppercase tracking-[0.16em] text-muted transition-colors duration-300 group-hover:text-ink/60 md:text-[10px]">
              {client.logos?.length ? client.name : null}
            </span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
