import { ImageResponse } from "next/og";
import { displayFont, IconMark } from "@/lib/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(<IconMark size={size.width} />, { ...size, fonts: await displayFont() });
}
