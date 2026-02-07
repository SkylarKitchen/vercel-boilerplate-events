import Link from "next/link";

const heroes = [
  { id: 1, name: "Countdown Timer", description: "Massive stacked countdown numbers with halftone texture panel" },
  { id: 2, name: "Editorial Grid", description: "Classic editorial layout with decorative dot-grid side panel" },
  { id: 3, name: "Split Color Block", description: "50/50 split with clay accent panel and organic shapes" },
  { id: 4, name: "Immersive Dark", description: "Always-dark hero with animated radial clay glow" },
  { id: 5, name: "Typographic Marquee", description: "Oversized stacked typography filling the viewport" },
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
          Five distinct hero designs for the Code with Claude 2026 conference
          landing page. Each explores a different visual direction while using
          the same design token system.
        </p>

        <div className="flex flex-col gap-4" data-animate="stagger">
          {heroes.map((hero) => (
            <Link
              key={hero.id}
              href={`/hero/${hero.id}`}
              className="group flex items-center justify-between rounded-card border border-border-tertiary bg-bg-primary p-6 transition-all duration-200 hover:border-border-primary hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              <div>
                <p className="text-h5 font-serif text-fg-primary group-hover:text-accent-clay transition-colors duration-200">
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
                className="shrink-0 text-fg-quaternary group-hover:text-accent-clay group-hover:translate-x-1 transition-all duration-200"
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
