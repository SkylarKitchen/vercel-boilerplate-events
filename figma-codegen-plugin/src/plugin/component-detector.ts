/**
 * Component Detector — heuristic pattern matching against known components.
 *
 * Each detector scores structural similarity (0-100 confidence).
 * Run from most-specific to least-specific. Threshold: 60 to match.
 *
 * Export: detectComponents(nodes: ExtractedNode[]): ComponentMatch[]
 */

import type {
  ExtractedNode,
  ExtractedFill,
  ComponentMatch,
  ComponentMatchType,
} from "../shared/types.ts";
import { COLOR_TOKENS, hexToLab, deltaE } from "./token-registry.ts";

const CONFIDENCE_THRESHOLD = 60;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Collect all text-node descendants (recursive) */
const collectTextNodes = (node: ExtractedNode): ExtractedNode[] => {
  const texts: ExtractedNode[] = [];
  if (node.type === "TEXT" && node.characters) texts.push(node);
  for (const child of node.children) {
    texts.push(...collectTextNodes(child));
  }
  return texts;
};

/** Collect direct frame children (non-text) */
const frameChildren = (node: ExtractedNode): ExtractedNode[] =>
  node.children.filter((c) => c.type === "FRAME" || c.type === "GROUP" || c.type === "INSTANCE" || c.type === "COMPONENT");

/** Check if a fill is close to a reference hex (deltaE < threshold) */
const fillMatchesHex = (fill: ExtractedFill, hex: string, threshold = 12): boolean => {
  const fillHex = fill.hex.toUpperCase();
  const refHex = hex.toUpperCase();
  if (fillHex === refHex) return true;
  try {
    const lab1 = hexToLab(`#${fillHex.replace("#", "")}`);
    const lab2 = hexToLab(`#${refHex.replace("#", "")}`);
    return deltaE(lab1, lab2) < threshold;
  } catch {
    return false;
  }
};

/** Normalize a hex fill to have a # prefix */
const normalizeHex = (hex: string): string =>
  hex.startsWith("#") ? hex.toUpperCase() : `#${hex.toUpperCase()}`;

/** Find the closest semantic color token for a fill */
const closestToken = (fill: ExtractedFill) => {
  const lab1 = hexToLab(normalizeHex(fill.hex));
  let best = { token: COLOR_TOKENS[0], dist: Infinity };
  for (const token of COLOR_TOKENS) {
    const dist = deltaE(lab1, token.lab);
    if (dist < best.dist) best = { token, dist };
  }
  return best;
};

/** Does the node look like it has an image fill? (type RECTANGLE with no text children) */
const isImageLike = (node: ExtractedNode): boolean =>
  (node.type === "RECTANGLE" || node.type === "FRAME") &&
  node.children.length === 0 &&
  node.width > 100 &&
  node.height > 80;

/** Does any child look like an arrow SVG? (VECTOR node, small, roughly 16x16) */
const hasArrowChild = (node: ExtractedNode): boolean =>
  node.children.some(
    (c) =>
      (c.type === "VECTOR" || c.type === "GROUP") &&
      c.width <= 24 &&
      c.height <= 24,
  );

/** Check if text appears to be numeric (possibly with suffix like %, +, K, M) */
const isNumericText = (text: string): boolean =>
  /^\d[\d,.]*[%+KMBkmbx]*$/.test(text.trim());

/** Parse a numeric stat string into { value, suffix } */
const parseStatText = (
  text: string,
): { value: number; suffix: string } | null => {
  const match = text.trim().match(/^([\d,.]+)(.*)$/);
  if (!match) return null;
  const value = parseFloat(match[1].replace(/,/g, ""));
  if (isNaN(value)) return null;
  return { value, suffix: match[2].trim() };
};

// ---------------------------------------------------------------------------
// Individual detectors — each returns a ComponentMatch or null
// ---------------------------------------------------------------------------

type Detector = (node: ExtractedNode) => ComponentMatch | null;

/**
 * Button: Frame with rounded corners, 1 text child, small dimensions.
 * Variants detected from fill color, size from height.
 */
