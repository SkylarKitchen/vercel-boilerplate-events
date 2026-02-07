import Image from "next/image";
import Button from "@/components/Button";
import CountdownClient from "../_components/CountdownClient";

export default function Hero1() {
  return (
    <main className="min-h-screen flex flex-col bg-bg-secondary">
      {/* Main hero area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_40%]">
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

          {/* Bottom CTA */}
          <div
            className="flex items-center gap-3"
            data-animate="hero"
            data-delay="0.6"
          >
            <Button variant="primary" size="lg" href="#register" iconFormat="none">
              Apply to attend
            </Button>
          </div>
        </div>

        {/* Right — Dark panel with subtle shapes (substitute for halftone photo) */}
        <div
          className="relative hidden lg:block overflow-hidden bg-bg-inverse"
          data-animate="hero"
          data-delay="0.3"
        >
          {/* CWC shape — large, bleeding off top-right */}
          <Image
            src="/shapes/cwc.svg"
            alt=""
            width={500}
            height={500}
            className="absolute -top-16 -right-8 w-[380px] opacity-[0.08] brightness-0 invert"
          />
          {/* Star shape — bottom area */}
          <Image
            src="/shapes/star.svg"
            alt=""
            width={400}
            height={400}
            className="absolute -bottom-12 -left-8 w-[300px] opacity-[0.06] brightness-0 invert"
          />
          {/* Grid texture — center */}
          <Image
            src="/shapes/grid.svg"
            alt=""
            width={200}
            height={200}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] opacity-[0.04] brightness-0 invert"
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
