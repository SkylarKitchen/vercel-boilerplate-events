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
import FeatureList from "@/components/FeatureList";
import ColumnFeatures from "@/components/ColumnFeatures";
import SplitSection from "@/components/SplitSection";
import CardLink from "@/components/CardLink";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = { title: "Components — Code with Claude 2026" };

function ShowcaseLabel({ name }: { name: string }) {
  return (
    <div className="mb-6">
      <span className="inline-block px-3 py-1 rounded-full bg-accent-clay text-white text-caption font-medium">
        {name}
      </span>
    </div>
  );
}

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
      "Claude Code transformed our development workflow. We ship features 3x faster now.",
    author: "Sarah Chen",
    role: "Lead Engineer",
    company: "TechCorp",
  },
  {
    quote:
      "The agentic capabilities are unlike anything I've used before. It actually understands our codebase.",
    author: "Marcus Rivera",
    role: "CTO",
    company: "StartupAI",
  },
  {
    quote:
      "Best developer conference I've attended. The workshops were incredibly hands-on.",
    author: "Priya Patel",
    role: "Senior Developer",
    company: "DataFlow",
  },
];

const faqItems = [
  {
    question: "What is Code with Claude?",
    answer:
      "Code with Claude is Anthropic's annual developer conference featuring hands-on workshops, technical sessions, and direct access to our product and research teams. The 2026 edition spans three cities worldwide.",
  },
  {
    question: "Who should attend?",
    answer:
      "The event is designed for developers, engineers, and technical decision-makers who want hands-on experience with Claude's most powerful capabilities, from agentic development to advanced coding workflows.",
  },
  {
    question: "Will sessions be recorded?",
    answer:
      "Yes, the SF flagship event will be livestreamed and select sessions will be available on-demand after the event. In-person attendees get access to all workshops and demo stations.",
  },
  {
    question: "How do I register?",
    answer:
      "Registration is now open for the SF event. London and Tokyo events will open registration soon. Join the waitlist to be notified when tickets become available.",
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
      "4\u20136 demo stations, office hours, and direct access to Anthropic\u2019s product and research teams.",
    tag: "Hands-On",
    lottie: "/documents/Object-Desktop.lottie",
  },
];

const infoCards = [
  {
    title: "Code with Claude SF",
    description:
      "The flagship event featuring the full program \u2014 keynote, 25+ breakout sessions, and hands-on workshops.",
    meta: "May 7, 2026 \u00b7 San Francisco \u00b7 SVN West",
    tags: ["700 Attendees", "Livestream", "Flagship"],
    actionLabel: "Register for SF",
    actionHref: "#register",
  },
  {
    title: "Code with Claude EMEA",
    description:
      "Bringing the Code with Claude experience to Europe with tailored content for the EMEA developer community.",
    meta: "May 20, 2026 \u00b7 London",
    tags: ["500 Attendees", "EMEA"],
    actionLabel: "Join Waitlist",
    actionHref: "#register",
  },
];

const featureListItems = [
  {
    icon: <LottieIcon src="/documents/Object-Desktop.lottie" />,
    title: "Build together in real time",
    description:
      "Claude builds on your ideas, expands on your logic, and simplifies complexity one step at a time.",
  },
  {
    icon: <LottieIcon src="/documents/Node-Web.lottie" />,
    title: "Works where you work",
    description:
      "Lives right inside your terminal — no context switching. Integrates with VS Code and JetBrains IDEs.",
  },
  {
    icon: <LottieIcon src="/documents/Hand-Shapes.lottie" />,
    title: "You're in control",
    description:
      "Never modifies your files without explicit approval. Adapts to your coding standards and patterns.",
  },
];

const columnFeatureItems = [
  {
    icon: <LottieIcon src="/documents/Object-Megaphone.lottie" />,
    title: "Intelligence for complex workflows",
    description:
      "Enhanced performance for development workflows, from code review to architecture decisions. Claude understands context and automates complex tasks while maintaining accuracy.",
  },
  {
    icon: <LottieIcon src="/documents/Object-Books.lottie" />,
    title: "Built with safety at its core",
    description:
      "Designed with safety and responsible deployment as foundational principles. Claude provides transparent reasoning you can trust in high-stakes decisions.",
  },
  {
    icon: <LottieIcon src="/documents/Object-Confetti.lottie" />,
    title: "Secure, compliant, and accessible",
    description:
      "Deploy using the security frameworks your team already relies on. Access advanced AI capabilities without compromising compliance requirements.",
  },
];

