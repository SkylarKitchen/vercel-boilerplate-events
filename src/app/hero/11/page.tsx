import Image from "next/image";
import Button from "@/components/Button";

/**
 * Hero 11 — "Fig Poster"
 * Full-bleed fig background with a massive rotated "CODE" as a typographic
 * backdrop. Ivory content centered on top. Triangle shapes as decorative
 * accents. Bold, graphic poster aesthetic.
 */

export default function Hero11() {
  return (
    <main className="relative min-h-screen bg-accent-fig overflow-hidden">
      <h1 className="sr-only">Code with Claude 2026 — Fig Poster</h1>

      {/* Giant rotated backdrop text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <p
          className="font-serif font-medium text-bg-inverse/[0.07] whitespace-nowrap"
          style={{
            fontSize: "clamp(18rem, 45vw, 42rem)",
            lineHeight: 1,
            transform: "translateY(-5%)",
          }}
        >
          CODE
        </p>
      </div>

      {/* Triangle accents */}
      <Image
        src="/shapes/Triangle.svg"
        alt=""
        width={200}
        height={200}
        className="absolute top-[8%] left-[5%] w-[12vw] max-w-[200px] opacity-80 pointer-events-none select-none"
        aria-hidden="true"
      />
      <Image
        src="/shapes/Triangle.svg"
        alt=""
        width={160}
        height={160}
        className="absolute bottom-[10%] right-[7%] w-[10vw] max-w-[160px] opacity-80 pointer-events-none select-none"
        aria-hidden="true"
      />
      <Image
        src="/shapes/Triangle.svg"
        alt=""
        width={80}
        height={80}
        className="absolute top-[45%] right-[18%] w-[5vw] max-w-[80px] opacity-50 pointer-events-none select-none"
        aria-hidden="true"
      />

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col px-site">
        {/* Top bar */}
        <div
          className="flex items-start justify-between pt-28 pb-6"
          data-animate="hero"
          data-delay="0.1"
        >
          <p className="text-h4 font-serif italic text-bg-inverse">
            Code w/ Claude
          </p>
          <p className="font-mono text-sm text-bg-inverse/80 text-right">
            May 7, 2026
            <br />
            San Francisco, CA
          </p>
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p
            className="text-label text-bg-inverse/60 mb-5 tracking-[0.3em]"
            data-animate="hero"
            data-delay="0.2"
          >
            Developer Conference
          </p>
          <h2
            className="font-serif text-bg-inverse font-medium max-w-3xl"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", lineHeight: 1.05 }}
            data-animate="hero-heading"
          >
            The first Claude developer conference
          </h2>
          <p
            className="text-body-large-2 text-bg-inverse/70 mt-6 max-w-lg"
            data-animate="hero"
            data-delay="0.4"
          >
            Keynotes, hands-on workshops, and deep technical sessions on
            building with Claude.
          </p>
          <div
            className="mt-8 flex items-center justify-center gap-3"
            data-animate="hero"
            data-delay="0.5"
          >
            <Button
              variant="primary"
              size="lg"
              href="#register"
              iconFormat="none"
              className="!bg-bg-secondary !text-fg-primary hover:!shadow-[0_0_0_2px_var(--color-bg-secondary)]"
            >
              Apply to attend
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="#schedule"
              iconFormat="none"
            >
              View schedule
            </Button>
          </div>
        </div>

        {/* Bottom attribution */}
        <div
          className="flex items-end justify-between pb-8"
          data-animate="hero"
          data-delay="0.6"
        >
          <p className="text-label text-bg-inverse/60">By Anthropic</p>
          <p className="font-mono text-sm text-bg-inverse/50">
            In person & virtual
          </p>
        </div>
      </div>
    </main>
  );
}
