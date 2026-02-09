import Button from "@/components/Button";

export default function Hero15() {
  return (
    <main className="relative min-h-screen bg-accent-cactus overflow-hidden">
      <h1 className="sr-only">Code with Claude 2026</h1>

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
