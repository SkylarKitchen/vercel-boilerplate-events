/**
 * Mock ExtractedNode trees for testing component-detector.
 *
 * Each factory returns a well-shaped ExtractedNode that should match
 * (or intentionally NOT match) specific component detectors.
 */

import type { ExtractedNode, ExtractedFill, ExtractedFont } from "../../src/shared/types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let idCounter = 0;
const nextId = () => `mock-${++idCounter}`;

/** Reset ID counter between tests for determinism */
export const resetIds = () => {
  idCounter = 0;
};

const defaultFill = (hex: string, a = 1): ExtractedFill => ({
  hex,
  r: parseInt(hex.slice(1, 3), 16),
  g: parseInt(hex.slice(3, 5), 16),
  b: parseInt(hex.slice(5, 7), 16),
  a,
});

const sansFont = (size: number, textCase: "ORIGINAL" | "UPPER" = "ORIGINAL"): ExtractedFont => ({
  family: "Anthropic Sans",
  style: "Regular",
  size,
  lineHeight: size * 1.5,
  letterSpacing: 0,
  textCase,
});

const serifFont = (size: number): ExtractedFont => ({
  family: "Anthropic Serif",
  style: "Regular",
  size,
  lineHeight: size * 1.2,
  letterSpacing: 0,
  textCase: "ORIGINAL",
});

const monoFont = (size: number): ExtractedFont => ({
  family: "JetBrains Mono",
  style: "Regular",
  size,
  lineHeight: size * 1.5,
  letterSpacing: 0,
  textCase: "ORIGINAL",
});

const baseNode = (overrides: Partial<ExtractedNode> = {}): ExtractedNode => ({
  id: nextId(),
  name: "Node",
  type: "FRAME",
  x: 0,
  y: 0,
  width: 200,
  height: 100,
  fills: [],
  strokes: [],
  strokeWeight: 0,
  cornerRadius: 0,
  opacity: 1,
  children: [],
  ...overrides,
});

const textNode = (
  characters: string,
  font: ExtractedFont,
  overrides: Partial<ExtractedNode> = {},
): ExtractedNode => ({
  ...baseNode({ type: "TEXT", width: 100, height: 20, children: [] }),
  characters,
  font,
  ...overrides,
});

// ---------------------------------------------------------------------------
// Component mock factories
// ---------------------------------------------------------------------------

/**
 * Primary Button — dark fill (#141413), small, rounded, 1 text child.
 * Expected: Button with variant "primary", size "md"
 */
export const mockPrimaryButton = (): ExtractedNode =>
  baseNode({
    name: "Button",
    width: 140,
    height: 40,
    cornerRadius: 8,
    fills: [defaultFill("#141413")],
    children: [
      textNode("Get started", sansFont(15), {
        x: 16,
        y: 10,
        width: 80,
        height: 20,
      }),
    ],
  });

/**
 * Clay Button — accent-clay fill, with trailing arrow child.
 * Expected: Button with variant "clay", iconFormat "trailing"
 */
export const mockClayButton = (): ExtractedNode =>
  baseNode({
    name: "Button Clay",
    width: 160,
    height: 44,
    cornerRadius: 8,
    fills: [defaultFill("#D97757")],
    children: [
      textNode("Register now", sansFont(15), {
        x: 16,
        y: 12,
        width: 100,
        height: 20,
      }),
      // Arrow SVG child
      baseNode({
        type: "VECTOR",
        name: "Arrow",
        width: 16,
        height: 16,
        x: 128,
        y: 14,
      }),
    ],
  });

/**
 * Ghost Button — transparent fill with border.
 * Expected: Button with variant "ghost"
 */
export const mockGhostButton = (): ExtractedNode =>
  baseNode({
    name: "Button Ghost",
    width: 120,
    height: 40,
    cornerRadius: 8,
    fills: [defaultFill("#000000", 0)],
    strokes: [defaultFill("#FAF9F5")],
    strokeWeight: 1,
    children: [
      textNode("Learn more", sansFont(15), {
        x: 16,
        y: 10,
        width: 80,
        height: 20,
      }),
    ],
  });

/**
 * SectionHeader — eyebrow (small uppercase) + title (large serif) + description.
 * Expected: SectionHeader with all three props.
 */
