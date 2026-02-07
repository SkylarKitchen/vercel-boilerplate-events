import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeAnimations from "@/components/HomeAnimations";
import SectionHeader from "@/components/SectionHeader";
import LogoWall from "@/components/LogoWall";
import TestimonialCard from "@/components/TestimonialCard";
import FAQ from "@/components/FAQ";
import StatsGrid from "@/components/StatsGrid";
import CTABanner from "@/components/CTABanner";
import VideoEmbed from "@/components/VideoEmbed";
import Timeline from "@/components/Timeline";
import Card from "@/components/Card";
import Button from "@/components/Button";
import LottieIcon from "@/components/LottieIcon";
import MorphShape from "@/components/MorphShape";

export const metadata = { title: "Components — Code with Claude 2026" };

const logos = [
  { src: "/anthropic-wordmark.svg", alt: "Anthropic" },
  { src: "/claude-spark.svg", alt: "Claude" },
  { src: "/vercel.svg", alt: "Vercel" },
  { src: "/next.svg", alt: "Next.js" },
  { src: "/globe.svg", alt: "Globe" },
  { src: "/window.svg", alt: "Window" },
];

const testimonials = [
  {
    quote:
      "Code with Claude completely changed how I think about agentic workflows. The hands-on workshops were worth the trip alone.",
    author: "Priya Sharma",
    role: "Staff Engineer",
    company: "Vercel",
  },
  {
    quote:
      "The deep dives into Claude's coding capabilities gave our team practical patterns we shipped the following week.",
    author: "Marcus Chen",
    role: "Engineering Lead",
    company: "Stripe",
  },
  {
    quote:
      "Intimate, technical, and genuinely useful. This is what developer conferences should be.",
    author: "Ava Lindgren",
    role: "Senior Developer",
    company: "Shopify",
  },
];

const faqItems = [
  {
    question: "When and where is Code with Claude 2026?",
    answer:
      "The flagship event is May 7, 2026 at SVN West in San Francisco. Additional events follow in London (May 20) and Tokyo (June 2026).",
  },
  {
    question: "Who should attend?",
    answer:
      "Code with Claude is designed for developers, engineering leads, and technical decision-makers who want hands-on experience with Claude's most powerful capabilities.",
  },
  {
    question: "Will sessions be recorded?",
    answer:
      "The SF flagship event will be livestreamed, and select sessions will be available on-demand after the event. In-person attendees get access to all workshops and demo stations.",
  },
  {
    question: "What is the cost to attend?",
    answer:
      "Registration details and pricing will be announced soon. Join the waitlist to be notified when tickets become available.",
  },
];

const stats = [
  { value: 25, suffix: "+", label: "Sessions" },
  { value: 3, label: "Cities" },
  { value: 1500, suffix: "+", label: "Developers" },
];

