import Image from "next/image";
import Button from "@/components/Button";

export default function Hero3() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left — Content side */}
      <div className="flex flex-col justify-between bg-bg-primary px-site py-10 lg:py-14">
        {/* Top: Logo + Date */}
        <div
          className="flex items-start justify-between"
          data-animate="hero"
          data-delay="0"
        >
          <p className="text-h4 font-serif italic text-fg-primary">
            Code w/ Claude
          </p>
          <p className="font-mono text-sm text-fg-secondary text-right">
            May 7, 2026
            <br />
            San Francisco, California
          </p>
        </div>

        {/* Center: Headline + body + CTA */}
        <div className="my-10 lg:my-0 max-w-xl">
          <h1
            className="font-serif text-fg-primary mb-6"
            style={{
              fontSize: "clamp(2.75rem, 5.5vw, 5.5rem)",
              lineHeight: 1.05,
            }}
            data-animate="hero-heading"
          >
            Join us at Claude&apos;s developer conference
          </h1>
          <p
            className="text-body-1 text-fg-secondary mb-8 max-w-md"
            data-animate="hero"
            data-delay="0.25"
          >
            Meet with our engineering team, get hands-on with product, and
            connect with other developers passionate about Claude.
          </p>
          <div data-animate="hero" data-delay="0.35">
            <Button variant="primary" size="md" href="#register" iconFormat="none">
              Apply to attend
            </Button>
          </div>
        </div>

        {/* Bottom: Attribution + links */}
        <div
          className="flex items-center gap-8"
          data-animate="hero"
          data-delay="0.45"
        >
          <p className="text-label text-fg-primary font-medium tracking-wide uppercase">
            By Anthropic
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#faq"
              className="text-sm text-fg-secondary underline hover:text-fg-primary transition-colors"
            >
              FAQs
            </a>
            <a
              href="#terms"
              className="text-sm text-fg-secondary underline hover:text-fg-primary transition-colors"
            >
              Terms of service
            </a>
          </div>
        </div>
      </div>

      {/* Right — Clay accent panel with shapes at full black opacity */}
      <div
        className="relative overflow-hidden bg-accent-clay min-h-[50vh] lg:min-h-0"
        data-animate="hero"
        data-delay="0.2"
      >
        {/* CWC shape — top right, bleeding off edge, full black */}
        <Image
          src="/shapes/Circle.svg"
          alt=""
          width={600}
          height={600}
          className="absolute -top-20 -right-12 w-[450px] lg:w-[600px]"
        />

        {/* Star shape — bottom right, bleeding off edge, full black */}
        <Image
          src="/shapes/Node.svg"
          alt=""
          width={550}
          height={550}
          className="absolute -bottom-20 -right-16 w-[400px] lg:w-[550px]"
        />
      </div>
    </main>
  );
}