export const mockSectionHeader = (): ExtractedNode =>
  baseNode({
    name: "Section Header",
    width: 600,
    height: 160,
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
      textNode("UPCOMING EVENTS", sansFont(12, "UPPER"), {
        x: 0,
        y: 0,
        width: 120,
        height: 16,
      }),
      textNode("Join us in 2026", serifFont(36), {
        x: 0,
        y: 24,
        width: 400,
        height: 44,
      }),
      textNode(
        "Three cities, one mission: building with Claude.",
        sansFont(20),
        { x: 0, y: 76, width: 500, height: 28 },
      ),
    ],
  });

/**
 * Centered SectionHeader — same structure with center alignment.
 */
export const mockCenteredSectionHeader = (): ExtractedNode =>
  baseNode({
    name: "Section Header Centered",
    width: 800,
    height: 120,
    layout: {
      mode: "VERTICAL",
      gap: 8,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      primaryAxisAlign: "MIN",
      counterAxisAlign: "CENTER",
      wrap: false,
    },
    children: [
      textNode("HIGHLIGHTS", sansFont(12, "UPPER"), {
        x: 340,
        y: 0,
        width: 120,
        height: 16,
      }),
      textNode("What to expect", serifFont(36), {
        x: 250,
        y: 24,
        width: 300,
        height: 44,
      }),
    ],
  });

/**
 * Info Card — 2-column grid, rounded with border.
 * Expected: Card with variant "info"
 */
export const mockInfoCard = (): ExtractedNode =>
  baseNode({
    name: "Event Card",
    width: 680,
    height: 280,
    cornerRadius: 20,
    strokes: [defaultFill("#F0EEE6")],
    strokeWeight: 1,
    layout: {
      mode: "HORIZONTAL",
      gap: 48,
      paddingTop: 32,
      paddingRight: 40,
      paddingBottom: 32,
      paddingLeft: 40,
      primaryAxisAlign: "MIN",
      counterAxisAlign: "MIN",
      wrap: false,
    },
    children: [
      // Left column
      baseNode({
        name: "Left",
        width: 240,
        height: 216,
        children: [
          textNode("San Francisco", serifFont(28), {
            x: 0,
            y: 0,
            width: 240,
            height: 36,
          }),
        ],
      }),
      // Right column
      baseNode({
        name: "Right",
        width: 320,
        height: 216,
        children: [
          textNode("March 15, 2026", sansFont(14), {
            x: 0,
            y: 0,
            width: 120,
            height: 18,
          }),
          textNode(
            "A day of hands-on workshops and talks about building AI applications.",
            sansFont(20),
            { x: 0, y: 28, width: 300, height: 56 },
          ),
        ],
      }),
    ],
  });

/**
 * Resource Card — vertical, rounded with border.
 * Expected: Card with variant "resource"
 */
export const mockResourceCard = (): ExtractedNode =>
  baseNode({
    name: "Feature Card",
    width: 360,
    height: 280,
    cornerRadius: 20,
    strokes: [defaultFill("#F0EEE6")],
    strokeWeight: 1,
    layout: {
      mode: "VERTICAL",
      gap: 16,
      paddingTop: 28,
      paddingRight: 32,
      paddingBottom: 28,
      paddingLeft: 32,
      primaryAxisAlign: "MIN",
      counterAxisAlign: "MIN",
      wrap: false,
    },
    children: [
      textNode("API playground", serifFont(20), {
        x: 32,
        y: 28,
        width: 200,
        height: 28,
      }),
      textNode(
        "Explore and test Claude API endpoints directly in your browser.",
        sansFont(15),
        { x: 32, y: 64, width: 296, height: 42 },
      ),
    ],
  });

/**
 * StatsGrid — horizontal frame with 3 stat children.
 * Expected: StatsGrid with 3 stats.
 */
