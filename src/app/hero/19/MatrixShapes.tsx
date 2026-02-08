"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SHAPE_SRCS = [
  "/shapes/star.svg",
  "/shapes/carrot.svg",
  "/shapes/carrot-alt.svg",
  "/shapes/grid.svg",
  "/shapes/hourglass.svg",
  "/shapes/cwc.svg",
  "/shapes/circle.svg",
  "/shapes/slash.svg",
  "/shapes/triangle.svg",
  "/shapes/steps.svg",
];

/** How many shapes are alive at any given time */
const POOL_SIZE = 18;
/** Seconds between spawning a new shape */
const SPAWN_INTERVAL = 0.4;

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export default function MatrixShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      let spawnCount = 0;

      const spawnShape = () => {
        if (spawnCount >= POOL_SIZE) return;

        const img = document.createElement("img");
        img.src = SHAPE_SRCS[Math.floor(Math.random() * SHAPE_SRCS.length)];
        img.alt = "";
        const size = randomBetween(16, 36);
        img.width = size;
        img.height = size;
        Object.assign(img.style, {
          position: "absolute",
          top: `${randomBetween(5, 90)}%`,
          left: `${randomBetween(3, 97)}%`,
          opacity: "0",
          transform: `rotate(${randomBetween(0, 360)}deg)`,
        });
        container.appendChild(img);
        spawnCount++;

        const lifespan = randomBetween(2, 4.5);
        const peakOpacity = randomBetween(0.04, 0.1);

        gsap.timeline({
          onComplete: () => {
            img.remove();
            spawnCount--;
          },
        })
          .to(img, {
            opacity: peakOpacity,
            duration: lifespan * 0.3,
            ease: "power2.out",
          })
          .to(img, {
            opacity: 0,
            y: randomBetween(10, 30),
            duration: lifespan * 0.7,
            ease: "power1.in",
          });
      };

      // Initial burst — stagger a handful immediately
      for (let i = 0; i < 8; i++) {
        gsap.delayedCall(i * 0.15, spawnShape);
      }

      // Continuous spawning
      const interval = setInterval(spawnShape, SPAWN_INTERVAL * 1000);

      return () => clearInterval(interval);
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    />
  );
}
