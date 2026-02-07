"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroGradient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const tween = gsap.to(ref.current, {
      scale: 1.1,
      opacity: 0.7,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.4,
        scale: 0.9,
        background:
          "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(217,119,87,0.15) 0%, transparent 70%)",
      }}
    />
  );
}
