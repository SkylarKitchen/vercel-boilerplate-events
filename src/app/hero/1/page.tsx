import Button from "@/components/Button";
import CountdownClient from "../_components/CountdownClient";

export default function Hero1() {
  return (
    <main className="min-h-screen flex flex-col bg-bg-secondary">
      {/* Main hero area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_40%] pt-16">
        {/* Left — Branding + Countdown */}
        <div className="flex flex-col justify-between px-site py-12 lg:py-16">
          {/* Top bar */}
          <div data-animate="hero" data-delay="0">
            <p className="text-label text-fg-quaternary">
              Code with Claude
            </p>
            <p className="text-body-3 text-fg-tertiary mt-1">
              May 7, 2026 &middot; San Francisco
            </p>
          </div>

          {/* Countdown */}
          <div className="my-8 lg:my-0">
            <CountdownClient variant="stacked" />
          </div>

          {/* Bottom CTA */}
          <div
            className="flex items-center gap-3"
            data-animate="hero"
            data-delay="0.6"
          >
            <Button variant="clay" size="lg" href="#register">
              Register Now
            </Button>
            <Button variant="tertiary" size="lg" href="#schedule">
              View Schedule
            </Button>
          </div>
        </div>

        {/* Right — Halftone pattern panel */}
        <div
          className="relative hidden lg:block overflow-hidden"
          data-animate="hero"
          data-delay="0.3"
        >
          {/* Dot-halftone pattern via CSS */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--color-fg-primary) 1px, transparent 1px)",
              backgroundSize: "12px 12px",
              opacity: 0.08,
            }}
          />
          {/* Organic mask shape */}
          <div
            className="absolute inset-0 bg-bg-tertiary"
            style={{
              maskImage:
                "radial-gradient(ellipse 80% 70% at 60% 50%, black 30%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 70% at 60% 50%, black 30%, transparent 70%)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, var(--color-fg-primary) 1.5px, transparent 1.5px)",
                backgroundSize: "16px 16px",
                opacity: 0.12,
              }}
            />
          </div>
          {/* Decorative brand shape */}
          <img
            src="/shapes/star.svg"
            alt=""
            className="absolute bottom-16 right-12 w-32 h-32 opacity-[0.06] dark:invert"
          />
        </div>
      </div>

      {/* Dark bottom strip */}
      <div className="bg-bg-inverse">
        <div className="max-w-7xl mx-auto px-site py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-body-3 text-fg-inverse/70">
            Join 700+ developers at SVN West, San Francisco
          </p>
          <div className="flex items-center gap-3">
            <Button variant="clay" size="sm" href="#register">
              Get Tickets
            </Button>
            <Button
              variant="tertiary"
              size="sm"
              href="#about"
              className="!bg-transparent !text-fg-inverse/70 hover:!text-fg-inverse border border-fg-inverse/20"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
