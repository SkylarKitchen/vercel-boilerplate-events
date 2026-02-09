import Link from "next/link";

/**
 * Hero 22 — "Magazine Cover"
 * Typography-dominant editorial layout. A massive "Code w/ Claude" serif
 * headline spans the content width. Below, a two-column layout pairs
 * the event pitch with a location/date table.
 * Global Header provided by hero/layout.tsx, scroll indicator at bottom.
 */

const events = [
  { location: "San Francisco, CA", date: "5/07" },
  { location: "London, UK", date: "5/20" },
  { location: "Tokyo, JP", date: "6/15" },
];

export default function Hero22() {
  return (
    <main className="relative min-h-screen bg-bg-primary flex flex-col pt-20">
      <h1 className="sr-only">Code with Claude 2026</h1>

      <div className="max-w-7xl mx-auto w-full flex flex-col flex-1 px-site">
        {/* ─── Massive headline ─── */}
        <div className="mt-4 lg:mt-8">
          <h2
            className="font-serif text-fg-primary leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: "clamp(5rem, 14vw, 16rem)" }}
            data-animate="hero-heading"
          >
            Code w/<br />Claude
          </h2>
        </div>

        {/* ─── Two-column info section ─── */}
        <div className="flex-1 flex flex-col justify-end pb-10 lg:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Left: pitch headline + link */}
            <div
              className="flex flex-col justify-end gap-8"
              data-animate="hero"
              data-delay="0.2"
            >
              <h3
                className="font-serif text-fg-primary text-balance leading-[1.1] tracking-[-0.01em]"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
              >
                Join us at Claude&rsquo;s
                <br />
                developer conference
              </h3>
              <Link
                href="#agenda"
                className="text-body-2 text-fg-primary underline underline-offset-4 decoration-fg-tertiary hover:decoration-fg-primary transition-colors w-fit"
              >
                Learn more about agenda and speakers
              </Link>
            </div>

            {/* Right: event table + description */}
            <div
              className="flex flex-col gap-8"
              data-animate="hero"
              data-delay="0.3"
            >
              {/* Location/date rows */}
              <div className="flex flex-col">
                {events.map((event, i) => (
                  <div
                    key={event.location}
                    className={`flex items-center justify-between py-3 ${
                      i < events.length - 1 ? "border-b border-border-tertiary" : ""
                    }`}
                  >
                    <span className="text-body-2 text-fg-primary">
                      {event.location}
                    </span>
                    <span className="text-body-2 text-fg-primary tabular-nums">
                      {event.date}
                    </span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="text-body-2 text-fg-secondary leading-relaxed max-w-md">
                Meet with our engineering team, get hands-on with product, and
                connect with other developers passionate about Claude.
              </p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-end mt-8 lg:mt-10">
            <span className="text-body-3 text-fg-tertiary">(scroll)</span>
          </div>
        </div>
      </div>
    </main>
  );
}
