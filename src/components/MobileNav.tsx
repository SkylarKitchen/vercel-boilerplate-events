"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Button from "@/components/Button";
import { navLinks, isActive } from "@/data/navigation";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const isAnimating = useRef(false);
  const pathname = usePathname();

  // Close with animation
  const animateClose = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        isAnimating.current = false;
        onClose();
      },
    });

    tl.to(panelRef.current, {
      x: "100%",
      autoAlpha: 0,
      duration: 0.3,
      ease: "power2.in",
    }).to(
      backdropRef.current,
      {
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      "<0.05"
    );
  }, [onClose]);

  // Open animation
  useEffect(() => {
    if (!open) return;

    // Set initial states
    gsap.set(backdropRef.current, { autoAlpha: 0 });
    gsap.set(panelRef.current, { x: "100%", autoAlpha: 0 });

    // Lock scroll
    document.body.style.overflow = "hidden";

    // Animate in
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        // Focus the close button after animation
        closeBtnRef.current?.focus();
      },
    });

    isAnimating.current = true;

    tl.to(backdropRef.current, {
      autoAlpha: 1,
      duration: 0.2,
      ease: "power2.out",
    }).to(
      panelRef.current,
      {
        x: "0%",
        autoAlpha: 1,
        duration: 0.4,
        ease: "power2.out",
      },
      "<0.05"
    );

    return () => {
      tl.kill();
    };
  }, [open]);

  // Escape key handler
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        animateClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, animateClose]);

  // Focus trap
  useEffect(() => {
    if (!open) return;

    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      const overlay = overlayRef.current;
      if (!overlay) return;

      const focusable = overlay.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm"
        onClick={animateClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-bg-primary border-l border-border-tertiary flex flex-col px-site py-6"
      >
        {/* Close button */}
        <div className="flex justify-end">
          <button
            ref={closeBtnRef}
            type="button"
            onClick={animateClose}
            aria-label="Close navigation"
            className="inline-flex items-center justify-center w-9 h-9 rounded-[0.5em] bg-bg-tertiary text-fg-secondary hover:text-fg-primary transition-colors duration-200 cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="mt-8 flex flex-col gap-6">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={animateClose}
                aria-current={active ? "page" : undefined}
                className={`text-lg hover:text-fg-primary transition-colors ${active ? "text-fg-primary font-medium" : "text-fg-secondary"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Register CTA */}
        <div className="mt-auto pt-8">
          <Button
            variant="primary"
            size="lg"
            iconFormat="none"
            href="#register"
            className="w-full"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
