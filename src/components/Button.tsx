import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "clay";
type ButtonSize = "sm" | "md" | "lg";
type IconFormat = "trailing" | "leading" | "none" | "icon-only";

type SharedButtonProps = {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconFormat?: IconFormat;
  className?: string;
};

type LinkButtonProps = SharedButtonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type NativeButtonProps = SharedButtonProps & {
  href?: never;
  target?: never;
  rel?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  disabled?: boolean;
};

type ButtonProps = LinkButtonProps | NativeButtonProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-bg-inverse text-fg-inverse",
    "hover:shadow-[0_0_0_2px_var(--color-bg-inverse)]",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color-mix(in_srgb,var(--color-bg-inverse)_50%,transparent)]",
  ].join(" "),
  secondary: [
    "bg-bg-tertiary text-fg-secondary border border-border-secondary",
    "hover:border-border-primary",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color-mix(in_srgb,var(--color-fg-secondary)_50%,transparent)]",
  ].join(" "),
  tertiary: [
    "bg-bg-tertiary text-fg-tertiary",
    "hover:shadow-[0_0_0_2px_var(--color-border-primary)]",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color-mix(in_srgb,var(--color-fg-tertiary)_50%,transparent)]",
  ].join(" "),
  clay: [
    "bg-accent-clay-interactive text-white",
    "hover:shadow-[0_0_0_2px_var(--color-accent-clay-interactive)]",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color-mix(in_srgb,var(--color-accent-clay-interactive)_50%,transparent)]",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-[2.25rem] text-body-3 py-2 px-3 gap-1.5",
  md: "min-h-[2.5rem] text-sm py-2 px-4 gap-2",
  lg: "min-h-[2.75rem] text-base py-2.5 px-5 gap-2",
};

const Arrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      d="M3.333 8h9.334M8.667 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Button({
  children,
  variant = "primary",
  size = "md",
  iconFormat = "trailing",
  href,
  target,
  rel,
  onClick,
  className = "",
  type = "button",
  disabled,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-[0.5em] font-medium transition-all duration-200 outline-none whitespace-nowrap cursor-pointer";
  const disabledStyles = disabled ? "opacity-50 pointer-events-none" : "";
  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`.trim();

  const content = (
    <>
      {iconFormat === "leading" && <Arrow />}
      {iconFormat !== "icon-only" && children}
      {iconFormat === "trailing" && <Arrow />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={styles} target={target} rel={rel}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles}>
      {content}
    </button>
  );
}
