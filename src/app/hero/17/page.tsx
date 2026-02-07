import Image from "next/image";
import Button from "@/components/Button";
import Hero17ScrollReveal from "./_components/Hero17ScrollReveal";

/**
 * Hero 17 — "Text Cutout Scroll Reveal"
 * Warm oat background with massive knockout text that reveals a halftone
 * crowd photo underneath. On scroll, the solid overlay slides up like a
 * curtain, unveiling the full background image. Features a decorative
 * molecular/network illustration in the upper-right corner, also cutout.
 */

/* Inline SVG for the molecular network, used as a CSS mask */
const NETWORK_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 520'%3E%3Cline x1='420' y1='-20' x2='370' y2='140' stroke='%23000' stroke-width='20' stroke-linecap='round'/%3E%3Cline x1='370' y1='140' x2='510' y2='230' stroke='%23000' stroke-width='20' stroke-linecap='round'/%3E%3Cline x1='370' y1='140' x2='260' y2='260' stroke='%23000' stroke-width='20' stroke-linecap='round'/%3E%3Cline x1='370' y1='140' x2='460' y2='80' stroke='%23000' stroke-width='16' stroke-linecap='round'/%3E%3Cline x1='460' y1='80' x2='580' y2='20' stroke='%23000' stroke-width='16' stroke-linecap='round'/%3E%3Cline x1='460' y1='80' x2='540' y2='150' stroke='%23000' stroke-width='14' stroke-linecap='round'/%3E%3Cline x1='510' y1='230' x2='600' y2='320' stroke='%23000' stroke-width='18' stroke-linecap='round'/%3E%3Cline x1='510' y1='230' x2='470' y2='360' stroke='%23000' stroke-width='16' stroke-linecap='round'/%3E%3Cline x1='260' y1='260' x2='180' y2='350' stroke='%23000' stroke-width='16' stroke-linecap='round'/%3E%3Cline x1='260' y1='260' x2='310' y2='380' stroke='%23000' stroke-width='14' stroke-linecap='round'/%3E%3Cline x1='600' y1='320' x2='620' y2='430' stroke='%23000' stroke-width='16' stroke-linecap='round'/%3E%3Ccircle cx='370' cy='140' r='38' fill='%23000'/%3E%3Ccircle cx='510' cy='230' r='34' fill='%23000'/%3E%3Ccircle cx='260' cy='260' r='30' fill='%23000'/%3E%3Ccircle cx='460' cy='80' r='22' fill='%23000'/%3E%3Ccircle cx='580' cy='20' r='16' fill='%23000'/%3E%3Ccircle cx='540' cy='150' r='14' fill='%23000'/%3E%3Ccircle cx='600' cy='320' r='30' fill='%23000'/%3E%3Ccircle cx='470' cy='360' r='24' fill='%23000'/%3E%3Ccircle cx='180' cy='350' r='26' fill='%23000'/%3E%3Ccircle cx='310' cy='380' r='18' fill='%23000'/%3E%3Ccircle cx='620' cy='430' r='20' fill='%23000'/%3E%3C/svg%3E")`;

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
      </div>

      {/* ─── Scroll reveal wrapper (client component handles GSAP) ─── */}
      <Hero17ScrollReveal>
        {/* ─── Solid overlay with cutout text ─── */}
        <div className="hero17-overlay relative z-10 bg-bg-secondary overflow-hidden flex flex-col h-screen">

          {/* ─── Hero viewport section (fills remaining space above the bottom strip) ─── */}
          <div className="relative flex-1 flex flex-col min-h-0">

            {/* Network/molecular decoration — upper right, with cutout texture */}
            <div
              className="hero17-network absolute -top-[2%] -right-[5%] w-[48vw] max-w-[750px] aspect-[600/520] pointer-events-none select-none"
              aria-hidden="true"
              style={{
                backgroundImage: "url('/imgs/service-pnp-pan-6a28000-6a28300-6a28351r.jpg')",
                backgroundSize: "200% auto",
                backgroundPosition: "70% 30%",
                WebkitMaskImage: NETWORK_SVG,
                maskImage: NETWORK_SVG,
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />

            {/* ─── Main content area ─── */}
            <div className="relative z-20 flex flex-col flex-1 pt-24 sm:pt-28 lg:pt-32 px-site">

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
                      backgroundImage: "url('/imgs/service-pnp-pan-6a28000-6a28300-6a28351r.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
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

          {/* ─── Bottom strip: thin border + peek of image ─── */}
          <div className="relative h-20 sm:h-28 lg:h-32 border-t border-fg-primary/15 overflow-hidden">
            <Image
              src="/imgs/service-pnp-pan-6a28000-6a28300-6a28351r.jpg"
              alt=""
              fill
              className="object-cover object-top"
              aria-hidden="true"
            />
          </div>
        </div>
      </Hero17ScrollReveal>

      {/* ─── Spacer: scroll target for the reveal effect ─── */}
      <div className="relative z-0 h-screen" />
    </main>
  );
}