export const mockStatsGrid = (): ExtractedNode =>
  baseNode({
    name: "Stats Row",
    width: 900,
    height: 120,
    layout: {
      mode: "HORIZONTAL",
      gap: 32,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      primaryAxisAlign: "MIN",
      counterAxisAlign: "MIN",
      wrap: false,
    },
    children: [
      baseNode({
        name: "Stat 1",
        width: 280,
        height: 120,
        children: [
          textNode("12", serifFont(36), { x: 0, y: 0, width: 60, height: 44 }),
          textNode("Sessions", sansFont(15), {
            x: 0,
            y: 52,
            width: 80,
            height: 20,
          }),
        ],
      }),
      baseNode({
        name: "Stat 2",
        width: 280,
        height: 120,
        children: [
          textNode("500+", serifFont(36), {
            x: 0,
            y: 0,
            width: 100,
            height: 44,
          }),
          textNode("Attendees", sansFont(15), {
            x: 0,
            y: 52,
            width: 80,
            height: 20,
          }),
        ],
      }),
      baseNode({
        name: "Stat 3",
        width: 280,
        height: 120,
        children: [
          textNode("3", serifFont(36), { x: 0, y: 0, width: 30, height: 44 }),
          textNode("Cities", sansFont(15), {
            x: 0,
            y: 52,
            width: 60,
            height: 20,
          }),
        ],
      }),
    ],
  });

/**
 * Timeline — vertical frame with 5 horizontal time+title rows.
 * Expected: Timeline with 5 items.
 */
export const mockTimeline = (): ExtractedNode =>
  baseNode({
    name: "Schedule",
    width: 700,
    height: 400,
    layout: {
      mode: "VERTICAL",
      gap: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      primaryAxisAlign: "MIN",
      counterAxisAlign: "MIN",
      wrap: false,
    },
    children: [
      ...(
        [
          { time: "9:00 AM", title: "Registration & coffee", detail: "Main lobby" },
          { time: "10:00 AM", title: "Keynote: Building with Claude", detail: undefined },
          { time: "11:30 AM", title: "Workshop: Prompt engineering", detail: "Room A" },
          { time: "1:00 PM", title: "Lunch break", detail: undefined },
          { time: "2:00 PM", title: "Panel: The future of AI agents", detail: "Main stage" },
        ]
      ).map(({ time, title, detail }) =>
        baseNode({
          name: `Row ${time}`,
          width: 700,
          height: 60,
          strokes: [defaultFill("#F0EEE6")],
          strokeWeight: 1,
          layout: {
            mode: "HORIZONTAL",
            gap: 24,
            paddingTop: 20,
            paddingRight: 0,
            paddingBottom: 20,
            paddingLeft: 0,
            primaryAxisAlign: "MIN",
            counterAxisAlign: "MIN",
            wrap: false,
          },
          children: [
            textNode(time, monoFont(15), {
              x: 0,
              y: 20,
              width: 96,
              height: 20,
            }),
            baseNode({
              name: "Content",
              width: 580,
              height: 40,
              children: [
                textNode(title, sansFont(16), {
                  x: 120,
                  y: 20,
                  width: 400,
                  height: 20,
                }),
                ...(detail
                  ? [
                      textNode(detail, sansFont(14), {
                        x: 120,
                        y: 42,
                        width: 200,
                        height: 18,
                      }),
                    ]
                  : []),
              ],
            }),
          ],
        }),
      ),
    ],
  });

/**
 * FAQ — vertical frame with 3 bordered question+answer children.
 * Expected: FAQ with 3 items.
 */
export const mockFAQ = (): ExtractedNode =>
  baseNode({
    name: "FAQ Section",
    width: 700,
    height: 500,
    layout: {
      mode: "VERTICAL",
      gap: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      primaryAxisAlign: "MIN",
      counterAxisAlign: "MIN",
      wrap: false,
    },
    children: [
      ...[
        {
          q: "What is Code with Claude?",
          a: "A series of developer events focused on building AI-powered applications with Claude.",
        },
        {
          q: "Do I need prior experience?",
          a: "Basic programming knowledge is helpful, but all skill levels are welcome.",
        },
        {
          q: "Is there a registration fee?",
          a: "Events are free to attend. Space is limited, so register early.",
        },
      ].map(({ q, a }) =>
        baseNode({
          name: `FAQ Item`,
          width: 700,
          height: 100,
          strokes: [defaultFill("#F0EEE6")],
          strokeWeight: 1,
          children: [
            textNode(q, sansFont(17), {
              x: 0,
              y: 20,
              width: 600,
              height: 22,
            }),
            textNode(a, sansFont(15), {
              x: 0,
              y: 52,
              width: 600,
              height: 40,
            }),
          ],
        }),
      ),
    ],
  });

