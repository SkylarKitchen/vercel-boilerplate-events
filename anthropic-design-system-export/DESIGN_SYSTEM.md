# Anthropic Design System — Portable Export

Use this document to apply the Anthropic brand design system to any Next.js project (e.g. the Vercel Next.js Boilerplate). Everything here is self-contained and framework-agnostic where possible.

---

## 1. Fonts

### Files Required
Copy these to `public/fonts/`:
- `AnthropicSans-Roman-Web.woff2` — Primary sans-serif (headings + body)
- `AnthropicSerif-Roman-Web.woff2` — Display/accent serif

### Next.js Font Loading (`layout.tsx`)
```tsx
import localFont from 'next/font/local'
import { IBM_Plex_Mono } from 'next/font/google'

const anthropicSans = localFont({
  src: '../public/fonts/AnthropicSans-Roman-Web.woff2',
  variable: '--font-anthropic-sans',
  display: 'swap',
  weight: '100 900',
})

const anthropicSerif = localFont({
  src: '../public/fonts/AnthropicSerif-Roman-Web.woff2',
  variable: '--font-anthropic-serif',
  display: 'swap',
  weight: '100 900',
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

// Apply to <html>:
// className={`${anthropicSans.variable} ${anthropicSerif.variable} ${ibmPlexMono.variable}`}
```

---

## 2. Design Tokens (CSS Custom Properties)

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| **Backgrounds** | | |
| `--color-bg-primary` | `#FFFFFF` | Page background |
| `--color-bg-secondary` | `#FAF9F5` | Subtle sections, cards |
| `--color-bg-tertiary` | `#F5F4ED` | Badges, tags, code blocks |
| `--color-bg-inverse` | `#141413` | Dark sections |
| **Foregrounds** | | |
| `--color-fg-primary` | `#141413` | Headings, primary text |
| `--color-fg-secondary` | `#30302E` | Body text |
| `--color-fg-tertiary` | `#5E5D59` | Descriptions, subtitles |
| `--color-fg-quaternary` | `#8B8A85` | Captions, timestamps |
| `--color-fg-inverse` | `#FAF9F5` | Text on dark backgrounds |
| **Borders** | | |
| `--color-border-primary` | `#C2C0B6` | Strong dividers |
| `--color-border-secondary` | `#DEDCD1` | Medium dividers |
| `--color-border-tertiary` | `#F0EEE6` | Subtle dividers, card outlines |
| **Accents** | | |
| `--color-accent-clay` | `#D97757` | Decorative accent |
| `--color-accent-clay-interactive` | `#C6613F` | Buttons, links, CTAs |
| `--color-accent-clay-light` | `#E8A58C` | Highlights, badges |
| `--color-accent-oat` | `#E3DACC` | Warm neutral accent |
| **Dark Theme** | | |
| `--color-dark-bg-primary` | `#141413` | |
| `--color-dark-bg-secondary` | `#1D1D1B` | |
| `--color-dark-bg-tertiary` | `#262624` | |
| `--color-dark-fg-primary` | `#FAF9F5` | |
| `--color-dark-fg-secondary` | `#C2C0B6` | |
| `--color-dark-fg-tertiary` | `#8B8A85` | |
| `--color-dark-border-primary` | `#3D3D3A` | |
| `--color-dark-border-secondary` | `#30302E` | |

### Border Radius Scale

| Token | Value |
|---|---|
| `--radius-xs` | `4px` |
| `--radius-sm` | `8px` |
| `--radius-md` | `12px` |
| `--radius-lg` | `16px` |
| `--radius-xl` | `24px` |
| `--radius-2xl` | `32px` |
| `--radius-3xl` | `48px` |
| `--radius-4xl` | `64px` |

### Typography Stack

| Role | Font Family | CSS Variable |
|---|---|---|
| Sans (default) | Anthropic Sans | `--font-sans: var(--font-anthropic-sans), system-ui, sans-serif` |
| Serif (display) | Anthropic Serif | `--font-serif: var(--font-anthropic-serif), Georgia, serif` |
| Mono (code) | IBM Plex Mono | `--font-mono: var(--font-ibm-plex-mono), ui-monospace, monospace` |

---

## 3. globals.css (Tailwind v4)

