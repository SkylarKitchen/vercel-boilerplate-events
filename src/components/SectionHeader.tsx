type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-12${align === "center" ? " text-center" : ""}`}
      data-animate-wrap
    >
      <p
        className="text-label text-fg-quaternary mb-2"
        data-animate="heading-body"
      >
        {eyebrow}
      </p>
      <h2
        className="text-h2 font-serif text-fg-primary"
        data-animate="heading"
      >
        {title}
      </h2>
      {description && (
        <p
          className="text-body-large-2 text-fg-tertiary mt-4"
          data-animate="heading-body"
        >
          {description}
        </p>
      )}
    </div>
  );
}
