/**
 * Minimal test runner using Node 24 native TypeScript + assert.
 * Bypasses esbuild/vitest since esbuild binary is blocked by sandbox.
 *
 * Run: node --experimental-strip-types tests/run-tests.ts
 */

import assert from "node:assert/strict";
import { matchColor, rgbaToHex, clearLabCache } from "../src/plugin/color-matcher.ts";
import { matchTypography } from "../src/plugin/typography-matcher.ts";
import { mapLayout, mapPadding } from "../src/plugin/layout-mapper.ts";
import { detectComponents } from "../src/plugin/component-detector.ts";
import type { ExtractedFill, ExtractedFont, ExtractedLayout, ExtractedNode } from "../src/shared/types.ts";

let passed = 0;
let failed = 0;

const test = (name: string, fn: () => void) => {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (e: any) {
    failed++;
    console.log(`  ✗ ${name}`);
    console.log(`    ${e.message}`);
  }
};

const fill = (hex: string): ExtractedFill => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { hex, r, g, b, a: 1 };
};

// ─── Color Matcher ───────────────────────────

console.log("\nColor Matcher:");
clearLabCache();

test("rgbaToHex converts 0-1 floats to hex", () => {
  assert.equal(rgbaToHex(1, 1, 1), "#FFFFFF");
  assert.equal(rgbaToHex(0, 0, 0), "#000000");
  assert.equal(rgbaToHex(0.851, 0.467, 0.341), "#D97757");
});

test("exact match: accent-clay bg", () => {
  const result = matchColor(fill("#D97757"), "bg");
  assert.equal(result.tokenClass, "bg-accent-clay");
  assert.equal(result.isExact, true);
  assert.ok(result.deltaE < 3);
});

test("exact match: accent-clay text", () => {
  const result = matchColor(fill("#D97757"), "text");
  assert.equal(result.tokenClass, "text-accent-clay");
  assert.equal(result.isExact, true);
});

test("exact match: bg-inverse for dark fill", () => {
  const result = matchColor(fill("#141413"), "bg");
  assert.equal(result.tokenClass, "bg-bg-inverse");
  assert.equal(result.isExact, true);
});

test("context awareness: same hex → different class", () => {
  const bg = matchColor(fill("#141413"), "bg");
  const text = matchColor(fill("#141413"), "text");
  assert.notEqual(bg.tokenClass, text.tokenClass);
  assert.equal(bg.context, "bg");
  assert.equal(text.context, "text");
});

test("approximate match: near-clay", () => {
  const result = matchColor(fill("#DA7858"), "bg");
  assert.equal(result.tokenClass, "bg-accent-clay");
  assert.ok(result.deltaE < 10);
});

test("no match: bright red → arbitrary value", () => {
  const result = matchColor(fill("#FF0000"), "bg");
  assert.equal(result.tokenClass, "bg-[#FF0000]");
  assert.equal(result.isExact, false);
});

test("ivory bg matches bg-bg-secondary", () => {
  const result = matchColor(fill("#FAF9F5"), "bg");
  assert.equal(result.tokenClass, "bg-bg-secondary");
});

test("ivory text matches text-fg-inverse", () => {
  const result = matchColor(fill("#FAF9F5"), "text");
  assert.equal(result.tokenClass, "text-fg-inverse");
});

// ─── Typography Matcher ──────────────────────

console.log("\nTypography Matcher:");

test("44px serif → text-h2", () => {
  const font: ExtractedFont = {
    family: "Anthropic Serif",
    style: "Medium",
    size: 44,
    lineHeight: 52.8,
    letterSpacing: 0,
    textCase: "ORIGINAL",
  };
  const result = matchTypography(font);
  assert.equal(result.utilityClass, "text-h2");
  assert.equal(result.fontFamily, "serif");
});

test("15px sans → text-body-3", () => {
  const font: ExtractedFont = {
    family: "Anthropic Sans",
    style: "Regular",
    size: 15,
    lineHeight: 24,
    letterSpacing: 0,
    textCase: "ORIGINAL",
  };
  const result = matchTypography(font);
  assert.equal(result.utilityClass, "text-body-3");
  assert.equal(result.fontFamily, "sans");
});

test("12px uppercase → text-label", () => {
  const font: ExtractedFont = {
    family: "Anthropic Sans",
    style: "Regular",
    size: 12,
    lineHeight: 18,
    letterSpacing: 2.4,
    textCase: "UPPER",
  };
  const result = matchTypography(font);
  assert.equal(result.utilityClass, "text-label");
});

test("72px serif → text-display-1", () => {
  const font: ExtractedFont = {
    family: "Anthropic Serif",
    style: "Medium",
    size: 72,
    lineHeight: 79.2,
    letterSpacing: 0,
    textCase: "ORIGINAL",
  };
  const result = matchTypography(font);
  assert.equal(result.utilityClass, "text-display-1");
});