const detectButton: Detector = (node) => {
  // Must be a frame-like node
  if (node.type !== "FRAME" && node.type !== "INSTANCE" && node.type !== "COMPONENT")
    return null;

  // Size constraints: buttons are small
  if (node.width > 300 || node.height < 28 || node.height > 64) return null;

  // Must have rounded corners
  if (node.cornerRadius < 4) return null;

  // Collect text children
  const texts = collectTextNodes(node);
  if (texts.length < 1 || texts.length > 2) return null;

  // Text content (label)
  const label = texts[0].characters || "";
  if (!label || label.length > 60) return null;

  // Detect variant from fill color
  let variant: string = "primary";
  const bgFill = node.fills[0];
  if (bgFill) {
    // Check alpha first — transparent fills mean ghost/tertiary regardless of hex
    if (bgFill.a < 0.1) {
      variant = node.strokes.length > 0 ? "ghost" : "tertiary";
    }
    // bg-inverse (#141413) → primary
    else if (fillMatchesHex(bgFill, "#141413")) {
      variant = "primary";
    }
    // accent-clay-interactive (#C6613F) or accent-clay (#D97757) → clay
    else if (
      fillMatchesHex(bgFill, "#C6613F") ||
      fillMatchesHex(bgFill, "#D97757")
    ) {
      variant = "clay";
    }
    // bg-tertiary (#F5F4ED) → secondary or tertiary
    else if (
      fillMatchesHex(bgFill, "#F5F4ED") ||
      fillMatchesHex(bgFill, "#FAF9F5")
    ) {
      // If it has a stroke → secondary; otherwise tertiary
      variant = node.strokes.length > 0 ? "secondary" : "tertiary";
    }
  } else if (node.fills.length === 0) {
    variant = node.strokes.length > 0 ? "ghost" : "primary";
  }

  // Detect size from height
  let size: string = "md";
  if (node.height <= 38) size = "sm";
  else if (node.height <= 42) size = "md";
  else size = "lg";

  // Detect iconFormat from arrow-like children
  const iconFormat = hasArrowChild(node) ? "trailing" : "none";

  // Confidence: higher if rounded corners match expected ~0.5em (8px) pattern
  let confidence = 78;
  if (node.cornerRadius >= 6 && node.cornerRadius <= 16) confidence += 8;
  if (texts.length === 1) confidence += 5;
  // Cap at 95
  confidence = Math.min(confidence, 95);

  return {
    component: "Button",
    confidence,
    nodeId: node.id,
    props: {
      children: label,
      variant,
      size,
      iconFormat,
    },
  };
};

/**
 * SectionHeader: Vertical frame with 2-3 text children.
 * eyebrow (small, uppercase) + title (large, serif) + optional description.
 */
const detectSectionHeader: Detector = (node) => {
  if (node.type !== "FRAME" && node.type !== "GROUP" && node.type !== "INSTANCE")
    return null;

  // Layout should be vertical or NONE
  if (node.layout && node.layout.mode === "HORIZONTAL") return null;

  const texts = collectTextNodes(node);
  if (texts.length < 2 || texts.length > 4) return null;

  // Sort by Y position (top to bottom)
  const sorted = [...texts].sort((a, b) => a.y - b.y);

  // First text should be small (eyebrow) — <=14px, ideally uppercase
  const eyebrowNode = sorted[0];
  if (!eyebrowNode.font || eyebrowNode.font.size > 16) return null;

  // Second text should be large (title) — >=24px
  const titleNode = sorted[1];
  if (!titleNode.font || titleNode.font.size < 22) return null;

  // Optional third: description — medium size
  const descNode = sorted.length >= 3 ? sorted[2] : null;

  const eyebrow = eyebrowNode.characters || "";
  const title = titleNode.characters || "";
  const description = descNode?.characters || undefined;

  // Detect alignment from layout counter-axis or text x-position
  let align: "left" | "center" = "left";
  if (node.layout?.counterAxisAlign === "CENTER") {
    align = "center";
  } else if (
    eyebrowNode.x > 0 &&
    node.width > 0 &&
    Math.abs(eyebrowNode.x - (node.width - eyebrowNode.width) / 2) < 20
  ) {
    align = "center";
  }

  let confidence = 82;
  // Boost if eyebrow is uppercase
  if (
    eyebrowNode.font?.textCase === "UPPER" ||
    (eyebrow === eyebrow.toUpperCase() && eyebrow.length > 1)
  ) {
    confidence += 5;
  }
  // Boost if title font is serif-ish
  if (
    titleNode.font?.family?.toLowerCase().includes("serif") ||
    titleNode.font?.family?.toLowerCase().includes("lora") ||
    titleNode.font?.family?.toLowerCase().includes("georgia")
  ) {
    confidence += 5;
  }
  confidence = Math.min(confidence, 95);

  return {
    component: "SectionHeader",
    confidence,
    nodeId: node.id,
    props: {
      eyebrow,
      title,
      description,
      align,
    },
  };
};

