import type { CSSProperties } from "react";

/**
 * Infinite, CSS-only marquee (two copies of the list slide by -50%).
 * Pauses on hover. With reduced motion it stops and shows a static list
 * ("wrap": every item, wrapped) or just the first item ("single").
 */
export function Marquee({
  items,
  reverse = false,
  duration = 40,
  separator = "✦",
  className = "",
  itemClassName = "",
  separatorClassName = "",
  reduced = "wrap",
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
  separator?: string;
  className?: string;
  itemClassName?: string;
  separatorClassName?: string;
  reduced?: "wrap" | "single";
}) {
  const list = (copy: boolean) => (
    <ul aria-hidden={copy || undefined} className={`flex shrink-0 items-center ${copy ? "motion-reduce:hidden" : "motion-reduce:flex-wrap"}`}>
      {items.map((item, i) => (
        <li
          key={i}
          className={`flex shrink-0 items-center ${reduced === "single" && i > 0 ? "motion-reduce:hidden" : ""}`}
        >
          <span className={itemClassName}>{item}</span>
          <span aria-hidden="true" className={`mx-5 md:mx-8 ${separatorClassName}`}>
            {separator}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`group flex overflow-hidden ${className}`}>
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center`}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}
