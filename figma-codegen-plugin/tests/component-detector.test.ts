import { describe, it, expect, beforeEach } from "vitest";
import { detectComponents } from "../src/plugin/component-detector";
import {
  resetIds,
  mockPrimaryButton,
  mockClayButton,
  mockGhostButton,
  mockSectionHeader,
  mockCenteredSectionHeader,
  mockInfoCard,
  mockResourceCard,
  mockStatsGrid,
  mockTimeline,
  mockFAQ,
  mockDarkCTABanner,
  mockSplitSection,
  mockGenericRectangle,
  mockLoneText,
} from "./fixtures/mock-nodes";

beforeEach(() => {
  resetIds();
});

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

describe("Button detection", () => {
  it("detects a primary button", () => {
    const matches = detectComponents([mockPrimaryButton()]);
    expect(matches).toHaveLength(1);
    expect(matches[0].component).toBe("Button");
    expect(matches[0].confidence).toBeGreaterThanOrEqual(60);
    expect(matches[0].props).toMatchObject({
      variant: "primary",
      size: "md",
      children: "Get started",
    });
  });

  it("detects a clay button with trailing icon", () => {
    const matches = detectComponents([mockClayButton()]);
    expect(matches).toHaveLength(1);
    expect(matches[0].component).toBe("Button");
    expect(matches[0].props).toMatchObject({
      variant: "clay",
      iconFormat: "trailing",
      children: "Register now",
    });
  });

  it("detects a ghost button", () => {
    const matches = detectComponents([mockGhostButton()]);
    expect(matches).toHaveLength(1);
    expect(matches[0].component).toBe("Button");
    expect(matches[0].props).toMatchObject({
      variant: "ghost",
      children: "Learn more",
    });
  });

  it("maps button size from height", () => {
    const matches = detectComponents([mockClayButton()]);
    // Height 44 → lg
    expect(matches[0].props.size).toBe("lg");
  });
});

// ---------------------------------------------------------------------------
// SectionHeader
// ---------------------------------------------------------------------------