/**
 * Card: Frame with rounded corners + border/stroke.
 * info variant if 2-col grid, resource if vertical.
 */
const detectCard: Detector = (node) => {
  if (node.type !== "FRAME" && node.type !== "INSTANCE" && node.type !== "COMPONENT")
    return null;

  // Must have rounded corners (card-like)
  if (node.cornerRadius < 12) return null;

  // Must have border or stroke
  if (node.strokes.length === 0 && node.strokeWeight === 0) return null;

  // Must contain some text
  const texts = collectTextNodes(node);
  if (texts.length < 1) return null;

  // Find the largest text — that's the title
  const titleNode = texts.reduce((a, b) =>
    (a.font?.size || 0) >= (b.font?.size || 0) ? a : b,
  );
  const title = titleNode.characters || "";

  // Find description (second-largest or medium text)
  const otherTexts = texts.filter((t) => t !== titleNode);
  const descNode = otherTexts.find(
    (t) => t.font && t.font.size >= 14 && t.font.size <= 24,
  );
  const description = descNode?.characters || undefined;

  // Detect variant: "info" if horizontal child layout (2-col), else "resource"
  let variant: "info" | "resource" = "resource";
  if (
    node.layout?.mode === "HORIZONTAL" ||
    (node.children.length === 2 &&
      frameChildren(node).length === 2 &&
      Math.abs(node.children[0].width - node.children[1].width) < node.width * 0.6)
  ) {
    variant = "info";
  }

  // Detect pill-shaped tags (small rounded children with tiny text)
  const tags: string[] = [];
  const findTags = (n: ExtractedNode) => {
    if (
      n.cornerRadius >= 12 &&
      n.height <= 32 &&
      n.height >= 16 &&
      n.width < 150
    ) {
      const tagTexts = collectTextNodes(n);
      for (const t of tagTexts) {
        if (t.characters) tags.push(t.characters);
      }
    }
    for (const child of n.children) findTags(child);
  };
  findTags(node);

  let confidence = 76;
  if (node.cornerRadius >= 16 && node.cornerRadius <= 28) confidence += 6;
  if (texts.length >= 2) confidence += 4;
  confidence = Math.min(confidence, 95);

  return {
    component: "Card",
    confidence,
    nodeId: node.id,
    props: {
      variant,
      title,
      description,
      ...(tags.length > 0 ? { tags } : {}),
    },
  };
};

/**
 * StatsGrid: Horizontal frame with 3+ stat-like children.
 * Each child has a large numeric text + small label.
 */