```css
@import 'tailwindcss';

@plugin "@tailwindcss/typography";

@layer base {
  body {
    @apply font-sans text-fg-primary bg-bg-primary;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-sans tracking-tight;
  }
}

@utility container {
  margin: 0 auto;
  padding: 0 2rem;
}

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --default-transition-duration: 200ms;

  /* Backgrounds */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #FAF9F5;
  --color-bg-tertiary: #F5F4ED;
  --color-bg-inverse: #141413;

  /* Foregrounds */
  --color-fg-primary: #141413;
  --color-fg-secondary: #30302E;
  --color-fg-tertiary: #5E5D59;
  --color-fg-quaternary: #8B8A85;
  --color-fg-inverse: #FAF9F5;

  /* Borders */
  --color-border-primary: #C2C0B6;
  --color-border-secondary: #DEDCD1;
  --color-border-tertiary: #F0EEE6;

  /* Accents */
  --color-accent-clay: #D97757;
  --color-accent-clay-interactive: #C6613F;
  --color-accent-clay-light: #E8A58C;
  --color-accent-oat: #E3DACC;

  /* Dark theme tokens */
  --color-dark-bg-primary: #141413;
  --color-dark-bg-secondary: #1D1D1B;
  --color-dark-bg-tertiary: #262624;
  --color-dark-fg-primary: #FAF9F5;
  --color-dark-fg-secondary: #C2C0B6;
  --color-dark-fg-tertiary: #8B8A85;
  --color-dark-border-primary: #3D3D3A;
  --color-dark-border-secondary: #30302E;

  /* Legacy compat */
  --color-black: #141413;
  --color-white: #FFFFFF;

  /* Radii */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 32px;
  --radius-3xl: 48px;
  --radius-4xl: 64px;

  /* Fonts */
  --font-sans: var(--font-anthropic-sans), system-ui, -apple-system, sans-serif;
  --font-serif: var(--font-anthropic-serif), Georgia, serif;
  --font-mono: var(--font-ibm-plex-mono), ui-monospace, monospace;

  /* Shadows */
  --shadow-layer: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
  --shadow-btn-hover: 0 0 0 2px currentColor;
}
```

---

## 4. tailwind.config.ts

```ts
import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
          inverse: 'var(--color-bg-inverse)',
        },
        fg: {
          primary: 'var(--color-fg-primary)',
          secondary: 'var(--color-fg-secondary)',
          tertiary: 'var(--color-fg-tertiary)',
          quaternary: 'var(--color-fg-quaternary)',
          inverse: 'var(--color-fg-inverse)',
        },
        border: {
          primary: 'var(--color-border-primary)',
          secondary: 'var(--color-border-secondary)',
          tertiary: 'var(--color-border-tertiary)',
        },
        accent: {
          clay: 'var(--color-accent-clay)',
          'clay-interactive': 'var(--color-accent-clay-interactive)',
          'clay-light': 'var(--color-accent-clay-light)',
          oat: 'var(--color-accent-oat)',
        },
        black: '#141413',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-anthropic-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-anthropic-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-ibm-plex-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
        '4xl': '64px',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config
```

---

## 5. Component Patterns

### Button Component

Four variants, three sizes, moderate rounding (`rounded-md` / 12px), trailing arrow default.

```tsx
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'clay'
type ButtonSize = 'sm' | 'md' | 'lg'
type IconFormat = 'trailing' | 'leading' | 'none' | 'icon-only'

type ButtonProps = {
  children?: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  iconFormat?: IconFormat
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#141413] text-[#FAF9F5] hover:shadow-[0_0_0_2px_#141413] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color-mix(in_srgb,#141413_50%,transparent)]',
  secondary:
    'bg-[#F0EEE6] text-[#3D3D3A] hover:shadow-[0_0_0_2px_#C2C0B6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color-mix(in_srgb,#3D3D3A_50%,transparent)]',
  tertiary:
    'bg-[#F0EEE6] text-[#4D4C48] hover:shadow-[0_0_0_2px_#C2C0B6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color-mix(in_srgb,#4D4C48_50%,transparent)]',
  clay:
    'bg-[#C6613F] text-white hover:shadow-[0_0_0_2px_#C6613F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color-mix(in_srgb,#C6613F_50%,transparent)]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm py-1.5 px-4 gap-1.5',
  md: 'text-sm py-2.5 px-5 gap-2',
  lg: 'text-base py-3 px-6 gap-2',
}

const Arrow = () => <span aria-hidden="true">&rarr;</span>

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconFormat = 'trailing',
  href,
  target,
  rel,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full font-medium transition-shadow duration-200 outline-none whitespace-nowrap'
  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  const content = (
    <>
      {iconFormat === 'leading' && <Arrow />}
      {iconFormat !== 'icon-only' && children}
      {iconFormat === 'trailing' && <Arrow />}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={styles} target={target} rel={rel}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {content}
    </button>
  )
}
```

### Interactive States (from Figma)

| State | Treatment |
|---|---|
| Rest | Calm, consistent tone — no shadow |
| Hover | `box-shadow: 0 0 0 2px <variant-color>` (2px ring, no blur) |
| Focus-visible | `outline: 2px solid color-mix(in srgb, <color> 50%, transparent)` with 4px offset |
| Dark theme | Primary inverts (light bg, dark text); Clay stays clay |

### Header Pattern

