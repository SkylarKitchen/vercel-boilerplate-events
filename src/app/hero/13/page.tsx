import Image from "next/image";
import Button from "@/components/Button";

/**
 * Hero 13 — "Ticket Stub"
 * The hero is styled like a physical conference ticket/badge.
 * Warm oat background with a centered white "ticket" card that has
 * a dashed perforation line. Hourglass shapes as accents.
 * Warm, tangible, intimate feel — like you're holding the ticket.
 */

export default function Hero13() {
  return (
    <main className="relative min-h-screen bg-accent-oat overflow-hidden">
      <h1 className="sr-only">Code with Claude 2026 — Your Ticket</h1>

      {/* Hourglass accents */}
      <Image
        src="/shapes/Hourglass.svg"
        alt=""
        width={180}
        height={180}
        className="absolute top-[12%] left-[6%] w-[10vw] max-w-[180px] opacity-[0.08] pointer-events-none select-none"
        aria-hidden="true"
      />
      <Image
        src="/shapes/Hourglass.svg"
        alt=""
        width={140}
        height={140}
        className="absolute bottom-[8%] right-[8%] w-[8vw] max-w-[140px] opacity-[0.08] pointer-events-none select-none"
        aria-hidden="true"
      />

      {/* Content layer */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-site py-20">
        {/* Top bar */}
        <div
          className="absolute top-0 left-0 right-0 pt-28 px-site flex items-start justify-between"
          data-animate="hero"
          data-delay="0"
        >
          <p className="text-h5 font-serif italic text-fg-primary">
            Code w/ Claude
          </p>
          <p className="font-mono text-sm text-fg-secondary text-right">
            2026
          </p>
        </div>

        {/* Ticket card */}
        <div
          className="w-full max-w-2xl bg-bg-primary rounded-card shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden"
          data-animate="hero"
          data-delay="0.15"
        >
          {/* Ticket top section */}
          <div className="px-8 pt-10 pb-8 sm:px-12 sm:pt-12">
            <p
              className="text-label text-accent-clay mb-4 tracking-[0.25em]"
              data-animate="hero"
              data-delay="0.25"
            >
              Admit one
            </p>
            <h2
              className="font-serif text-fg-primary font-medium"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
              }}
              data-animate="hero-heading"
            >
              Code with Claude
            </h2>
            <p
              className="text-body-1 text-fg-secondary mt-4 max-w-md"
              data-animate="hero"
              data-delay="0.35"
            >
              The first Claude Developer Conference by Anthropic. Keynotes,
              workshops, and deep technical sessions.
            </p>
          </div>

          {/* Perforation line — dashed border with notch illusion */}
          <div className="relative px-4">
            <div className="border-t-2 border-dashed border-border-secondary" />
            {/* Left notch */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent-oat" />
            {/* Right notch */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent-oat" />
          </div>

          {/* Ticket bottom section — details */}
          <div className="px-8 pt-6 pb-8 sm:px-12 sm:pb-10">
            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-6"
              data-animate="hero"
              data-delay="0.45"
            >
              <div>
                <p className="font-mono text-xs text-fg-quaternary uppercase tracking-wider">
                  Date
                </p>
                <p className="text-body-2 text-fg-primary mt-1 font-medium">
                  May 7, 2026
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-fg-quaternary uppercase tracking-wider">
                  Venue
                </p>
                <p className="text-body-2 text-fg-primary mt-1 font-medium">
                  SVN West
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-fg-quaternary uppercase tracking-wider">
                  Location
                </p>
                <p className="text-body-2 text-fg-primary mt-1 font-medium">
                  San Francisco, CA
                </p>
              </div>
            </div>

            <div
              className="mt-8 flex items-center gap-3"
              data-animate="hero"
              data-delay="0.55"
            >
              <Button
                variant="clay"
                size="lg"
                href="#register"
                iconFormat="none"
              >
                Claim your ticket
              </Button>
              <Button
                variant="tertiary"
                size="lg"
                href="#schedule"
                iconFormat="none"
              >
                See schedule
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom attribution */}
        <div
          className="absolute bottom-0 left-0 right-0 px-site pb-8 flex items-end justify-between"
          data-animate="hero"
          data-delay="0.6"
        >
          <p className="text-label text-fg-tertiary">By Anthropic</p>
          <p className="font-mono text-sm text-fg-tertiary/60">
            In person & virtual
          </p>
        </div>
      </div>
    </main>
  );
}
