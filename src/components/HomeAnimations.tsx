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
 *
 * All animated elements are pre-hidden via CSS (visibility:hidden in globals.css).
 * Animations wait for document.fonts.ready (capped at 300ms) before running
 * SplitText, ensuring word measurements use final font metrics.
 */
export default function HomeAnimations() {
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      // Make all hidden animated elements visible without animation
      document
        .querySelectorAll<HTMLElement>("[data-animate]")
        .forEach((el) => {
          gsap.set(el, { autoAlpha: 1, y: 0 });
          if (
            el.dataset.animate === "stagger" ||
            el.dataset.animate === "stagger-fast"
          ) {
            gsap.set(el.children, { autoAlpha: 1, y: 0 });
          }
        });
      document
        .querySelectorAll<HTMLElement>("[data-countup]")
        .forEach((el) => {
          const end = parseInt(el.dataset.countup ?? "0", 10);
          const suffix = el.dataset.suffix ?? "";
          el.textContent = end.toLocaleString() + suffix;
        });
      return; // Skip all animation setup
    }

    const splits: SplitText[] = [];
    let ctx: gsap.Context | undefined;
    let aborted = false;

    // Wait for fonts before running SplitText so word measurements
    // use final font metrics — prevents reflow jank from display:swap.
    // Cap at 300ms so animation never stalls on slow font loads.
    Promise.race([
      document.fonts.ready,
      new Promise<void>((r) => setTimeout(r, 300)),
    ]).then(() => {
      // Guard against React Strict Mode double-mount: if cleanup ran
      // before this promise resolved, skip animation setup entirely.
      if (aborted) return;

      ctx = gsap.context(() => {
        // --- HERO HEADING: Word-by-word reveal ---
        document
          .querySelectorAll<HTMLElement>("[data-animate='hero-heading']")
          .forEach((el) => {
            const split = new SplitText(el, { type: "words" });
            splits.push(split);
            // Hide words BEFORE making container visible to prevent flash
            gsap.set(split.words, { autoAlpha: 0 });
            gsap.set(el, { visibility: "visible" });
            gsap.to(split.words, {
              autoAlpha: 1,
              duration: 1,
              ease: "power2.out",
              stagger: { amount: 0.2 },
              force3D: true,
            });
          });

        // --- HERO ELEMENTS: Fade up on page load ---
        document
          .querySelectorAll<HTMLElement>("[data-animate='hero']")
          .forEach((el) => {
            const delay = parseFloat(el.dataset.delay ?? "0");
            gsap.fromTo(
              el,
              { autoAlpha: 0, y: 20 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.75,
                ease: "power2.out",
                delay,
              },
            );
          });

        // --- SECTION HEADERS: Word-by-word reveal on scroll ---
        document
          .querySelectorAll<HTMLElement>("[data-animate='heading']")
          .forEach((el) => {
            const split = new SplitText(el, { type: "words" });
            splits.push(split);
            // Pre-hide words, then show container
            gsap.set(split.words, { autoAlpha: 0 });
            gsap.set(el, { visibility: "visible" });

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
            tl.to(
              split.words,
              {
                autoAlpha: 1,
                duration: 1,
                ease: "power2.out",
                stagger: { amount: 0.2 },
                force3D: true,
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
        document
          .querySelectorAll<HTMLElement>("[data-animate='scroll']")
          .forEach((el) => {
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
        document
          .querySelectorAll<HTMLElement>("[data-animate='stagger']")
          .forEach((el) => {
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
        document
          .querySelectorAll<HTMLElement>("[data-animate='stagger-fast']")
          .forEach((el) => {
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
        document
          .querySelectorAll<HTMLElement>("[data-countup]")
          .forEach((el) => {
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
      }); // end gsap.context
    }); // end fonts.ready

    return () => {
      aborted = true;
      splits.forEach((s) => s.revert());
      ctx?.revert();
    };
  }, []);

  return null;
}