describe("SectionHeader detection", () => {
  it("detects a section header with eyebrow, title, description", () => {
    const matches = detectComponents([mockSectionHeader()]);
    expect(matches).toHaveLength(1);
    expect(matches[0].component).toBe("SectionHeader");
    expect(matches[0].confidence).toBeGreaterThanOrEqual(60);
    expect(matches[0].props).toMatchObject({
      eyebrow: "UPCOMING EVENTS",
      title: "Join us in 2026",
      description: "Three cities, one mission: building with Claude.",
      align: "left",
    });
  });

  it("detects center-aligned section header", () => {
    const matches = detectComponents([mockCenteredSectionHeader()]);
    expect(matches).toHaveLength(1);
    expect(matches[0].component).toBe("SectionHeader");
    expect(matches[0].props.align).toBe("center");
  });

  it("handles section header without description", () => {
    const matches = detectComponents([mockCenteredSectionHeader()]);
    expect(matches[0].props.description).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

describe("Card detection", () => {
  it("detects an info card (2-column layout)", () => {
    const matches = detectComponents([mockInfoCard()]);
    expect(matches).toHaveLength(1);
    expect(matches[0].component).toBe("Card");
    expect(matches[0].props.variant).toBe("info");
    expect(matches[0].props.title).toBeDefined();
  });

  it("detects a resource card (vertical layout)", () => {
    const matches = detectComponents([mockResourceCard()]);
    expect(matches).toHaveLength(1);
    expect(matches[0].component).toBe("Card");
    expect(matches[0].props.variant).toBe("resource");
    expect(matches[0].props.title).toBe("API playground");
  });
});

// ---------------------------------------------------------------------------
// StatsGrid
// ---------------------------------------------------------------------------

describe("StatsGrid detection", () => {
  it("detects a stats grid with 3 numeric stats", () => {
    const matches = detectComponents([mockStatsGrid()]);
    expect(matches).toHaveLength(1);
    expect(matches[0].component).toBe("StatsGrid");
    expect(matches[0].confidence).toBeGreaterThanOrEqual(60);

    const stats = matches[0].props.stats as Array<{
      value: number;
      suffix?: string;
      label: string;
    }>;
    expect(stats).toHaveLength(3);
    expect(stats[0]).toMatchObject({ value: 12, label: "Sessions" });
    expect(stats[1]).toMatchObject({ value: 500, suffix: "+", label: "Attendees" });
    expect(stats[2]).toMatchObject({ value: 3, label: "Cities" });
  });
});

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

describe("Timeline detection", () => {
  it("detects a timeline with 5 time-based rows", () => {
    const matches = detectComponents([mockTimeline()]);
    expect(matches).toHaveLength(1);
    expect(matches[0].component).toBe("Timeline");
    expect(matches[0].confidence).toBeGreaterThanOrEqual(60);

    const items = matches[0].props.items as Array<{
      time: string;
      title: string;
      detail?: string;
    }>;
    expect(items).toHaveLength(5);
    expect(items[0].time).toBe("9:00 AM");
    expect(items[0].title).toBe("Registration & coffee");
    expect(items[0].detail).toBe("Main lobby");
    expect(items[3].detail).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

describe("FAQ detection", () => {
  it("detects a FAQ accordion with question+answer pairs", () => {
    const matches = detectComponents([mockFAQ()]);
    expect(matches).toHaveLength(1);
    expect(matches[0].component).toBe("FAQ");
    expect(matches[0].confidence).toBeGreaterThanOrEqual(60);

    const items = matches[0].props.items as Array<{
      question: string;
      answer: string;
    }>;
    expect(items).toHaveLength(3);
    expect(items[0].question).toBe("What is Code with Claude?");
    expect(items[2].answer).toContain("free to attend");
  });
});

// ---------------------------------------------------------------------------
// CTABanner
// ---------------------------------------------------------------------------

describe("CTABanner detection", () => {
  it("detects a dark CTA banner with heading + 2 buttons", () => {
    const matches = detectComponents([mockDarkCTABanner()]);
    expect(matches).toHaveLength(1);
    expect(matches[0].component).toBe("CTABanner");
    expect(matches[0].confidence).toBeGreaterThanOrEqual(60);
    expect(matches[0].props).toMatchObject({
      heading: "Ready to build with Claude?",
      variant: "dark",
    });
    expect(matches[0].props.primaryAction).toBeDefined();
    expect(matches[0].props.secondaryAction).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// SplitSection
// ---------------------------------------------------------------------------

describe("SplitSection detection", () => {
  it("detects a 2-column split with image left", () => {
    const matches = detectComponents([mockSplitSection()]);
    expect(matches).toHaveLength(1);
    expect(matches[0].component).toBe("SplitSection");
    expect(matches[0].confidence).toBeGreaterThanOrEqual(60);
    expect(matches[0].props).toMatchObject({
      imagePosition: "left",
      title: "Hands-on workshops",
    });
    expect(matches[0].props.eyebrow).toBe("WHY ATTEND");
  });
});

// ---------------------------------------------------------------------------
// Non-matching nodes
// ---------------------------------------------------------------------------

describe("Non-matching nodes", () => {
  it("returns empty for a generic rectangle", () => {
    const matches = detectComponents([mockGenericRectangle()]);
    expect(matches).toHaveLength(0);
  });

  it("returns empty for a lone text node", () => {
    const matches = detectComponents([mockLoneText()]);
    expect(matches).toHaveLength(0);
  });

  it("returns empty for an empty input", () => {
    const matches = detectComponents([]);
    expect(matches).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Multiple components
// ---------------------------------------------------------------------------

describe("Multiple component detection", () => {
  it("detects multiple components in a flat list", () => {
    const matches = detectComponents([
      mockPrimaryButton(),
      mockSectionHeader(),
      mockGenericRectangle(),
    ]);
    // Button and SectionHeader should match, rectangle should not
    expect(matches).toHaveLength(2);
    const components = matches.map((m) => m.component);
    expect(components).toContain("Button");
    expect(components).toContain("SectionHeader");
  });

  it("does not descend into matched component children", () => {
    // CTABanner contains button-like children — they should NOT produce
    // separate Button matches because the walk stops at CTABanner
    const matches = detectComponents([mockDarkCTABanner()]);
    expect(matches).toHaveLength(1);
    expect(matches[0].component).toBe("CTABanner");
  });
});

// ---------------------------------------------------------------------------
// Confidence threshold
// ---------------------------------------------------------------------------

describe("Confidence threshold", () => {
  it("all matches are above 60 confidence", () => {
    const allMocks = [
      mockPrimaryButton(),
      mockClayButton(),
      mockGhostButton(),
      mockSectionHeader(),
      mockInfoCard(),
      mockResourceCard(),
      mockStatsGrid(),
      mockTimeline(),
      mockFAQ(),
      mockDarkCTABanner(),
      mockSplitSection(),
    ];
    const matches = detectComponents(allMocks);
    for (const match of matches) {
      expect(match.confidence).toBeGreaterThanOrEqual(60);
    }
  });

  it("every match includes a nodeId", () => {
    const matches = detectComponents([
      mockPrimaryButton(),
      mockSectionHeader(),
    ]);
    for (const match of matches) {
      expect(match.nodeId).toBeDefined();
      expect(typeof match.nodeId).toBe("string");
    }
  });
});
