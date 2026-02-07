import Button from "@/components/Button";

type CTABannerProps = {
  heading: string;
  description?: string;
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  variant?: "light" | "dark";
};

export default function CTABanner({
  heading,
  description,
  primaryAction,
  secondaryAction,
  variant = "light",
}: CTABannerProps) {
  const isLight = variant !== "dark";

  return (
    <section className={isLight ? "bg-bg-primary" : "bg-bg-inverse"}>
      <div className="py-section-md px-site">
        <div className="max-w-3xl mx-auto text-center">
          <div data-animate-wrap>
            <h2
              className={`text-h2 font-serif mb-6 ${isLight ? "text-fg-primary" : "text-fg-inverse"}`}
              data-animate="heading"
            >
              {heading}
            </h2>
            {description && (
              <p
                className={`text-body-large-2 mb-8 ${isLight ? "text-fg-tertiary" : "text-fg-inverse/70"}`}
                data-animate="heading-body"
              >
                {description}
              </p>
            )}
          </div>
          <div
            data-animate="scroll"
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button
              variant={isLight ? "primary" : "clay"}
              size="lg"
              iconFormat="trailing"
              href={primaryAction.href}
            >
              {primaryAction.label}
            </Button>
            {secondaryAction && (
              <Button
                variant={isLight ? "secondary" : "tertiary"}
                size="lg"
                iconFormat="none"
                href={secondaryAction.href}
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
