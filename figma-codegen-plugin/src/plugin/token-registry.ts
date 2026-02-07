/**
 * Token Registry — static lookup tables for all design tokens.
 *
 * Source of truth: globals.css @theme block.
 * Contains every semantic color, typography utility, spacing value,
 * and radius token with pre-computed CIELAB values for color matching.
 */

// --- sRGB → CIELAB conversion ---

/** Linearize an sRGB channel (0–1 range) */
const linearize = (c: number): number =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

/** sRGB hex → CIELAB [L, a, b] */
export const hexToLab = (hex: string): [number, number, number] => {
  const r = linearize(parseInt(hex.slice(1, 3), 16) / 255);
  const g = linearize(parseInt(hex.slice(3, 5), 16) / 255);
  const b = linearize(parseInt(hex.slice(5, 7), 16) / 255);

  // sRGB → XYZ (D65)
  let x = (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / 0.95047;
  let y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * b;
  let z = (0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / 1.08883;

  // XYZ → Lab
  const f = (t: number) =>
    t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;

  x = f(x);
  y = f(y);
  z = f(z);

  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
};

/** CIE76 color difference */
export const deltaE = (
  lab1: [number, number, number],
  lab2: [number, number, number],
): number =>
  Math.sqrt(
    (lab1[0] - lab2[0]) ** 2 +
      (lab1[1] - lab2[1]) ** 2 +
      (lab1[2] - lab2[2]) ** 2,
  );

// --- Color tokens ---

export type ColorContext = "bg" | "text" | "border";

export type ColorToken = {
  hex: string;
  lab: [number, number, number];
  cssVar: string;
  contexts: { className: string; context: ColorContext }[];
};

const defineColor = (
  hex: string,
  cssVar: string,
  contexts: { className: string; context: ColorContext }[],
): ColorToken => ({
  hex,
  lab: hexToLab(hex),
  cssVar,
  contexts,
});

/** All semantic + brand color tokens */
export const COLOR_TOKENS: ColorToken[] = [
  // --- Backgrounds ---
  defineColor("#FFFFFF", "--color-bg-primary", [
    { className: "bg-bg-primary", context: "bg" },
  ]),
  defineColor("#FAF9F5", "--color-bg-secondary", [
    { className: "bg-bg-secondary", context: "bg" },
  ]),
  defineColor("#F5F4ED", "--color-bg-tertiary", [
    { className: "bg-bg-tertiary", context: "bg" },
  ]),
  defineColor("#141413", "--color-bg-inverse", [
    { className: "bg-bg-inverse", context: "bg" },
  ]),

  // --- Foregrounds ---
  defineColor("#141413", "--color-fg-primary", [
    { className: "text-fg-primary", context: "text" },
  ]),
  defineColor("#30302E", "--color-fg-secondary", [
    { className: "text-fg-secondary", context: "text" },
  ]),
  defineColor("#5E5D59", "--color-fg-tertiary", [
    { className: "text-fg-tertiary", context: "text" },
  ]),
  defineColor("#8B8A85", "--color-fg-quaternary", [
    { className: "text-fg-quaternary", context: "text" },
  ]),
  defineColor("#FAF9F5", "--color-fg-inverse", [
    { className: "text-fg-inverse", context: "text" },
  ]),

  // --- Borders ---
  defineColor("#C2C0B6", "--color-border-primary", [
    { className: "border-border-primary", context: "border" },
  ]),
  defineColor("#DEDCD1", "--color-border-secondary", [
    { className: "border-border-secondary", context: "border" },
  ]),
  defineColor("#F0EEE6", "--color-border-tertiary", [
    { className: "border-border-tertiary", context: "border" },
  ]),

  // --- Accents ---
  defineColor("#D97757", "--color-accent-clay", [
    { className: "bg-accent-clay", context: "bg" },
    { className: "text-accent-clay", context: "text" },
    { className: "border-accent-clay", context: "border" },
  ]),
  defineColor("#C6613F", "--color-accent-clay-interactive", [
    { className: "bg-accent-clay-interactive", context: "bg" },
  ]),
  defineColor("#E8A58C", "--color-accent-clay-light", [
    { className: "bg-accent-clay-light", context: "bg" },
  ]),
  defineColor("#E3DACC", "--color-accent-oat", [
    { className: "bg-accent-oat", context: "bg" },
  ]),
  defineColor("#788C5D", "--color-accent-olive", [
    { className: "bg-accent-olive", context: "bg" },
  ]),
  defineColor("#BCD1CA", "--color-accent-cactus", [
    { className: "bg-accent-cactus", context: "bg" },
  ]),
  defineColor("#6A9BCC", "--color-accent-sky", [
    { className: "bg-accent-sky", context: "bg" },
  ]),
  defineColor("#CBCADB", "--color-accent-heather", [
    { className: "bg-accent-heather", context: "bg" },
  ]),
  defineColor("#C46686", "--color-accent-fig", [
    { className: "bg-accent-fig", context: "bg" },
  ]),
  defineColor("#EBCECE", "--color-accent-coral", [
    { className: "bg-accent-coral", context: "bg" },
  ]),

  // --- Gray scale ---
  defineColor("#FFFFFF", "--color-gray-000", [
    { className: "bg-gray-000", context: "bg" },
  ]),
  defineColor("#FAF9F5", "--color-gray-050", [
    { className: "bg-gray-050", context: "bg" },
  ]),
  defineColor("#F5F4ED", "--color-gray-100", [
    { className: "bg-gray-100", context: "bg" },
  ]),
  defineColor("#F0EEE6", "--color-gray-150", [
    { className: "bg-gray-150", context: "bg" },
  ]),
  defineColor("#E8E6DC", "--color-gray-200", [
    { className: "bg-gray-200", context: "bg" },
  ]),
  defineColor("#DEDCD1", "--color-gray-250", [
    { className: "bg-gray-250", context: "bg" },
  ]),
  defineColor("#D1CFC5", "--color-gray-300", [
    { className: "bg-gray-300", context: "bg" },
  ]),
  defineColor("#C2C0B6", "--color-gray-350", [
    { className: "bg-gray-350", context: "bg" },
  ]),
  defineColor("#B0AEA5", "--color-gray-400", [
    { className: "bg-gray-400", context: "bg" },
  ]),
  defineColor("#9C9A92", "--color-gray-450", [
    { className: "bg-gray-450", context: "bg" },
  ]),
  defineColor("#87867F", "--color-gray-500", [
    { className: "bg-gray-500", context: "bg" },
  ]),
  defineColor("#73726C", "--color-gray-550", [
    { className: "bg-gray-550", context: "bg" },
  ]),
  defineColor("#5E5D59", "--color-gray-600", [
    { className: "bg-gray-600", context: "bg" },
  ]),
  defineColor("#4D4C48", "--color-gray-650", [
    { className: "bg-gray-650", context: "bg" },
  ]),
  defineColor("#3D3D3A", "--color-gray-700", [
    { className: "bg-gray-700", context: "bg" },
  ]),
  defineColor("#30302E", "--color-gray-750", [
    { className: "bg-gray-750", context: "bg" },
  ]),
  defineColor("#262624", "--color-gray-800", [
    { className: "bg-gray-800", context: "bg" },
  ]),
  defineColor("#1F1E1D", "--color-gray-850", [
    { className: "bg-gray-850", context: "bg" },
  ]),
  defineColor("#1A1918", "--color-gray-900", [
    { className: "bg-gray-900", context: "bg" },
  ]),
  defineColor("#141413", "--color-gray-950", [
    { className: "bg-gray-950", context: "bg" },
  ]),
  defineColor("#000000", "--color-gray-1000", [
    { className: "bg-gray-1000", context: "bg" },
  ]),

  // --- Tertiary: Orange ---
  defineColor("#FAEFEB", "--color-orange-100", [
    { className: "bg-orange-100", context: "bg" },
  ]),
  defineColor("#F5CBBC", "--color-orange-200", [
    { className: "bg-orange-200", context: "bg" },
  ]),
  defineColor("#F2A88F", "--color-orange-300", [
    { className: "bg-orange-300", context: "bg" },
  ]),
  defineColor("#ED8461", "--color-orange-400", [
    { className: "bg-orange-400", context: "bg" },
  ]),
  defineColor("#E86235", "--color-orange-500", [
    { className: "bg-orange-500", context: "bg" },
  ]),
  defineColor("#BA4C27", "--color-orange-600", [
    { className: "bg-orange-600", context: "bg" },
  ]),
  defineColor("#8C3619", "--color-orange-700", [
    { className: "bg-orange-700", context: "bg" },
  ]),
  defineColor("#5E230F", "--color-orange-800", [
    { className: "bg-orange-800", context: "bg" },
  ]),
  defineColor("#301107", "--color-orange-900", [
    { className: "bg-orange-900", context: "bg" },
  ]),

  // --- Tertiary: Yellow ---
  defineColor("#FAF3E8", "--color-yellow-100", [
    { className: "bg-yellow-100", context: "bg" },
  ]),
  defineColor("#FAE1B9", "--color-yellow-200", [
    { className: "bg-yellow-200", context: "bg" },
  ]),
  defineColor("#FACF89", "--color-yellow-300", [
    { className: "bg-yellow-300", context: "bg" },
  ]),
  defineColor("#FABD5A", "--color-yellow-400", [
    { className: "bg-yellow-400", context: "bg" },
  ]),
  defineColor("#FAA72A", "--color-yellow-500", [
    { className: "bg-yellow-500", context: "bg" },
  ]),
  defineColor("#C77F1A", "--color-yellow-600", [
    { className: "bg-yellow-600", context: "bg" },
  ]),
  defineColor("#965B0E", "--color-yellow-700", [
    { className: "bg-yellow-700", context: "bg" },
  ]),
  defineColor("#633806", "--color-yellow-800", [
    { className: "bg-yellow-800", context: "bg" },
  ]),
  defineColor("#301901", "--color-yellow-900", [
    { className: "bg-yellow-900", context: "bg" },
  ]),

  // --- Tertiary: Green ---
  defineColor("#F1F7E9", "--color-green-100", [
    { className: "bg-green-100", context: "bg" },
  ]),
  defineColor("#D0E5B1", "--color-green-200", [
    { className: "bg-green-200", context: "bg" },
  ]),
  defineColor("#AFD47D", "--color-green-300", [
    { className: "bg-green-300", context: "bg" },
  ]),
  defineColor("#90BF4E", "--color-green-400", [
    { className: "bg-green-400", context: "bg" },
  ]),
  defineColor("#76AD2A", "--color-green-500", [
    { className: "bg-green-500", context: "bg" },
  ]),
  defineColor("#568C1C", "--color-green-600", [
    { className: "bg-green-600", context: "bg" },
  ]),
  defineColor("#386910", "--color-green-700", [
    { className: "bg-green-700", context: "bg" },
  ]),
  defineColor("#214708", "--color-green-800", [
    { className: "bg-green-800", context: "bg" },
  ]),
  defineColor("#0E2402", "--color-green-900", [
    { className: "bg-green-900", context: "bg" },
  ]),

  // --- Tertiary: Aqua ---
  defineColor("#E9F7F2", "--color-aqua-100", [
    { className: "bg-aqua-100", context: "bg" },
  ]),
  defineColor("#AEE5D3", "--color-aqua-200", [
    { className: "bg-aqua-200", context: "bg" },
  ]),
  defineColor("#7AD6B7", "--color-aqua-300", [
    { className: "bg-aqua-300", context: "bg" },
  ]),
  defineColor("#4DC49C", "--color-aqua-400", [
    { className: "bg-aqua-400", context: "bg" },
  ]),
  defineColor("#24B283", "--color-aqua-500", [
    { className: "bg-aqua-500", context: "bg" },
  ]),
  defineColor("#188F6B", "--color-aqua-600", [
    { className: "bg-aqua-600", context: "bg" },
  ]),
  defineColor("#0E6B54", "--color-aqua-700", [
    { className: "bg-aqua-700", context: "bg" },
  ]),
  defineColor("#07473B", "--color-aqua-800", [
    { className: "bg-aqua-800", context: "bg" },
  ]),
  defineColor("#02211C", "--color-aqua-900", [
    { className: "bg-aqua-900", context: "bg" },
  ]),

  // --- Tertiary: Blue ---
  defineColor("#EDF5FC", "--color-blue-100", [
    { className: "bg-blue-100", context: "bg" },
  ]),
  defineColor("#BAD7F5", "--color-blue-200", [
    { className: "bg-blue-200", context: "bg" },
  ]),
  defineColor("#86B8EB", "--color-blue-300", [
    { className: "bg-blue-300", context: "bg" },
  ]),
  defineColor("#599EE3", "--color-blue-400", [
    { className: "bg-blue-400", context: "bg" },
  ]),
  defineColor("#2C84DB", "--color-blue-500", [
    { className: "bg-blue-500", context: "bg" },
  ]),
  defineColor("#1B67B2", "--color-blue-600", [
    { className: "bg-blue-600", context: "bg" },
  ]),
  defineColor("#0F4B87", "--color-blue-700", [
    { className: "bg-blue-700", context: "bg" },
  ]),
  defineColor("#06325E", "--color-blue-800", [
    { className: "bg-blue-800", context: "bg" },
  ]),
  defineColor("#011A33", "--color-blue-900", [
    { className: "bg-blue-900", context: "bg" },
  ]),

  // --- Tertiary: Violet ---
  defineColor("#F1F0FF", "--color-violet-100", [
    { className: "bg-violet-100", context: "bg" },
  ]),
  defineColor("#CAC6F5", "--color-violet-200", [
    { className: "bg-violet-200", context: "bg" },
  ]),
  defineColor("#A49EE8", "--color-violet-300", [
    { className: "bg-violet-300", context: "bg" },
  ]),
  defineColor("#827ADE", "--color-violet-400", [
    { className: "bg-violet-400", context: "bg" },
  ]),
  defineColor("#6258D1", "--color-violet-500", [
    { className: "bg-violet-500", context: "bg" },
  ]),
  defineColor("#4D44AB", "--color-violet-600", [
    { className: "bg-violet-600", context: "bg" },
  ]),
  defineColor("#383182", "--color-violet-700", [
    { className: "bg-violet-700", context: "bg" },
  ]),
  defineColor("#26215C", "--color-violet-800", [
    { className: "bg-violet-800", context: "bg" },
  ]),
  defineColor("#141133", "--color-violet-900", [
    { className: "bg-violet-900", context: "bg" },
  ]),

  // --- Tertiary: Magenta ---
  defineColor("#FCF0F4", "--color-magenta-100", [
    { className: "bg-magenta-100", context: "bg" },
  ]),
  defineColor("#F5C6D6", "--color-magenta-200", [
    { className: "bg-magenta-200", context: "bg" },
  ]),
  defineColor("#F0A1BB", "--color-magenta-300", [
    { className: "bg-magenta-300", context: "bg" },
  ]),
  defineColor("#E87DA1", "--color-magenta-400", [
    { className: "bg-magenta-400", context: "bg" },
  ]),
  defineColor("#E05A87", "--color-magenta-500", [
    { className: "bg-magenta-500", context: "bg" },
  ]),
  defineColor("#B54369", "--color-magenta-600", [
    { className: "bg-magenta-600", context: "bg" },
  ]),
  defineColor("#8A2D4C", "--color-magenta-700", [
    { className: "bg-magenta-700", context: "bg" },
  ]),
  defineColor("#5E1C32", "--color-magenta-800", [
    { className: "bg-magenta-800", context: "bg" },
  ]),
  defineColor("#2E0B17", "--color-magenta-900", [
    { className: "bg-magenta-900", context: "bg" },
  ]),

  // --- Tertiary: Red ---
  defineColor("#FCEDED", "--color-red-100", [
    { className: "bg-red-100", context: "bg" },
  ]),
  defineColor("#F7C1C1", "--color-red-200", [
    { className: "bg-red-200", context: "bg" },
  ]),
  defineColor("#F09595", "--color-red-300", [
    { className: "bg-red-300", context: "bg" },
  ]),
  defineColor("#E86B6B", "--color-red-400", [
    { className: "bg-red-400", context: "bg" },
  ]),
  defineColor("#E04343", "--color-red-500", [
    { className: "bg-red-500", context: "bg" },
  ]),
  defineColor("#B53333", "--color-red-600", [
    { className: "bg-red-600", context: "bg" },
  ]),
  defineColor("#8A2424", "--color-red-700", [
    { className: "bg-red-700", context: "bg" },
  ]),
  defineColor("#5C1616", "--color-red-800", [
    { className: "bg-red-800", context: "bg" },
  ]),
  defineColor("#300B0B", "--color-red-900", [
    { className: "bg-red-900", context: "bg" },
  ]),
];

// --- Typography tokens ---

export type TypographyToken = {
  className: string;
  minPx: number;
  maxPx: number;
  lineHeight: number;
  fontFamily: "serif" | "sans" | "mono";
  isUppercase: boolean;
};

export const TYPOGRAPHY_TOKENS: TypographyToken[] = [
  // Display headings (serif)
  { className: "text-display-1", minPx: 42, maxPx: 72, lineHeight: 1.1, fontFamily: "serif", isUppercase: false },
  { className: "text-display-2", minPx: 36, maxPx: 64, lineHeight: 1.1, fontFamily: "serif", isUppercase: false },
  // Headings (serif)
  { className: "text-h1", minPx: 34, maxPx: 52, lineHeight: 1.2, fontFamily: "serif", isUppercase: false },
  { className: "text-h2", minPx: 30, maxPx: 44, lineHeight: 1.2, fontFamily: "serif", isUppercase: false },
  { className: "text-h3", minPx: 28, maxPx: 36, lineHeight: 1.3, fontFamily: "serif", isUppercase: false },
  { className: "text-h4", minPx: 23, maxPx: 32, lineHeight: 1.1, fontFamily: "serif", isUppercase: false },
  { className: "text-h5", minPx: 20, maxPx: 25, lineHeight: 1.2, fontFamily: "serif", isUppercase: false },
  { className: "text-h6", minPx: 16, maxPx: 19, lineHeight: 1.2, fontFamily: "sans", isUppercase: false },
  // Body (sans)
  { className: "text-body-large-1", minPx: 22, maxPx: 24, lineHeight: 1.6, fontFamily: "sans", isUppercase: false },
  { className: "text-body-large-2", minPx: 20, maxPx: 23, lineHeight: 1.5, fontFamily: "sans", isUppercase: false },
  { className: "text-body-1", minPx: 19, maxPx: 20, lineHeight: 1.6, fontFamily: "sans", isUppercase: false },
  { className: "text-body-2", minPx: 17, maxPx: 17, lineHeight: 1.6, fontFamily: "sans", isUppercase: false },
  { className: "text-body-3", minPx: 15, maxPx: 15, lineHeight: 1.6, fontFamily: "sans", isUppercase: false },
  // Utility (sans)
  { className: "text-caption", minPx: 12, maxPx: 12, lineHeight: 1.5, fontFamily: "sans", isUppercase: false },
  { className: "text-micro", minPx: 10, maxPx: 10, lineHeight: 1.5, fontFamily: "sans", isUppercase: false },
  { className: "text-label", minPx: 12, maxPx: 12, lineHeight: 1.5, fontFamily: "sans", isUppercase: true },
];

// --- Spacing tokens ---

export type SpacingToken = {
  className: string;
  minPx: number;
  maxPx: number;
};

export const SECTION_SPACING_TOKENS: SpacingToken[] = [
  { className: "py-section-sm", minPx: 64, maxPx: 96 },
  { className: "py-section-md", minPx: 96, maxPx: 128 },
  { className: "py-section-lg", minPx: 128, maxPx: 200 },
  { className: "pt-page-top", minPx: 192, maxPx: 240 },
];

// --- Radius tokens ---

export type RadiusToken = {
  className: string;
  px: number;
};

export const RADIUS_TOKENS: RadiusToken[] = [
  { className: "rounded-xs", px: 4 },
  { className: "rounded-sm", px: 8 },
  { className: "rounded-md", px: 12 },
  { className: "rounded-lg", px: 16 },
  { className: "rounded-xl", px: 24 },
  { className: "rounded-2xl", px: 32 },
  { className: "rounded-3xl", px: 48 },
  { className: "rounded-4xl", px: 64 },
  { className: "rounded-card", px: 20 }, // responsive 16–24px, center value
];

// --- Tailwind spacing scale (subset used in components) ---

export const SPACING_SCALE: Record<number, string> = {
  0: "0",
  1: "0.25",
  2: "0.5",
  4: "1",
  6: "1.5",
  8: "2",
  10: "2.5",
  12: "3",
  16: "4",
  20: "5",
  24: "6",
  28: "7",
  32: "8",
  40: "10",
  48: "12",
  56: "14",
  64: "16",
  80: "20",
  96: "24",
};

/** Match a pixel gap to the nearest Tailwind spacing class */
export const matchGap = (px: number): string => {
  const entries = Object.entries(SPACING_SCALE);
  let bestClass = "0";
  let bestDiff = Infinity;
  for (const [pxKey, twValue] of entries) {
    const diff = Math.abs(px - Number(pxKey));
    if (diff < bestDiff) {
      bestDiff = diff;
      bestClass = twValue;
    }
  }
  // If within 2px, use the scale; otherwise use arbitrary value
  return bestDiff <= 2 ? `gap-${bestClass}` : `gap-[${px}px]`;
};

/** Match a pixel radius to the nearest token class */
export const matchRadius = (px: number): string => {
  if (px === 0) return "";
  // Rounded-full detection
  if (px >= 999) return "rounded-full";

  let bestToken = RADIUS_TOKENS[0];
  let bestDiff = Infinity;
  for (const token of RADIUS_TOKENS) {
    const diff = Math.abs(px - token.px);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestToken = token;
    }
  }
  return bestDiff <= 4 ? bestToken.className : `rounded-[${px}px]`;
};
