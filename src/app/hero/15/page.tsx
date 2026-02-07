import Image from "next/image";
import Button from "@/components/Button";

/**
 * Hero 15 — "Heather Layers"
 * Soft, layered aesthetic: overlapping translucent panels on a heather
 * background. Floating cards with depth via shadows. Circle and carrot-alt
 * shapes as decorative accents. Dreamy, modern, depth-driven.
 */

export default function Hero15() {
  return (
    <main className="relative min-h-screen bg-accent-heather overflow-hidden">
      <h1 className="sr-only">Code with Claude 2026 — Heather Layers</h1>

      {/* Decorative shapes */}
      <Image
        src="/shapes/circle.svg"
        alt=""
        width={300}
        height={300}
        className="absolute top-[10%] right-[5%] w-[20vw] max-w-[300px] opacity-[0.08] pointer-events-none select-none"
        aria-hidden="true"
      />
      <Image
        src="/shapes/carrot-alt.svg"
        alt=""
        width={200}
        height={200}
        className="absolute bottom-[15%] left-[4%] w-[12vw] max-w-[200px] opacity-[0.08] pointer-events-none select-none"
        aria-hidden="true"
      />
      <Image
        src="/shapes/circle.svg"
        alt=""
        width={120}
        height={120}
        className="absolute top-[55%] left-[25%] w-[7vw] max-w-[120px] opacity-[0.05] pointer-events-none select-none"
        aria-hidden="true"
      />

      {/* Background floating panels — purely decorative */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Panel 1 — top-right, slightly rotated */}
        <div
          className="absolute top-[15%] right-[10%] w-[30vw] max-w-[400px] h-[25vh] bg-bg-primary/30 rounded-card backdrop-blur-sm"
          style={{ transform: "rotate(3deg)" }}
          data-animate="hero"
          data-delay="0.1"
        />
        {/* Panel 2 — bottom-left */}
        <div
          className="absolute bottom-[20%] left-[8%] w-[25vw] max-w-[350px] h-[20vh] bg-bg-primary/20 rounded-card backdrop-blur-sm"
          style={{ transform: "rotate(-2deg)" }}
          data-animate="hero"
          data-delay="0.15"
        />
        {/* Panel 3 — mid-right, small */}
        <div
          className="absolute top-[50%] right-[20%] w-[15vw] max-w-[200px] h-[15vh] bg-bg-primary/25 rounded-card backdrop-blur-sm"
          style={{ transform: "rotate(1deg)" }}
          data-animate="hero"
          data-delay="0.2"
        />
      </div>

      {/* Content — centered floating card */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-site py-20">
        {/* Top bar */}
        <div
          className="absolute top-0 left-0 right-0 pt-28 px-site flex items-start justify-between"
          data-animate="hero"
          data-delay="0"
        >
          <p className="text-h5 font-serif italic text-fg-primary">
            Code w/ Claude
          </p>
          <p className="font-mono text-sm text-fg-primary/70 text-right">
            2026
          </p>
        </div>

        {/* Main content card */}
        <div
          className="w-full max-w-xl bg-bg-primary/90 backdrop-blur-md rounded-card shadow-[0_12px_48px_rgba(0,0,0,0.1)] p-8 sm:p-12"
          data-animate="hero"
          data-delay="0.2"
        >
          <p
            className="text-label text-accent-clay mb-5 tracking-[0.2em]"
            data-animate="hero"
            data-delay="0.3"
          >
            Developer Conference
          </p>
          <h2
            className="font-serif text-fg-primary font-medium"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.15,
            }}
            data-animate="hero-heading"
          >
            Code with Claude 2026
          </h2>
          <p
            className="text-body-1 text-fg-secondary mt-4"
            data-animate="hero"
            data-delay="0.4"
          >
            Meet our engineering team, get hands-on with product, and connect
            with other developers passionate about Claude.
          </p>

          {/* Detail row */}
          <div
            className="mt-6 flex flex-wrap items-center gap-4 text-fg-tertiary"
            data-animate="hero"
            data-delay="0.45"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-clay" />
              May 7, 2026
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-sky" />
              San Francisco
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-olive" />
              25+ sessions
            </span>
          </div>

          {/* CTA */}
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
              View schedule
            </Button>
          </div>
        </div>

        {/* Bottom attribution */}
        <div
          className="absolute bottom-0 left-0 right-0 px-site pb-8 flex items-end justify-between"
          data-animate="hero"
          data-delay="0.6"
        >
          <p className="text-label text-fg-primary/60">By Anthropic</p>
          <p className="font-mono text-sm text-fg-primary/50">
            In person & virtual
          </p>
        </div>
      </div>
    </main>
  );
}
