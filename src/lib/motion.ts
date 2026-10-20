/** Shared easing: a snappy "expo out" used across the site. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Reveal elements when their top passes ~90% of the viewport, once. */
export const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;
