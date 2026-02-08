import Image from "next/image";
import Button from "@/components/Button";
import ScrollReveal from "./_components/ScrollReveal";

/**
 * Hero 18 — "Halftone Knockout Scroll Reveal"
 *
 * Three-layer architecture (same as Hero 17):
 *   1. Fixed background — full crowd photo, always behind everything
 *   2. Oat overlay — slides up on scroll like a curtain
 *   3. Knockout text — uses background-attachment:fixed so the text
 *      is a pixel-perfect "window" into the image underneath
 *
 * Layout: mono metadata bar, description row, massive "w/ Claude"
 * knockout text, grid decoration. On scroll the oat layer peels away
 * to reveal the full photo.
 */

export default function Hero18() {
  return (
    <main className="relative">
      <h1 className="sr-only">Code with Claude 2026 — San Francisco</h1>

      {/* ─── Layer 1: Fixed background image ─── */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/imgs/service-pnp-pan-6a28000-6a28300-6a28351r.jpg"
          alt="Halftone crowd photo from a developer conference"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* ─── Layer 2: Scroll reveal wrapper ─── */}
      <ScrollReveal>
        {/* Oat overlay — the "curtain" that slides up */}
        <div className="hero18-overlay relative z-10 bg-bg-secondary flex flex-col min-h-screen">

          {/* ─── Content area ─── */}
          <div className="relative flex flex-col flex-1 pt-28 sm:pt-32 lg:pt-36 px-site">

            {/* Row 1: Metadata — date / venue / CTA */}
            <div className="relative z-20 flex items-start justify-between gap-8">
              <div className="flex gap-16 sm:gap-24 lg:gap-32">
                <div className="font-mono text-sm sm:text-base text-fg-primary leading-snug">
                  <p>June 3-4</p>
                  <p>2026</p>
                </div>
                <div className="font-mono text-sm sm:text-base text-fg-primary leading-snug">
                  <p>The Midway</p>
                  <p>San Francisco, California</p>
                </div>
              </div>
              <div className="hidden sm:block flex-shrink-0">
                <Button
                  variant="primary"
                  size="md"
                  href="#register"
                  iconFormat="none"
                >
                  Apply to attend
                </Button>
              </div>
            </div>

            {/* Row 2: Description + format badge */}
            <div className="relative z-20 flex items-start justify-between gap-8 mt-8 sm:mt-12">
              <p className="font-mono text-sm sm:text-base text-fg-primary leading-relaxed max-w-md">
                Get hands-on with product, and connect with
                other developers passionate about Claude.
              </p>
              <p className="hidden sm:block font-mono text-sm sm:text-base text-fg-primary flex-shrink-0">
                In person &amp; virtual
              </p>
            </div>

            {/* Row 3: Knockout text + grid decoration */}
            <div className="relative flex-1 flex items-end pb-0 mt-6 sm:mt-8">
              {/* Knockout heading — background-attachment:fixed aligns
                  the image with the fixed layer underneath */}
              <h2
                className="relative z-10 font-serif font-bold leading-[0.85] tracking-[-0.03em]"
                style={{
                  fontSize: "clamp(5rem, 14vw, 16rem)",
                  backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/imgs/service-pnp-pan-6a28000-6a28300-6a28351r.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundAttachment: "fixed",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                w/ Claude
              </h2>

              {/* Grid/molecule decoration */}
              <div
                className="absolute -bottom-[8%] -right-[3%] w-[22vw] max-w-[340px] aspect-square pointer-events-none select-none z-0"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/imgs/service-pnp-pan-6a28000-6a28300-6a28351r.jpg')",
                  backgroundSize: "250% auto",
                  backgroundPosition: "60% 25%",
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
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ─── Spacer: scroll target for the curtain reveal ─── */}
      <div className="relative z-0 h-screen" />
    </main>
  );
}
