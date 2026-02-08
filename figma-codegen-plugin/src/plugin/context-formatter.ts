/**
 * Context Formatter — generates a structured markdown document from
 * extracted Figma data for pasting into Claude Code.
 *
 * This is the heart of the "Figma → Claude Code" pipeline. Instead of
 * trying to generate JSX with heuristics, we produce a rich, lossless
 * description that Claude can reason over with full codebase context.
 */

import type {
  ExtractedNode,
  ColorMatch,
  TypographyMatch,
  ComponentMatch,
  AnimationSuggestion,
} from "../shared/types.ts";

// --- Helpers ---

const round = (n: number, decimals: number = 1): number =>
  Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals);

const indent = (depth: number): string => "  ".repeat(depth);

const formatPadding = (t: number, r: number, b: number, l: number): string => {
  if (t === r && r === b && b === l) return t + "px";
  if (t === b && l === r) return t + "px " + r + "px";
  return t + "px " + r + "px " + b + "px " + l + "px";
};

// --- Node formatting ---

const formatNodeLine = (
  node: ExtractedNode,
  colorMatches: Map<string, ColorMatch>,
  typographyMatches: Map<string, TypographyMatch>,
  layoutClasses: Map<string, string[]>,
): string[] => {
  var lines: string[] = [];

  // Header: type + name + dimensions
  var sizeStr = round(node.width, 0) + " x " + round(node.height, 0);
  var header = "**" + node.type + ' "' + node.name + '"** — ' + sizeStr + "px";
  if (node.componentName) {
    header += " (component: " + node.componentName + ")";
  }
  lines.push(header);

  // Position
  if (node.positioning === "ABSOLUTE") {
    lines.push("Position: absolute, x:" + round(node.x, 0) + " y:" + round(node.y, 0));
  }

  // Sizing mode
  if (node.primaryAxisSizing || node.counterAxisSizing) {
    var sizing: string[] = [];
    if (node.primaryAxisSizing && node.primaryAxisSizing !== "FIXED") {
      sizing.push("primary: " + node.primaryAxisSizing.toLowerCase());
    }
    if (node.counterAxisSizing && node.counterAxisSizing !== "FIXED") {
      sizing.push("counter: " + node.counterAxisSizing.toLowerCase());
    }
    if (sizing.length > 0) {
      lines.push("Sizing: " + sizing.join(", "));
    }
  }

  // Background / fills
  if (node.fills.length > 0) {
    var fill = node.fills[0];
    var fillStr = fill.hex;
    var match = colorMatches.get(node.id);
    if (match) {
      fillStr += " → `" + match.tokenClass + "`";
      if (!match.isExact) fillStr += " (approx, deltaE:" + round(match.deltaE) + ")";
    }
    if (fill.a < 1) fillStr += " at " + round(fill.a * 100, 0) + "% opacity";
    lines.push("Fill: " + fillStr);
  }

  // Image fills
  if (node.imageFills.length > 0) {
    for (var i = 0; i < node.imageFills.length; i++) {
      var imgFill = node.imageFills[i];
      lines.push("Image fill: scale-mode " + imgFill.scaleMode.toLowerCase() +
        (imgFill.hash ? " (hash: " + imgFill.hash.slice(0, 8) + "...)" : ""));
    }
  }

  // Strokes
  if (node.strokes.length > 0 && node.strokeWeight > 0) {
    var stroke = node.strokes[0];
    var strokeStr = node.strokeWeight + "px " + stroke.hex;
    if (stroke.a < 1) strokeStr += " at " + round(stroke.a * 100, 0) + "%";
    lines.push("Border: " + strokeStr);
  }

  // Corner radius
  if (node.cornerRadius > 0) {
    lines.push("Radius: " + round(node.cornerRadius, 0) + "px");
  }

  // Opacity
  if (node.opacity < 1) {
    lines.push("Opacity: " + round(node.opacity * 100, 0) + "%");
  }

  // Rotation
  if (node.rotation) {
    lines.push("Rotation: " + round(node.rotation, 1) + "deg");
  }

  // Overflow
  if (node.overflow === "HIDDEN") {
    lines.push("Overflow: hidden (clips content)");
  }

  // Effects
  if (node.effects.length > 0) {
    for (var j = 0; j < node.effects.length; j++) {
      var effect = node.effects[j];
      if (effect.type === "DROP_SHADOW" || effect.type === "INNER_SHADOW") {
        var shadowStr = effect.type.toLowerCase().replace("_", " ");
        if (effect.offset) shadowStr += " offset:" + effect.offset.x + "," + effect.offset.y;
        shadowStr += " blur:" + effect.radius;
        if (effect.spread) shadowStr += " spread:" + effect.spread;
        if (effect.color) shadowStr += " color:" + effect.color.hex;
        lines.push("Effect: " + shadowStr);
      } else if (effect.type === "LAYER_BLUR" || effect.type === "BACKGROUND_BLUR") {
        lines.push("Effect: " + effect.type.toLowerCase().replace("_", " ") + " radius:" + effect.radius);
      }
    }
  }

  // Layout (auto-layout)
  if (node.layout) {
    var lay = node.layout;
    var layoutStr = lay.mode.toLowerCase();
    layoutStr += ", gap: " + lay.gap + "px";
    var pad = formatPadding(lay.paddingTop, lay.paddingRight, lay.paddingBottom, lay.paddingLeft);
    if (pad !== "0px") layoutStr += ", padding: " + pad;
    layoutStr += ", align: " + lay.primaryAxisAlign + "/" + lay.counterAxisAlign;
    if (lay.wrap) layoutStr += ", wrap";
    lines.push("Layout: " + layoutStr);

    // Include Tailwind classes if matched
    var lClasses = layoutClasses.get(node.id);
    if (lClasses && lClasses.length > 0) {
      lines.push("Tailwind: `" + lClasses.join(" ") + "`");
    }
  }

  // Text content
  if (node.characters) {
    var text = node.characters;
    // Truncate long text but preserve enough for context
    if (text.length > 200) text = text.slice(0, 200) + "...";
    // Escape newlines for display
    text = text.replace(/\n/g, "\\n");
    lines.push('Text: "' + text + '"');
  }

  // Typography
  if (node.font) {
    var f = node.font;
    var fontStr = f.family + ", " + f.style + ", " + f.size + "px";
    if (f.lineHeight !== null) fontStr += ", line-height: " + round(f.lineHeight, 1) + "px";
    if (f.letterSpacing !== 0) fontStr += ", letter-spacing: " + round(f.letterSpacing, 1) + "px";
    if (f.textCase !== "ORIGINAL") fontStr += ", case: " + f.textCase.toLowerCase();
    var typoMatch = typographyMatches.get(node.id);
    if (typoMatch) {
      fontStr += " → `" + typoMatch.utilityClass + "`";
    }
    lines.push("Font: " + fontStr);

    // Text color (separate from fill for text nodes)
    if (node.fills.length > 0) {
      var textFill = node.fills[0];
      var textColorStr = textFill.hex;
      var textMatch = colorMatches.get(node.id);
      if (textMatch) {
        textColorStr += " → `" + textMatch.tokenClass + "`";
      }
      lines.push("Color: " + textColorStr);
    }
  }

  return lines;
};

