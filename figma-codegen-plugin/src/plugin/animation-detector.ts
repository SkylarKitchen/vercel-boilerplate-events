/**
 * Animation Detector — suggests data-animate attributes based on element context.
 *
 * Uses spatial position, typography, and component matches to infer which
 * GSAP animation type each node should receive. The suggestions are
 * user-toggleable in the UI panel.
 *
 * Animation types (from HomeAnimations.tsx):
 *   hero-heading  — SplitText word reveal, page-load (hero zone)
 *   hero          — autoAlpha fade-up, page-load (hero zone)
 *   heading       — SplitText word reveal, scroll-triggered
 *   heading-body  — subtle slide-up + fade, paired with heading
 *   scroll        — single element fade-up on scroll
 *   stagger       — children cascade in (cards, feature lists)
 *   stagger-fast  — tighter cascade (timeline/schedule rows)
 *   countup       — animated number counter
 */

import type {
  ExtractedNode,
  ComponentMatch,
  AnimationSuggestion,
  AnimationType,
} from "../shared/types.ts";

/** Y-coordinate threshold separating the hero zone from scrollable content */
const HERO_Y_THRESHOLD = 800;

/** Minimum font size (px) to consider text a "large heading" */
const LARGE_HEADING_MIN_SIZE = 28;

/** Minimum children count to qualify a container for stagger */
const STAGGER_MIN_CHILDREN = 3;

/** Minimum rows to qualify as a timeline/schedule for stagger-fast */
const STAGGER_FAST_MIN_CHILDREN = 4;

const isSerif = (node: ExtractedNode): boolean =>
  node.font?.family?.toLowerCase().includes("serif") ?? false;

const isLargeHeading = (node: ExtractedNode): boolean =>
  !!node.font && node.font.size >= LARGE_HEADING_MIN_SIZE && isSerif(node);

const isBodyText = (node: ExtractedNode): boolean =>
  !!node.font && !isSerif(node) && node.font.size < LARGE_HEADING_MIN_SIZE;

const isNumeric = (text: string): boolean =>
  /^\d[\d,.\s]*[+%]?$/.test(text.trim());

const isInHeroZone = (node: ExtractedNode): boolean =>
  node.y < HERO_Y_THRESHOLD;

/**
 * Check if a node has a sibling that looks like a heading.
 * We look at sibling nodes that are within 200px vertically
 * and appear before this node (above it).
 */
const hasHeadingSibling = (
  node: ExtractedNode,
  allNodes: ExtractedNode[],
): boolean =>
  allNodes.some(
    (sibling) =>
      sibling.id !== node.id &&
      isLargeHeading(sibling) &&
      Math.abs(sibling.y - node.y) < 200 &&
      sibling.y <= node.y &&
      !isInHeroZone(sibling),
  );

/**
 * Check if children are visually similar (same type, similar sizes).
 * Used to detect card grids, feature lists, etc.
 */
const hasSimilarChildren = (
  node: ExtractedNode,
  minCount: number,
): boolean => {
  if (node.children.length < minCount) return false;
  const types = node.children.map((c) => c.type);
  const mostCommonType = types
    .sort(
      (a, b) =>
        types.filter((t) => t === b).length -
        types.filter((t) => t === a).length,
    )[0];
  const sameTypeCount = types.filter((t) => t === mostCommonType).length;
  return sameTypeCount >= minCount;
};

const makeSuggestion = (
  type: AnimationType,
  nodeId: string,
  confidence: number,
  description: string,
  value?: string,
): AnimationSuggestion => ({
  type,
  attribute:
    type === "countup"
      ? `data-countup="${value ?? "0"}"`
      : `data-animate="${type}"`,
  description,
  confidence,
  nodeId,
  enabled: true,
});

/**
 * Detect animation suggestions for a flat list of extracted nodes.
 *
 * @param nodes - All extracted nodes from the Figma selection
 * @param componentMatches - Detected component matches from component-detector
 * @returns Array of animation suggestions, one per qualifying node
 */
