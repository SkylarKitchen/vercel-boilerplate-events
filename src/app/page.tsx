import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Button from "@/components/Button";
import HomeAnimations from "@/components/HomeAnimations";
import LottieIcon from "@/components/LottieIcon";
import SectionHeader from "@/components/SectionHeader";

type ScheduleItem = {
  time: string;
  title: string;
  detail?: string;
};

const events = [
  {
    title: "Code with Claude SF",
    description:
      "The flagship event featuring the full program — keynote, 25+ breakout sessions, hands-on workshops, product demo stations, office hours, and evening reception.",
    meta: "May 7, 2026 · San Francisco · SVN West",
    tags: ["700 Attendees", "Livestream", "Flagship"],
    actionLabel: "Register for SF",
    actionHref: "#register",
  },
  {
    title: "Code with Claude EMEA",
    description:
      "Bringing the Code with Claude experience to Europe. Tailored content for the EMEA developer community with regional customization.",
    meta: "May 20, 2026 · London",
    tags: ["500 Attendees", "EMEA"],
    actionLabel: "Join Waitlist",
    actionHref: "#register",
  },
  {
    title: "Code with Claude APJ",
    description:
      "Expanding to Asia-Pacific with a focused program for the APJ developer ecosystem. Regional content and local community connections.",
    meta: "June 2026 · Tokyo",
    tags: ["300 Attendees", "APJ"],
    actionLabel: "Join Waitlist",
    actionHref: "#register",
  },
];

const highlights = [
  {
    title: "Keynote & Demos",
    description:
      "Opening keynote showcasing the latest Claude capabilities, followed by live product demonstrations.",
    tag: "Main Stage",
    lottie: "/documents/Object-Megaphone.lottie",
  },
  {
    title: "Breakouts & Workshops",
    description:
      "~25 sessions across themed tracks covering agentic development, advanced coding workflows, and more.",
    tag: "Sessions",
    lottie: "/documents/Object-Books.lottie",
  },
  {
    title: "Product Experiences",
    description:
      "4–6 demo stations, office hours, and direct access to Anthropic's product and research teams.",
    tag: "Hands-On",
    lottie: "/documents/Object-Desktop.lottie",
  },
  {
    title: "Evening Reception",
    description:
      "Networking reception for all attendees plus a VIP dinner for invited guests and speakers.",
    tag: "Networking",
    lottie: "/documents/Object-Confetti.lottie",
  },
  {
    title: "Experiential Activations",
    description:
      "Custom keycaps, totes, magnets, 8-bit photo booth, poetry cameras, and more to take home.",
    tag: "Swag & Fun",
    lottie: "/documents/Hand-Shapes.lottie",
  },
  {
    title: "Livestream",
    description:
      "Can't make it in person? Watch the SF flagship event remotely with full keynote and select sessions.",
    tag: "Virtual",
    lottie: "/documents/Node-Web.lottie",
  },
];

