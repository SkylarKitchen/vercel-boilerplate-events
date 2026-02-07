/**
 * Typography Matcher — maps Figma font properties to text utility classes.
 *
 * Matches font size (px) to the closest TYPOGRAPHY_TOKENS entry by range
 * overlap, uses font family as a primary signal and line-height as a
 * secondary tiebreaker when multiple tokens overlap for the same size.
 */

import type { ExtractedFont, TypographyMatch } from "../shared/types.ts";
import { TYPOGRAPHY_TOKENS, type TypographyToken } from "./token-registry.ts";

/** Detect the font family category from a Figma font family string */
const detectFontFamily = (family: string): "serif" | "sans" | "mono" => {
  const lower = family.toLowerCase();
  if (lower.includes("mono") || lower.includes("jetbrains") || lower.includes("fira code")) {
    return "mono";
  }
  if (lower.includes("serif") || lower.includes("lora") || lower.includes("georgia") || lower.includes("times")) {
    return "serif";
  }
  return "sans";
};

/** Score how well a token matches the given font properties (lower = better) */
const scoreToken = (
  token: TypographyToken,
  size: number,
  family: "serif" | "sans" | "mono",
  lineHeight: number | null,
): number => {
  // Size distance: 0 if inside range, otherwise distance to nearest edge
  let sizeDist: number;
  if (size >= token.minPx && size <= token.maxPx) {
    sizeDist = 0;
  } else {
    sizeDist = Math.min(
      Math.abs(size - token.minPx),
      Math.abs(size - token.maxPx),
    );
  }

  // Family penalty: strong penalty for mismatch
  const familyPenalty = token.fontFamily === family ? 0 : 20;

  // Range specificity: prefer the tightest (narrowest) range that contains the size.
  // Normalized to 0-5 so it breaks ties without overpowering sizeDist.
  const rangeSpan = token.maxPx - token.minPx;
  const rangePenalty = sizeDist === 0 ? rangeSpan * 0.1 : 0;

  // Line-height tiebreaker: only used when size matches well
  let lhPenalty = 0;
  if (lineHeight !== null && sizeDist < 3) {
    lhPenalty = Math.abs(token.lineHeight - lineHeight) * 2;
  }

  return sizeDist + familyPenalty + rangePenalty + lhPenalty;
};

/**
 * Match Figma font properties to a typography utility class.
 *
 * Returns a TypographyMatch with:
 * - utilityClass: the Tailwind text utility (e.g. "text-h2" or "text-label")
 * - fontFamily: detected family category
 * - confidence: 0-1 confidence score
 */
export const matchTypography = (font: ExtractedFont): TypographyMatch => {
  const family = detectFontFamily(font.family);

  // Uppercase detection: if text is uppercase and size <= 14px, prefer text-label
  if (font.textCase === "UPPER" && font.size <= 14) {
    return {
      utilityClass: "text-label",
      fontFamily: family,
      confidence: 0.95,
    };
  }

  // Normalize line-height: Figma gives absolute px, we need ratio
  const lhRatio = font.lineHeight !== null && font.size > 0
    ? font.lineHeight / font.size
    : null;

  let bestToken: TypographyToken | null = null;
  let bestScore = Infinity;

  for (const token of TYPOGRAPHY_TOKENS) {
    // Skip the label token in general matching — handled above
    if (token.isUppercase && font.textCase !== "UPPER") continue;

    const score = scoreToken(token, font.size, family, lhRatio);
    if (score < bestScore) {
      bestScore = score;
      bestToken = token;
    }
  }

  if (!bestToken) {
    return {
      utilityClass: `text-[${font.size}px]`,
      fontFamily: family,
      confidence: 0,
    };
  }

  // Compute confidence: perfect match = 1.0, degrades with score
  const confidence = Math.max(0, Math.min(1, 1 - bestScore / 30));

  return {
    utilityClass: bestToken.className,
    fontFamily: family,
    confidence: Math.round(confidence * 100) / 100,
  };
};
