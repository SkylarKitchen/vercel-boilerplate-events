import Image from "next/image";
import Button from "@/components/Button";

const words = [
  { text: "Code", accent: false },
  { text: "with", accent: false },
  { text: "Claude", accent: true },
  { text: "2026", accent: false },
];

export default function Hero5() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center bg-bg-secondary pt-16 overflow-hidden max-w-[120rem] mx-auto">
      {/* Low-opacity shape accents */}
      <Image
        src="/shapes/Node.svg"
        alt=""
        width={200}
        height={200}
        className="absolute top-28 right-[15%] opacity-[0.03] brightness-0 invert pointer-events-none"
      />
      <Image
        src="/shapes/carrot.svg"
        alt=""
        width={140}
        height={140}
        className="absolute bottom-24 left-[8%] opacity-[0.03] brightness-0 invert pointer-events-none"
      />
      <Image
        src="/shapes/Vector.svg"
        alt=""
        width={100}
        height={100}
        className="absolute top-1/2 left-[60%] opacity-[0.02] brightness-0 invert pointer-events-none"
      />

      {/* Top bar: event name left, date right */}
      <div
        className="flex items-start justify-between px-site mb-8"
        data-animate="hero"
        data-delay="0.5"
      >
        <p className="font-mono text-sm text-fg-secondary tracking-wide">
          CODE W/ CLAUDE
        </p>
        <p className="font-mono text-sm text-fg-secondary tracking-wide text-right">
          MAY 7, 2026
          <br />
          SAN FRANCISCO
        </p>
      </div>

      {/* Stacked typography — "Claude" uses accent-clay, others use fg-primary */}
      <h1 className="px-site">
        {words.map((word, i) => (
          <span key={word.text} className="block overflow-hidden">
            <span
              className={`block font-serif font-medium leading-[0.85] tracking-tight ${
                word.accent ? "text-accent-clay" : "text-fg-primary"
              }`}
              style={{ fontSize: "clamp(4rem, 15vw, 14rem)" }}
              data-animate="hero"
              data-delay={String(0.1 + i * 0.12)}
            >
              {word.text}
            </span>
          </span>
        ))}
      </h1>

      {/* Body text */}
      <p
        className="text-body-1 text-fg-secondary max-w-md px-site mt-6"
        data-animate="hero"
        data-delay="0.6"
      >
        The first Claude Developer Conference by Anthropic. Keynotes, workshops,
        and deep technical sessions.
      </p>

      {/* Bottom bar: attribution left, CTA right */}
      <div className="flex items-center justify-between px-site mt-10">
        <div data-animate="hero" data-delay="0.7">
          <p className="text-label text-fg-tertiary">By Anthropic</p>
        </div>
        <div data-animate="hero" data-delay="0.65">
          <Button variant="primary" size="lg" href="#register">
            Register Now
          </Button>
        </div>
      </div>
    </main>
  );
}
