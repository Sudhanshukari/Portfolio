import { site } from "@/content/site";

/**
 * Absolute base URL of the site, used for SEO tags, sitemap and robots.
 * 1. `url` from site.ts if set (e.g. a custom domain)
 * 2. the Vercel production URL (<project>.vercel.app), provided by Vercel
 * 3. localhost for local development
 */
export function getSiteUrl(): string {
  const fromContent = site.url.trim();
  if (fromContent) return fromContent.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return `http://localhost:${process.env.PORT || 3000}`;
}
