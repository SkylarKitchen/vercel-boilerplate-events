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
    const bgLayer = document.querySelector(".hero18-bg") as HTMLElement;

    if (!overlay) return;

    const ctx = gsap.context(() => {
      // Curtain reveal: animate `top` not `transform` so that
      // background-attachment:fixed still works inside the overlay.
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

      // Subtle parallax on the background image — slow upward
      // drift as user scrolls, creating depth.
      if (bgLayer) {
        gsap.to(bgLayer, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "bottom top",
            scrub: 0.3,
          },
        });
      }
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
