type ColumnFeature = {
  icon?: React.ReactNode;
  title: string;
  description: string;
};

type ColumnFeaturesProps = {
  features: ColumnFeature[];
};

export default function ColumnFeatures({ features }: ColumnFeaturesProps) {
  return (
    <div
      data-animate="stagger"
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {features.map((feature) => (
        <div
          key={feature.title}
          className="border-l-2 border-border-tertiary pl-6"
        >
          {feature.icon && (
            <div className="mb-4 text-fg-quaternary">{feature.icon}</div>
          )}
          <h3 className="text-h5 font-serif text-fg-primary mb-3">
            {feature.title}
          </h3>
          <p className="text-body-2 text-fg-tertiary">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
