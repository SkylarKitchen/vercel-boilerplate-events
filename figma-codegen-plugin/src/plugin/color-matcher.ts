/**
 * Color Matcher — maps Figma RGBA fills to semantic Tailwind token classes.
 *
 * Uses CIELAB perceptual color distance (CIE76 deltaE) to find the closest
 * design token for any given fill color, with context-awareness so the same
 * hex maps to the right class (bg-* vs text-* vs border-*).
 */

import type { ExtractedFill, ColorMatch } from "../shared/types.ts";
import {
  COLOR_TOKENS,
  hexToLab,
  deltaE,
  type ColorContext,
} from "./token-registry.ts";

const EXACT_THRESHOLD = 3;
const APPROXIMATE_THRESHOLD = 10;

/** Cache Lab conversions keyed by hex string to avoid redundant math */
const labCache = new Map<string, [number, number, number]>();

const getCachedLab = (hex: string): [number, number, number] => {
  const cached = labCache.get(hex);
  if (cached) return cached;
  const lab = hexToLab(hex);
  labCache.set(hex, lab);
  return lab;
};

/** Convert Figma 0-1 RGBA floats to a 6-char hex string */
export const rgbaToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) =>
    Math.round(c * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

/**
 * Match a Figma fill color to the closest semantic design token.
 *
 * Returns a ColorMatch with:
 * - tokenClass: the Tailwind class (e.g. "bg-bg-inverse" or "bg-[#FF0000]")
 * - hex: the input hex
 * - deltaE: perceptual distance to best match
 * - isExact: true if deltaE < 3
 * - context: the color context used for matching
 */
export const matchColor = (
  fill: ExtractedFill,
  context: ColorContext,
): ColorMatch => {
  const hex = fill.hex || rgbaToHex(fill.r, fill.g, fill.b);
  const inputLab = getCachedLab(hex);

  let bestClass = "";
  let bestDelta = Infinity;

  for (const token of COLOR_TOKENS) {
    // Only consider tokens that have a mapping for this context
    const contextEntry = token.contexts.find((c) => c.context === context);
    if (!contextEntry) continue;

    const d = deltaE(inputLab, token.lab);
    if (d < bestDelta) {
      bestDelta = d;
      bestClass = contextEntry.className;
    }

    // Short-circuit on perfect match
    if (d === 0) break;
  }

  // If no token matched for this context at all, or distance exceeds threshold
  if (!bestClass || bestDelta >= APPROXIMATE_THRESHOLD) {
    const prefix = context === "bg" ? "bg" : context === "text" ? "text" : "border";
    return {
      tokenClass: `${prefix}-[${hex}]`,
      hex,
      deltaE: bestDelta === Infinity ? 999 : bestDelta,
      isExact: false,
      context,
    };
  }

  return {
    tokenClass: bestClass,
    hex,
    deltaE: bestDelta,
    isExact: bestDelta < EXACT_THRESHOLD,
    context,
  };
};

/** Clear the Lab conversion cache (useful for testing) */
export const clearLabCache = () => labCache.clear();