- Fixed position, `backdrop-blur-lg`, semi-transparent bg (`bg-bg-primary/80`)
- Logo left, text nav links center (`text-sm`, `text-fg-secondary`, hover → `text-fg-primary`)
- Pill CTA button right (primary dark variant with trailing arrow)
- `h-24` height, `border-b border-border-tertiary`

### Footer Pattern

- `bg-bg-secondary`, `border-t border-border-tertiary`
- Event name + venue info left, CTA + nav links right
- Clay accent CTA button
- Subtle "Powered by" line at bottom in `text-fg-quaternary text-xs`

### Card Pattern (from Figma)

- White bg, `rounded-lg`, `border border-border-tertiary`
- **Horizontal**: Image left, content right (category tag, title, ghost button)
- **Vertical**: Image top, content below
- Ghost/outline button: `border border-border-primary text-fg-secondary rounded-full` with hover shadow

### Navigation Dropdown (from Figma)

- White card with subtle shadow
- Grouped lists with small muted section headers
- Clean dividers between groups

---

## 6. Typography Scale

| Name | Size | Line Height | Usage |
|---|---|---|---|
| Display 1 | 72px / 4.5rem | 80px / 1.11 | Hero event name (Anthropic Serif) |
| Heading 1 | text-5xl to text-7xl | tight | Page titles |
| Heading 2 | text-3xl to text-4xl | tight | Section headings |
| Heading 3 | text-xl to text-2xl | snug | Card titles, subsections |
| Body Large | text-xl to text-2xl | relaxed | Taglines, intros (`text-fg-tertiary`) |
| Body | text-base | normal | Default body text |
| Body Small | text-sm | normal | Nav links, buttons, meta text |
| Caption | text-xs | normal | Timestamps, fine print |

---

## 7. Utility Class Patterns

Common Tailwind class combinations used throughout:

```
/* Section spacing */
py-12 lg:py-24

/* Content max-width */
max-w-3xl  (text content)
max-w-4xl  (hero content)

/* Subtle section divider */
border-t border-border-tertiary

/* Warm background section */
bg-bg-secondary

/* Tag/badge */
px-2 py-0.5 rounded-full bg-bg-tertiary text-xs text-fg-tertiary

/* Hover transition on cards/links */
transition-colors duration-200

/* Image hover scale */
transition-transform duration-300 hover:scale-105
```

---

## 8. Design Reference Files

The `design-reference/` directory contains Figma component screenshots:

| File | Contents |
|---|---|
| `Button.png`, `Button2.png`, `Button3.png` | All button variants, sizes, themes, interactive states |
| `Card_ Video.png` | Card component (horizontal + vertical layouts) |
| `Desktop.png` | Hero/page layout pattern with nav bar |
| `Menu.png` | Dropdown menu component |
| `Switch.png` | Toggle switch interactive states |
| `Checkbox.png` | Checkbox + radio input themes |
| `Text Input.png` | Text input with icon variants |

These screenshots serve as the source of truth for component implementation details.

---

## 9. Integration Notes for Vercel Next.js Boilerplate

To apply this design system to a fresh Vercel Next.js Boilerplate:

1. **Copy font files** to `public/fonts/`
2. **Replace `globals.css`** with the CSS above (Section 3)
3. **Replace `tailwind.config.ts`** with the config above (Section 4)
4. **Update `layout.tsx`** font loading (Section 1)
5. **Drop in `Button.tsx`** component (Section 5)
6. **Copy `design-reference/`** directory for visual reference
7. **Apply token classes** throughout: use `text-fg-*`, `bg-bg-*`, `border-border-*`, `text-accent-*` instead of raw Tailwind colors

### Key Tailwind Class Mappings

| Instead of... | Use... |
|---|---|
| `text-gray-900` | `text-fg-primary` |
| `text-gray-600` | `text-fg-tertiary` |
| `text-gray-400` | `text-fg-quaternary` |
| `bg-white` | `bg-bg-primary` |
| `bg-gray-50` | `bg-bg-secondary` |
| `bg-gray-100` | `bg-bg-tertiary` |
| `border-gray-200` | `border-border-tertiary` |
| `border-gray-300` | `border-border-secondary` |
| `text-blue-600` | `text-accent-clay-interactive` |
| `bg-blue-600` | `bg-accent-clay-interactive` |
| `rounded-lg` | `rounded-lg` (16px) — same name, different value |

---

## 10. Recommended Claude Skills

Install these skills in the target project for best practices:

### Vercel React Best Practices
```
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
```
57 rules across 8 categories: waterfall elimination, bundle optimization, server-side performance, client-side data fetching, re-render optimization, rendering performance, JS performance, and advanced patterns.

### Anthropic Frontend Design
```
npx skills add https://github.com/anthropics/skills --skill frontend-design
```
Guides Claude to build distinctive, production-grade interfaces. Enforces: bold aesthetic direction, characterful typography, cohesive color palettes via CSS variables, intentional motion, asymmetric spatial composition, and avoidance of generic "AI slop" patterns.
