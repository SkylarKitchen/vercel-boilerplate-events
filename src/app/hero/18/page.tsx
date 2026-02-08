import Image from "next/image";
import Button from "@/components/Button";

/**
 * Hero 18 — "Halftone Knockout"
 * Static hero with massive knockout text revealing a halftone crowd photo,
 * network/molecule grid decoration with matching texture, and a photo strip
 * at the bottom. No scroll animation — clean and presentational.
 */

export default function Hero18() {
  return (
    <section className="relative min-h-screen bg-bg-secondary flex flex-col">
      <h1 className="sr-only">Code with Claude 2026</h1>

      {/* ─── Hero viewport area ─── */}
      <div className="relative flex-1 flex flex-col min-h-0">

        {/* Grid/molecule decoration — upper right, halftone texture fill */}
        <div
          className="absolute top-[3%] -right-[5%] w-[30vw] max-w-[460px] aspect-square pointer-events-none select-none z-10"
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

        {/* ─── Main content ─── */}
        <div className="relative z-20 flex flex-col flex-1 pt-32 sm:pt-36 lg:pt-40 px-site">
          <div className="flex flex-col lg:flex-row flex-1 gap-8 lg:gap-16 pb-8 lg:pb-16">

            {/* Left — massive knockout headline */}
            <div className="flex-1 flex items-start lg:items-center">
              <h2
                className="font-sans font-bold leading-[0.9] tracking-[-0.03em]"
                style={{
                  fontSize: "clamp(4rem, 11.5vw, 12.5rem)",
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
                Code w/<br />
                Claude<br />
                June 3-4<br />
                2026
              </h2>
            </div>

            {/* Right — description + CTA, bottom-aligned */}
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

      {/* ─── Bottom strip: halftone crowd photo ─── */}
      <div className="relative h-20 sm:h-28 lg:h-32 border-t border-fg-primary/15 overflow-hidden">
        <Image
          src="/imgs/service-pnp-pan-6a28000-6a28300-6a28351r.jpg"
          alt=""
          fill
          className="object-cover object-top"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </section>
  );
}