const cardLinkItems = [
  { title: "See how other companies are building AI agents with Claude", category: "Customer stories", href: "#" },
  { title: "Building effective agents", category: "Engineering at Anthropic", href: "#" },
  { title: "Get started with our API", category: "Developer docs", href: "#" },
];

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Events", href: "#events" },
  { label: "San Francisco" },
];

const buttonVariants = ["primary", "secondary", "tertiary", "clay"] as const;
const buttonSizes = ["sm", "md", "lg"] as const;

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-bg-secondary">
      <Header />
      <HomeAnimations />

      {/* 1. Hero Demo */}
      <section className="pt-page-top pb-section-sm px-site bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <ShowcaseLabel name="SectionHeader" />
          <div className="relative overflow-hidden rounded-card border border-border-tertiary bg-bg-primary p-12 lg:p-16">
            <div className="relative">
              <SectionHeader
                eyebrow="Component Showcase"
                title="Reusable Section Patterns"
                description="Every component in the design system, demonstrated with realistic sample data and alternating section backgrounds."
                align="center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SectionHeader */}
      <section className="py-section-md px-site bg-bg-primary">
        <div className="max-w-7xl mx-auto">
          <ShowcaseLabel name="SectionHeader" />
          <SectionHeader
            eyebrow="Left Aligned"
            title="Default Section Header"
            description="An optional description that provides additional context below the heading."
          />
          <div className="mt-16">
            <SectionHeader
              eyebrow="Centered"
              title="Centered Section Header"
              align="center"
            />
          </div>
        </div>
      </section>

      {/* 3. Logo Wall */}
      <section className="py-section-md px-site bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <ShowcaseLabel name="LogoWall" />
          <SectionHeader eyebrow="Partners" title="Trusted By" />
          <LogoWall logos={logos} />
        </div>
      </section>

      {/* 4. Feature Cards (ResourceCard) */}
      <section className="py-section-md px-site bg-bg-primary">
        <div className="max-w-7xl mx-auto">
          <ShowcaseLabel name="Card variant=&quot;resource&quot;" />
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
      </section>

      {/* 5. Info Cards (InfoCard) */}
      <section className="py-section-md px-site bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <ShowcaseLabel name="Card variant=&quot;info&quot;" />
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
      </section>

      {/* 6. Stats */}
      <section className="py-section-md px-site bg-bg-primary">
        <div className="max-w-7xl mx-auto">
          <ShowcaseLabel name="StatsGrid" />
          <SectionHeader eyebrow="By the Numbers" title="Conference at a Glance" />
          <StatsGrid stats={stats} />
        </div>
      </section>

      {/* 7. Timeline */}
      <section className="py-section-md px-site bg-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <ShowcaseLabel name="Timeline" />
          <SectionHeader
            eyebrow="San Francisco · May 7"
            title="Schedule at a Glance"
            align="center"
          />
          <Timeline items={scheduleItems} />
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="py-section-md px-site bg-bg-primary">
        <div className="max-w-7xl mx-auto">
          <ShowcaseLabel name="TestimonialCard" />
          <SectionHeader eyebrow="What People Say" title="Testimonials" />

          {/* Featured row testimonial */}
          <div data-animate="scroll" className="mb-8">
            <TestimonialCard
              quote={testimonials[0].quote}
              author={testimonials[0].author}
              role={testimonials[0].role}
              company={testimonials[0].company}
              variant="row"
            />
          </div>

          {/* Column grid */}
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
      </section>

      {/* 9. FAQ */}
      <section className="py-section-md px-site bg-bg-secondary">
        <div className="max-w-3xl mx-auto">
          <ShowcaseLabel name="FAQ" />
          <SectionHeader
            eyebrow="Questions"
            title="Frequently Asked Questions"
          />
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* 10. CTA Banner — Light */}
      <section className="bg-bg-primary">
        <div className="max-w-7xl mx-auto px-site pt-section-md">
          <ShowcaseLabel name="CTABanner variant=&quot;light&quot;" />
        </div>
        <CTABanner
          heading="Ready to Build?"
          description="Join thousands of developers building the future with Claude. Register for Code with Claude 2026 today."
          primaryAction={{ label: "Register Now", href: "#register" }}
          secondaryAction={{ label: "Learn More", href: "#about" }}
          variant="light"
        />
      </section>

      {/* 10b. CTA Banner — Dark */}
      <section>
        <div className="max-w-7xl mx-auto px-site pt-8">
          <ShowcaseLabel name="CTABanner variant=&quot;dark&quot;" />
        </div>
        <CTABanner
          heading="Register for Code with Claude"
          description="Limited spots available for the SF flagship event. Secure your place today."
          primaryAction={{ label: "Register Now", href: "#register" }}
          variant="dark"
        />
      </section>

      {/* 11. Video Embed */}
      <section className="py-section-md px-site bg-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <ShowcaseLabel name="VideoEmbed" />
          <SectionHeader eyebrow="Watch" title="Conference Highlights" />
          <VideoEmbed videoId="dQw4w9WgXcQ" title="Conference Highlights" />
        </div>
      </section>

      {/* 12. Breadcrumb */}
      <section className="py-section-md px-site bg-bg-primary">
        <div className="max-w-7xl mx-auto">
          <ShowcaseLabel name="Breadcrumb" />
          <SectionHeader eyebrow="Navigation" title="Breadcrumb Trail" />
          <div className="space-y-6">
            <Breadcrumb items={breadcrumbItems} />
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Components" }]} />
          </div>
        </div>
      </section>

      {/* 13. Feature List */}
      <section className="py-section-md px-site bg-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <ShowcaseLabel name="FeatureList" />
          <SectionHeader eyebrow="Capabilities" title="What Claude Code Can Do" />
          <FeatureList items={featureListItems} />
        </div>
      </section>

      {/* 14. Column Features */}
      <section className="py-section-md px-site bg-bg-primary">
        <div className="max-w-7xl mx-auto">
          <ShowcaseLabel name="ColumnFeatures" />
          <SectionHeader eyebrow="Why Attend" title="Why Teams Choose Code with Claude" />
          <ColumnFeatures features={columnFeatureItems} />
        </div>
      </section>

      {/* 15. Split Section */}
      <section className="py-section-md px-site bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <ShowcaseLabel name="SplitSection" />
          <SectionHeader eyebrow="Layout" title="Split Content Sections" />
          <div className="space-y-16">
            <SplitSection
              imageSrc="/placeholder-event.svg"
              imageAlt="Collaborate with Claude on coding tasks"
              eyebrow="Claude Code"
              title="Collaborate with Claude on coding tasks"
              description="Developers interact with Claude directly from their terminal — delegating tasks from code migrations to bug fixes."
              action={{ label: "Learn more", href: "#" }}
            />
            <SplitSection
              imageSrc="/placeholder-event.svg"
              imageAlt="Our commitment to responsible AI"
              eyebrow="Responsible AI"
              title="Our commitment to responsible AI"
              description="We develop Claude with powerful safeguards to ensure it remains a beneficial tool for developers, teams, and organizations."
              action={{ label: "Read more", href: "#" }}
              imagePosition="right"
            />
          </div>
        </div>
      </section>

      {/* 16. Card Links */}
      <section className="py-section-md px-site bg-bg-primary">
        <div className="max-w-7xl mx-auto">
          <ShowcaseLabel name="CardLink" />
          <SectionHeader eyebrow="Resources" title="Explore More" />
          <div data-animate="stagger" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cardLinkItems.map((item) => (
              <CardLink
                key={item.title}
                title={item.title}
                category={item.category}
                href={item.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 17. Buttons */}
      <section className="py-section-md px-site bg-bg-primary">
        <div className="max-w-4xl mx-auto">
          <ShowcaseLabel name="Button" />
          <SectionHeader eyebrow="Interactions" title="Button Variants & Sizes" />
          <div className="space-y-10">
            {/* All variants at md size */}
            <div>
              <p className="text-label text-fg-quaternary mb-4">Variants</p>
              <div className="flex flex-wrap items-center gap-3">
                {buttonVariants.map((variant) => (
                  <Button key={variant} variant={variant} size="md" iconFormat="trailing" href="#">
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            {/* All sizes at primary variant */}
            <div>
              <p className="text-label text-fg-quaternary mb-4">Sizes</p>
              <div className="flex flex-wrap items-center gap-3">
                {buttonSizes.map((size) => (
                  <Button key={size} variant="primary" size={size} iconFormat="trailing" href="#">
                    {size.toUpperCase()}
                  </Button>
                ))}
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
                  Go
                </Button>
              </div>
            </div>
            {/* Full grid: variants x sizes */}
            <div>
              <p className="text-label text-fg-quaternary mb-4">Full Grid</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {buttonVariants.map((variant) =>
                  buttonSizes.map((size) => (
                    <div key={`${variant}-${size}`} className="flex items-center gap-3">
                      <Button variant={variant} size={size} iconFormat="trailing" href="#">
                        {variant} {size}
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
