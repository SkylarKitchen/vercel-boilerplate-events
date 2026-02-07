import Image from "next/image";
import Button from "@/components/Button";
import CountdownClient from "../_components/CountdownClient";

export default function Hero2() {
  return (
    <main className="min-h-screen flex flex-col bg-bg-secondary">
      {/* Main grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_38%]">
        {/* Left — Editorial content */}
        <div className="flex flex-col justify-between px-site py-10 lg:py-14">
          {/* Top: Logo + Date */}
          <div
            className="flex items-start justify-between"
            data-animate="hero"
            data-delay="0"
          >
            <p className="text-h4 font-serif italic text-fg-primary">
              Code w/ Claude
            </p>
            <p className="font-mono text-sm text-fg-secondary text-right">
              May 7, 2026
              <br />
              San Francisco, California
            </p>
          </div>

          {/* Middle: Headline + body + CTA */}
          <div className="my-10 lg:my-0 max-w-xl">
            <h1
              className="text-display-1 font-serif text-fg-primary mb-6"
              data-animate="hero-heading"
            >
              Join us for the first Claude Developer Conference by Anthropic.
            </h1>
            <p
              className="text-body-1 text-fg-secondary mb-8 max-w-md"
              data-animate="hero"
              data-delay="0.25"
            >
              Meet with our engineering team, get hands-on with product, and
              connect with other developers passionate about Claude.
            </p>
            <div data-animate="hero" data-delay="0.35">
              <Button variant="primary" size="md" href="#register" iconFormat="none">
                Apply to attend
              </Button>
            </div>
          </div>

          {/* Bottom: Countdown row */}
          <div className="max-w-md">
            <CountdownClient variant="inline" />
          </div>
        </div>

        {/* Right — Decorative star pattern panel */}
        <div
          className="relative hidden lg:flex flex-col overflow-hidden bg-bg-secondary border-l border-border-secondary"
          data-animate="hero"
          data-delay="0.2"
        >
          {/* Top dense grid of small stars */}
          <div className="flex-[3] grid grid-cols-4 grid-rows-4 p-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={`top-${i}`} className="flex items-center justify-center p-1">
                <Image
                  src="/shapes/star.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="w-7 h-7"
                />
              </div>
            ))}
          </div>

          {/* Middle: 2 large centered stars */}
          <div className="flex-[4] flex flex-col items-center justify-center gap-6 px-8">
            <Image
              src="/shapes/star.svg"
              alt=""
              width={160}
              height={160}
              className="w-36 h-36"
            />
            <Image
              src="/shapes/star.svg"
              alt=""
              width={160}
              height={160}
              className="w-36 h-36"
            />
          </div>

          {/* Bottom dense grid of small stars */}
          <div className="flex-[3] grid grid-cols-4 grid-rows-4 p-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={`bot-${i}`} className="flex items-center justify-center p-1">
                <Image
                  src="/shapes/star.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="w-7 h-7"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-border-secondary">
        <div className="px-site py-4 flex items-center justify-between">
          <p className="text-label text-fg-primary font-medium tracking-wide uppercase">
            By Anthropic
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#faq"
              className="text-sm text-fg-secondary underline hover:text-fg-primary transition-colors"
            >
              FAQs
            </a>
            <a
              href="#terms"
              className="text-sm text-fg-secondary underline hover:text-fg-primary transition-colors"
            >
              Terms of service
            </a>
            <a
              href="#privacy"
              className="text-sm text-fg-secondary underline hover:text-fg-primary transition-colors"
            >
              Privacy policy
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
