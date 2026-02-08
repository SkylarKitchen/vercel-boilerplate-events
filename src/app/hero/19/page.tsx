import Button from "@/components/Button";
import MatrixShapes from "./MatrixShapes";

export default function Hero19() {
  return (
    <main className="relative min-h-screen bg-bg-secondary flex flex-col items-center justify-center overflow-hidden px-site pt-20 pb-16">
      <h1 className="sr-only">Code with Claude 2026 — San Francisco</h1>

      {/* ─── Matrix-style shape rain ─── */}
      <MatrixShapes />

      {/* ─── Center content column ─── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[640px]">
        {/* Large star icon */}
        <img
          src="/shapes/star.svg"
          alt=""
          width={200}
          height={200}
          className="mb-8 opacity-[0.07]"
          data-animate="hero"
          aria-hidden="true"
        />

        {/* Title */}
        <h2
          className="font-serif text-fg-primary text-display-2 sm:text-display-1 leading-[1.05] mb-4"
          data-animate="hero-heading"
        >
          Claude Developer Conference
        </h2>

        {/* Description */}
        <p
          className="text-body-1 text-fg-secondary max-w-md mb-8"
          data-animate="hero"
          data-delay="0.15"
        >
          Meet with our engineering team, get hands-on with product, and connect
          with other developers passionate about Claude.
        </p>

        {/* CTA row: date | button | location */}
        <div
          className="flex flex-wrap items-center justify-center gap-6"
          data-animate="hero"
          data-delay="0.25"
        >
          <span className="font-mono text-sm text-fg-secondary whitespace-nowrap">
            June 3-4, 2026
          </span>
          <Button variant="primary" size="md" href="#register" iconFormat="none">
            Apply to attend
          </Button>
          <span className="font-mono text-sm text-fg-secondary whitespace-nowrap">
            San Francisco
          </span>
        </div>
      </div>

      {/* ─── Bottom: ANTHROPIC wordmark ─── */}
      <p
        className="absolute bottom-8 font-mono text-xs tracking-[0.25em] uppercase text-fg-quaternary"
        data-animate="hero"
        data-delay="0.5"
      >
        Anthropic
      </p>
    </main>
  );
}
