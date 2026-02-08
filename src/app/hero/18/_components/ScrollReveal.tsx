"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const overlay = wrapper.querySelector(".hero18-overlay") as HTMLElement;
    if (!overlay) return;

    const ctx = gsap.context(() => {
      // Animate `top` not `transform` — transforms create a new
      // containing block that breaks background-attachment:fixed
      // on the knockout text inside the overlay.
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
