type CardLinkProps = {
  title: string;
  category?: string;
  categoryIcon?: React.ReactNode;
  href: string;
};

export default function CardLink({
  title,
  category,
  categoryIcon,
  href,
}: CardLinkProps) {
  return (
    <a
      href={href}
      className="group relative block rounded-card border border-border-tertiary p-8 hover:-translate-y-1 transition-transform duration-200 bg-bg-primary"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="absolute top-6 right-6 text-fg-quaternary transition-colors duration-200 group-hover:text-fg-primary"
      >
        <path
          d="M4.667 11.333 11.333 4.667M11.333 4.667H5.333M11.333 4.667v6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3 className="text-h5 font-serif text-fg-primary mb-8 pr-8">{title}</h3>
      {category && (
        <div className="flex items-center gap-2 text-caption text-fg-quaternary">
          {categoryIcon}
          <span>{category}</span>
        </div>
      )}
    </a>
  );
}
