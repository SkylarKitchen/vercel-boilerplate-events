# Code with Claude 2026 — Codebase Summary

## Stack
- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 (CSS-based config with `@theme` blocks, no `tailwind.config.js`)
- **Language**: TypeScript (strict)
- **Animation**: GSAP 3.14.2 + SplitText + ScrollTrigger + flubber (morph shapes)
- **Lottie**: `@lottiefiles/dotlottie-react`

---

## File Tree

```
src/
├── app/
│   ├── globals.css         ← Design tokens, typography, spacing, dark mode
│   ├── layout.tsx          ← RootLayout: font loading, dark mode script, DevTools
│   ├── page.tsx            ← Homepage: hero, events, highlights, schedule, stats, CTA
│   └── sessions/
│       ├── page.tsx        ← Sessions listing with filter
│       ├── [slug]/page.tsx ← Individual session detail
│       └── SessionFilter.tsx ← Client-side track/level filter
├── components/
│   ├── Button.tsx          ← 4 variants (primary/secondary/tertiary/clay) × 3 sizes (sm/md/lg)
│   ├── Card.tsx            ← 2 variants: InfoCard (horizontal) & ResourceCard (vertical)
│   ├── DevTools.tsx        ← Agentation dev tools (dev only)
│   ├── Footer.tsx          ← Dark bg footer with social links
│   ├── Header.tsx          ← Fixed header with nav + theme toggle + mobile hamburger
│   ├── HomeAnimations.tsx  ← GSAP orchestrator (renders null, uses data-attributes)
│   ├── LottieIcon.tsx      ← Wrapper for DotLottieReact
│   ├── MobileNav.tsx       ← Slide-in drawer with GSAP animations
│   ├── MorphShape.tsx      ← SVG shape morphing (flubber + GSAP)
│   └── ThemeToggle.tsx     ← Dark/light toggle with localStorage
└── data/
    └── sessions.ts         ← 12 sessions, 3 tracks, shared level color maps
```

---

## Design Tokens (from `globals.css`)

### Colors
| Token | Light | Dark |
|-------|-------|------|
| `bg-primary` | `#FFFFFF` | `#141413` |
| `bg-secondary` | `#FAF9F5` | `#1D1D1B` |
| `bg-tertiary` | `#F5F4ED` | `#262624` |
| `bg-inverse` | `#141413` | `#FAF9F5` |
| `fg-primary` | `#141413` | `#FAF9F5` |
| `fg-secondary` | `#30302E` | `#C2C0B6` |
| `fg-tertiary` | `#5E5D59` | `#8B8A85` |
| `fg-quaternary` | `#8B8A85` | `#73726C` |
| `fg-inverse` | `#FAF9F5` | `#141413` |
| `border-primary` | `#C2C0B6` | `#3D3D3A` |
| `border-secondary` | `#DEDCD1` | `#30302E` |
| `border-tertiary` | `#F0EEE6` | `#262624` |

### Accents
- `accent-clay`: `#D97757` / `accent-clay-interactive`: `#C6613F`
- `accent-olive`: `#788C5D`
- `accent-sky`: `#6A9BCC`
- `accent-heather`: `#CBCADB`
- `accent-fig`: `#C46686`

### Typography Scale (responsive clamp)
| Utility | Size Range |
|---------|------------|
| `text-display-1` | 42px → 72px |
| `text-display-2` | 36px → 64px |
| `text-h1` | 34px → 52px |
| `text-h2` | 30px → 44px |
| `text-h3` | 28px → 36px |
| `text-h4` | 23px → 32px |
| `text-h5` | 20px → 25px |
| `text-h6` | 16px → 19px |
| `text-body-large-1` | 22px → 24px |
| `text-body-large-2` | 20px → 23px |
| `text-body-1` | 19px → 20px |
| `text-body-2` | 17px (fixed) |
| `text-body-3` | 15px (fixed) |
| `text-caption` | 12px |
| `text-label` | 12px uppercase, 0.2em tracking |

