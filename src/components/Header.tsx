import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "Sessions", href: "/sessions" },
  { label: "Schedule", href: "#schedule" },
  { label: "Locations", href: "#locations" },
  { label: "About", href: "#about" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border-tertiary bg-bg-primary">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-site">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/claude-logo-full.svg"
            alt="Claude"
            width={130}
            height={28}
            priority
          />
        </Link>

        {/* Right-aligned navigation + CTA */}
        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-fg-secondary transition-colors duration-200 hover:text-fg-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <Button variant="primary" size="sm" iconFormat="none" href="#register">
            Register
          </Button>
        </div>
      </div>
    </header>
  );
}
