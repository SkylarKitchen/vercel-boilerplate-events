import Image from "next/image";
import Button from "@/components/Button";
import StatsGrid from "@/components/StatsGrid";
import HeroGradient from "../_components/HeroGradient";

const stats = [
  { value: 25, suffix: "+", label: "Technical sessions" },
  { value: 700, suffix: "+", label: "Developers" },
  { value: 3, label: "Global cities" },
];

export default function Hero4() {
  return (
    <main>
      {/* Hero — always dark */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-bg-inverse pt-16 overflow-hidden">
        {/* Animated radial glow (ambient, not UI chrome) */}
        <HeroGradient />

        {/* Low-opacity decorative shapes */}
        <Image
          src="/shapes/star.svg"
          alt=""
          width={180}
          height={180}
          className="absolute top-24 left-[10%] opacity-[0.06] brightness-0 invert"
        />
        <Image
          src="/shapes/carrot.svg"
          alt=""
          width={120}
          height={120}
          className="absolute bottom-32 right-[12%] opacity-[0.06] brightness-0 invert"
        />

        {/* Content */}
        <div className="relative z-10 text-center px-site max-w-3xl">
          <p
            className="text-label text-fg-inverse/50 font-medium mb-6 uppercase tracking-[0.2em]"
            data-animate="hero"
            data-delay="0"
          >
            Anthropic Developer Conference
          </p>

          <h1
            className="text-display-1 font-serif text-fg-inverse mb-6"
            data-animate="hero-heading"
          >
            Code with Claude 2026
          </h1>

          <p
            className="text-fg-inverse/70 mb-4 font-mono text-sm tracking-wide"
            data-animate="hero"
            data-delay="0.3"
          >
            MAY 7, 2026 &middot; SAN FRANCISCO &middot; LONDON &middot; TOKYO
          </p>

          <p
            className="text-body-1 text-fg-inverse/60 mb-10 max-w-lg mx-auto"
            data-animate="hero"
            data-delay="0.4"
          >
            Keynotes, hands-on workshops, and deep technical sessions on
            building AI-native applications with Claude.
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-3"
            data-animate="hero"
            data-delay="0.5"
          >
            <Button
              variant="ghost"
              size="lg"
              href="#register"
            >
              Register Now
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="#schedule"
              className="text-fg-inverse/70 hover:text-fg-inverse border-fg-inverse/15 hover:border-fg-inverse/40"
            >
              View Schedule
            </Button>
          </div>
        </div>
      </section>

      {/* Stats section — also dark */}
      <section className="bg-bg-inverse">
        <div className="max-w-4xl mx-auto px-site pb-section-sm pt-12 [&_p]:text-fg-inverse">
          <StatsGrid stats={stats} />
        </div>
      </section>
    </main>
  );
}
