/**
 * Main thread entry point — orchestrates the full extraction-to-codegen pipeline.
 *
 * Listens for Figma selection changes, runs each pipeline stage in sequence,
 * and posts the generated code to the UI thread via postMessage.
 *
 * Pipeline: Selection → Node Reader → Color/Typography/Layout Matchers
 *           → Component Detector → Animation Detector → JSX Generator → UI
 */

import type {
  ExtractedNode,
  ColorMatch,
  TypographyMatch,
  AnimationSuggestion,
} from "../shared/types.ts";
import type { PluginToUIMessage, UIToPluginMessage } from "../shared/messages.ts";
import { extractNodes } from "./node-reader.ts";
import { matchColor } from "./color-matcher.ts";
import { matchTypography } from "./typography-matcher.ts";
import { mapLayout } from "./layout-mapper.ts";
import { detectComponents } from "./component-detector.ts";
import { detectAnimations } from "./animation-detector.ts";
import { generateCode } from "./jsx-generator.ts";
import { formatContext } from "./context-formatter.ts";
import type { ColorContext } from "./token-registry.ts";

// --- Plugin initialization ---

figma.showUI(__html__, { width: 340, height: 520, themeColors: true });

// --- State ---

/** Cached animation suggestions for toggle/regenerate without re-running the full pipeline */
let lastNodes: ExtractedNode[] = [];
let lastColorMatches = new Map<string, ColorMatch>();
let lastTypographyMatches = new Map<string, TypographyMatch>();
let lastLayoutClasses = new Map<string, string[]>();
let lastComponentMatches: ReturnType<typeof detectComponents> = [];
let lastAnimations: AnimationSuggestion[] = [];

// --- Debounce utility ---

let debounceTimer: ReturnType<typeof setTimeout> | null = null;
const DEBOUNCE_MS = 150;

const debounce = (fn: () => void) => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(fn, DEBOUNCE_MS);
};

// --- Pipeline stages ---

/** Stage 1: Walk selected nodes and build color/typography/layout maps */
const runMatchingPipeline = (
  nodes: ExtractedNode[],
): {
  colorMatches: Map<string, ColorMatch>;
  typographyMatches: Map<string, TypographyMatch>;
  layoutClasses: Map<string, string[]>;
} => {
  const colorMatches = new Map<string, ColorMatch>();
  const typographyMatches = new Map<string, TypographyMatch>();
  const layoutClasses = new Map<string, string[]>();

  const walkForMatching = (node: ExtractedNode) => {
    // Color matching for fills (background context)
    if (node.fills.length > 0) {
      const bgMatch = matchColor(node.fills[0], "bg" as ColorContext);
      colorMatches.set(node.id, bgMatch);
    }

    // Color matching for text (text context)
    if (node.characters && node.fills.length > 0) {
      const textMatch = matchColor(node.fills[0], "text" as ColorContext);
      colorMatches.set(node.id, textMatch);
    }

    // Typography matching for text nodes
    if (node.font) {
      const typoMatch = matchTypography(node.font);
      typographyMatches.set(node.id, typoMatch);
    }

    // Layout matching for auto-layout frames
    if (node.layout) {
      const layoutResult = mapLayout(node.layout, node.children.length);
      // Filter out comment strings (grid hints)
      const cleanClasses = layoutResult.filter((c) => !c.startsWith("/*"));
      if (cleanClasses.length > 0) {
        layoutClasses.set(node.id, cleanClasses);
      }
    }

    // Recurse into children
    for (const child of node.children) {
      walkForMatching(child);
    }
  };

  for (const node of nodes) {
    walkForMatching(node);
  }

  return { colorMatches, typographyMatches, layoutClasses };
};

/** Run the full pipeline from extraction to code generation */
const runPipeline = () => {
  const selection = figma.currentPage.selection;

  if (selection.length === 0) {
    const msg: PluginToUIMessage = { type: "selection-empty" };
    figma.ui.postMessage(msg);
    return;
  }

  try {
    // Stage 1: Extract Figma node trees
    const nodes = extractNodes(selection);

    // Stage 2: Run color, typography, and layout matching
    const { colorMatches, typographyMatches, layoutClasses } =
      runMatchingPipeline(nodes);

    // Stage 3: Detect known components
    const componentMatches = detectComponents(nodes);

    // Stage 4: Detect animation suggestions
    const animations = detectAnimations(nodes, componentMatches);

    // Stage 5: Generate JSX code
    const generatedCode = generateCode(
      nodes,
      componentMatches,
      animations,
      colorMatches,
      typographyMatches,
      layoutClasses,
    );

    // Stage 6: Generate Claude Code context document
    generatedCode.claudeContext = formatContext(
      nodes,
      colorMatches,
      typographyMatches,
      layoutClasses,
      componentMatches,
      animations,
    );

    // Cache state for toggle/regenerate
    lastNodes = nodes;
    lastColorMatches = colorMatches;
    lastTypographyMatches = typographyMatches;
    lastLayoutClasses = layoutClasses;
    lastComponentMatches = componentMatches;
    lastAnimations = animations;

    // Send to UI
    const msg: PluginToUIMessage = {
      type: "code-result",
      payload: generatedCode,
    };
    figma.ui.postMessage(msg);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    const msg: PluginToUIMessage = { type: "error", message };
    figma.ui.postMessage(msg);
  }
};

/** Regenerate code with updated animation toggles (skips extraction + detection) */
const regenerateWithAnimations = (animations: AnimationSuggestion[]) => {
  if (lastNodes.length === 0) return;

  try {
    const generatedCode = generateCode(
      lastNodes,
      lastComponentMatches,
      animations,
      lastColorMatches,
      lastTypographyMatches,
      lastLayoutClasses,
    );

    generatedCode.claudeContext = formatContext(
      lastNodes,
      lastColorMatches,
      lastTypographyMatches,
      lastLayoutClasses,
      lastComponentMatches,
      animations,
    );

    const msg: PluginToUIMessage = {
      type: "code-result",
      payload: generatedCode,
    };
    figma.ui.postMessage(msg);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    const msg: PluginToUIMessage = { type: "error", message };
    figma.ui.postMessage(msg);
  }
};

// --- Event listeners ---

// Listen for selection changes (debounced)
figma.on("selectionchange", () => {
  debounce(runPipeline);
});

// Listen for messages from UI
figma.ui.onmessage = (msg: UIToPluginMessage) => {
  switch (msg.type) {
    case "toggle-animation": {
      // Update the cached animation and regenerate
      const updated = lastAnimations.map((a) =>
        a.nodeId === msg.nodeId && a.type === msg.animationType
          ? { ...a, enabled: msg.enabled }
          : a,
      );
      lastAnimations = updated;
      regenerateWithAnimations(updated);
      break;
    }
    case "regenerate": {
      regenerateWithAnimations(msg.animations);
      break;
    }
  }
};

// Run pipeline on initial load
runPipeline();
