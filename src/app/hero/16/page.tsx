import Image from "next/image";
import Button from "@/components/Button";

/**
 * Hero 16 — "Organic Blob"
 * Typography-forward editorial layout on warm oat background.
 * A massive organic white blob shape bleeds off the upper-right edge,
 * created with CSS border-radius morphing. Massive serif "w/ Claude"
 * headline with bullet points using brand shape icons.
 */

export default function Hero16() {
  return (
    <main className="relative min-h-screen bg-bg-secondary overflow-hidden flex flex-col">
      <h1 className="sr-only">Code with Claude 2026 — Organic Blob</h1>

      {/* Organic blob — CSS-only amoeba shape */}
      <div
        className="absolute bg-bg-primary"
        style={{
          width: "55vw",
          height: "85vh",
          top: "-10%",
          right: "-10%",
          borderRadius: "40% 30% 55% 45% / 35% 50% 40% 55%",
        }}
        aria-hidden="true"
      />

      {/* Content layer */}
      <div className="relative z-10 flex flex-col flex-1 pt-28">
        {/* Top bar — bullets, date, CTA */}
        <div
          className="px-site flex flex-col md:flex-row md:items-start md:justify-between gap-8"
          data-animate="hero"
          data-delay="0"
        >
          {/* Left: bullet points with shape icons */}
          <div className="flex flex-col gap-4">
            {[
              { icon: "/shapes/carrot.svg", text: "Meet with Engineering teams" },
              { icon: "/shapes/Vector.svg", text: "Get hands-on with product" },
              { icon: "/shapes/Node.svg", text: "Connect with other developers" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-3">
                <Image
                  src={item.icon}
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4 mt-1 shrink-0"
                  aria-hidden="true"
                />
                <p className="text-body-3 text-fg-primary font-medium max-w-[220px]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Center: date/location blocks */}
          <div className="flex flex-col gap-3 font-mono">
            <div>
              <p className="text-body-2 text-fg-primary font-medium">May 7, 2026</p>
              <p className="text-body-3 text-fg-secondary">San Francisco, CA</p>
            </div>
            <div>
              <p className="text-body-2 text-fg-primary font-medium">May 20, 2026</p>
              <p className="text-body-3 text-fg-secondary">London, UK</p>
            </div>
            <div>
              <p className="text-body-2 text-fg-primary font-medium">June 15, 2026</p>
              <p className="text-body-3 text-fg-secondary">Tokyo, JP</p>
            </div>
          </div>

          {/* Right: CTA button */}
          <div>
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

        {/* Main headline area */}
        <div className="flex-1 flex flex-col justify-center px-site py-12 md:py-0">
          <h2
            className="font-serif text-fg-primary font-medium leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(6rem, 15vw, 14rem)" }}
            data-animate="hero-heading"
          >
            w/ Claude
          </h2>
          <p
            className="font-serif text-fg-secondary mt-6 md:mt-8 max-w-2xl leading-snug"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            data-animate="hero"
            data-delay="0.25"
          >
            Join us for the first Claude Developer Conference by Anthropic.
          </p>
        </div>

        {/* Bottom accent strip */}
        <div className="h-10 bg-accent-oat" />
      </div>
    </main>
  );
}
