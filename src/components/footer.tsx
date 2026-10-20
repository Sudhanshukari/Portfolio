import type { CSSProperties } from "react";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  const letters = Array.from(site.name).length;
  return (
    <footer className="relative mx-auto max-w-6xl overflow-hidden border-t border-line px-5 pt-8 md:px-8 md:pt-10">
      <div className="flex flex-col gap-3 text-[13px] text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p>
          {site.role} — {site.specialties.join(", ")}
        </p>
        <a href="#top" className="text-paper underline-offset-4 hover:text-accent hover:underline">
          Back to top ↑
        </a>
      </div>
      <p
        aria-hidden="true"
        className="footer-name mt-8 select-none whitespace-nowrap font-display font-extrabold text-paper/[0.07]"
        style={{ "--chars": letters } as CSSProperties}
      >
        {site.name}
      </p>
    </footer>
  );
}
