// --- Extracted Figma data ---

export type ExtractedFill = {
  hex: string;
  r: number;
  g: number;
  b: number;
  a: number;
};

export type ExtractedImageFill = {
  scaleMode: string; // "FILL" | "FIT" | "CROP" | "TILE"
  hash: string | null; // image hash (not exportable but identifies unique images)
};

export type ExtractedEffect = {
  type: string; // "DROP_SHADOW" | "INNER_SHADOW" | "LAYER_BLUR" | "BACKGROUND_BLUR"
  visible: boolean;
  radius: number;
  color?: { hex: string; a: number };
  offset?: { x: number; y: number };
  spread?: number;
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
  imageFills: ExtractedImageFill[];
  strokes: ExtractedFill[];
  strokeWeight: number;
  cornerRadius: number;
  opacity: number;
  effects: ExtractedEffect[];
  // Sizing
  primaryAxisSizing?: string; // "FIXED" | "HUG" | "FILL"
  counterAxisSizing?: string;
  overflow?: string; // "VISIBLE" | "HIDDEN" | "SCROLL"
  // Positioning
  positioning?: string; // "AUTO" | "ABSOLUTE"
  constraints?: { horizontal: string; vertical: string };
  rotation?: number;
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
  /** Structured context document for pasting into Claude Code */
  claudeContext: string;
};