const scheduleItems = [
  {
    time: "8:30 AM",
    title: "Arrivals, Networking, Demos & Breakfast",
    detail: "Demos, meetings & office hours open",
  },
  { time: "9:30 AM", title: "Keynote" },
  {
    time: "11:00 AM",
    title: "Breakouts & Workshops — Round 1",
    detail: "3 concurrent sessions",
  },
  { time: "12:30 PM", title: "Lunch" },
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

const featureCards = [
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
];

const infoCards = [
  {
    title: "Code with Claude SF",
    description:
      "The flagship event featuring the full program — keynote, 25+ breakout sessions, and hands-on workshops.",
    meta: "May 7, 2026 · San Francisco · SVN West",
    tags: ["700 Attendees", "Livestream", "Flagship"],
    actionLabel: "Register for SF",
    actionHref: "#register",
  },
  {
    title: "Code with Claude EMEA",
    description:
      "Bringing the Code with Claude experience to Europe with tailored content for the EMEA developer community.",
    meta: "May 20, 2026 · London",
    tags: ["500 Attendees", "EMEA"],
    actionLabel: "Join Waitlist",
    actionHref: "#register",
  },
];

function ComponentLabel({ name }: { name: string }) {
  return (
    <div className="absolute -top-3 left-6 z-10 px-3 py-1 rounded-full bg-accent-clay text-white text-caption font-medium">
      {name}
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-bg-secondary">
      <Header />
      <HomeAnimations />

      {/* Page Title */}
      <section className="pt-page-top pb-section-sm px-site">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="font-serif text-display-2 text-fg-primary mb-4"
            data-animate="hero-heading"
          >
            Component Showcase
          </h1>
          <div data-animate="hero" data-delay="0.3">
            <p className="text-body-large-1 text-fg-tertiary">
              All reusable components in the design system, demonstrated with sample data.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Demo */}
      <section className="py-section-sm px-site bg-bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <ComponentLabel name="MorphShape + Hero" />
            <div className="relative overflow-hidden rounded-card border border-border-tertiary bg-bg-secondary p-12 lg:p-16">
              <MorphShape className="absolute right-[-10%] top-[10%] w-[40vw] max-w-[400px] opacity-[0.06] text-fg-primary pointer-events-none" />
              <div className="relative text-center max-w-2xl mx-auto">
                <h2 className="font-serif text-display-2 text-fg-primary mb-4">
                  Hero Example
                </h2>
                <p className="text-body-large-2 text-fg-tertiary mb-8">
                  A hero section with MorphShape background animation and call-to-action buttons.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button variant="primary" size="lg" iconFormat="trailing" href="#register">
                    Primary Action
                  </Button>
                  <Button variant="secondary" size="lg" iconFormat="none" href="#events">
                    Secondary Action
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SectionHeader */}
      <section className="py-section-sm px-site bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <ComponentLabel name="SectionHeader" />
            <div className="pt-6">
              <SectionHeader
                eyebrow="Left Aligned"
                title="Default Section Header"
                description="An optional description that provides additional context below the heading."
              />
              <SectionHeader
                eyebrow="Centered"
                title="Centered Section Header"
                align="center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LogoWall */}
      <section className="py-section-sm px-site bg-bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <ComponentLabel name="LogoWall" />
            <div className="pt-6">
              <SectionHeader eyebrow="Partners" title="Trusted By" />
              <LogoWall logos={logos} />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards (ResourceCard) */}
      <section className="py-section-sm px-site bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <ComponentLabel name="Card (resource)" />
            <div className="pt-6">
              <SectionHeader eyebrow="What to Expect" title="Program Highlights" />
              <div data-animate="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featureCards.map((item) => (
                  <Card
                    key={item.title}
                    variant="resource"
                    title={item.title}
                    description={item.description}
                    tag={item.tag}
                    icon={<LottieIcon src={item.lottie} />}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards (InfoCard) */}
      <section className="py-section-sm px-site bg-bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <ComponentLabel name="Card (info)" />
            <div className="pt-6">
              <SectionHeader eyebrow="Events" title="Upcoming Conferences" />
              <div data-animate="stagger" className="space-y-6">
                {infoCards.map((event) => (
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
          </div>
        </div>
      </section>

      {/* StatsGrid */}
      <section className="py-section-sm px-site bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <ComponentLabel name="StatsGrid" />
            <div className="pt-6">
              <SectionHeader eyebrow="By the Numbers" title="Conference at a Glance" />
              <StatsGrid stats={stats} />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-section-sm px-site bg-bg-primary">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <ComponentLabel name="Timeline" />
            <div className="pt-6">
              <SectionHeader
                eyebrow="San Francisco · May 7"
                title="Schedule at a Glance"
                align="center"
              />
              <Timeline items={scheduleItems} />
            </div>
          </div>
        </div>
      </section>

      {/* TestimonialCard */}
      <section className="py-section-sm px-site bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <ComponentLabel name="TestimonialCard" />
            <div className="pt-6">
              <SectionHeader eyebrow="What People Say" title="Testimonials" />
              <div data-animate="stagger" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                  <TestimonialCard
                    key={t.author}
                    quote={t.quote}
                    author={t.author}
                    role={t.role}
                    company={t.company}
                    variant="column"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-section-sm px-site bg-bg-primary">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <ComponentLabel name="FAQ" />
            <div className="pt-6">
              <SectionHeader
                eyebrow="Questions"
                title="Frequently Asked Questions"
              />
              <FAQ items={faqItems} />
            </div>
          </div>
        </div>
      </section>

      {/* CTABanner — Light */}
      <div className="relative">
        <ComponentLabel name="CTABanner (light)" />
        <CTABanner
          heading="Ready to Build with Claude?"
          description="Register now for Code with Claude 2026 and join the developer community pushing the boundaries of AI-assisted development."
          primaryAction={{ label: "Register Now", href: "#register" }}
          secondaryAction={{ label: "View Events", href: "#events" }}
          variant="light"
        />
      </div>

      {/* CTABanner — Dark */}
      <div className="relative">
        <ComponentLabel name="CTABanner (dark)" />
        <CTABanner
          heading="Don't Miss Out"
          description="Limited spots available for the SF flagship event. Secure your place today."
          primaryAction={{ label: "Register for SF", href: "#register" }}
          variant="dark"
        />
      </div>

      {/* VideoEmbed */}
      <section className="py-section-sm px-site bg-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <ComponentLabel name="VideoEmbed" />
            <div className="pt-6">
              <SectionHeader eyebrow="Watch" title="Featured Video" />
              <VideoEmbed videoId="dQw4w9WgXcQ" title="Code with Claude 2026 Preview" />
            </div>
          </div>
        </div>
      </section>

      {/* Buttons Showcase */}
      <section className="py-section-sm px-site bg-bg-primary">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <ComponentLabel name="Button" />
            <div className="pt-6">
              <SectionHeader eyebrow="Interactions" title="Button Variants" />
              <div className="space-y-8">
                {/* Variants */}
                <div>
                  <p className="text-label text-fg-quaternary mb-4">Variants</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary" size="md" iconFormat="trailing" href="#">
                      Primary
                    </Button>
                    <Button variant="secondary" size="md" iconFormat="trailing" href="#">
                      Secondary
                    </Button>
                    <Button variant="tertiary" size="md" iconFormat="none" href="#">
                      Tertiary
                    </Button>
                    <Button variant="clay" size="md" iconFormat="trailing" href="#">
                      Clay
                    </Button>
                  </div>
                </div>
                {/* Sizes */}
                <div>
                  <p className="text-label text-fg-quaternary mb-4">Sizes</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary" size="sm" iconFormat="trailing" href="#">
                      Small
                    </Button>
                    <Button variant="primary" size="md" iconFormat="trailing" href="#">
                      Medium
                    </Button>
                    <Button variant="primary" size="lg" iconFormat="trailing" href="#">
                      Large
                    </Button>
                  </div>
                </div>
                {/* Icon formats */}
                <div>
                  <p className="text-label text-fg-quaternary mb-4">Icon Formats</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="secondary" size="md" iconFormat="leading" href="#">
                      Leading
                    </Button>
                    <Button variant="secondary" size="md" iconFormat="trailing" href="#">
                      Trailing
                    </Button>
                    <Button variant="secondary" size="md" iconFormat="none" href="#">
                      No Icon
                    </Button>
                    <Button variant="secondary" size="md" iconFormat="icon-only" href="#">
                      Icon
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
