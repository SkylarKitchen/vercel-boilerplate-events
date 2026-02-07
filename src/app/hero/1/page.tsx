import Image from "next/image";
import Button from "@/components/Button";
import CountdownClient from "../_components/CountdownClient";

export default function Hero1() {
  return (
    <main className="min-h-screen flex flex-col bg-bg-secondary">
      {/* Visually-hidden h1 for accessibility/SEO */}
      <h1 className="sr-only">
        Code with Claude 2026 — Countdown to the Developer Conference
      </h1>

      {/* Main hero area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_45%]">
        {/* Left — Branding + Countdown */}
        <div className="flex flex-col justify-between px-site py-10 lg:py-14">
          {/* Top bar: serif title left, mono date right */}
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

          {/* Countdown — massive stacked numbers */}
          <div className="my-8 lg:my-0">
            <CountdownClient variant="stacked" />
          </div>

          {/* Bottom CTA with body text */}
          <div
            data-animate="hero"
            data-delay="0.6"
          >
            <p className="text-body-2 text-fg-secondary mb-4">
              Join us for the first Claude Developer Conference by Anthropic.
            </p>
            <div className="flex items-center gap-3">
              <Button variant="primary" size="lg" href="#register" iconFormat="none">
                Apply to attend
              </Button>
            </div>
          </div>
        </div>

        {/* Right — Dark panel with halftone crowd photo */}
        <div
          className="relative hidden lg:block overflow-hidden bg-bg-inverse"
          data-animate="hero"
          data-delay="0.3"
        >
          <Image
            src="/imgs/Layer_1.png"
            alt="Halftone crowd photo from a developer conference"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Dark bottom strip */}
      <div className="bg-bg-inverse">
        <div className="px-site py-5 flex items-center justify-between">
          <p className="text-label text-fg-inverse/70 font-medium tracking-wide uppercase">
            By Anthropic
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#faq"
              className="text-sm text-fg-inverse/50 underline hover:text-fg-inverse/80 transition-colors"
            >
              FAQs
            </a>
            <a
              href="#terms"
              className="text-sm text-fg-inverse/50 underline hover:text-fg-inverse/80 transition-colors"
            >
              Terms of service
            </a>
            <a
              href="#privacy"
              className="text-sm text-fg-inverse/50 underline hover:text-fg-inverse/80 transition-colors"
            >
              Privacy policy
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
