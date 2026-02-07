/**
 * JSX Generator — assembles final JSX output from all pipeline stages.
 *
 * Consumes: extracted nodes, component matches, animation suggestions,
 * color/typography/layout mappings → produces ready-to-paste JSX + imports.
 *
 * Output rules:
 *   - Detected components: emit clean component JSX with only non-default props
 *   - Undetected nodes: emit semantic HTML (section/div/h1-h6/p) with Tailwind classes
 *   - Imports: `import X from "@/components/X"` — deduped, sorted
 *   - Animation attrs: injected only for enabled suggestions
 *   - 2-space indentation throughout
 */

import type {
  ExtractedNode,
  ComponentMatch,
  ComponentMatchType,
  AnimationSuggestion,
  ColorMatch,
  TypographyMatch,
  GeneratedCode,
} from "../shared/types.ts";

// --- Default prop values (omitted from output when matched) ---

const BUTTON_DEFAULTS: Record<string, unknown> = {
  variant: "primary",
  size: "md",
  iconFormat: "trailing",
};

const SECTION_HEADER_DEFAULTS: Record<string, unknown> = {
  align: "left",
};

const DEFAULTS_BY_COMPONENT: Partial<
  Record<ComponentMatchType, Record<string, unknown>>
> = {
  Button: BUTTON_DEFAULTS,
  SectionHeader: SECTION_HEADER_DEFAULTS,
};

// --- Semantic heading inference ---

/** Map font size ranges to heading levels */
const headingLevel = (fontSize: number): number => {
  if (fontSize >= 42) return 1;
  if (fontSize >= 34) return 2;
  if (fontSize >= 28) return 3;
  if (fontSize >= 23) return 4;
  if (fontSize >= 20) return 5;
  return 6;
};

// --- Helpers ---

const INDENT = "  ";

const indent = (depth: number): string => INDENT.repeat(depth);

/** Escape JSX text content */
const escapeJsx = (text: string): string =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/{/g, "&#123;")
    .replace(/}/g, "&#125;");

/** Format a prop value for JSX */
const formatPropValue = (key: string, value: unknown): string => {
  if (typeof value === "string") return `${key}="${value}"`;
  if (typeof value === "boolean") return value ? key : `${key}={false}`;
  if (typeof value === "number") return `${key}={${value}}`;
  return `${key}={${JSON.stringify(value)}}`;
};

/** Build props string, excluding defaults */
const buildProps = (
  component: ComponentMatchType,
  props: Record<string, unknown>,
): string => {
  const defaults = DEFAULTS_BY_COMPONENT[component] ?? {};
  const entries = Object.entries(props).filter(
    ([key, value]) =>
      value !== undefined && value !== null && defaults[key] !== value,
  );
  if (entries.length === 0) return "";
  return " " + entries.map(([k, v]) => formatPropValue(k, v)).join(" ");
};

/** Collect Tailwind classes for a node from color, typography, and layout maps */
const collectClasses = (
  nodeId: string,
  colorMatches: Map<string, ColorMatch>,
  typographyMatches: Map<string, TypographyMatch>,
  layoutClasses: Map<string, string[]>,
): string[] => {
  const classes: string[] = [];

  const color = colorMatches.get(nodeId);
  if (color) classes.push(color.tokenClass);

  const typo = typographyMatches.get(nodeId);
  if (typo) {
    classes.push(typo.utilityClass);
    if (typo.fontFamily === "serif") classes.push("font-serif");
    else if (typo.fontFamily === "mono") classes.push("font-mono");
  }

  const layout = layoutClasses.get(nodeId);
  if (layout) classes.push(...layout);

  return classes;
};

/** Build a className attribute string, or empty if no classes */
const classAttr = (classes: string[]): string =>
  classes.length > 0 ? ` className="${classes.join(" ")}"` : "";

/** Build animation attribute string for a node (only enabled suggestions) */
const animationAttr = (
  nodeId: string,
  animationsByNode: Map<string, AnimationSuggestion>,
): string => {
  const anim = animationsByNode.get(nodeId);
  if (!anim || !anim.enabled) return "";
  return " " + anim.attribute;
};

// --- Component JSX generators ---

/** Components that are self-closing (no children) */
const SELF_CLOSING_COMPONENTS = new Set<ComponentMatchType>([
  "VideoEmbed",
  "LogoWall",
]);