export const detectAnimations = (
  nodes: ExtractedNode[],
  componentMatches: ComponentMatch[],
): AnimationSuggestion[] => {
  const suggestions: AnimationSuggestion[] = [];
  const matchedNodeIds = new Set(componentMatches.map((m) => m.nodeId));
  const componentByNodeId = new Map(
    componentMatches.map((m) => [m.nodeId, m]),
  );

  // Flatten all nodes for sibling analysis
  const flatNodes = flattenNodes(nodes);

  // Track which nodes already have suggestions to avoid duplicates
  const suggestedNodeIds = new Set<string>();

  const addSuggestion = (s: AnimationSuggestion) => {
    if (!suggestedNodeIds.has(s.nodeId)) {
      suggestedNodeIds.add(s.nodeId);
      suggestions.push(s);
    }
  };

  // --- Pass 1: Component-driven suggestions ---
  for (const match of componentMatches) {
    switch (match.component) {
      case "StatsGrid":
        addSuggestion(
          makeSuggestion(
            "stagger",
            match.nodeId,
            88,
            "StatsGrid children stagger in on scroll",
          ),
        );
        // Also add countup for numeric stat children
        addCountupForStatChildren(match.nodeId, flatNodes, suggestions);
        break;

      case "Timeline":
        addSuggestion(
          makeSuggestion(
            "stagger-fast",
            match.nodeId,
            88,
            "Timeline rows cascade in with tight stagger",
          ),
        );
        break;

      case "FeatureList":
      case "ColumnFeatures":
        addSuggestion(
          makeSuggestion(
            "stagger",
            match.nodeId,
            85,
            `${match.component} items stagger in on scroll`,
          ),
        );
        break;

      case "SectionHeader":
        // SectionHeader handles its own internal animations via data-animate-wrap
        // The heading gets "heading" and eyebrow/description get "heading-body"
        break;

      case "CTABanner":
        addSuggestion(
          makeSuggestion(
            "scroll",
            match.nodeId,
            80,
            "CTA banner fades in on scroll",
          ),
        );
        break;

      case "SplitSection":
      case "VideoEmbed":
      case "LogoWall":
        addSuggestion(
          makeSuggestion(
            "scroll",
            match.nodeId,
            80,
            `${match.component} fades in on scroll`,
          ),
        );
        break;

      default:
        // Other components: no automatic suggestion
        break;
    }
  }

  // --- Pass 2: Heuristic-driven suggestions for unmatched nodes ---
  for (const node of flatNodes) {
    if (suggestedNodeIds.has(node.id)) continue;
    if (matchedNodeIds.has(node.id)) continue; // Already handled by component pass

    // Hero zone: large serif heading
    if (isInHeroZone(node) && isLargeHeading(node)) {
      addSuggestion(
        makeSuggestion(
          "hero-heading",
          node.id,
          90,
          "Large serif heading in hero zone — word-by-word reveal on page load",
        ),
      );
      continue;
    }

    // Hero zone: non-heading element
    if (isInHeroZone(node) && node.characters && !isLargeHeading(node)) {
      addSuggestion(
        makeSuggestion(
          "hero",
          node.id,
          80,
          "Hero element — fade up on page load",
        ),
      );
      continue;
    }

    // Numeric text → countup
    if (node.characters && isNumeric(node.characters)) {
      const numericValue = node.characters.replace(/[^0-9]/g, "");
      const suffix = node.characters.replace(/[\d,.\s]/g, "");
      const attr = suffix
        ? `data-countup="${numericValue}" data-suffix="${suffix}"`
        : `data-countup="${numericValue}"`;
      suggestions.push({
        type: "countup",
        attribute: attr,
        description: `Animated counter to ${node.characters.trim()}`,
        confidence: 78,
        nodeId: node.id,
        enabled: true,
      });
      suggestedNodeIds.add(node.id);
      continue;
    }

    // Section heading (serif, large, below hero)
    if (!isInHeroZone(node) && isLargeHeading(node)) {
      addSuggestion(
        makeSuggestion(
          "heading",
          node.id,
          85,
          "Section heading — word-by-word reveal on scroll",
        ),
      );
      continue;
    }

    // Body text paired with a heading sibling
    if (
      !isInHeroZone(node) &&
      isBodyText(node) &&
      hasHeadingSibling(node, flatNodes)
    ) {
      addSuggestion(
        makeSuggestion(
          "heading-body",
          node.id,
          75,
          "Body text paired with heading — fade up on scroll",
        ),
      );
      continue;
    }

    // Container with 3+ similar children → stagger
    if (
      node.children.length > 0 &&
      hasSimilarChildren(node, STAGGER_MIN_CHILDREN)
    ) {
      // 4+ rows that are vertically stacked → stagger-fast (timeline-like)
      if (
        hasSimilarChildren(node, STAGGER_FAST_MIN_CHILDREN) &&
        node.layout?.mode === "VERTICAL"
      ) {
        addSuggestion(
          makeSuggestion(
            "stagger-fast",
            node.id,
            82,
            "Vertical list with 4+ rows — tight stagger cascade",
          ),
        );
      } else {
        addSuggestion(
          makeSuggestion(
            "stagger",
            node.id,
            82,
            "Container with 3+ similar children — stagger cascade",
          ),
        );
      }
      continue;
    }

    // Standalone content block below hero
    if (
      !isInHeroZone(node) &&
      !node.characters &&
      node.children.length > 0 &&
      node.width > 200
    ) {
      addSuggestion(
        makeSuggestion(
          "scroll",
          node.id,
          70,
          "Content block — fade in on scroll",
        ),
      );
    }
  }

  return suggestions;
};

/** Recursively flatten a node tree into a single array */
const flattenNodes = (nodes: ExtractedNode[]): ExtractedNode[] => {
  const result: ExtractedNode[] = [];
  const walk = (list: ExtractedNode[]) => {
    for (const node of list) {
      result.push(node);
      if (node.children.length > 0) walk(node.children);
    }
  };
  walk(nodes);
  return result;
};

/** Add countup suggestions for numeric text children of a StatsGrid node */
const addCountupForStatChildren = (
  parentId: string,
  allNodes: ExtractedNode[],
  suggestions: AnimationSuggestion[],
) => {
  // Find the parent node
  const parent = allNodes.find((n) => n.id === parentId);
  if (!parent) return;

  // Look through all descendants for numeric text
  const descendants = flattenNodes(parent.children);
  for (const child of descendants) {
    if (child.characters && isNumeric(child.characters)) {
      const numericValue = child.characters.replace(/[^0-9]/g, "");
      const suffix = child.characters.replace(/[\d,.\s]/g, "");
      const attr = suffix
        ? `data-countup="${numericValue}" data-suffix="${suffix}"`
        : `data-countup="${numericValue}"`;
      suggestions.push({
        type: "countup",
        attribute: attr,
        description: `Animated counter to ${child.characters.trim()}`,
        confidence: 85,
        nodeId: child.id,
        enabled: true,
      });
    }
  }
};
