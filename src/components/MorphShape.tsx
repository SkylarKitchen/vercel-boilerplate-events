"use client";

import { useEffect, useRef } from "react";
import { interpolate } from "flubber";
import gsap from "gsap";

const SHAPES = [
  // circle
  "M116 0C180 0 232 51.5 232 115S180 230 116 230 0 178.5 0 115 52 0 116 0z",
  // star
  "M116 0l27.6 72.4L232 85l-60 52.4 18.4 76.6L116 172l-74.4 42L60 137.4 0 85l88.4-12.6z",
  // triangle
  "M116 0L232 230H0z",
  // steps
  "M0 153h77v77H0zM77 77h78v153H77zM155 0h77v230h-77z",
  // hourglass
  "M20 0h192l-72 95v0l-24 20-24-20v0L20 0zM20 230h192l-72-95v0l-24-20-24 20v0L20 230z",
];

export default function MorphShape({ className }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current!;
    if (!path) return;

    // Respect reduced motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      path.setAttribute("d", SHAPES[0]);
      return;
    }

    let currentIndex = 0;
    let tweenRef: gsap.core.Tween | null = null;
    let timeoutId: ReturnType<typeof setTimeout>;

    function morphToNext() {
      const fromShape = SHAPES[currentIndex];
      const nextIndex = (currentIndex + 1) % SHAPES.length;
      const toShape = SHAPES[nextIndex];

      const interp = interpolate(fromShape, toShape, { maxSegmentLength: 10 });
      const proxy = { t: 0 };

      tweenRef = gsap.to(proxy, {
        t: 1,
        duration: 2,
        ease: "power1.inOut",
        onUpdate() {
          path.setAttribute("d", interp(proxy.t));
        },
        onComplete() {
          currentIndex = nextIndex;
          timeoutId = setTimeout(morphToNext, 3000);
        },
      });
    }

    // Start with first shape, then begin morphing after initial delay
    path.setAttribute("d", SHAPES[0]);
    timeoutId = setTimeout(morphToNext, 3000);

    return () => {
      tweenRef?.kill();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <svg
      viewBox="0 0 232 230"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path ref={pathRef} />
    </svg>
  );
}
