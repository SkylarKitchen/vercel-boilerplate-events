import Image from "next/image";
import Button from "@/components/Button";
import Hero17ScrollReveal from "./_components/Hero17ScrollReveal";

/**
 * Hero 17 — "Text Cutout Scroll Reveal"
 * Warm oat background with massive knockout text that reveals a halftone
 * crowd photo underneath. On scroll, the solid overlay slides up like a
 * curtain, unveiling the full background image.
 */

export default function Hero17() {
  return (
    <main className="relative">
      <h1 className="sr-only">Code with Claude 2026 — Text Cutout Scroll Reveal</h1>

      {/* ─── Background image layer (fixed, always behind everything) ─── */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/imgs/service-pnp-pan-6a28000-6a28300-6a28351r.jpg"
          alt="Halftone crowd photo from a conference"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* ─── Scroll reveal wrapper (client component handles GSAP) ─── */}
      <Hero17ScrollReveal>
        {/* ─── Solid overlay with cutout text ─── */}
        <div className="hero17-overlay relative z-10 bg-bg-secondary overflow-hidden flex flex-col min-h-[70vh]">

          {/* ─── Hero viewport section (fills remaining space above the bottom strip) ─── */}
          <div className="relative flex-1 flex flex-col min-h-0">

            {/* Grid decoration — upper right, cutout revealing fixed background */}
            <div
              className="absolute top-[8%] right-[3%] w-[22vw] max-w-[320px] aspect-square pointer-events-none select-none z-10"
              aria-hidden="true"
              style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url('/imgs/service-pnp-pan-6a28000-6a28300-6a28351r.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                WebkitMaskImage: "url('/shapes/grid.svg')",
                maskImage: "url('/shapes/grid.svg')",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />

            {/* ─── Main content area ─── */}
            <div className="relative z-20 flex flex-col flex-1 pt-32 sm:pt-36 lg:pt-40 px-site">

              {/* Two-column layout: headline left, info right-bottom */}
              <div className="flex flex-col lg:flex-row flex-1 gap-8 lg:gap-16 pb-8 lg:pb-16">

                {/* Left column — massive knockout headline
                    NOTE: No data-animate on the h2 — opacity animation
                    breaks background-clip:text. The wrapper div handles
                    a clip-path reveal instead. */}
                <div className="flex-1 flex items-start lg:items-center hero17-heading-wrap">
                  <h2
                    className="font-sans font-bold leading-[0.9] tracking-[-0.03em]"
                    style={{
                      fontSize: "clamp(4rem, 11.5vw, 12.5rem)",
                      backgroundImage: "linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url('/imgs/service-pnp-pan-6a28000-6a28300-6a28351r.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundAttachment: "fixed",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Code w/<br />
                    Claude<br />
                    June 3-4<br />
                    2026
                  </h2>
                </div>

                {/* Right column — description + CTA, bottom-aligned */}
                <div className="lg:w-[34%] lg:max-w-[420px] flex flex-col justify-end gap-6 lg:pb-4">
                  <p className="text-base sm:text-lg text-fg-primary leading-relaxed">
                    Meet with our engineering team, get hands-on
                    with product, and connect with other
                    developers passionate about Claude.
                  </p>
                  <div>
                    <Button
                      variant="primary"
                      size="lg"
                      href="#register"
                      iconFormat="none"
                    >
                      Apply to attend
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Hero17ScrollReveal>

      {/* ─── Spacer: scroll target for the reveal effect ─── */}
      <div className="relative z-0 h-screen" />
    </main>
  );
}