const detectStatsGrid: Detector = (node) => {
  if (node.type !== "FRAME" && node.type !== "GROUP" && node.type !== "INSTANCE")
    return null;

  // Should have horizontal layout or 3+ direct children arranged horizontally
  const directChildren =
    node.children.length >= 3 ? node.children : frameChildren(node);
  if (directChildren.length < 3) return null;

  // Each child should contain at least one numeric text and one label text
  const stats: { value: number; suffix: string; label: string }[] = [];

  for (const child of directChildren) {
    const texts = collectTextNodes(child);
    if (texts.length < 2) continue;

    // Find the numeric text (largest font with number-like content)
    const numericTexts = texts.filter(
      (t) => t.characters && isNumericText(t.characters),
    );
    if (numericTexts.length === 0) continue;

    const numNode = numericTexts.reduce((a, b) =>
      (a.font?.size || 0) >= (b.font?.size || 0) ? a : b,
    );
    const parsed = parseStatText(numNode.characters || "");
    if (!parsed) continue;

    // Find the label (non-numeric text, usually smaller)
    const labelNode = texts.find(
      (t) =>
        t !== numNode && t.characters && !isNumericText(t.characters),
    );
    if (!labelNode?.characters) continue;

    stats.push({
      value: parsed.value,
      suffix: parsed.suffix || "",
      label: labelNode.characters,
    });
  }

  if (stats.length < 3) return null;

  let confidence = 80;
  if (
    node.layout?.mode === "HORIZONTAL" ||
    (directChildren.length >= 3 &&
      directChildren.every((c) => Math.abs(c.width - directChildren[0].width) < 40))
  ) {
    confidence += 5;
  }
  if (stats.length === directChildren.length) confidence += 5;
  confidence = Math.min(confidence, 95);

  return {
    component: "StatsGrid",
    confidence,
    nodeId: node.id,
    props: {
      stats: stats.map(({ value, suffix, label }) => ({
        value,
        ...(suffix ? { suffix } : {}),
        label,
      })),
    },
  };
};

/**
 * Timeline: Vertical frame with 4+ similar horizontal children.
 * Each child: narrow left column (time, mono) + right column (title + detail).
 */
const detectTimeline: Detector = (node) => {
  if (node.type !== "FRAME" && node.type !== "GROUP" && node.type !== "INSTANCE")
    return null;

  // Vertical layout expected
  if (node.layout?.mode === "HORIZONTAL") return null;

  const rows = node.children.filter(
    (c) =>
      (c.type === "FRAME" || c.type === "GROUP" || c.type === "INSTANCE") &&
      c.children.length >= 2,
  );
  if (rows.length < 4) return null;

  const items: { time: string; title: string; detail?: string }[] = [];

  for (const row of rows) {
    // Expect horizontal layout for each row
    const texts = collectTextNodes(row);
    if (texts.length < 2) continue;

    // Sort by X to find left (time) vs right (title)
    const sorted = [...texts].sort((a, b) => a.x - b.x);
    const timeNode = sorted[0];
    const titleNode = sorted[1];
    const detailNode = sorted.length >= 3 ? sorted[2] : undefined;

    // Time should be short text
    if (!timeNode.characters || timeNode.characters.length > 20) continue;

    items.push({
      time: timeNode.characters,
      title: titleNode.characters || "",
      ...(detailNode?.characters ? { detail: detailNode.characters } : {}),
    });
  }

  if (items.length < 4) return null;

  let confidence = 78;
  // Boost if time texts look like time format (contains : or am/pm)
  const timeFormatCount = items.filter(
    (i) => /\d{1,2}[:.]\d{2}|\d{1,2}\s*(am|pm|AM|PM)/i.test(i.time),
  ).length;
  if (timeFormatCount >= items.length * 0.5) confidence += 8;
  // Boost if rows have borders (timeline divider pattern)
  if (rows.some((r) => r.strokes.length > 0 || r.strokeWeight > 0))
    confidence += 4;
  confidence = Math.min(confidence, 95);

  return {
    component: "Timeline",
    confidence,
    nodeId: node.id,
    props: { items },
  };
};

/**
 * FAQ: Vertical frame with bordered children, each having question + answer text.
 */
