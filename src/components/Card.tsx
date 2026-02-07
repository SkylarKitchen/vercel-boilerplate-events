import Image from "next/image";
import Button from "@/components/Button";

type ResourceCardProps = {
  variant: "resource";
  title: string;
  description?: string;
  tag?: string;
};

type FeatureCardProps = {
  variant: "feature";
  title: string;
  description?: string;
  category?: string;
  imageSrc?: string;
  imageAlt?: string;
  actionLabel?: string;
  actionHref?: string;
};

type InfoCardProps = {
  variant: "info";
  title: string;
  description?: string;
  meta?: string;
  tags?: string[];
  actionLabel?: string;
  actionHref?: string;
};

type CardProps = ResourceCardProps | FeatureCardProps | InfoCardProps;

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2.5 py-1 rounded-full bg-bg-tertiary text-caption text-fg-tertiary">
      {children}
    </span>
  );
}

function ResourceCard({ title, description, tag }: ResourceCardProps) {
  return (
    <div className="bg-bg-primary rounded-card border border-border-tertiary overflow-hidden p-7 lg:p-8 flex flex-col gap-4 h-full">
      <h3 className="text-h5 font-serif text-fg-primary">{title}</h3>
      {description && (
        <p className="text-body-3 text-fg-tertiary flex-1">{description}</p>
      )}
      {tag && (
        <p className="text-label text-fg-quaternary mt-auto pt-2">{tag}</p>
      )}
    </div>
  );
}

function FeatureCard({
  title,
  description,
  category,
  imageSrc,
  imageAlt = "",
  actionLabel,
  actionHref,
}: FeatureCardProps) {
  return (
    <div className="bg-bg-primary rounded-card border border-border-tertiary overflow-hidden md:grid md:grid-cols-2">
      {imageSrc && (
        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-8 lg:p-10 flex flex-col gap-4 justify-center">
        {category && <TagPill>{category}</TagPill>}
        <h3 className="text-h3 font-serif text-fg-primary">{title}</h3>
        {description && (
          <p className="text-body-3 text-fg-tertiary">{description}</p>
        )}
        {actionLabel && (
          <div className="pt-2">
            <Button
              variant="secondary"
              size="md"
              iconFormat="trailing"
              href={actionHref}
            >
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCard({
  title,
  description,
  tags,
  meta,
  actionLabel,
  actionHref,
}: InfoCardProps) {
  return (
    <div className="bg-bg-primary rounded-card border border-border-tertiary overflow-hidden p-8 lg:p-10 md:grid md:grid-cols-[1fr_1.5fr] md:gap-12">
      <div>
        <h3 className="text-h3 font-serif text-fg-primary">{title}</h3>
      </div>
      <div className="flex flex-col gap-4 mt-4 md:mt-0">
        {meta && (
          <p className="text-body-3 text-fg-quaternary">{meta}</p>
        )}
        {description && (
          <p className="text-body-large-2 text-fg-tertiary">{description}</p>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((t) => (
              <TagPill key={t}>{t}</TagPill>
            ))}
          </div>
        )}
        {actionLabel && (
          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              iconFormat="trailing"
              href={actionHref}
            >
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Card(props: CardProps) {
  switch (props.variant) {
    case "feature":
      return <FeatureCard {...props} />;
    case "info":
      return <InfoCard {...props} />;
    case "resource":
      return <ResourceCard {...props} />;
  }
}
