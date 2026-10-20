import type { CSSProperties } from "react";

/**
 * Sparks rising through the backdrop: [left %, size px, duration s, delay s, sideways drift px].
 * Fixed values (not random) so the server and browser render the same thing.
 */
const SPARKS: [number, number, number, number, number][] = [
  [4, 2, 26, -3, 40],
  [11, 3, 31, -17, -30],
  [19, 2, 23, -9, 25],
  [27, 2, 35, -25, -20],
  [36, 3, 28, -5, 30],
  [47, 2, 33, -21, -35],
  [58, 2, 25, -12, 20],
  [66, 3, 30, -2, -25],
  [74, 2, 27, -19, 35],
  [82, 3, 34, -8, -15],
  [89, 2, 24, -28, 30],
  [96, 2, 29, -14, -30],
];

/** Animated background for the whole site (styles in globals.css, "backdrop"). */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="backdrop">
      <div className="backdrop-fields">
        <div className="blob blob-a -left-[15%] -top-[20%] size-[70vmax]" />
        <div className="blob blob-b -right-[20%] top-[10%] size-[60vmax]" />
        <div className="blob blob-c bottom-[-30%] left-[20%] size-[55vmax]" />
      </div>
      <div className="backdrop-dots" />
      {SPARKS.map(([left, size, t, d, x], i) => (
        <span
          key={i}
          className="spark"
          style={
            {
              left: `${left}%`,
              width: size,
              height: size,
              "--spark-t": `${t}s`,
              "--spark-d": `${d}s`,
              "--spark-x": `${x}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
