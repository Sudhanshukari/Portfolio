import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-5 text-center">
      <div>
        <p className="font-display text-[clamp(6rem,28vw,18rem)] font-extrabold leading-none tracking-[-0.05em]">
          4<span className="text-accent">0</span>4
        </p>
        <p className="mt-4 text-muted">This page wandered off the canvas.</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper"
        >
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
