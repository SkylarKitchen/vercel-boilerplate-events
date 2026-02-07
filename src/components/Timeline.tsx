type TimelineItem = {
  time: string;
  title: string;
  detail?: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

export default function Timeline({ items }: TimelineProps) {
  return (
    <div data-animate="stagger-fast" className="space-y-0">
      {items.map((item) => (
        <div
          key={item.time}
          className="flex items-start gap-6 py-5 border-b border-border-tertiary"
        >
          <div className="w-24 shrink-0">
            <p className="text-body-3 font-mono text-fg-quaternary">
              {item.time}
            </p>
          </div>
          <div className="flex-1">
            <p className="text-h6 text-fg-primary font-medium">{item.title}</p>
            {item.detail && (
              <p className="text-body-3 text-fg-tertiary mt-0.5">
                {item.detail}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
