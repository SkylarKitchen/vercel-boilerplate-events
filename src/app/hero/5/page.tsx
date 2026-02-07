import Image from "next/image";
import Button from "@/components/Button";

const words = [
  { text: "Code" },
  { text: "with" },
  { text: "Claude" },
  { text: "2026" },
];

export default function Hero5() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center bg-bg-secondary pt-16 overflow-hidden">
      {/* Low-opacity shape accents */}
      <Image
        src="/shapes/star.svg"
        alt=""
        width={200}
        height={200}
        className="absolute top-28 right-[15%] opacity-[0.03] dark:invert pointer-events-none"
      />
      <Image
        src="/shapes/carrot.svg"
        alt=""
        width={140}
        height={140}
        className="absolute bottom-24 left-[8%] opacity-[0.03] dark:invert pointer-events-none"
      />
      <Image
        src="/shapes/slash.svg"
        alt=""
        width={100}
        height={100}
        className="absolute top-1/2 left-[60%] opacity-[0.02] dark:invert pointer-events-none"
      />

      {/* Date — top right */}
      <div
        className="absolute top-24 px-site right-0"
        data-animate="hero"
        data-delay="0.5"
      >
        <p className="font-mono text-sm text-fg-secondary tracking-wide text-right">
          MAY 7, 2026
          <br />
          SAN FRANCISCO
        </p>
      </div>

      {/* Stacked typography — all words use fg-primary */}
      <div className="px-site">
        {words.map((word, i) => (
          <div key={word.text} className="overflow-hidden">
            <p
              className="font-serif font-medium leading-[0.85] tracking-tight text-fg-primary"
              style={{ fontSize: "clamp(4rem, 15vw, 14rem)" }}
              data-animate="hero"
              data-delay={String(0.1 + i * 0.12)}
            >
              {word.text}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom-left: Attribution */}
      <div
        className="absolute bottom-8 px-site left-0"
        data-animate="hero"
        data-delay="0.7"
      >
        <p className="text-label text-fg-tertiary">By Anthropic</p>
      </div>

      {/* Bottom-right: CTA */}
      <div
        className="absolute bottom-8 px-site right-0"
        data-animate="hero"
        data-delay="0.65"
      >
        <Button variant="primary" size="lg" href="#register">
          Register Now
        </Button>
      </div>
    </main>
  );
}
