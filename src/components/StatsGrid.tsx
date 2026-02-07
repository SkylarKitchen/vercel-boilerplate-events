type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

type StatsGridProps = {
  stats: Stat[];
};

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div
      data-animate="stagger"
      className="grid grid-cols-1 sm:grid-cols-3 gap-8"
    >
      {stats.map((stat) => (
        <div key={stat.label}>
          <p
            className="text-h2 font-serif text-fg-primary mb-2"
            data-countup={stat.value}
            data-suffix={stat.suffix}
          >
            {stat.value.toLocaleString()}
            {stat.suffix || ""}
          </p>
          <p className="text-body-3 text-fg-tertiary">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
