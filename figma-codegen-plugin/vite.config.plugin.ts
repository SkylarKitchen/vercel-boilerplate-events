import { defineConfig } from "vite";
import { resolve } from "path";

// Main thread build: pure TypeScript → single code.js
// No DOM APIs available — this runs in Figma's sandbox
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/plugin/code.ts"),
      formats: ["iife"],
      name: "plugin",
      fileName: () => "code.js",
    },
    outDir: "dist",
    emptyOutDir: false,
    sourcemap: false,
    minify: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
