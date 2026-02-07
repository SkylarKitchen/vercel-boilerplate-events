import { describe, it, expect } from "vitest";
import { mapLayout, mapPadding } from "../src/plugin/layout-mapper";
import type { ExtractedLayout } from "../src/shared/types";

const baseLayout = (overrides: Partial<ExtractedLayout> = {}): ExtractedLayout => ({
  mode: "NONE",
  gap: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  primaryAxisAlign: "MIN",
  counterAxisAlign: "MIN",
  wrap: false,
  ...overrides,
});

describe("mapLayout", () => {
  it("returns empty array for NONE mode", () => {
    expect(mapLayout(baseLayout(), 0)).toEqual([]);
  });

  it("horizontal auto-layout with gap 16 → flex flex-row gap-4", () => {
    const layout = baseLayout({ mode: "HORIZONTAL", gap: 16 });
    const classes = mapLayout(layout, 2);
    expect(classes).toContain("flex");
    expect(classes).toContain("flex-row");
    expect(classes).toContain("gap-4");
  });

  it("vertical with center align → flex flex-col items-center", () => {
    const layout = baseLayout({
      mode: "VERTICAL",
      counterAxisAlign: "CENTER",
    });
    const classes = mapLayout(layout, 2);
    expect(classes).toContain("flex");
    expect(classes).toContain("flex-col");
    expect(classes).toContain("items-center");
  });

  it("horizontal with justify-between", () => {
    const layout = baseLayout({
      mode: "HORIZONTAL",
      primaryAxisAlign: "SPACE_BETWEEN",
    });
    const classes = mapLayout(layout, 2);
    expect(classes).toContain("justify-between");
  });

  it("adds flex-wrap when wrap is true", () => {
    const layout = baseLayout({ mode: "HORIZONTAL", wrap: true });
    const classes = mapLayout(layout, 4);
    expect(classes).toContain("flex-wrap");
  });

  it("includes grid alternative hint for 3+ horizontal children", () => {
    const layout = baseLayout({ mode: "HORIZONTAL", gap: 16 });
    const classes = mapLayout(layout, 4);
    const gridHint = classes.find((c) => c.includes("grid alt"));
    expect(gridHint).toBeDefined();
    expect(gridHint).toContain("grid-cols-4");
    expect(gridHint).toContain("gap-4");
  });

  it("does not include grid hint for < 3 children", () => {
    const layout = baseLayout({ mode: "HORIZONTAL", gap: 16 });
    const classes = mapLayout(layout, 2);
    expect(classes.every((c) => !c.includes("grid alt"))).toBe(true);
  });

  it("does not include grid hint for wrapped layouts", () => {
    const layout = baseLayout({ mode: "HORIZONTAL", gap: 16, wrap: true });
    const classes = mapLayout(layout, 5);
    expect(classes.every((c) => !c.includes("grid alt"))).toBe(true);
  });

  it("maps padding into layout classes", () => {
    const layout = baseLayout({
      mode: "VERTICAL",
      paddingTop: 32,
      paddingRight: 32,
      paddingBottom: 32,
      paddingLeft: 32,
    });
    const classes = mapLayout(layout, 1);
    expect(classes).toContain("p-8");
  });

  it("snaps gap within 2px tolerance to nearest scale value", () => {
    const layout = baseLayout({ mode: "HORIZONTAL", gap: 13 });
    const classes = mapLayout(layout, 1);
    // 13px is within 2px of 12px (gap-3), so it snaps
    expect(classes).toContain("gap-3");
  });

  it("uses arbitrary value for gap far from any scale point", () => {
    const layout = baseLayout({ mode: "HORIZONTAL", gap: 37 });
    const classes = mapLayout(layout, 1);
    // 37px is 5px from both 32 and 40, exceeding the 2px tolerance
    expect(classes).toContain("gap-[37px]");
  });

  it("omits justify-start and items-start (defaults)", () => {
    const layout = baseLayout({ mode: "HORIZONTAL" });
    const classes = mapLayout(layout, 1);
    expect(classes).not.toContain("justify-start");
    expect(classes).not.toContain("items-start");
  });
});

describe("mapPadding", () => {
  it("returns empty for all-zero padding", () => {
    expect(mapPadding(0, 0, 0, 0)).toEqual([]);
  });

  it("symmetric padding 32px → p-8", () => {
    expect(mapPadding(32, 32, 32, 32)).toEqual(["p-8"]);
  });

  it("asymmetric padding → individual px/py classes", () => {
    const result = mapPadding(16, 32, 16, 32);
    expect(result).toContain("py-4");
    expect(result).toContain("px-8");
    expect(result).toHaveLength(2);
  });

  it("fully asymmetric padding → individual pt/pb/pl/pr classes", () => {
    const result = mapPadding(8, 16, 24, 32);
    expect(result).toContain("pt-2");
    expect(result).toContain("pb-6");
    expect(result).toContain("pl-8");
    expect(result).toContain("pr-4");
  });

  it("snaps padding within 2px tolerance to nearest scale value", () => {
    const result = mapPadding(13, 13, 13, 13);
    // 13px is within 1px of 12px (spacing 3), so it snaps
    expect(result).toEqual(["p-3"]);
  });

  it("uses arbitrary syntax for padding far from any scale point", () => {
    const result = mapPadding(37, 37, 37, 37);
    // 37px is 5px from both 32 and 40, exceeding the 2px tolerance
    expect(result).toEqual(["p-[37px]"]);
  });

  it("only vertical padding", () => {
    const result = mapPadding(24, 0, 24, 0);
    expect(result).toEqual(["py-6"]);
  });

  it("only horizontal padding", () => {
    const result = mapPadding(0, 16, 0, 16);
    expect(result).toEqual(["px-4"]);
  });
});
