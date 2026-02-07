type TestimonialCardProps = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  logoSrc?: string;
  variant?: "row" | "column";
};

export default function TestimonialCard({
  quote,
  author,
  role,
  company,
  logoSrc,
  variant = "row",
}: TestimonialCardProps) {
  if (variant === "column") {
    return (
      <div className="bg-bg-primary rounded-card border border-border-tertiary p-7 lg:p-8 flex flex-col gap-4 h-full">
        <blockquote className="text-body-2 text-fg-secondary italic flex-1">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="mt-auto pt-2">
          <p className="text-body-3 text-fg-primary font-medium">{author}</p>
          <p className="text-caption text-fg-quaternary">
            {role}
            {company ? ` at ${company}` : ""}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-primary rounded-card border border-border-tertiary p-8 lg:p-10 md:grid md:grid-cols-[auto_1fr] md:gap-8 md:items-start">
      {logoSrc && (
        <div className="mb-4 md:mb-0">
          <img
            src={logoSrc}
            alt={company || ""}
            className="h-8 grayscale opacity-60"
          />
        </div>
      )}
      <div>
        <blockquote className="text-body-large-2 text-fg-secondary italic">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <p className="text-body-3 text-fg-quaternary mt-4">
          {author}, {role}
          {company ? ` at ${company}` : ""}
        </p>
      </div>
    </div>
  );
}
