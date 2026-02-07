import { describe, it, expect, beforeEach } from "vitest";
import { matchColor, rgbaToHex, clearLabCache } from "../src/plugin/color-matcher.ts";
import type { ExtractedFill } from "../src/shared/types.ts";

const fill = (hex: string): ExtractedFill => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { hex, r, g, b, a: 1 };
};

describe("rgbaToHex", () => {
  it("converts 0-1 floats to hex", () => {
    expect(rgbaToHex(1, 1, 1)).toBe("#FFFFFF");
    expect(rgbaToHex(0, 0, 0)).toBe("#000000");
    expect(rgbaToHex(0.851, 0.467, 0.341)).toBe("#D97757");
  });
});

describe("matchColor", () => {
  beforeEach(() => clearLabCache());

  describe("exact matches (deltaE < 3)", () => {
    it("matches accent-clay exactly in bg context", () => {
      const result = matchColor(fill("#D97757"), "bg");
      expect(result.tokenClass).toBe("bg-accent-clay");
      expect(result.isExact).toBe(true);
      expect(result.deltaE).toBeLessThan(3);
    });

    it("matches accent-clay exactly in text context", () => {
      const result = matchColor(fill("#D97757"), "text");
      expect(result.tokenClass).toBe("text-accent-clay");
      expect(result.isExact).toBe(true);
    });

    it("matches accent-clay exactly in border context", () => {
      const result = matchColor(fill("#D97757"), "border");
      expect(result.tokenClass).toBe("border-accent-clay");
      expect(result.isExact).toBe(true);
    });

    it("matches bg-bg-inverse for dark fill", () => {
      const result = matchColor(fill("#141413"), "bg");
      expect(result.tokenClass).toBe("bg-bg-inverse");
      expect(result.isExact).toBe(true);
    });

    it("matches text-fg-primary for the same dark hex in text context", () => {
      const result = matchColor(fill("#141413"), "text");
      expect(result.tokenClass).toBe("text-fg-primary");
      expect(result.isExact).toBe(true);
    });

    it("matches ivory background", () => {
      const result = matchColor(fill("#FAF9F5"), "bg");
      expect(result.tokenClass).toBe("bg-bg-secondary");
      expect(result.isExact).toBe(true);
    });

    it("matches fg-inverse for ivory text", () => {
      const result = matchColor(fill("#FAF9F5"), "text");
      expect(result.tokenClass).toBe("text-fg-inverse");
      expect(result.isExact).toBe(true);
    });
  });

  describe("approximate matches (3 <= deltaE < 10)", () => {
    it("matches near-clay to accent-clay with warning", () => {
      // #DA7858 is very close to #D97757 (accent-clay)
      const result = matchColor(fill("#DA7858"), "bg");
      expect(result.tokenClass).toBe("bg-accent-clay");
      expect(result.isExact).toBe(false);
      expect(result.deltaE).toBeGreaterThanOrEqual(0);
      expect(result.deltaE).toBeLessThan(10);
    });
  });

  describe("no match — falls back to arbitrary value", () => {
    it("returns arbitrary bg for bright red", () => {
      const result = matchColor(fill("#FF0000"), "bg");
      expect(result.tokenClass).toBe("bg-[#FF0000]");
      expect(result.isExact).toBe(false);
    });

    it("returns arbitrary text for bright green", () => {
      const result = matchColor(fill("#00FF00"), "text");
      expect(result.tokenClass).toBe("text-[#00FF00]");
      expect(result.isExact).toBe(false);
    });

    it("returns arbitrary border for bright blue", () => {
      const result = matchColor(fill("#0000FF"), "border");
      expect(result.tokenClass).toBe("border-[#0000FF]");
      expect(result.isExact).toBe(false);
    });
  });

  describe("context awareness", () => {
    it("same hex returns different classes based on context", () => {
      const bgResult = matchColor(fill("#141413"), "bg");
      const textResult = matchColor(fill("#141413"), "text");
      expect(bgResult.tokenClass).not.toBe(textResult.tokenClass);
      expect(bgResult.context).toBe("bg");
      expect(textResult.context).toBe("text");
    });
  });

  describe("derives hex from RGBA when hex is empty", () => {
    it("computes hex from r/g/b floats", () => {
      const noHex: ExtractedFill = { hex: "", r: 0.851, g: 0.467, b: 0.341, a: 1 };
      const result = matchColor(noHex, "bg");
      expect(result.hex).toBe("#D97757");
      expect(result.tokenClass).toBe("bg-accent-clay");
    });
  });
});