const detectFAQ: Detector = (node) => {
  if (node.type !== "FRAME" && node.type !== "GROUP" && node.type !== "INSTANCE")
    return null;

  // Vertical layout
  if (node.layout?.mode === "HORIZONTAL") return null;

  const rows = node.children.filter(
    (c) =>
      (c.type === "FRAME" || c.type === "GROUP" || c.type === "INSTANCE") &&
      collectTextNodes(c).length >= 2,
  );
  if (rows.length < 2) return null;

  const items: { question: string; answer: string }[] = [];

  for (const row of rows) {
    const texts = collectTextNodes(row);
    if (texts.length < 2) continue;

    // Sort by font size descending — larger is question, smaller is answer
    const sorted = [...texts].sort(
      (a, b) => (b.font?.size || 0) - (a.font?.size || 0),
    );
    const questionNode = sorted[0];
    const answerNode = sorted[1];

    if (!questionNode.characters || !answerNode.characters) continue;

    items.push({
      question: questionNode.characters,
      answer: answerNode.characters,
    });
  }

  if (items.length < 2) return null;

  let confidence = 74;
  // Boost if rows have bottom borders (accordion pattern)
  const borderedRows = rows.filter(
    (r) => r.strokes.length > 0 || r.strokeWeight > 0,
  );
  if (borderedRows.length >= rows.length * 0.5) confidence += 8;
  // Boost if question text is distinctly larger than answer
  if (items.length >= 3) confidence += 5;
  confidence = Math.min(confidence, 95);

  return {
    component: "FAQ",
    confidence,
    nodeId: node.id,
    props: { items },
  };
};

/**
 * CTABanner: Centered layout with heading + 1-2 buttons.
 * Variant from background fill: dark → "dark", else "light".
 */
const detectCTABanner: Detector = (node) => {
  if (node.type !== "FRAME" && node.type !== "INSTANCE" && node.type !== "COMPONENT")
    return null;

  // Should be relatively wide (section-level)
  if (node.width < 300) return null;

  const texts = collectTextNodes(node);
  if (texts.length < 1) return null;

  // Find the largest heading text
  const headingNode = texts.reduce((a, b) =>
    (a.font?.size || 0) >= (b.font?.size || 0) ? a : b,
  );
  if (!headingNode.font || headingNode.font.size < 22) return null;

  // Look for button-like children (small rounded frames with text)
  const buttonLikeChildren: ExtractedNode[] = [];
  const findButtons = (n: ExtractedNode) => {
    if (
      (n.type === "FRAME" || n.type === "INSTANCE" || n.type === "COMPONENT") &&
      n.cornerRadius >= 4 &&
      n.width < 300 &&
      n.height >= 28 &&
      n.height <= 64 &&
      collectTextNodes(n).length >= 1
    ) {
      buttonLikeChildren.push(n);
      return; // don't recurse into button-like frames
    }
    for (const child of n.children) findButtons(child);
  };
  findButtons(node);

  if (buttonLikeChildren.length < 1) return null;

  // Detect variant from background
  let variant: "light" | "dark" = "light";
  const bgFill = node.fills[0];
  if (bgFill && fillMatchesHex(bgFill, "#141413", 20)) {
    variant = "dark";
  }

  const heading = headingNode.characters || "";

  // Find description text (not heading, not button text)
  const buttonTexts = new Set(
    buttonLikeChildren.flatMap((b) =>
      collectTextNodes(b).map((t) => t.id),
    ),
  );
  const descCandidates = texts.filter(
    (t) => t !== headingNode && !buttonTexts.has(t.id),
  );
  const descNode = descCandidates.find(
    (t) => t.font && t.font.size >= 14 && t.font.size <= 24,
  );
  const description = descNode?.characters || undefined;

  // Extract button labels for actions
  const primaryBtn = buttonLikeChildren[0];
  const primaryLabel =
    collectTextNodes(primaryBtn)[0]?.characters || "Get started";
  const secondaryBtn =
    buttonLikeChildren.length >= 2 ? buttonLikeChildren[1] : null;
  const secondaryLabel = secondaryBtn
    ? collectTextNodes(secondaryBtn)[0]?.characters || ""
    : undefined;

  let confidence = 80;
  // Boost if centered
  if (
    node.layout?.counterAxisAlign === "CENTER" ||
    node.layout?.primaryAxisAlign === "CENTER"
  ) {
    confidence += 8;
  }
  if (buttonLikeChildren.length >= 1 && buttonLikeChildren.length <= 2)
    confidence += 5;
  confidence = Math.min(confidence, 95);

  return {
    component: "CTABanner",
    confidence,
    nodeId: node.id,
    props: {
      heading,
      description,
      primaryAction: { label: primaryLabel, href: "#" },
      ...(secondaryLabel
        ? { secondaryAction: { label: secondaryLabel, href: "#" } }
        : {}),
      variant,
    },
  };
};

