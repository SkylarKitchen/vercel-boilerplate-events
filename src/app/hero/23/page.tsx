import Image from "next/image";
import Button from "@/components/Button";

/**
 * Hero 23 — "Three-Column Editorial"
 * Information-dense layout with icon bullet points on the left,
 * large serif headline + CTAs in the center, and a location/date
 * table on the right. Below the fold: an agenda preview section.
 */

const highlights = [
  { icon: "/shapes/carrot.svg", text: "Meet with Engineering teams" },
  { icon: "/shapes/Vector.svg", text: "Get hands-on with product" },
  { icon: "/shapes/Node.svg", text: "Connect with other developers" },
];

const events = [
  { location: "San Francisco, CA", date: "5/07" },
  { location: "London, UK", date: "5/20" },
  { location: "Tokyo, JP", date: "6/15" },
];

const agendaItem = {
  icon: "/shapes/Node.svg",
  title: "Agenda item",
  details: [
    { label: "Location", value: "Embody Lab - 2nd Floor" },
    { label: "Type", value: "Lab" },
    { label: "Audience", value: "Developer" },
  ],
};

export default function Hero23() {
  return (
    <main className="bg-bg-primary pt-20">
      <h1 className="sr-only">Code with Claude 2026</h1>

      {/* ─── Hero section ─── */}
      <section className="px-site pt-10 lg:pt-16 pb-14 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-12 lg:gap-10">
          {/* Left: icon bullet points — vertically centered */}
          <div
            className="flex flex-col justify-center gap-8"
            data-animate="hero"
            data-delay="0.2"
          >
            {highlights.map((item) => (
              <div key={item.text} className="flex items-center gap-4">
                <Image
                  src={item.icon}
                  alt=""
                  width={28}
                  height={28}
                  className="w-7 h-7 shrink-0"
                  aria-hidden="true"
                />
                <p className="text-body-2 text-fg-primary">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Right area: headline above, then description + event table side by side */}
          <div className="flex flex-col gap-8">
            {/* Headline */}
            <h2
              className="font-serif text-fg-primary leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}
              data-animate="hero-heading"
            >
              Join us at Claude&rsquo;s developer conference
            </h2>

            {/* Description + CTAs  |  Event table — same row */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-12 items-start">
              <div
                className="flex flex-col gap-6"
                data-animate="hero"
                data-delay="0.15"
              >
                <p className="text-body-1 text-fg-secondary leading-relaxed max-w-lg">
                  Meet with our engineering team, get hands-on with product, and
                  connect with other developers passionate about Claude.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" size="md" href="#register" iconFormat="none">
                    Apply to attend
                  </Button>
                  <Button variant="secondary" size="md" href="#agenda" iconFormat="none">
                    Explore agenda
                  </Button>
                </div>
              </div>

              <div
                className="flex flex-col"
                data-animate="hero"
                data-delay="0.3"
              >
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
            </div>
          </div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="px-site">
        <hr className="border-border-tertiary" />
      </div>

      {/* ─── Agenda preview section ─── */}
      <section className="px-site py-16 lg:py-24" data-animate="scroll">
        <h2
          className="font-serif text-fg-primary leading-tight tracking-[-0.01em] mb-10 lg:mb-14"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          Agenda
        </h2>

        {/* Agenda card */}
        <div className="bg-bg-secondary rounded-card border border-border-tertiary p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
            {/* Left: icon + title */}
            <div className="flex items-start gap-4">
              <Image
                src={agendaItem.icon}
                alt=""
                width={32}
                height={32}
                className="w-8 h-8 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <h3 className="font-serif text-fg-primary text-h5 font-medium">
                {agendaItem.title}
              </h3>
            </div>

            {/* Right: metadata table */}
            <div className="flex flex-col">
              {agendaItem.details.map((detail, i) => (
                <div
                  key={detail.label}
                  className={`grid grid-cols-[140px_1fr] gap-4 py-3 ${
                    i < agendaItem.details.length - 1
                      ? "border-b border-border-tertiary"
                      : ""
                  }`}
                >
                  <span className="text-body-2 text-fg-secondary">
                    {detail.label}
                  </span>
                  <span className="text-body-2 text-fg-primary">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
