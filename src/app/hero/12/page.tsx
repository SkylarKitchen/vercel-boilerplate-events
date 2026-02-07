import Image from "next/image";
import Button from "@/components/Button";
import CountdownClient from "../_components/CountdownClient";

/**
 * Hero 12 — "Sky Blueprint"
 * Technical blueprint aesthetic: sky-blue accent panel on the right with
 * grid.svg texture overlay. Left side is ivory with monospace-heavy metadata
 * and a stacked information hierarchy. Feels like a technical specification
 * or architectural drawing.
 */

export default function Hero12() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-bg-secondary overflow-hidden">
      <h1 className="sr-only">Code with Claude 2026 — Sky Blueprint</h1>

      {/* Left: Content — information-dense, monospace metadata */}
      <div className="flex-1 flex flex-col justify-between px-site py-10 lg:py-14 lg:pr-16">
        {/* Top: Spec header */}
        <div
          className="pt-16 border-b border-fg-primary/10 pb-6"
          data-animate="hero"
          data-delay="0"
        >
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-xs text-fg-quaternary uppercase tracking-[0.25em]">
              Spec CWC-2026-001
            </p>
            <p className="font-mono text-xs text-fg-quaternary uppercase tracking-wider">
              Rev. 1.0
            </p>
          </div>
        </div>

        {/* Middle: Headline + metadata grid */}
        <div className="my-12 lg:my-0">
          <p
            className="text-label text-accent-sky mb-4"
            data-animate="hero"
            data-delay="0.15"
          >
            Anthropic Developer Conference
          </p>
          <h2
            className="font-serif text-fg-primary font-medium"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              lineHeight: 1.1,
            }}
            data-animate="hero-heading"
          >
            Code with Claude 2026
          </h2>
          <p
            className="text-body-1 text-fg-secondary mt-5 max-w-md"
            data-animate="hero"
            data-delay="0.3"
          >
            Meet our engineering team, get hands-on with product, and connect
            with developers building on Claude.
          </p>

          {/* Metadata table */}
          <div
            className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 max-w-sm"
            data-animate="hero"
            data-delay="0.4"
          >
            {[
              { label: "Date", value: "May 7, 2026" },
              { label: "Venue", value: "SVN West" },
              { label: "Location", value: "San Francisco, CA" },
              { label: "Format", value: "In person & virtual" },
              { label: "Sessions", value: "25+ across 3 tracks" },
              { label: "Capacity", value: "700+ developers" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-mono text-xs text-fg-quaternary uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="text-body-3 text-fg-primary mt-0.5">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-8 flex items-center gap-3"
            data-animate="hero"
            data-delay="0.5"
          >
            <Button
              variant="primary"
              size="lg"
              href="#register"
              iconFormat="none"
            >
              Apply to attend
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="#schedule"
              iconFormat="none"
            >
              View spec
            </Button>
          </div>
        </div>

        {/* Bottom: Countdown */}
        <div className="max-w-sm">
          <p
            className="text-label text-fg-quaternary mb-3"
            data-animate="hero"
            data-delay="0.55"
          >
            Time to launch
          </p>
          <CountdownClient variant="inline" />
        </div>
      </div>

      {/* Right: Sky panel with grid.svg texture */}
      <div
        className="relative lg:w-[42%] min-h-[50vh] lg:min-h-screen bg-accent-sky overflow-hidden"
        data-animate="hero"
        data-delay="0.2"
      >
        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 grid pointer-events-none select-none"
          style={{
            gridTemplateColumns: "repeat(8, 1fr)",
            gridTemplateRows: "repeat(12, 1fr)",
            padding: "2rem",
            gap: "0.5rem",
          }}
          aria-hidden="true"
        >
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              <Image
                src="/shapes/grid.svg"
                alt=""
                width={40}
                height={40}
                className="w-[3.5vw] min-w-4 opacity-[0.15]"
              />
            </div>
          ))}
        </div>

        {/* Blueprint crosshair lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          {/* Horizontal rule */}
          <div className="absolute top-1/2 left-0 right-0 border-t border-bg-inverse/10" />
          {/* Vertical rule */}
          <div className="absolute top-0 bottom-0 left-1/2 border-l border-bg-inverse/10" />
          {/* Diagonal */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, transparent 49.5%, rgba(20,20,19,0.05) 49.5%, rgba(20,20,19,0.05) 50.5%, transparent 50.5%)",
            }}
          />
        </div>

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center" data-animate="hero" data-delay="0.35">
            <p
              className="font-serif text-bg-inverse/80 font-medium"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}
            >
              w/ Claude
            </p>
            <p className="font-mono text-xs text-bg-inverse/40 mt-3 uppercase tracking-[0.3em]">
              Blueprint 2026
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