### Spacing Utilities
| Utility | Range |
|---------|-------|
| `px-site` | 32px → 64px (site margin) |
| `py-section-sm` | 64px → 96px |
| `py-section-md` | 96px → 128px |
| `py-section-lg` | 128px → 200px |
| `pt-page-top` | 192px → 240px (hero top padding, accounts for header) |
| `rounded-card` | responsive `clamp(1rem, ..., 1.5rem)` |

### Radii
- `radius-xs` → `radius-4xl`: 4px → 64px
- `radius-responsive-xl`: clamp(1rem → 2rem)
- `radius-responsive-lg`: clamp(1rem → 1.5rem) (used by `rounded-card`)

---

## Fonts (loaded in `layout.tsx`)

| Font | Variable | Weight Range | Files |
|------|----------|-------------|-------|
| Anthropic Sans | `--font-anthropic-sans` | 300–800 | Roman + Italic woff2 |
| Anthropic Serif | `--font-anthropic-serif` | 300–800 | Roman + Italic woff2 |
| JetBrains Mono | `--font-jetbrains-mono` | 400 | Regular woff2 |

**Critical**: `@theme` font variables resolve on `:root`, but `next/font` CSS vars are set on `<body>`. The `@layer base` body rule overrides `--font-serif`, `--font-sans`, `--font-mono` with the inner variables.

---

## GSAP Animation System (`HomeAnimations.tsx`)

Renders `null` — purely side-effect-based. Queries DOM via `data-animate` attributes.

| Attribute | Behavior | Trigger |
|-----------|----------|---------|
| `data-animate="hero-heading"` | SplitText word reveal, stagger 0.2s spread | Page load |
| `data-animate="hero"` | autoAlpha fade-up (y:20→0), reads `data-delay` | Page load |
| `data-animate="heading"` | SplitText word fade (no translate), scroll-triggered | ScrollTrigger |
| `data-animate="heading-body"` | autoAlpha fade-up (y:10→0), 0.15s after heading | ScrollTrigger (sibling of heading) |
| `data-animate="scroll"` | Single element autoAlpha + y:20 | ScrollTrigger |
| `data-animate="stagger"` | Children cascade: autoAlpha + y:20, each:0.1 | ScrollTrigger |
| `data-animate="stagger-fast"` | Children cascade: autoAlpha + y:20, each:0.06 | ScrollTrigger |
| `data-countup="N"` | Animate 0→N with `data-suffix` | ScrollTrigger |

**CSS pre-hide rule**: Scroll-triggered elements get `visibility: hidden` in CSS to prevent FOUC. Hero/page-load elements are NOT hidden.

**Wrapper pattern**: `data-animate-wrap` is used on parent divs that contain both a `heading` and `heading-body` — the ScrollTrigger triggers on the wrap element.

---

## Component API Reference

### `Button` (`src/components/Button.tsx`)
```tsx
<Button
  variant="primary" | "secondary" | "tertiary" | "clay"
  size="sm" | "md" | "lg"
  iconFormat="trailing" | "leading" | "none" | "icon-only"
  href="/path"          // renders <Link>
  onClick={handler}     // renders <button>
  disabled={boolean}
  className="extra"
/>
```

### `Card` (`src/components/Card.tsx`)
**InfoCard** (horizontal layout):
```tsx
<Card
  variant="info"
  title="Event Name"
  description="..."
  meta="May 7, 2026 · San Francisco"
  tags={["700 Attendees", "Flagship"]}
  actionLabel="Register"
  actionHref="#register"
/>
```

**ResourceCard** (vertical layout):
```tsx
<Card
  variant="resource"
  title="Feature Name"
  description="..."
  tag="Category"
  icon={<LottieIcon src="/documents/..." />}
  href="/optional-link"
/>
```

