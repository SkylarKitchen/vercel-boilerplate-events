type BreadcrumbProps = {
  items: { label: string; href?: string }[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-caption text-fg-quaternary">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="hover:text-fg-primary transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-fg-tertiary">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
