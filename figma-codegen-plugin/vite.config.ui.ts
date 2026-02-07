import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// UI thread build: React → single ui.html with inlined JS/CSS
// Figma loads this in an iframe — everything must be in one file
export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, "src/ui"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, "src/ui/index.html"),
      output: {
        entryFileNames: "ui.js",
        inlineDynamicImports: true,
      },
    },
    // Inline all assets into the HTML for Figma's single-file requirement
    assetsInlineLimit: 100000,
    cssCodeSplit: false,
  },
});
