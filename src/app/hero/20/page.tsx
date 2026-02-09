import Button from "@/components/Button";

const events = [
  { date: "5/7", location: "San Francisco, CA", align: "left" as const },
  { date: "5/20", location: "London, UK", align: "right" as const },
  { date: "6/15", location: "Tokyo, JP", align: "left" as const },
];

export default function Hero20() {
  return (
    <main className="relative min-h-screen flex flex-col lg:flex-row">
      <h1 className="sr-only">Code with Claude 2026</h1>

      {/* ─── Left panel: ivory ─── */}
      <div className="relative flex flex-col justify-between bg-bg-secondary lg:w-1/2 min-h-[60vh] lg:min-h-screen px-site py-16 lg:py-20">
        {/* Heading */}
        <div className="flex-1 flex items-center">
          <h2
            className="font-serif text-fg-primary leading-[0.95] tracking-[-0.02em]"
            data-animate="hero-heading"
            style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
          >
            Code w/<br />
            <span className="inline-block ml-[0.5em]">Claude</span>
          </h2>
        </div>

        {/* Event locations */}
        <div
          className="flex flex-col gap-3 w-full max-w-xs mx-auto"
          data-animate="hero"
          data-delay="0.3"
        >
          {events.map((event) => (
            <div key={event.date} className="flex items-center gap-4">
              {event.align === "left" ? (
                <>
                  <span className="font-mono text-sm text-fg-secondary shrink-0 w-10">
                    {event.date}
                  </span>
                  <span className="flex-1 border-t border-border-tertiary" />
                  <span className="text-body-2 text-fg-primary shrink-0">
                    {event.location}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-body-2 text-fg-primary shrink-0">
                    {event.location}
                  </span>
                  <span className="flex-1 border-t border-border-tertiary" />
                  <span className="font-mono text-sm text-fg-secondary shrink-0 w-10 text-right">
                    {event.date}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── Right panel: clay ─── */}
      <div className="relative flex flex-col items-center justify-between bg-accent-clay lg:w-1/2 min-h-[40vh] lg:min-h-screen px-site py-16 lg:py-20">
        {/* Description */}
        <div
          className="flex-1 flex items-start pt-12 lg:pt-20"
          data-animate="hero"
          data-delay="0.15"
        >
          <p className="text-body-1 text-fg-primary text-center max-w-sm leading-relaxed">
            Meet with our engineering team, get hands-on with product, and
            connect with other developers passionate about Claude.
          </p>
        </div>

        {/* CTA */}
        <div data-animate="hero" data-delay="0.25">
          <Button variant="primary" size="lg" href="#register" iconFormat="none">
            Apply to attend
          </Button>
        </div>
      </div>
    </main>
  );
}
