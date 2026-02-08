import Link from "next/link";

const heroes = [
  { id: 1, name: "Countdown Timer", description: "Massive stacked countdown numbers with dark decorative panel" },
  { id: 2, name: "Editorial Grid", description: "Classic editorial layout with star pattern side panel" },
  { id: 3, name: "Split Color Block", description: "50/50 split with clay accent panel and organic shapes" },
  { id: 4, name: "Immersive Dark", description: "Always-dark hero with ambient radial glow and ghost buttons" },
  { id: 5, name: "Typographic Marquee", description: "Oversized stacked typography filling the viewport" },
  { id: 6, name: "Starburst Mosaic", description: "Clay field with repeating asterisk grid and oversized starburst breakouts" },
  { id: 7, name: "Newspaper Broadsheet", description: "Editorial 3-column layout with masthead, halftone photo, and sidebar countdown" },
  { id: 8, name: "Vertical Split + Starburst", description: "Clean 50/50 split with clay panel housing a massive cropped starburst" },
  { id: 9, name: "Utility Info-Bar", description: "Dense info strip top, enormous w/ Claude headline, clay pattern band bottom" },
  { id: 10, name: "Diagonal Tension", description: "Asymmetric diagonal clip-path splitting ivory content and dark photo zones" },
  { id: 11, name: "Fig Poster", description: "Full-bleed fig background with giant rotated typography backdrop and triangle accents" },
  { id: 12, name: "Sky Blueprint", description: "Technical blueprint aesthetic with sky panel, grid texture, and monospace metadata" },
  { id: 13, name: "Ticket Stub", description: "Physical conference ticket card on warm oat background with perforation detail" },
  { id: 14, name: "Olive Brutalist", description: "Heavy borders, stacked color blocks, and raw industrial typography with olive panel" },
  { id: 15, name: "Heather Layers", description: "Overlapping translucent panels on heather with floating content card and depth" },
  { id: 16, name: "Organic Blob", description: "Typography-forward layout with massive organic white blob shape bleeding off the upper-right edge" },
  { id: 17, name: "Cutout Reveal", description: "Layered cutout with clay panel and photo reveal on scroll" },
  { id: 18, name: "Halftone Knockout", description: "Scroll-reveal curtain with knockout text window into fixed crowd photo" },
  { id: 19, name: "Icon Garden", description: "Centered layout with large star focal point and scattered decorative shape SVGs" },
];

export default function HeroIndex() {
  return (
    <main className="pt-page-top pb-section-md px-site">
      <div className="max-w-3xl mx-auto">
        <p className="text-label text-fg-quaternary mb-4" data-animate="hero">
          Design Exploration
        </p>
        <h1
          className="text-display-1 font-serif text-fg-primary mb-6"
          data-animate="hero-heading"
        >
          Hero Variations
        </h1>
        <p
          className="text-body-1 text-fg-secondary mb-12"
          data-animate="hero"
          data-delay="0.15"
        >
          Nineteen distinct hero designs for the Code with Claude 2026 conference
          landing page. Each explores a different visual direction while using
          the same design token system.
        </p>

        <div className="flex flex-col gap-4">
          {heroes.map((hero) => (
            <Link
              key={hero.id}
              href={`/hero/${hero.id}`}
              className="group flex items-center justify-between rounded-card border border-border-tertiary bg-bg-primary p-6 transition-all duration-200 hover:border-border-primary hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              data-animate="hero"
              data-delay={String(0.2 + hero.id * 0.08)}
            >
              <div>
                <p className="text-h5 font-serif text-fg-primary group-hover:text-fg-secondary transition-colors duration-200">
                  {hero.id}. {hero.name}
                </p>
                <p className="text-body-3 text-fg-tertiary mt-1">
                  {hero.description}
                </p>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0 text-fg-quaternary group-hover:text-fg-primary group-hover:translate-x-1 transition-all duration-200"
              >
                <path
                  d="M3.333 8h9.334M8.667 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