// --- Tree formatting ---

const formatTree = (
  nodes: ExtractedNode[],
  colorMatches: Map<string, ColorMatch>,
  typographyMatches: Map<string, TypographyMatch>,
  layoutClasses: Map<string, string[]>,
  depth: number,
  counter: { value: number },
): string => {
  var output = "";

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    counter.value++;
    var num = counter.value;
    var prefix = indent(depth);
    var lines = formatNodeLine(node, colorMatches, typographyMatches, layoutClasses);

    // First line with number
    output += prefix + num + ". " + lines[0] + "\n";

    // Remaining property lines
    for (var j = 1; j < lines.length; j++) {
      output += prefix + "   " + lines[j] + "\n";
    }

    // Children
    if (node.children.length > 0) {
      output += formatTree(
        node.children,
        colorMatches,
        typographyMatches,
        layoutClasses,
        depth + 1,
        counter,
      );
    }

    output += "\n";
  }

  return output;
};

// --- Main export ---

export const formatContext = (
  nodes: ExtractedNode[],
  colorMatches: Map<string, ColorMatch>,
  typographyMatches: Map<string, TypographyMatch>,
  layoutClasses: Map<string, string[]>,
  componentMatches: ComponentMatch[],
  animations: AnimationSuggestion[],
): string => {
  var sections: string[] = [];

  // Header
  var selectionName = nodes.length === 1 ? nodes[0].name : nodes.length + " selected elements";
  sections.push("# Figma Export: " + selectionName);
  sections.push("");

  // Root frame dimensions
  if (nodes.length === 1) {
    sections.push("Root frame: " + round(nodes[0].width, 0) + " x " + round(nodes[0].height, 0) + "px");
    sections.push("");
  }

  // Layer tree
  sections.push("## Layer tree");
  sections.push("");
  var counter = { value: 0 };
  sections.push(formatTree(nodes, colorMatches, typographyMatches, layoutClasses, 0, counter));

  // Detected components
  if (componentMatches.length > 0) {
    sections.push("## Detected components");
    sections.push("");
    for (var i = 0; i < componentMatches.length; i++) {
      var cm = componentMatches[i];
      var propsStr = "";
      var keys = Object.keys(cm.props);
      if (keys.length > 0) {
        var propParts: string[] = [];
        for (var j = 0; j < keys.length; j++) {
          propParts.push(keys[j] + ": " + JSON.stringify(cm.props[keys[j]]));
        }
        propsStr = " — " + propParts.join(", ");
      }
      sections.push("- " + cm.component + " (confidence: " + cm.confidence + "%)" + propsStr);
    }
    sections.push("");
  }

  // Animation suggestions
  if (animations.length > 0) {
    sections.push("## Animation suggestions");
    sections.push("");
    for (var k = 0; k < animations.length; k++) {
      var anim = animations[k];
      sections.push("- " + anim.attribute + " — " + anim.description + " (" + anim.confidence + "% confidence)");
    }
    sections.push("");
  }

  // Unique color tokens found
  var uniqueColors = new Map<string, string>();
  colorMatches.forEach(function(match) {
    if (!uniqueColors.has(match.hex)) {
      uniqueColors.set(match.hex, match.tokenClass + (match.isExact ? "" : " (approx)"));
    }
  });
  if (uniqueColors.size > 0) {
    sections.push("## Color token summary");
    sections.push("");
    uniqueColors.forEach(function(token, hex) {
      sections.push("- " + hex + " → `" + token + "`");
    });
    sections.push("");
  }

  return sections.join("\n");
};
