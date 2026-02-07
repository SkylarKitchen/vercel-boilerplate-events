/**
 * Layout Mapper — converts ExtractedLayout auto-layout properties
 * to Tailwind CSS flex/grid utility classes.
 */

import type { ExtractedLayout } from "../shared/types.ts";
import { matchGap, SPACING_SCALE } from "./token-registry.ts";

// --- Spacing helper ---

/** Match a pixel value to the nearest Tailwind spacing class (bare number, e.g. "4") */
const matchSpacing = (px: number): string => {
  if (px === 0) return "0";
  let bestClass = "0";
  let bestDiff = Infinity;
  for (const [pxKey, twValue] of Object.entries(SPACING_SCALE)) {
    const diff = Math.abs(px - Number(pxKey));
    if (diff < bestDiff) {
      bestDiff = diff;
      bestClass = twValue;
    }
  }
  return bestDiff <= 2 ? bestClass : `[${px}px]`;
};

// --- Padding ---

/** Map 4-sided padding values to the most compact Tailwind padding classes */
export const mapPadding = (
  top: number,
  right: number,
  bottom: number,
  left: number,
): string[] => {
  if (top === 0 && right === 0 && bottom === 0 && left === 0) return [];

  // All sides equal → p-{n}
  if (top === right && right === bottom && bottom === left) {
    return [`p-${matchSpacing(top)}`];
  }

  const classes: string[] = [];

  // Vertical pair
  if (top === bottom) {
    if (top > 0) classes.push(`py-${matchSpacing(top)}`);
  } else {
    if (top > 0) classes.push(`pt-${matchSpacing(top)}`);
    if (bottom > 0) classes.push(`pb-${matchSpacing(bottom)}`);
  }

  // Horizontal pair
  if (left === right) {
    if (left > 0) classes.push(`px-${matchSpacing(left)}`);
  } else {
    if (left > 0) classes.push(`pl-${matchSpacing(left)}`);
    if (right > 0) classes.push(`pr-${matchSpacing(right)}`);
  }

  return classes;
};

// --- Alignment ---

const PRIMARY_AXIS_MAP: Record<string, string> = {
  MIN: "justify-start",
  CENTER: "justify-center",
  MAX: "justify-end",
  SPACE_BETWEEN: "justify-between",
};

const COUNTER_AXIS_MAP: Record<string, string> = {
  MIN: "items-start",
  CENTER: "items-center",
  MAX: "items-end",
  BASELINE: "items-baseline",
};

// --- Main export ---

/**
 * Convert an ExtractedLayout to an array of Tailwind utility classes.
 *
 * When childCount >= 3 and layout is HORIZONTAL with no wrap, a grid
 * alternative is appended as a comment hint (the flex version is primary).
 */
export const mapLayout = (
  layout: ExtractedLayout,
  childCount: number,
): string[] => {
  if (layout.mode === "NONE") return [];

  const classes: string[] = [];

  // Direction
  if (layout.mode === "HORIZONTAL") {
    classes.push("flex", "flex-row");
  } else {
    classes.push("flex", "flex-col");
  }

  // Wrap
  if (layout.wrap) {
    classes.push("flex-wrap");
  }

  // Gap
  if (layout.gap > 0) {
    classes.push(matchGap(layout.gap));
  }

  // Alignment — only emit non-default values
  const justify = PRIMARY_AXIS_MAP[layout.primaryAxisAlign];
  if (justify && justify !== "justify-start") {
    classes.push(justify);
  }

  const align = COUNTER_AXIS_MAP[layout.counterAxisAlign];
  if (align && align !== "items-start") {
    classes.push(align);
  }

  // Padding
  classes.push(
    ...mapPadding(
      layout.paddingTop,
      layout.paddingRight,
      layout.paddingBottom,
      layout.paddingLeft,
    ),
  );

  // Grid hint for 3+ horizontal children
  if (
    layout.mode === "HORIZONTAL" &&
    childCount >= 3 &&
    !layout.wrap
  ) {
    const gapClass = layout.gap > 0 ? ` ${matchGap(layout.gap)}` : "";
    classes.push(
      `/* grid alt: grid grid-cols-${childCount}${gapClass} */`,
    );
  }

  return classes;
};
