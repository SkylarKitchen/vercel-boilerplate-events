import Image from "next/image";
import Button from "@/components/Button";

/**
 * Hero 18 — "Halftone Knockout v2"
 * Structured metadata bar, body copy row, massive "w/ Claude" knockout
 * text with halftone crowd texture, grid decoration, and full-bleed
 * photo section at the bottom.
 */

export default function Hero18() {
  return (
    <section className="relative min-h-screen bg-bg-secondary flex flex-col">
      <h1 className="sr-only">Code with Claude 2026 — San Francisco</h1>

      {/* ─── Upper oat section (~60vh) ─── */}
      <div className="relative flex flex-col flex-1 pt-28 sm:pt-32 lg:pt-36 px-site">

        {/* Row 1: Metadata — date / venue / CTA (above decoration) */}
        <div className="relative z-20 flex items-start justify-between gap-8">
          <div className="flex gap-16 sm:gap-24 lg:gap-32">
            {/* Date */}
            <div className="font-mono text-sm sm:text-base text-fg-primary leading-snug">
              <p>June 3-4</p>
              <p>2026</p>
            </div>
            {/* Venue */}
            <div className="font-mono text-sm sm:text-base text-fg-primary leading-snug">
              <p>The Midway</p>
              <p>San Francisco, California</p>
            </div>
          </div>
          {/* CTA button */}
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

        {/* Row 2: Description + format badge (above decoration) */}
        <div className="relative z-20 flex items-start justify-between gap-8 mt-8 sm:mt-12">
          <p className="font-mono text-sm sm:text-base text-fg-primary leading-relaxed max-w-md">
            Get hands-on with product, and connect with
            other developers passionate about Claude.
          </p>
          <p className="hidden sm:block font-mono text-sm sm:text-base text-fg-primary flex-shrink-0">
            In person &amp; virtual
          </p>
        </div>

        {/* Row 3: Massive knockout text + grid decoration */}
        <div className="relative flex-1 flex items-end pb-4 sm:pb-6 mt-6 sm:mt-8">
          {/* Knockout heading */}
          <h2
            className="relative z-10 font-serif font-bold leading-[0.85] tracking-[-0.03em]"
            style={{
              fontSize: "clamp(5rem, 14vw, 16rem)",
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/imgs/service-pnp-pan-6a28000-6a28300-6a28351r.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            w/ Claude
          </h2>

          {/* Grid/molecule decoration — lower right, behind metadata */}
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

      {/* ─── Bottom photo section (~40vh) ─── */}
      <div className="relative h-[38vh] sm:h-[42vh] overflow-hidden">
        <Image
          src="/imgs/service-pnp-pan-6a28000-6a28300-6a28351r.jpg"
          alt="Halftone crowd photo from a developer conference"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </section>
  );
}
