import Image from "next/image";

type LogoWallProps = {
  logos: { src: string; alt: string }[];
};

export default function LogoWall({ logos }: LogoWallProps) {
  return (
    <div data-animate="scroll">
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {logos.map((logo) => (
          <Image
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            width={120}
            height={40}
            className="h-8 md:h-10 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
}