/**
 * CTABanner (dark) — dark fill, centered heading + 2 buttons.
 * Expected: CTABanner with variant "dark"
 */
export const mockDarkCTABanner = (): ExtractedNode =>
  baseNode({
    name: "CTA Section",
    width: 1200,
    height: 400,
    fills: [defaultFill("#141413")],
    layout: {
      mode: "VERTICAL",
      gap: 24,
      paddingTop: 80,
      paddingRight: 40,
      paddingBottom: 80,
      paddingLeft: 40,
      primaryAxisAlign: "CENTER",
      counterAxisAlign: "CENTER",
      wrap: false,
    },
    children: [
      textNode("Ready to build with Claude?", serifFont(36), {
        x: 300,
        y: 80,
        width: 600,
        height: 44,
      }),
      textNode(
        "Join hundreds of developers at Code with Claude 2026.",
        sansFont(20),
        { x: 320, y: 140, width: 560, height: 28 },
      ),
      baseNode({
        name: "Buttons",
        width: 340,
        height: 44,
        layout: {
          mode: "HORIZONTAL",
          gap: 12,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          primaryAxisAlign: "CENTER",
          counterAxisAlign: "CENTER",
          wrap: false,
        },
        children: [
          // Primary button
          baseNode({
            name: "Primary CTA",
            width: 160,
            height: 44,
            cornerRadius: 8,
            fills: [defaultFill("#D97757")],
            children: [
              textNode("Register now", sansFont(15), {
                x: 16,
                y: 12,
                width: 100,
                height: 20,
              }),
            ],
          }),
          // Secondary button
          baseNode({
            name: "Secondary CTA",
            width: 140,
            height: 44,
            cornerRadius: 8,
            fills: [defaultFill("#F5F4ED")],
            children: [
              textNode("View schedule", sansFont(15), {
                x: 16,
                y: 12,
                width: 100,
                height: 20,
              }),
            ],
          }),
        ],
      }),
    ],
  });

/**
 * SplitSection — 2-column with image left, text right.
 * Expected: SplitSection with imagePosition "left"
 */
export const mockSplitSection = (): ExtractedNode =>
  baseNode({
    name: "Split Section",
    width: 1100,
    height: 400,
    layout: {
      mode: "HORIZONTAL",
      gap: 48,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      primaryAxisAlign: "MIN",
      counterAxisAlign: "CENTER",
      wrap: false,
    },
    children: [
      // Image placeholder (empty frame, large)
      baseNode({
        type: "RECTANGLE",
        name: "Image",
        width: 500,
        height: 400,
        x: 0,
        y: 0,
        cornerRadius: 20,
        fills: [defaultFill("#E8E6DC")],
      }),
      // Text column
      baseNode({
        name: "Content",
        width: 500,
        height: 300,
        x: 548,
        y: 50,
        children: [
          textNode("WHY ATTEND", sansFont(12, "UPPER"), {
            x: 548,
            y: 50,
            width: 80,
            height: 16,
          }),
          textNode("Hands-on workshops", serifFont(28), {
            x: 548,
            y: 74,
            width: 350,
            height: 36,
          }),
          textNode(
            "Learn directly from the team that builds Claude. Get practical techniques for prompt engineering, tool use, and agent design.",
            sansFont(20),
            { x: 548, y: 122, width: 480, height: 56 },
          ),
        ],
      }),
    ],
  });

/**
 * Non-matching node — a plain rectangle with no meaningful structure.
 * Expected: detectComponents returns empty array.
 */
export const mockGenericRectangle = (): ExtractedNode =>
  baseNode({
    type: "RECTANGLE",
    name: "Background",
    width: 1200,
    height: 800,
    fills: [defaultFill("#FAF9F5")],
  });

/**
 * Non-matching node — a lone text node.
 * Expected: detectComponents returns empty array.
 */
export const mockLoneText = (): ExtractedNode =>
  textNode("Hello world", sansFont(16), {
    width: 200,
    height: 24,
  });
