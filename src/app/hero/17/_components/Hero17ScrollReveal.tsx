"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero17ScrollReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const overlay = wrapper.querySelector(".hero17-overlay") as HTMLElement;
    if (!overlay) return;

    const ctx = gsap.context(() => {
      // Scroll-driven reveal: overlay slides up to reveal fixed background
      gsap.to(overlay, {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=100%",
          scrub: 0.5,
          pin: false,
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
