// --- Extracted Figma data ---

export type ExtractedFill = {
  hex: string;
  r: number;
  g: number;
  b: number;
  a: number;
};

export type ExtractedFont = {
  family: string;
  style: string;
  size: number;
  lineHeight: number | null;
  letterSpacing: number;
  textCase: "ORIGINAL" | "UPPER" | "LOWER" | "TITLE";
};

export type ExtractedLayout = {
  mode: "NONE" | "HORIZONTAL" | "VERTICAL" | "GRID";
  gap: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  primaryAxisAlign: string;
  counterAxisAlign: string;
  wrap: boolean;
};

export type ExtractedNode = {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  // Visual properties
  fills: ExtractedFill[];
  strokes: ExtractedFill[];
  strokeWeight: number;
  cornerRadius: number;
  opacity: number;
  // Text
  characters?: string;
  font?: ExtractedFont;
  // Layout
  layout?: ExtractedLayout;
  // Hierarchy
  children: ExtractedNode[];
  // Component info from Figma
  componentName?: string;
};

// --- Token matching results ---

export type ColorMatch = {
  tokenClass: string;
  hex: string;
  deltaE: number;
  isExact: boolean;
  context: "bg" | "text" | "border";
};

export type TypographyMatch = {
  utilityClass: string;
  fontFamily: "serif" | "sans" | "mono";
  confidence: number;
};

// --- Component detection ---

export type ComponentMatchType =
  | "Button"
  | "SectionHeader"
  | "Card"
  | "StatsGrid"
  | "Timeline"
  | "FAQ"
  | "CTABanner"
  | "SplitSection"
  | "FeatureList"
  | "ColumnFeatures"
  | "LogoWall"
  | "TestimonialCard"
  | "CardLink"
  | "Breadcrumb"
  | "VideoEmbed";

export type ComponentMatch = {
  component: ComponentMatchType;
  confidence: number;
  props: Record<string, unknown>;
  nodeId: string;
};

// --- Animation suggestions ---

export type AnimationType =
  | "hero-heading"
  | "hero"
  | "heading"
  | "heading-body"
  | "scroll"
  | "stagger"
  | "stagger-fast"
  | "countup";

export type AnimationSuggestion = {
  type: AnimationType;
  attribute: string; // e.g. 'data-animate="heading"' or 'data-countup="42"'
  description: string;
  confidence: number;
  nodeId: string;
  enabled: boolean; // user-toggleable in UI
};

// --- Generated output ---

export type GeneratedCode = {
  jsx: string;
  imports: string[];
  componentBadges: { name: string; count: number }[];
  animations: AnimationSuggestion[];
  warnings: string[];
};
