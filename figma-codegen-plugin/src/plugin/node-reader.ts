/**
 * Node Reader — recursive Figma tree walker that extracts structured data
 * from SceneNode trees into serializable ExtractedNode objects.
 *
 * Runs in the Figma plugin main thread where the figma global and
 * all SceneNode subtypes are available.
 */

import type {
  ExtractedNode,
  ExtractedFill,
  ExtractedImageFill,
  ExtractedEffect,
  ExtractedFont,
  ExtractedLayout,
} from "../shared/types.ts";

// --- Helpers ---

/** Convert a Figma RGB (0–1 range) to a 6-digit hex string */
const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) =>
    Math.round(c * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

/** Extract solid fills from a Figma paint array */
const extractFills = (paints: readonly Paint[] | typeof figma.mixed): ExtractedFill[] => {
  if (paints === figma.mixed || !Array.isArray(paints)) return [];
  return paints
    .filter((p): p is SolidPaint => p.type === "SOLID" && p.visible !== false)
    .map((p) => ({
      hex: rgbToHex(p.color.r, p.color.g, p.color.b),
      r: p.color.r,
      g: p.color.g,
      b: p.color.b,
      a: p.opacity ?? 1,
    }));
};

/** Extract image fills from a Figma paint array */
const extractImageFills = (paints: readonly Paint[] | typeof figma.mixed): ExtractedImageFill[] => {
  if (paints === figma.mixed || !Array.isArray(paints)) return [];
  return paints
    .filter((p): p is ImagePaint => p.type === "IMAGE" && p.visible !== false)
    .map((p) => ({
      scaleMode: p.scaleMode || "FILL",
      hash: p.imageHash || null,
    }));
};

/** Extract effects (shadows, blurs) from a node */
const extractEffects = (node: SceneNode): ExtractedEffect[] => {
  if (!("effects" in node)) return [];
  const effects = (node as FrameNode).effects;
  if (!effects || !Array.isArray(effects)) return [];
  return effects
    .filter((e) => e.visible !== false)
    .map((e) => {
      var result: ExtractedEffect = {
        type: e.type,
        visible: true,
        radius: "radius" in e ? (e as any).radius : 0,
      };
      if ("color" in e && (e as any).color) {
        var c = (e as any).color;
        result.color = { hex: rgbToHex(c.r, c.g, c.b), a: c.a };
      }
      if ("offset" in e && (e as any).offset) {
        var o = (e as any).offset;
        result.offset = { x: o.x, y: o.y };
      }
      if ("spread" in e) {
        result.spread = (e as any).spread;
      }
      return result;
    });
};

/** Extract corner radius, handling mixed radii by taking topLeftRadius */
const extractRadius = (node: SceneNode): number => {
  if (!("cornerRadius" in node)) return 0;
  const n = node as FrameNode;
  if (n.cornerRadius === figma.mixed) {
    return n.topLeftRadius ?? 0;
  }
  return n.cornerRadius ?? 0;
};

/** Extract stroke weight, handling mixed weights */
const extractStrokeWeight = (node: SceneNode): number => {
  if (!("strokeWeight" in node)) return 0;
  const weight = (node as GeometryMixin & MinimalStrokesMixin).strokeWeight;
  if (weight === figma.mixed) return 1;
  return weight ?? 0;
};

/** Extract text properties from a TextNode */
const extractFont = (node: TextNode): ExtractedFont | undefined => {
  const family =
    node.fontName === figma.mixed
      ? "Mixed"
      : (node.fontName as FontName).family;
  const style =
    node.fontName === figma.mixed
      ? "Regular"
      : (node.fontName as FontName).style;
  const size =
    node.fontSize === figma.mixed ? 16 : (node.fontSize as number);
  const rawLineHeight = node.lineHeight;
  let lineHeight: number | null = null;
  if (rawLineHeight !== figma.mixed) {
    const lh = rawLineHeight as LineHeight;
    if (lh.unit === "PIXELS") lineHeight = lh.value;
    else if (lh.unit === "PERCENT") lineHeight = (lh.value / 100) * size;
    // AUTO → null
  }
  const rawLetterSpacing = node.letterSpacing;
  let letterSpacing = 0;
  if (rawLetterSpacing !== figma.mixed) {
    const ls = rawLetterSpacing as LetterSpacing;
    letterSpacing =
      ls.unit === "PIXELS" ? ls.value : (ls.value / 100) * size;
  }
  const rawCase = node.textCase;
  const textCase =
    rawCase === figma.mixed
      ? "ORIGINAL"
      : (rawCase as "ORIGINAL" | "UPPER" | "LOWER" | "TITLE");

  return { family, style, size, lineHeight, letterSpacing, textCase };
};

/** Extract auto-layout properties from a node with auto-layout */
const extractLayout = (node: SceneNode): ExtractedLayout | undefined => {
  if (!("layoutMode" in node)) return undefined;
  const frame = node as FrameNode;
  if (frame.layoutMode === "NONE") return undefined;
  return {
    mode: frame.layoutMode,
    gap: frame.itemSpacing ?? 0,
    paddingTop: frame.paddingTop ?? 0,
    paddingRight: frame.paddingRight ?? 0,
    paddingBottom: frame.paddingBottom ?? 0,
    paddingLeft: frame.paddingLeft ?? 0,
    primaryAxisAlign: frame.primaryAxisAlignItems ?? "MIN",
    counterAxisAlign: frame.counterAxisAlignItems ?? "MIN",
    wrap: frame.layoutWrap === "WRAP",
  };
};

/** Node types that can have children */
const hasChildren = (
  node: SceneNode,
): node is FrameNode | GroupNode | ComponentNode | InstanceNode | SectionNode =>
  "children" in node &&
  Array.isArray((node as FrameNode).children);

/** Node types that have fills/strokes */
const hasGeometry = (
  node: SceneNode,
): node is FrameNode | RectangleNode | EllipseNode | VectorNode | TextNode =>
  "fills" in node;

// --- Main export ---

/** Recursively extract a flat-ish tree of ExtractedNode from Figma SceneNodes */
export const extractNodes = (nodes: readonly SceneNode[]): ExtractedNode[] => {
  const result: ExtractedNode[] = [];

  for (const node of nodes) {
    // Skip hidden nodes
    if ("visible" in node && node.visible === false) continue;

    // Skip unsupported types
    const supportedTypes = [
      "FRAME",
      "GROUP",
      "TEXT",
      "RECTANGLE",
      "INSTANCE",
      "COMPONENT",
      "SECTION",
      "ELLIPSE",
      "VECTOR",
    ];
    if (!supportedTypes.includes(node.type)) continue;

    const fills = hasGeometry(node) ? extractFills(node.fills) : [];
    const imageFills = hasGeometry(node) ? extractImageFills(node.fills) : [];
    const strokes =
      "strokes" in node ? extractFills((node as GeometryMixin).strokes) : [];

    const extracted: ExtractedNode = {
      id: node.id,
      name: node.name,
      type: node.type,
      x: node.x,
      y: node.y,
      width: node.width,
      height: node.height,
      fills,
      imageFills,
      strokes,
      strokeWeight: extractStrokeWeight(node),
      cornerRadius: extractRadius(node),
      opacity: "opacity" in node ? (node as BlendMixin).opacity : 1,
      effects: extractEffects(node),
      children: [],
    };

    // Sizing mode (hug/fill/fixed)
    if ("primaryAxisSizingMode" in node) {
      var frame = node as FrameNode;
      extracted.primaryAxisSizing = frame.primaryAxisSizingMode || "FIXED";
      extracted.counterAxisSizing = frame.counterAxisSizingMode || "FIXED";
    }

    // Overflow / clipping
    if ("clipsContent" in node) {
      extracted.overflow = (node as FrameNode).clipsContent ? "HIDDEN" : "VISIBLE";
    }

    // Positioning (auto vs absolute)
    if ("layoutPositioning" in node) {
      extracted.positioning = (node as any).layoutPositioning || "AUTO";
    }

    // Constraints
    if ("constraints" in node) {
      var c = (node as any).constraints;
      if (c) {
        extracted.constraints = { horizontal: c.horizontal, vertical: c.vertical };
      }
    }

    // Rotation
    if ("rotation" in node && (node as any).rotation !== 0) {
      extracted.rotation = (node as any).rotation;
    }

    // Text-specific
    if (node.type === "TEXT") {
      extracted.characters = node.characters;
      extracted.font = extractFont(node);
    }

    // Layout (auto-layout)
    extracted.layout = extractLayout(node);

    // Component name
    if (node.type === "INSTANCE" && node.mainComponent) {
      extracted.componentName = node.mainComponent.name;
    } else if (node.type === "COMPONENT") {
      extracted.componentName = node.name;
    }

    // Recurse into children
    if (hasChildren(node)) {
      extracted.children = extractNodes(node.children);
    }

    result.push(extracted);
  }

  return result;
};
