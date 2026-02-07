"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Client-only GSAP animation orchestrator.
 *
 * Animation language matches the Anthropic production site:
 * - Hero heading: word-by-word reveal (SplitText), stagger 0.2 spread, 1s, power2.out
 * - Hero elements: autoAlpha fade-up (y offset + visibility)
 * - Section headers: word-by-word reveal on scroll (pure fade, no translation)
 * - Cards / stagger groups: autoAlpha + y:20, 0.75s, stagger each:0.1
 *
 * All animations use autoAlpha (combined opacity + visibility) and power2.out easing.
 */
export default function HomeAnimations() {
  useEffect(() => {
    const splits: SplitText[] = [];

    const ctx = gsap.context(() => {
      // --- HERO HEADING: Word-by-word reveal ---
      const heroHeadings = document.querySelectorAll<HTMLElement>(
        "[data-animate='hero-heading']",
      );
      heroHeadings.forEach((el) => {
        const split = new SplitText(el, { type: "words" });
        splits.push(split);
        gsap.set(split.words, { autoAlpha: 0 });
        gsap.to(split.words, {
          autoAlpha: 1,
          duration: 1,
          ease: "power2.out",
          stagger: { amount: 0.2 },
        });
      });

      // --- HERO ELEMENTS: Fade up on page load ---
      const heroEls = document.querySelectorAll<HTMLElement>(
        "[data-animate='hero']",
      );
      heroEls.forEach((el) => {
        const delay = parseFloat(el.dataset.delay ?? "0");
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.75, ease: "power2.out", delay },
        );
      });

      // --- SECTION HEADERS: Word-by-word reveal on scroll ---
      const sectionHeadings = document.querySelectorAll<HTMLElement>(
        "[data-animate='heading']",
      );
      sectionHeadings.forEach((el) => {
        const split = new SplitText(el, { type: "words" });
        splits.push(split);

        // Find sibling CTA/body text if present
        const cta = el.parentElement?.querySelector<HTMLElement>(
          "[data-animate='heading-body']",
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el.closest("[data-animate-wrap]") ?? el,
            start: "top bottom",
            end: "top 80%",
            once: true,
          },
        });

        // Words: pure fade, no translation
        tl.fromTo(
          split.words,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 1,
            ease: "power2.out",
            stagger: { amount: 0.2 },
          },
          0,
        );

        // CTA/body text: subtle slide up + fade
        if (cta) {
          tl.fromTo(
            cta,
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.75, ease: "power2.out" },
            0.15,
          );
        }
      });

      // --- SCROLL INTO VIEW: Single element fade up ---
      const scrollEls = document.querySelectorAll<HTMLElement>(
        "[data-animate='scroll']",
      );
      scrollEls.forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "top 70%",
              once: true,
            },
          },
        );
      });

      // --- STAGGER: Card groups cascade in ---
      const staggerEls = document.querySelectorAll<HTMLElement>(
        "[data-animate='stagger']",
      );
      staggerEls.forEach((el) => {
        const children = el.children;
        if (children.length === 0) return;
        gsap.fromTo(
          children,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            stagger: { each: 0.1 },
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "top 70%",
              once: true,
            },
          },
        );
      });

      // --- STAGGER FAST: Tighter stagger for schedule rows ---
      const staggerFastEls = document.querySelectorAll<HTMLElement>(
        "[data-animate='stagger-fast']",
      );
      staggerFastEls.forEach((el) => {
        const children = el.children;
        if (children.length === 0) return;
        gsap.fromTo(
          children,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            stagger: { each: 0.06 },
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "top 70%",
              once: true,
            },
          },
        );
      });

      // --- COUNT UP: Animated number counters ---
      const countEls = document.querySelectorAll<HTMLElement>(
        "[data-countup]",
      );
      countEls.forEach((el) => {
        const end = parseInt(el.dataset.countup ?? "0", 10);
        const suffix = el.dataset.suffix ?? "";
        const proxy = { value: 0 };

        gsap.to(proxy, {
          value: end,
          duration: 2,
          ease: "power2.out",
          snap: { value: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate() {
            el.textContent = proxy.value.toLocaleString() + suffix;
          },
        });
      });
    });

    return () => {
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  return null;
}
