import Image from "next/image";
import Button from "@/components/Button";

export default function Hero3() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-16">
      {/* Left — Content side */}
      <div className="flex flex-col justify-between bg-bg-primary px-site py-12 lg:py-16">
        {/* Top: Eyebrow */}
        <div data-animate="hero" data-delay="0">
          <p className="text-label text-accent-clay font-medium">
            Anthropic Presents
          </p>
        </div>

        {/* Center: Headline + body + CTA */}
        <div className="my-10 lg:my-0 max-w-lg">
          <h1
            className="font-serif text-fg-primary mb-6"
            style={{
              fontSize: "clamp(2.75rem, 5.5vw, 5.5rem)",
              lineHeight: 1.05,
            }}
            data-animate="hero-heading"
          >
            Code with Claude 2026
          </h1>
          <p
            className="text-body-large-2 text-fg-secondary mb-8 max-w-md"
            data-animate="hero"
            data-delay="0.25"
          >
            The flagship developer conference for building with AI.
            Three cities. Hundreds of sessions. One community.
          </p>
          <div
            className="flex flex-wrap items-center gap-3"
            data-animate="hero"
            data-delay="0.35"
          >
            <Button variant="clay" size="lg" href="#register">
              Register for SF
            </Button>
            <Button variant="secondary" size="lg" href="#locations">
              All Locations
            </Button>
          </div>
        </div>

        {/* Bottom: Attribution */}
        <div data-animate="hero" data-delay="0.45">
          <p className="text-caption text-fg-quaternary">
            By Anthropic &middot; May 7, 2026 &middot; San Francisco
          </p>
        </div>
      </div>

      {/* Right — Clay accent panel */}
      <div
        className="relative overflow-hidden bg-accent-clay min-h-[50vh] lg:min-h-0"
        data-animate="hero"
        data-delay="0.2"
      >
        {/* Large shape — top right, bleeding off edge */}
        <Image
          src="/shapes/circle.svg"
          alt=""
          width={400}
          height={400}
          className="absolute -top-16 -right-16 w-72 lg:w-[400px] opacity-[0.12]"
        />

        {/* CWC shape — bottom right */}
        <Image
          src="/shapes/cwc.svg"
          alt=""
          width={300}
          height={300}
          className="absolute bottom-8 right-8 w-48 lg:w-72 opacity-[0.15]"
        />

        {/* Hourglass — center left at low opacity */}
        <Image
          src="/shapes/hourglass.svg"
          alt=""
          width={200}
          height={200}
          className="absolute top-1/2 -translate-y-1/2 left-8 w-32 lg:w-48 opacity-[0.06]"
        />

        {/* Centered conference info on clay */}
        <div className="relative flex flex-col items-center justify-center h-full px-8 py-16 text-center">
          <p
            className="text-label text-white/60 mb-4"
            data-animate="hero"
            data-delay="0.5"
          >
            Conference 2026
          </p>
          <p
            className="text-display-2 font-serif text-white"
            data-animate="hero"
            data-delay="0.55"
          >
            May 7
          </p>
          <p
            className="text-body-1 text-white/80 mt-2"
            data-animate="hero"
            data-delay="0.6"
          >
            SVN West, San Francisco
          </p>
        </div>
      </div>
    </main>
  );
}