/** Components that get a data-animate-wrap wrapper */
const ANIMATE_WRAP_COMPONENTS = new Set<ComponentMatchType>([
  "SectionHeader",
  "CTABanner",
]);

const generateComponentJsx = (
  match: ComponentMatch,
  node: ExtractedNode,
  animationsByNode: Map<string, AnimationSuggestion>,
  depth: number,
): string => {
  const { component, props } = match;
  const propsStr = buildProps(component, props);
  const animStr = animationAttr(node.id, animationsByNode);
  const wrap =
    ANIMATE_WRAP_COMPONENTS.has(component) && animStr ? " data-animate-wrap" : "";

  const prefix = indent(depth);

  // Self-closing components
  if (SELF_CLOSING_COMPONENTS.has(component)) {
    return `${prefix}<${component}${propsStr}${animStr} />`;
  }

  // Button: inline children from text content
  if (component === "Button") {
    const text = node.characters ?? extractTextContent(node);
    return `${prefix}<Button${propsStr}${animStr}>${escapeJsx(text)}</Button>`;
  }

  // SectionHeader: uses eyebrow/title/description props, no JSX children
  if (component === "SectionHeader") {
    if (wrap) {
      return [
        `${prefix}<div${wrap}>`,
        `${prefix}${INDENT}<SectionHeader${propsStr} />`,
        `${prefix}</div>`,
      ].join("\n");
    }
    return `${prefix}<SectionHeader${propsStr} />`;
  }

  // Card: always needs variant prop
  if (component === "Card") {
    // Card variant is required, never omit it
    return `${prefix}<Card${propsStr}${animStr} />`;
  }

  // StatsGrid, Timeline, FAQ, FeatureList, ColumnFeatures:
  // These take data arrays as props, rendered as self-closing
  if (
    [
      "StatsGrid",
      "Timeline",
      "FAQ",
      "FeatureList",
      "ColumnFeatures",
    ].includes(component)
  ) {
    return `${prefix}<${component}${propsStr}${animStr} />`;
  }

  // Generic component with potential children
  return `${prefix}<${component}${propsStr}${animStr} />`;
};

// --- Semantic HTML generation for undetected nodes ---

const generateSemanticHtml = (
  node: ExtractedNode,
  colorMatches: Map<string, ColorMatch>,
  typographyMatches: Map<string, TypographyMatch>,
  layoutClasses: Map<string, string[]>,
  animationsByNode: Map<string, AnimationSuggestion>,
  depth: number,
  isTopLevel: boolean,
): string => {
  const classes = collectClasses(
    node.id,
    colorMatches,
    typographyMatches,
    layoutClasses,
  );
  const animStr = animationAttr(node.id, animationsByNode);
  const prefix = indent(depth);

  // Text node
  if (node.characters) {
    const isSerif =
      node.font?.family?.toLowerCase().includes("serif") ?? false;
    const fontSize = node.font?.size ?? 16;

    // Heading text (serif + large enough)
    if (isSerif && fontSize >= 16) {
      const level = headingLevel(fontSize);
      const tag = `h${level}`;
      return `${prefix}<${tag}${classAttr(classes)}${animStr}>${escapeJsx(node.characters)}</${tag}>`;
    }

    // Body text
    return `${prefix}<p${classAttr(classes)}${animStr}>${escapeJsx(node.characters)}</p>`;
  }

  // Container node
  const tag = isTopLevel ? "section" : "div";

  // No children → self-closing div
  if (node.children.length === 0) {
    return `${prefix}<${tag}${classAttr(classes)}${animStr} />`;
  }

  // Container with children
  const childLines = node.children.map((child) =>
    generateNodeJsx(
      child,
      new Map(),
      colorMatches,
      typographyMatches,
      layoutClasses,
      animationsByNode,
      depth + 1,
      false,
    ),
  );

  return [
    `${prefix}<${tag}${classAttr(classes)}${animStr}>`,
    ...childLines,
    `${prefix}</${tag}>`,
  ].join("\n");
};

/** Extract text content recursively from a node's descendants */
const extractTextContent = (node: ExtractedNode): string => {
  if (node.characters) return node.characters;
  return node.children.map(extractTextContent).filter(Boolean).join(" ");
};

// --- Main node renderer ---