/**
 * SplitSection: 2-column horizontal layout.
 * One child is image-like, other has heading + body text.
 */
const detectSplitSection: Detector = (node) => {
  if (node.type !== "FRAME" && node.type !== "GROUP" && node.type !== "INSTANCE")
    return null;

  // Should have 2 primary children
  if (node.children.length !== 2) return null;

  // Should be horizontal layout or children side-by-side
  const [left, right] = node.children;
  const isHorizontal =
    node.layout?.mode === "HORIZONTAL" ||
    (left.x + left.width < right.x + right.width * 0.5 &&
      Math.abs(left.y - right.y) < 50);
  if (!isHorizontal) return null;

  // One child should be image-like, other should have text
  let imageChild: ExtractedNode | null = null;
  let textChild: ExtractedNode | null = null;

  if (isImageLike(left) || (left.children.length === 0 && left.width > 100)) {
    imageChild = left;
    textChild = right;
  } else if (
    isImageLike(right) ||
    (right.children.length === 0 && right.width > 100)
  ) {
    imageChild = right;
    textChild = left;
  }

  if (!imageChild || !textChild) return null;

  const texts = collectTextNodes(textChild);
  if (texts.length < 2) return null;

  // Sort by font size descending — largest is title
  const sorted = [...texts].sort(
    (a, b) => (b.font?.size || 0) - (a.font?.size || 0),
  );
  const titleNode = sorted[0];
  const descNode = sorted.find(
    (t) => t !== titleNode && t.font && t.font.size >= 14,
  );

  // Check for eyebrow (small, uppercase, above title)
  const eyebrowNode = sorted.find(
    (t) =>
      t !== titleNode &&
      t !== descNode &&
      t.font &&
      t.font.size <= 14 &&
      t.y < titleNode.y,
  );

  const imagePosition: "left" | "right" =
    imageChild === left ? "left" : "right";

  let confidence = 72;
  if (titleNode.font && titleNode.font.size >= 24) confidence += 5;
  if (descNode) confidence += 5;
  confidence = Math.min(confidence, 95);

  return {
    component: "SplitSection",
    confidence,
    nodeId: node.id,
    props: {
      imagePosition,
      title: titleNode.characters || "",
      description: descNode?.characters || "",
      ...(eyebrowNode?.characters
        ? { eyebrow: eyebrowNode.characters }
        : {}),
      imageSrc: "/placeholder.jpg",
      imageAlt: "Image",
    },
  };
};

// ---------------------------------------------------------------------------
// Detector pipeline — ordered from most-specific to least-specific
// ---------------------------------------------------------------------------

const DETECTORS: Detector[] = [
  detectButton,
  detectSectionHeader,
  detectStatsGrid,
  detectTimeline,
  detectFAQ,
  detectCTABanner,
  detectCard,
  detectSplitSection,
];

/**
 * Run all detectors on a single node and return the highest-confidence match
 * above the threshold, or null if none match.
 */
const detectSingle = (node: ExtractedNode): ComponentMatch | null => {
  let best: ComponentMatch | null = null;

  for (const detector of DETECTORS) {
    const match = detector(node);
    if (
      match &&
      match.confidence >= CONFIDENCE_THRESHOLD &&
      (best === null || match.confidence > best.confidence)
    ) {
      best = match;
    }
  }

  return best;
};

/**
 * Detect components in a flat list of extracted nodes.
 *
 * Walks each node tree depth-first. When a node matches a component,
 * it's returned and its subtree is not descended into (prevents
 * double-matching inner elements like Button inside CTABanner).
 */
export const detectComponents = (
  nodes: ExtractedNode[],
): ComponentMatch[] => {
  const matches: ComponentMatch[] = [];

  const walk = (node: ExtractedNode) => {
    const match = detectSingle(node);
    if (match) {
      matches.push(match);
      // Don't descend — children are part of this component
      return;
    }
    // No match at this level — check children
    for (const child of node.children) {
      walk(child);
    }
  };

  for (const node of nodes) {
    walk(node);
  }

  return matches;
};
