import Image from "next/image";
import Button from "@/components/Button";
import CountdownClient from "../_components/CountdownClient";

export default function Hero2() {
  return (
    <main className="min-h-screen flex flex-col bg-bg-primary">
      {/* Main grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_38%] pt-16">
        {/* Left — Editorial content */}
        <div className="flex flex-col justify-between px-site py-12 lg:py-16">
          {/* Top: Logo bar */}
          <div
            className="flex items-center gap-3"
            data-animate="hero"
            data-delay="0"
          >
            <span className="text-label text-accent-clay font-medium">
              Anthropic Presents
            </span>
            <span className="w-px h-4 bg-border-secondary" />
            <span className="text-label text-fg-quaternary">2026</span>
          </div>

          {/* Middle: Headline + body + CTA */}
          <div className="my-10 lg:my-0 max-w-xl">
            <h1
              className="text-display-1 font-serif text-fg-primary mb-6"
              data-animate="hero-heading"
            >
              Code with Claude
            </h1>
            <p
              className="text-body-large-1 text-fg-secondary mb-8 max-w-md"
              data-animate="hero"
              data-delay="0.25"
            >
              The developer conference for building the future with AI.
              Keynotes, workshops, and hands-on sessions across three
              cities.
            </p>
            <div
              className="flex flex-wrap items-center gap-3"
              data-animate="hero"
              data-delay="0.35"
            >
              <Button variant="clay" size="lg" href="#register">
                Register Now
              </Button>
              <Button variant="secondary" size="lg" href="/sessions">
                Browse Sessions
              </Button>
            </div>
          </div>

          {/* Bottom: Countdown row */}
          <div className="max-w-md">
            <p
              className="text-label text-fg-quaternary mb-4"
              data-animate="hero"
              data-delay="0.2"
            >
              San Francisco &middot; May 7, 2026
            </p>
            <CountdownClient variant="inline" />
          </div>
        </div>

        {/* Right — Decorative panel */}
        <div
          className="relative hidden lg:flex flex-col items-center justify-center gap-16 overflow-hidden bg-bg-tertiary"
          data-animate="hero"
          data-delay="0.2"
        >
          {/* Dot grid background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--color-fg-primary) 0.8px, transparent 0.8px)",
              backgroundSize: "20px 20px",
              opacity: 0.06,
            }}
          />

          {/* Stacked shapes */}
          <Image
            src="/shapes/star.svg"
            alt=""
            width={120}
            height={120}
            className="relative opacity-[0.08] dark:invert"
          />
          <Image
            src="/shapes/steps.svg"
            alt=""
            width={140}
            height={140}
            className="relative opacity-[0.08] dark:invert"
          />
          <Image
            src="/shapes/grid.svg"
            alt=""
            width={100}
            height={100}
            className="relative opacity-[0.08] dark:invert"
          />
        </div>
      </div>

      {/* Mini footer bar */}
      <div className="border-t border-border-tertiary">
        <div className="max-w-7xl mx-auto px-site py-4 flex items-center justify-between">
          <p className="text-caption text-fg-quaternary">By Anthropic</p>
          <div className="flex items-center gap-6">
            <a
              href="#schedule"
              className="text-caption text-fg-quaternary hover:text-fg-primary transition-colors"
            >
              Schedule
            </a>
            <a
              href="#locations"
              className="text-caption text-fg-quaternary hover:text-fg-primary transition-colors"
            >
              Locations
            </a>
            <a
              href="#about"
              className="text-caption text-fg-quaternary hover:text-fg-primary transition-colors"
            >
              About
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
