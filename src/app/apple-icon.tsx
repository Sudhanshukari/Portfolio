import { ImageResponse } from "next/og";
import { displayFont, IconMark } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(<IconMark size={size.width} />, { ...size, fonts: await displayFont() });
}