### `LottieIcon` (`src/components/LottieIcon.tsx`)
```tsx
<LottieIcon src="/documents/Object-Megaphone.lottie" className="w-12 h-12" />
```

### `MorphShape` (`src/components/MorphShape.tsx`)
```tsx
<MorphShape className="absolute right-[-10%] top-[20%] w-[50vw] opacity-[0.06]" />
```
Cycles through 5 SVG paths (circle → star → triangle → steps → hourglass) using flubber interpolation.

### `ThemeToggle` (`src/components/ThemeToggle.tsx`)
```tsx
<ThemeToggle />
```
Sun/moon icon button. Persists to `localStorage("theme")`, toggles `.dark` class on `<html>`.

---

## Public Assets

### SVGs (`/public/`)
- `anthropic-wordmark.svg` — Anthropic logo text
- `claude-logo-full.svg` — Full Claude logo (used in Header)
- `claude-logo-light.svg` — Light Claude logo (used in Footer)
- `claude-logo.svg` — Icon-only Claude logo
- `claude-spark.svg` — Claude spark icon
- `spark.svg` — Generic spark
- `vercel.svg`, `next.svg`, `globe.svg`, `file.svg`, `window.svg` — Framework icons

### Shapes (`/public/shapes/`)
- `carrot.svg`, `carrot-alt.svg`, `circle.svg`, `cwc.svg`, `grid.svg`, `hourglass.svg`, `slash.svg`, `star.svg`, `steps.svg`, `triangle.svg`

### Lottie Animations (`/public/documents/`)
52 files total. Key ones used in code:
- `Object-Megaphone.lottie`, `Object-Books.lottie`, `Object-Desktop.lottie`
- `Object-Confetti.lottie`, `Hand-Shapes.lottie`, `Node-Web.lottie`

### Fonts (`/public/fonts/`)
- `AnthropicSans-Roman-Web.woff2`, `AnthropicSans-Italic-Web.woff2`
- `AnthropicSerif-Roman-Web.woff2`, `AnthropicSerif-Italic-Web.woff2`
- `JetBrainsMono-Regular.woff2`
- `NotoSans-Regular.woff2`, `NotoSans-Medium.woff2`, `NotoSans-SemiBold.woff2`

---

## Dark Mode

- **Activation**: `<html class="dark">` toggled by ThemeToggle or inline `<script>` in layout.tsx
- **Custom variant**: `@custom-variant dark (&:where(.dark, .dark *));`
- **Token overrides**: All semantic tokens remapped in `.dark` block in globals.css
- **Footer**: Always dark (`bg-bg-inverse text-fg-inverse`)

---

## Navigation Structure

```
Header navLinks:
  Sessions → /sessions
  Schedule → #schedule
  Locations → #locations
  About → #about
  [Register CTA button]
```

MobileNav duplicates these links + adds ThemeToggle and Register button.

---

## Data Model (`sessions.ts`)

```tsx
type Track = "Agentic Development" | "Advanced Coding" | "Platform & Infrastructure";
type Session = {
  id: string;       // URL slug
  title: string;
  description: string;
  track: Track;
  speaker: { name: string; role: string };
  time: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
};
```

12 sessions total (4 per track). Level colors: olive (Beginner), sky (Intermediate), clay (Advanced).

---

## Patterns & Conventions

1. **Server Components by default** — only `"use client"` where needed (animations, interactivity)
2. **Data-attribute animations** — GSAP reads DOM, no wrapper components
3. **Semantic color tokens** — never raw hex in components, always `text-fg-*`, `bg-bg-*`, `border-border-*`
4. **Responsive clamp()** — no breakpoint-based font sizes, fluid scaling
5. **Section pattern**: `<section className="py-section-md px-site [bg-bg-*]"><div className="max-w-7xl mx-auto">...</div></section>`
6. **Card border pattern**: `rounded-card border border-border-tertiary`
7. **Heading pattern**: `font-serif text-h* text-fg-primary` (weight 500 from base CSS rule)
