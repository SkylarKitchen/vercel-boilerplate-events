#!/usr/bin/env node
/**
 * figma-to-hero — Paste plugin JSX from clipboard → create a new hero route.
 *
 * Usage:
 *   node figma-to-hero.mjs              # auto-increments hero number
 *   node figma-to-hero.mjs 18           # creates /hero/18
 *   node figma-to-hero.mjs 18 --name "Split gradient"  # with a description
 *
 * Reads JSX from system clipboard, wraps it in a Next.js page component,
 * and writes to src/app/hero/[N]/page.tsx. The dev server picks it up instantly.
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const heroDir = resolve(projectRoot, "src/app/hero");

// ── Parse args ───────────────────────────────────────────────────
const args = process.argv.slice(2);
let heroNum = null;
let heroName = "";

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--name" && args[i + 1]) {
    heroName = args[++i];
  } else if (!heroNum && /^\d+$/.test(args[i])) {
    heroNum = parseInt(args[i], 10);
  }
}

// Auto-detect next hero number
if (!heroNum) {
  const existing = readdirSync(heroDir)
    .filter((d) => /^\d+$/.test(d))
    .map(Number);
  heroNum = Math.max(0, ...existing) + 1;
}

// ── Read clipboard ───────────────────────────────────────────────
let clipboard;
try {
  clipboard = execSync("pbpaste", { encoding: "utf-8" }).trim();
} catch {
  console.error("Failed to read clipboard. Make sure you copied JSX from the plugin.");
  process.exit(1);
}

if (!clipboard) {
  console.error("Clipboard is empty. Copy JSX from the Figma plugin first.");
  process.exit(1);
}

// ── Extract imports and JSX body ─────────────────────────────────
const lines = clipboard.split("\n");
const importLines = [];
const jsxLines = [];

let inJsx = false;
for (const line of lines) {
  if (line.startsWith("import ")) {
    importLines.push(line);
  } else {
    // Skip empty lines between imports and JSX
    if (!inJsx && line.trim() === "") continue;
    inJsx = true;
    jsxLines.push(line);
  }
}

const jsxBody = jsxLines.join("\n").trim();
const imports = importLines.join("\n");

// ── Build the page component ─────────────────────────────────────
const nameComment = heroName
  ? `\n/**\n * Hero ${heroNum} — "${heroName}"\n * Generated from Figma via Code with Claude Codegen plugin.\n */\n`
  : `\n/**\n * Hero ${heroNum}\n * Generated from Figma via Code with Claude Codegen plugin.\n */\n`;

const pageContent = `${imports}
${nameComment}
export default function Hero${heroNum}() {
  return (
    <section className="relative min-h-screen">
      ${jsxBody.split("\n").join("\n      ")}
    </section>
  );
}
`;

// ── Write the file ───────────────────────────────────────────────
const outDir = resolve(heroDir, String(heroNum));
mkdirSync(outDir, { recursive: true });

const outFile = resolve(outDir, "page.tsx");
if (existsSync(outFile)) {
  console.log(`⚠ Overwriting existing ${outFile}`);
}

writeFileSync(outFile, pageContent);

console.log(`✓ Created src/app/hero/${heroNum}/page.tsx`);
console.log(`  View at: http://localhost:3000/hero/${heroNum}`);
if (heroName) console.log(`  Name: "${heroName}"`);
console.log(`\n  Tip: The dev server auto-reloads — check your browser.`);
