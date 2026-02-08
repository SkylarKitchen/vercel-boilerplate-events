/**
 * Build script using esbuild-wasm (pure JS, no native binary).
 *
 * Produces:
 *   dist/code.js  — Main thread IIFE bundle (Figma sandbox, no DOM)
 *   dist/ui.html  — UI thread single-file HTML (React + CSS inlined)
 */

import * as esbuild from "esbuild-wasm";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = resolve(__dirname, "dist");

// Initialize the WASM-based esbuild (Node auto-locates the .wasm binary)
await esbuild.initialize();

mkdirSync(dist, { recursive: true });

// ── Step 1: Build main thread (code.js) ─────────────────────────
console.log("Building main thread → dist/code.js");

const pluginResult = await esbuild.build({
  entryPoints: [resolve(__dirname, "src/plugin/code.ts")],
  bundle: true,
  format: "iife",
  globalName: "plugin",
  outfile: resolve(dist, "code.js"),
  write: true,
  minify: false,
  sourcemap: false,
  target: "es2020",
  // Figma provides these globals — don't bundle them
  external: [],
});

if (pluginResult.errors.length > 0) {
  console.error("Main thread build errors:", pluginResult.errors);
  process.exit(1);
}
console.log("  ✓ dist/code.js");

// ── Step 2: Build UI thread (ui.html) ───────────────────────────
console.log("Building UI thread → dist/ui.html");

// Build React app — use outdir so esbuild can emit CSS alongside JS
const uiResult = await esbuild.build({
  entryPoints: [resolve(__dirname, "src/ui/main.tsx")],
  bundle: true,
  format: "iife",
  write: false,
  outdir: dist, // Required for CSS-in-JS extraction
  minify: true,
  sourcemap: false,
  target: "es2020",
  jsx: "automatic",
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  loader: {
    ".tsx": "tsx",
    ".ts": "ts",
    ".css": "css",
  },
});

if (uiResult.errors.length > 0) {
  console.error("UI thread build errors:", uiResult.errors);
  process.exit(1);
}

// Separate JS and CSS outputs
let jsBundle = "";
let cssBundle = "";

for (const file of uiResult.outputFiles) {
  if (file.path.endsWith(".js")) {
    jsBundle = file.text;
  } else if (file.path.endsWith(".css")) {
    cssBundle = file.text;
  }
}

// Read the CSS file directly if esbuild didn't extract it (depends on version)
if (!cssBundle) {
  try {
    const cssResult = await esbuild.build({
      entryPoints: [resolve(__dirname, "src/ui/plugin.css")],
      bundle: true,
      write: false,
      minify: true,
      loader: { ".css": "css" },
    });
    for (const file of cssResult.outputFiles) {
      if (file.path.endsWith(".css")) {
        cssBundle = file.text;
      }
    }
  } catch {
    // Fallback: read raw CSS
    cssBundle = readFileSync(
      resolve(__dirname, "src/ui/plugin.css"),
      "utf-8",
    );
  }
}

// Assemble single-file HTML (Figma requires everything inlined)
const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <style>${cssBundle}</style>
  </head>
  <body>
    <div id="root"></div>
    <script>${jsBundle}</script>
  </body>
</html>`;

writeFileSync(resolve(dist, "ui.html"), html);
console.log("  ✓ dist/ui.html");

// ── Done ─────────────────────────────────────────────────────────
console.log("\nBuild complete!");
esbuild.stop();
