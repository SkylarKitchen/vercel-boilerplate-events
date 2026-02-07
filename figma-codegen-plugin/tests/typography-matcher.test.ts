import { describe, it, expect } from "vitest";
import { matchTypography } from "../src/plugin/typography-matcher.ts";
import type { ExtractedFont } from "../src/shared/types.ts";

const font = (
  overrides: Partial<ExtractedFont> & { size: number },
): ExtractedFont => ({
  family: "Anthropic Sans",
  style: "Regular",
  size: overrides.size,
  lineHeight: null,
  letterSpacing: 0,
  textCase: "ORIGINAL",
  ...overrides,
});

describe("matchTypography", () => {
  describe("heading matches (serif)", () => {
    it("matches 44px serif to text-h2", () => {
      const result = matchTypography(font({ size: 44, family: "Anthropic Serif" }));
      expect(result.utilityClass).toBe("text-h2");
      expect(result.fontFamily).toBe("serif");
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    it("matches 52px serif to text-h1", () => {
      const result = matchTypography(font({ size: 52, family: "Anthropic Serif" }));
      expect(result.utilityClass).toBe("text-h1");
      expect(result.fontFamily).toBe("serif");
    });

    it("matches 36px serif to text-h3", () => {
      const result = matchTypography(font({ size: 36, family: "Anthropic Serif" }));
      expect(result.utilityClass).toBe("text-h3");
      expect(result.fontFamily).toBe("serif");
    });

    it("matches large 64px serif to text-display-2", () => {
      const result = matchTypography(font({ size: 64, family: "Anthropic Serif" }));
      expect(result.utilityClass).toBe("text-display-2");
      expect(result.fontFamily).toBe("serif");
    });

    it("matches very large 72px serif to text-display-1", () => {
      const result = matchTypography(font({ size: 72, family: "Anthropic Serif" }));
      expect(result.utilityClass).toBe("text-display-1");
      expect(result.fontFamily).toBe("serif");
    });
  });

  describe("body matches (sans)", () => {
    it("matches 15px sans to text-body-3", () => {
      const result = matchTypography(font({ size: 15 }));
      expect(result.utilityClass).toBe("text-body-3");
      expect(result.fontFamily).toBe("sans");
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    it("matches 17px sans to text-body-2", () => {
      const result = matchTypography(font({ size: 17 }));
      expect(result.utilityClass).toBe("text-body-2");
      expect(result.fontFamily).toBe("sans");
    });

    it("matches 20px sans to text-body-1 or text-body-large-2", () => {
      const result = matchTypography(font({ size: 20 }));
      // 20px falls in both text-body-1 (19-20) and text-body-large-2 (20-23)
      expect(result.utilityClass).toMatch(/^text-body/);
      expect(result.fontFamily).toBe("sans");
    });
  });

  describe("uppercase / label detection", () => {
    it("matches 12px uppercase to text-label", () => {
      const result = matchTypography(font({ size: 12, textCase: "UPPER" }));
      expect(result.utilityClass).toBe("text-label");
      expect(result.confidence).toBe(0.95);
    });

    it("matches 11px uppercase to text-label", () => {
      const result = matchTypography(font({ size: 11, textCase: "UPPER" }));
      expect(result.utilityClass).toBe("text-label");
    });

    it("does not force text-label for large uppercase text", () => {
      const result = matchTypography(
        font({ size: 24, textCase: "UPPER", family: "Anthropic Serif" }),
      );
      expect(result.utilityClass).not.toBe("text-label");
    });
  });

  describe("font family detection", () => {
    it("detects serif from Lora", () => {
      const result = matchTypography(font({ size: 36, family: "Lora" }));
      expect(result.fontFamily).toBe("serif");
    });

    it("detects mono from JetBrains Mono", () => {
      const result = matchTypography(font({ size: 14, family: "JetBrains Mono" }));
      expect(result.fontFamily).toBe("mono");
    });

    it("detects sans from Poppins", () => {
      const result = matchTypography(font({ size: 16, family: "Poppins" }));
      expect(result.fontFamily).toBe("sans");
    });

    it("defaults to sans for unknown families", () => {
      const result = matchTypography(font({ size: 16, family: "Comic Sans MS" }));
      expect(result.fontFamily).toBe("sans");
    });
  });

  describe("caption and micro", () => {
    it("matches 12px sans to text-caption", () => {
      const result = matchTypography(font({ size: 12 }));
      expect(result.utilityClass).toBe("text-caption");
    });

    it("matches 10px sans to text-micro", () => {
      const result = matchTypography(font({ size: 10 }));
      expect(result.utilityClass).toBe("text-micro");
    });
  });

  describe("line-height as tiebreaker", () => {
    it("uses line-height to disambiguate overlapping ranges", () => {
      // 20px is in both text-body-1 (lh 1.6) and text-body-large-2 (lh 1.5)
      // With a lineHeight of 32px (ratio 1.6), should prefer text-body-1
      const result = matchTypography(
        font({ size: 20, lineHeight: 32 }),
      );
      expect(result.utilityClass).toBe("text-body-1");
    });
  });
});
