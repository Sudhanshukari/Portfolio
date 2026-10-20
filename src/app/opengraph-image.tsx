import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { displayFont, OgCard } from "@/lib/og";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(<OgCard />, { ...size, fonts: await displayFont() });
}
