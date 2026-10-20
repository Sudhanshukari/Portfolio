import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

/** Static ExtraBold cut of the display font (satori can't read woff2/variable fonts). */
export async function displayFont() {
  const data = await readFile(join(process.cwd(), "src/assets/BricolageGrotesque-ExtraBold.ttf"));
  return [{ name: "Display", data, weight: 800 as const, style: "normal" as const }];
}

const INK = "#0a0a0b";
const PAPER = "#f2f0eb";
const ACCENT = "#d7ff3a";

/** Square brand mark used for the favicon and the Apple touch icon. */
export function IconMark({ size }: { size: number }) {
  const text = Array.from(site.name).length <= 3 ? site.name : Array.from(site.name)[0];
  const fontSize = Math.round(size * (text.length > 1 ? 0.42 : 0.7));
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: ACCENT,
        color: INK,
        fontFamily: "Display",
        fontSize,
        letterSpacing: -fontSize * 0.06,
        borderRadius: size * 0.22,
      }}
    >
      {text}
    </div>
  );
}

/** 1200x630 social preview card (X, WhatsApp, iMessage...). */
export function OgCard() {
  const letters = Array.from(site.name);
  const nameSize = Math.min(430, Math.floor(1040 / (letters.length * 0.56)));
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 64px 40px",
        background: INK,
        backgroundImage:
          "radial-gradient(circle at 85% 10%, rgba(124,92,255,0.55), transparent 45%), radial-gradient(circle at 100% 100%, rgba(255,77,31,0.35), transparent 40%), radial-gradient(circle at 10% 110%, rgba(215,255,58,0.18), transparent 40%)",
        color: PAPER,
        fontFamily: "Display",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 4, color: "#9a988f" }}>
        <span>PORTFOLIO</span>
        <span style={{ display: "flex", alignItems: "center", color: PAPER }}>
          <span style={{ width: 14, height: 14, borderRadius: 14, background: ACCENT, marginRight: 14 }} />
          {site.availability.open ? site.availability.text.toUpperCase() : site.location.toUpperCase()}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 44, lineHeight: 1.1, letterSpacing: -1 }}>
          {site.role}
          <span style={{ color: ACCENT, margin: "0 16px" }}>—</span>
          <span style={{ color: "#9a988f" }}>{site.specialties.join(" · ")}</span>
        </div>
        <div style={{ display: "flex", fontSize: nameSize, lineHeight: 0.8, letterSpacing: -nameSize * 0.045, marginTop: 28 }}>
          {letters.map((ch, i) => (
            <span key={i} style={{ color: /\d/.test(ch) ? ACCENT : PAPER }}>
              {ch}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