const generateNodeJsx = (
  node: ExtractedNode,
  matchByNodeId: Map<string, ComponentMatch>,
  colorMatches: Map<string, ColorMatch>,
  typographyMatches: Map<string, TypographyMatch>,
  layoutClasses: Map<string, string[]>,
  animationsByNode: Map<string, AnimationSuggestion>,
  depth: number,
  isTopLevel: boolean,
): string => {
  // Check if this node matched a component
  const match = matchByNodeId.get(node.id);
  if (match) {
    return generateComponentJsx(match, node, animationsByNode, depth);
  }

  // Fall back to semantic HTML
  return generateSemanticHtml(
    node,
    colorMatches,
    typographyMatches,
    layoutClasses,
    animationsByNode,
    depth,
    isTopLevel,
  );
};

// --- Import generation ---

const generateImports = (
  componentMatches: ComponentMatch[],
): string[] => {
  const seen = new Set<string>();
  const imports: string[] = [];

  for (const match of componentMatches) {
    if (!seen.has(match.component)) {
      seen.add(match.component);
      imports.push(
        `import ${match.component} from "@/components/${match.component}";`,
      );
    }
  }

  return imports.sort();
};

// --- Component badge counting ---

const countBadges = (
  componentMatches: ComponentMatch[],
): { name: string; count: number }[] => {
  const counts = new Map<string, number>();
  for (const match of componentMatches) {
    counts.set(match.component, (counts.get(match.component) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

// --- Public API ---

/**
 * Generate JSX code from the full pipeline output.
 *
 * @param nodes - Extracted Figma nodes
 * @param componentMatches - Detected component matches
 * @param animations - Animation suggestions (from animation-detector)
 * @param colorMatches - Color token matches keyed by node ID
 * @param typographyMatches - Typography token matches keyed by node ID
 * @param layoutClasses - Layout Tailwind classes keyed by node ID
 * @returns Complete generated code output
 */
export const generateCode = (
  nodes: ExtractedNode[],
  componentMatches: ComponentMatch[],
  animations: AnimationSuggestion[],
  colorMatches: Map<string, ColorMatch>,
  typographyMatches: Map<string, TypographyMatch>,
  layoutClasses: Map<string, string[]>,
): GeneratedCode => {
  const warnings: string[] = [];

  // Handle empty selection
  if (nodes.length === 0) {
    return {
      jsx: "{/* No layers selected — select a frame or group in Figma */}",
      imports: [],
      componentBadges: [],
      animations: [],
      warnings: ["No nodes were extracted from the selection."],
    };
  }

  // Build lookup maps
  const matchByNodeId = new Map(
    componentMatches.map((m) => [m.nodeId, m]),
  );
  const animationsByNode = new Map(
    animations.filter((a) => a.enabled).map((a) => [a.nodeId, a]),
  );

  // Generate JSX for each top-level node
  const jsxLines: string[] = [];
  const isSingle = nodes.length === 1;

  for (const node of nodes) {
    jsxLines.push(
      generateNodeJsx(
        node,
        matchByNodeId,
        colorMatches,
        typographyMatches,
        layoutClasses,
        animationsByNode,
        isSingle ? 0 : 1,
        true,
      ),
    );
  }

  // For multiple top-level nodes, wrap in a fragment
  let jsx: string;
  if (isSingle) {
    jsx = jsxLines[0];
  } else {
    jsx = ["<>", ...jsxLines, "</>"].join("\n");
  }

  // Generate imports
  const imports = generateImports(componentMatches);

  // Count component badges
  const componentBadges = countBadges(componentMatches);

  // Collect warnings
  const unmatchedCount =
    flatCount(nodes) - componentMatches.length;
  if (unmatchedCount > 0 && componentMatches.length > 0) {
    warnings.push(
      `${unmatchedCount} node${unmatchedCount === 1 ? "" : "s"} rendered as raw HTML (no component match).`,
    );
  }

  return {
    jsx,
    imports,
    componentBadges,
    animations,
    warnings,
  };
};

/** Count total nodes in a tree (flat) */
const flatCount = (nodes: ExtractedNode[]): number => {
  let count = 0;
  const walk = (list: ExtractedNode[]) => {
    for (const node of list) {
      count++;
      if (node.children.length > 0) walk(node.children);
    }
  };
  walk(nodes);
  return count;
};