const schedule: ScheduleItem[] = [
  {
    time: "8:30 AM",
    title: "Arrivals, Networking, Demos & Breakfast",
    detail: "Demos, meetings & office hours open",
  },
  {
    time: "9:30 AM",
    title: "Keynote",
  },
  {
    time: "11:00 AM",
    title: "Breakouts & Workshops — Round 1",
    detail: "3 concurrent sessions",
  },
  {
    time: "12:30 PM",
    title: "Lunch",
  },
  {
    time: "2:00 PM",
    title: "Breakouts & Workshops — Round 2",
    detail: "3 concurrent sessions",
  },
  {
    time: "4:00 PM",
    title: "Breakouts & Workshops — Round 3",
    detail: "3 concurrent sessions",
  },
  {
    time: "5:30 PM",
    title: "Evening Reception",
    detail: "Networking, drinks & music",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-secondary">
      <Header />

      {/* Client-side GSAP animation orchestrator */}
      <HomeAnimations />

      <main id="main">
      {/* Hero Section — Magazine Cover */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col pt-8 lg:pt-12 px-site">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EventSeries",
              name: "Code with Claude 2026",
              description:
                "Anthropic's annual developer conference featuring hands-on workshops, technical sessions, and direct access to product and research teams.",
              organizer: {
                "@type": "Organization",
                name: "Anthropic",
                url: "https://www.anthropic.com",
              },
              subEvent: [
                {
                  "@type": "Event",
                  name: "Code with Claude SF",
                  startDate: "2026-05-07",
                  eventAttendanceMode:
                    "https://schema.org/OfflineEventAttendanceMode",
                  eventStatus: "https://schema.org/EventScheduled",
                  location: {
                    "@type": "Place",
                    name: "SVN West",
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: "San Francisco",
                      addressRegion: "CA",
                      addressCountry: "US",
                    },
                  },
                },
                {
                  "@type": "Event",
                  name: "Code with Claude EMEA",
                  startDate: "2026-05-20",
                  eventAttendanceMode:
                    "https://schema.org/OfflineEventAttendanceMode",
                  eventStatus: "https://schema.org/EventScheduled",
                  location: {
                    "@type": "Place",
                    name: "London",
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: "London",
                      addressCountry: "GB",
                    },
                  },
                },
                {
                  "@type": "Event",
                  name: "Code with Claude APJ",
                  startDate: "2026-06-01",
                  eventAttendanceMode:
                    "https://schema.org/OfflineEventAttendanceMode",
                  eventStatus: "https://schema.org/EventScheduled",
                  location: {
                    "@type": "Place",
                    name: "Tokyo",
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: "Tokyo",
                      addressCountry: "JP",
                    },
                  },
                },
              ],
            }),
          }}
        />

        <div className="max-w-7xl mx-auto w-full flex flex-col flex-1">
          {/* Massive headline */}
          <h1
            className="font-serif text-fg-primary leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: "clamp(5rem, 14vw, 16rem)" }}
            data-animate="hero-heading"
          >
            Code w/<br />Claude
          </h1>

          {/* Two-column info section */}
          <div className="flex-1 flex flex-col justify-end pb-10 lg:pb-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              {/* Left: pitch headline + link */}
              <div
                className="flex flex-col justify-end gap-8"
                data-animate="hero"
                data-delay="0.2"
              >
                <h2
                  className="font-serif text-fg-primary text-balance leading-[1.1] tracking-[-0.01em]"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
                >
                  Join us at Claude&rsquo;s
                  <br />
                  developer conference
                </h2>
                <Link
                  href="#schedule"
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
                <div className="flex flex-col">
                  {[
                    { location: "San Francisco, CA", date: "5/07" },
                    { location: "London, UK", date: "5/20" },
                    { location: "Tokyo, JP", date: "6/15" },
                  ].map((event, i, arr) => (
                    <div
                      key={event.location}
                      className={`flex items-center justify-between py-3 ${
                        i < arr.length - 1 ? "border-b border-border-tertiary" : ""
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
      </section>

      {/* Events Section */}
      <section id="events" className="py-section-md px-site">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="2026 Events" title="Three Cities, One Mission" />

          <div data-animate="stagger" className="space-y-6">
            {events.map((event) => (
              <Card
                key={event.title}
                variant="info"
                title={event.title}
                description={event.description}
                meta={event.meta}
                tags={event.tags}
                actionLabel={event.actionLabel}
                actionHref={event.actionHref}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-section-md px-site bg-bg-primary">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="What to Expect" title="Program Highlights" />

          <div data-animate="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <Card
                key={item.title}
                variant="resource"
                title={item.title}
                description={item.description}
                tag={item.tag}
                icon={item.lottie ? <LottieIcon src={item.lottie} /> : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Preview */}
      <section id="schedule" className="py-section-md px-site">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <SectionHeader eyebrow="San Francisco · May 7" title="Schedule at a Glance" />
          </div>
          <div data-animate="stagger-fast" className="space-y-0">
            {schedule.map((item) => (
              <div
                key={item.time}
                className="flex items-start gap-6 py-5 border-b border-border-tertiary"
              >
                <div className="w-24 shrink-0">
                  <p className="text-body-3 font-mono text-fg-quaternary">
                    {item.time}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-h6 text-fg-primary font-medium">{item.title}</p>
                  {item.detail && (
                    <p className="text-body-3 text-fg-tertiary mt-0.5">
                      {item.detail}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div data-animate="scroll">
            <div className="text-center mt-10">
              <Button variant="secondary" size="md" iconFormat="trailing" href="/sessions">
                View Full Schedule
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About / CTA Section */}
      <section id="about" className="bg-bg-primary py-section-md px-site">
        <div className="max-w-3xl mx-auto text-center">
          <div data-animate-wrap>
            <h2 className="font-serif text-h2 text-fg-primary mb-6" data-animate="heading">
              Why Attend?
            </h2>
            <p className="text-body-large-2 text-fg-tertiary mb-8 text-pretty" data-animate="heading-body">
              Code with Claude is intentionally intimate — designed for meaningful
              connection and deep technical exploration rather than keynote-heavy
              spectacle. Choose your own path through themed tracks covering
              Claude&apos;s most powerful capabilities, from agentic development to
              advanced coding workflows.
            </p>
          </div>
          <div data-animate="stagger" className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
            <div>
              <p className="text-h2 font-serif text-fg-primary mb-2" data-countup="25" data-suffix="+">25+</p>
              <p className="text-body-3 text-fg-tertiary">Sessions</p>
            </div>
            <div>
              <p className="text-h2 font-serif text-fg-primary mb-2" data-countup="3">3</p>
              <p className="text-body-3 text-fg-tertiary">Cities</p>
            </div>
            <div>
              <p className="text-h2 font-serif text-fg-primary mb-2" data-countup="1500" data-suffix="+">1,500+</p>
              <p className="text-body-3 text-fg-tertiary">Developers</p>
            </div>
          </div>
          <div data-animate="scroll">
            <Button variant="primary" size="lg" iconFormat="trailing" href="#register">
              Register Now
            </Button>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
