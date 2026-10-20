import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  return [
    {
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      // Image sitemap entries help the work show up in image search.
      images: site.projects.map((p) => `${url}${p.image}`),
    },
  ];
}
