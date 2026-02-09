import Image from "next/image";
import Button from "@/components/Button";

/**
 * Hero 14 — "Olive Brutalist"
 * Brutalist design: heavy black borders dividing the page into stark zones.
 * Olive accent color block, deliberately raw typography, industrial grid.
 * Steps shape as accent. Stacked color blocks with thick rule dividers.
 */

export default function Hero14() {
  return (
    <main className="min-h-screen flex flex-col bg-bg-secondary overflow-hidden">
      <h1 className="sr-only">Code with Claude 2026 — Olive Brutalist</h1>

      {/* Heavy top border */}
      <div className="border-b border-border-tertiary pt-28">
        <div
          className="px-site py-4 flex items-end justify-between"
          data-animate="hero"
          data-delay="0"
        >
          <p
            className="font-mono text-sm text-fg-primary uppercase tracking-[0.4em] font-bold"
          >
            Code w/ Claude
          </p>
          <p className="font-mono text-sm text-fg-primary uppercase tracking-wider font-bold">
            2026
          </p>
        </div>
      </div>

      {/* Main content area — two stacked blocks */}
      <div className="flex-1 flex flex-col">
        {/* Top block: Olive accent + headline */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_40%]">
          {/* Left: Headline */}
          <div className="flex flex-col justify-center px-site py-12 lg:py-8 border-b lg:border-b-0 lg:border-r border-border-tertiary">
            <h2
              className="font-serif text-fg-primary font-medium leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
              data-animate="hero-heading"
            >
              Join
              <br />
              the dev
              <br />
              conference
            </h2>
            <p
              className="text-body-1 text-fg-secondary mt-6 max-w-md"
              data-animate="hero"
              data-delay="0.3"
            >
              Keynotes, hands-on workshops, and deep technical sessions on
              building with Claude. Three cities worldwide.
            </p>
          </div>

          {/* Right: Olive panel with shape accent */}
          <div
            className="relative bg-accent-olive flex flex-col items-center justify-center p-8 min-h-[40vh] lg:min-h-0 overflow-hidden"
            data-animate="hero"
            data-delay="0.2"
          >
            {/* Steps shape — large, centered, low opacity */}
            <Image
              src="/shapes/steps.svg"
              alt=""
              width={400}
              height={400}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[400px] opacity-[0.12] pointer-events-none select-none"
              aria-hidden="true"
            />

            {/* Content in olive panel */}
            <div className="relative z-10 text-center">
              <p className="font-mono text-xs text-bg-inverse/60 uppercase tracking-[0.3em] mb-4">
                May 7, 2026
              </p>
              <p
                className="font-serif text-bg-inverse text-h3 font-medium"
              >
                San Francisco
              </p>
              <p className="font-mono text-xs text-bg-inverse/60 uppercase tracking-[0.3em] mt-4">
                SVN West
              </p>
            </div>
          </div>
        </div>

        {/* Bottom block: CTA bar with heavy border */}
        <div className="border-t border-border-tertiary">
          <div className="px-site py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Left: metadata */}
            <div
              className="flex items-center gap-8"
              data-animate="hero"
              data-delay="0.5"
            >
              <div>
                <p className="font-mono text-xs text-fg-quaternary uppercase tracking-wider">
                  Sessions
                </p>
                <p className="text-body-2 text-fg-primary font-medium">25+</p>
              </div>
              <div>
                <p className="font-mono text-xs text-fg-quaternary uppercase tracking-wider">
                  Tracks
                </p>
                <p className="text-body-2 text-fg-primary font-medium">3</p>
              </div>
              <div>
                <p className="font-mono text-xs text-fg-quaternary uppercase tracking-wider">
                  Cities
                </p>
                <p className="text-body-2 text-fg-primary font-medium">
                  SF, London, Tokyo
                </p>
              </div>
            </div>

            {/* Right: CTA */}
            <div
              className="flex items-center gap-3"
              data-animate="hero"
              data-delay="0.55"
            >
              <Button
                variant="primary"
                size="lg"
                href="#register"
                iconFormat="none"
              >
                Apply to attend
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Attribution footer */}
      <div className="border-t border-fg-primary/20">
        <div
          className="px-site py-3 flex items-center justify-between"
          data-animate="hero"
          data-delay="0.6"
        >
          <p className="text-label text-fg-quaternary">By Anthropic</p>
          <p className="font-mono text-xs text-fg-quaternary">
            In person & virtual
          </p>
        </div>
      </div>
    </main>
  );
}
