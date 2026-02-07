type FeatureListItem = {
  icon?: React.ReactNode;
  title: string;
  description: string;
};

type FeatureListProps = {
  items: FeatureListItem[];
};

export default function FeatureList({ items }: FeatureListProps) {
  return (
    <div data-animate="stagger" className="border-t border-border-tertiary">
      {items.map((item) => (
        <div
          key={item.title}
          className="py-8 border-b border-border-tertiary flex items-start gap-6"
        >
          {item.icon && (
            <div className="shrink-0 w-10 h-10 text-fg-quaternary">
              {item.icon}
            </div>
          )}
          <div>
            <h3 className="text-h5 font-serif text-fg-primary mb-2">
              {item.title}
            </h3>
            <p className="text-body-2 text-fg-tertiary">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
