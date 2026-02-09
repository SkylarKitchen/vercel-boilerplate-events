"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/Button";
import MobileNav from "@/components/MobileNav";
import { navLinks, isActive } from "@/data/navigation";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border-tertiary bg-bg-secondary">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-site">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/claude-logo-full.svg"
            alt="Claude"
            width={130}
            height={28}
            priority
            className="dark:hidden"
          />
          <Image
            src="/claude-logo-light.svg"
            alt="Claude"
            width={130}
            height={28}
            priority
            className="hidden dark:block"
          />
        </Link>

        {/* Right-aligned navigation + CTA */}
        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm transition-colors duration-200 hover:text-fg-primary ${active ? "text-fg-primary font-medium" : "text-fg-secondary"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Button variant="primary" size="sm" iconFormat="none" href="#register" className="hidden md:inline-flex">
            Register
          </Button>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            className="inline-flex items-center justify-center w-9 h-9 rounded-[0.5em] bg-bg-tertiary text-fg-secondary hover:text-fg-primary transition-colors duration-200 cursor-pointer md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
