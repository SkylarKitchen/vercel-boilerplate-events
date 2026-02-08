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
      // Animate with `top` instead of transform so that
      // background-attachment:fixed still works inside the overlay
      // (CSS transforms create a new containing block that breaks fixed bg).
      // Use actual overlay height so it fully clears the viewport.
      gsap.to(overlay, {
        top: () => `-${overlay.offsetHeight}px`,
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
