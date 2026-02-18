"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";

const TOTAL_HEROES = 23;

type Direction = "up" | "down" | "left" | "right";

const btn =
  "flex items-center justify-center size-8 border-[1.333px] border-fg-primary text-fg-primary text-base leading-6 cursor-pointer transition-colors hover:bg-fg-primary hover:text-bg-secondary";

export default function DPad() {
  const pathname = usePathname();
  const router = useRouter();

  const match = pathname.match(/^\/hero\/(\d+)$/);
  const currentHero = match ? parseInt(match[1], 10) : null;

  const navigate = useCallback(
    (direction: Direction) => {
      if (currentHero === null) return;
      switch (direction) {
        case "left":
          if (currentHero > 1) router.push(`/hero/${currentHero - 1}`);
          break;
        case "right":
          if (currentHero < TOTAL_HEROES)
            router.push(`/hero/${currentHero + 1}`);
          break;
        case "up":
          router.push("/hero");
          break;
        case "down":
          window.scrollBy({
            top: window.innerHeight * 0.8,
            behavior: "smooth",
          });
          break;
      }
    },
    [currentHero, router],
  );

  useEffect(() => {
    if (currentHero === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      )
        return;

      const { key, code } = e;
      let dir: Direction | null = null;

      if (key === "ArrowLeft" || code === "KeyA") dir = "left";
      else if (key === "ArrowRight" || code === "KeyD") dir = "right";
      else if (key === "ArrowUp" || code === "KeyW") dir = "up";
      else if (key === "ArrowDown" || code === "KeyS") dir = "down";

      if (dir) {
        e.preventDefault();
        navigate(dir);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentHero, navigate]);

  if (currentHero === null) return null;

  const canGoLeft = currentHero > 1;
  const canGoRight = currentHero < TOTAL_HEROES;

  return (
    <nav
      className="fixed bottom-8 right-8 z-50 select-none"
      aria-label="Hero navigation"
    >
      <div
        className="grid grid-cols-[32px_32px_32px] grid-rows-[32px_32px_32px]"
      >
        {/* Row 1: empty · Up · empty */}
        <div />
        <button
          onClick={() => navigate("up")}
          className={`${btn} rounded-tl-lg rounded-tr-lg`}
          aria-label="Back to hero index"
        >
          ↑
        </button>
        <div />

        {/* Row 2: Left · Center · Right */}
        <button
          onClick={() => navigate("left")}
          disabled={!canGoLeft}
          className={`${btn} rounded-tl-lg rounded-bl-lg disabled:opacity-25 disabled:pointer-events-none`}
          aria-label="Previous hero"
        >
          ←
        </button>
        <div className="flex items-center justify-center size-8">
          <div className="size-[13.333px] rounded-full border-[1.333px] border-fg-primary" />
        </div>
        <button
          onClick={() => navigate("right")}
          disabled={!canGoRight}
          className={`${btn} rounded-tr-lg rounded-br-lg disabled:opacity-25 disabled:pointer-events-none`}
          aria-label="Next hero"
        >
          →
        </button>

        {/* Row 3: empty · Down · empty */}
        <div />
        <button
          onClick={() => navigate("down")}
          className={`${btn} rounded-bl-lg rounded-br-lg`}
          aria-label="Scroll down"
        >
          ↓
        </button>
        <div />
      </div>

      {/* Hero counter */}
      <p className="text-center text-fg-tertiary mt-2 font-mono text-xs tabular-nums">
        {currentHero}/{TOTAL_HEROES}
      </p>
    </nav>
  );
}