test("JetBrains Mono → mono family", () => {
  const font: ExtractedFont = {
    family: "JetBrains Mono",
    style: "Regular",
    size: 15,
    lineHeight: 24,
    letterSpacing: 0,
    textCase: "ORIGINAL",
  };
  const result = matchTypography(font);
  assert.equal(result.fontFamily, "mono");
});

// ─── Layout Mapper ───────────────────────────

console.log("\nLayout Mapper:");

test("horizontal with gap 16 → flex flex-row gap-4", () => {
  const layout: ExtractedLayout = {
    mode: "HORIZONTAL",
    gap: 16,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    primaryAxisAlign: "MIN",
    counterAxisAlign: "MIN",
    wrap: false,
  };
  const classes = mapLayout(layout, 2);
  assert.ok(classes.includes("flex"));
  assert.ok(classes.includes("flex-row"));
  assert.ok(classes.includes("gap-4"));
});

test("vertical with center align → flex flex-col items-center", () => {
  const layout: ExtractedLayout = {
    mode: "VERTICAL",
    gap: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    primaryAxisAlign: "MIN",
    counterAxisAlign: "CENTER",
    wrap: false,
  };
  const classes = mapLayout(layout, 2);
  assert.ok(classes.includes("flex"));
  assert.ok(classes.includes("flex-col"));
  assert.ok(classes.includes("items-center"));
});

test("symmetric padding 32px → p-8", () => {
  const classes = mapPadding(32, 32, 32, 32);
  assert.deepEqual(classes, ["p-8"]);
});

test("asymmetric padding → individual py/px", () => {
  const classes = mapPadding(16, 32, 16, 32);
  assert.ok(classes.includes("py-4"));
  assert.ok(classes.includes("px-8"));
});

// ─── Component Detector ──────────────────────

console.log("\nComponent Detector:");

const makeNode = (overrides: Partial<ExtractedNode>): ExtractedNode => ({
  id: "test-1",
  name: "Test",
  type: "FRAME",
  x: 0,
  y: 0,
  width: 200,
  height: 40,
  fills: [],
  strokes: [],
  strokeWeight: 0,
  cornerRadius: 0,
  opacity: 1,
  children: [],
  ...overrides,
});

test("detects Button from small rounded frame with text", () => {
  const button = makeNode({
    width: 150,
    height: 40,
    cornerRadius: 8,
    fills: [{ hex: "#141413", r: 0.078, g: 0.078, b: 0.075, a: 1 }],
    children: [
      makeNode({
        type: "TEXT",
        characters: "Get started",
        font: {
          family: "Anthropic Sans",
          style: "Medium",
          size: 14,
          lineHeight: 20,
          letterSpacing: 0,
          textCase: "ORIGINAL",
        },
        width: 80,
        height: 20,
      }),
    ],
  });
  const matches = detectComponents([button]);
  assert.equal(matches.length, 1);
  assert.equal(matches[0].component, "Button");
  assert.equal(matches[0].props.variant, "primary");
});

test("detects SectionHeader from eyebrow + title", () => {
  const section = makeNode({
    width: 800,
    height: 200,
    y: 900,
    layout: {
      mode: "VERTICAL",
      gap: 8,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      primaryAxisAlign: "MIN",
      counterAxisAlign: "MIN",
      wrap: false,
    },
    children: [
      makeNode({
        type: "TEXT",
        characters: "UPCOMING EVENTS",
        y: 0,
        font: {
          family: "Anthropic Sans",
          style: "Regular",
          size: 12,
          lineHeight: 18,
          letterSpacing: 2.4,
          textCase: "UPPER",
        },
        width: 200,
        height: 18,
      }),
      makeNode({
        type: "TEXT",
        characters: "Three cities, one community",
        y: 30,
        font: {
          family: "Anthropic Serif",
          style: "Medium",
          size: 44,
          lineHeight: 52.8,
          letterSpacing: 0,
          textCase: "ORIGINAL",
        },
        width: 600,
        height: 53,
      }),
    ],
  });
  const matches = detectComponents([section]);
  assert.equal(matches.length, 1);
  assert.equal(matches[0].component, "SectionHeader");
  assert.equal(matches[0].props.eyebrow, "UPCOMING EVENTS");
  assert.equal(matches[0].props.title, "Three cities, one community");
});

test("returns empty for non-matching node", () => {
  const random = makeNode({
    width: 500,
    height: 500,
    children: [
      makeNode({ type: "RECTANGLE", width: 300, height: 300 }),
    ],
  });
  const matches = detectComponents([random]);
  assert.equal(matches.length, 0);
});

// ─── Summary ─────────────────────────────────

console.log(`\n─────────────────────────────────`);
console.log(`  ${passed} passed, ${failed} failed`);
console.log(`─────────────────────────────────\n`);

process.exit(failed > 0 ? 1 : 0);
