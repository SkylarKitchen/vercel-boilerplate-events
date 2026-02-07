import Image from "next/image";
import Button from "@/components/Button";

type SplitSectionProps = {
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  description: string;
  action?: { label: string; href: string };
  imagePosition?: "left" | "right";
};

export default function SplitSection({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  description,
  action,
  imagePosition = "left",
}: SplitSectionProps) {
  return (
    <div data-animate="scroll">
      <div className="md:grid md:grid-cols-2 gap-12 items-center">
        <div
          className={`rounded-card overflow-hidden mb-8 md:mb-0${
            imagePosition === "right" ? " md:order-last" : ""
          }`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={640}
            height={400}
            className="w-full h-auto"
          />
        </div>
        <div>
          {eyebrow && (
            <p className="text-label text-fg-quaternary mb-2">{eyebrow}</p>
          )}
          <h3 className="text-h3 font-serif text-fg-primary mb-4">{title}</h3>
          <p className="text-body-large-2 text-fg-tertiary mb-6">
            {description}
          </p>
          {action && (
            <Button
              variant="secondary"
              size="md"
              iconFormat="trailing"
              href={action.href}
            >
              {action.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
