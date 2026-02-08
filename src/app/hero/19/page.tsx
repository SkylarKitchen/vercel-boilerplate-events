import Button from "@/components/Button";

const shapes = [
  // Top-left
  { src: "/shapes/carrot-alt.svg", size: 28, top: "8%", left: "6%", rotate: 15 },
  // Top-center-right
  { src: "/shapes/star.svg", size: 24, top: "10%", right: "28%", rotate: 0 },
  // Right-top
  { src: "/shapes/hourglass.svg", size: 28, top: "18%", right: "7%", rotate: 45 },
  // Left-upper-mid
  { src: "/shapes/cwc.svg", size: 28, top: "35%", left: "8%", rotate: 0 },
  // Left-lower-mid
  { src: "/shapes/grid.svg", size: 24, bottom: "38%", left: "10%", rotate: 0 },
  // Right-mid
  { src: "/shapes/carrot.svg", size: 28, top: "50%", right: "9%", rotate: 0 },
  // Bottom-left
  { src: "/shapes/carrot.svg", size: 28, bottom: "14%", left: "12%", rotate: 180 },
  // Bottom-right-upper
  { src: "/shapes/carrot.svg", size: 24, bottom: "24%", right: "14%", rotate: 0 },
  // Bottom-right-lower
  { src: "/shapes/grid.svg", size: 28, bottom: "10%", right: "8%", rotate: 0 },
];

export default function Hero19() {
  return (
    <main className="relative min-h-screen bg-bg-secondary flex flex-col items-center justify-center overflow-hidden px-site py-16">
      <h1 className="sr-only">Code with Claude 2026 — San Francisco</h1>

      {/* ─── Scattered decorative shapes ─── */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        {shapes.map((shape, i) => (
          <img
            key={i}
            src={shape.src}
            alt=""
            width={shape.size}
            height={shape.size}
            className="absolute opacity-[0.05]"
            data-animate="hero"
            data-delay={String(0.4 + i * 0.06)}
            style={{
              top: shape.top,
              bottom: shape.bottom,
              left: shape.left,
              right: shape.right,
              transform: shape.rotate ? `rotate(${shape.rotate}deg)` : undefined,
            }}
          />
        ))}
      </div>

      {/* ─── Center content column ─── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[640px]">
        {/* Large star icon */}
        <img
          src="/shapes/star.svg"
          alt=""
          width={300}
          height={300}
          className="mb-10 opacity-[0.07]"
          data-animate="hero"
          aria-hidden="true"
        />

        {/* Title */}
        <h2
          className="font-serif text-fg-primary text-display-2 sm:text-display-1 leading-[1.05] mb-5"
          data-animate="hero-heading"
        >
          Claude Developer Conference
        </h2>

        {/* Description */}
        <p
          className="text-body-1 text-fg-secondary max-w-md mb-10"
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
