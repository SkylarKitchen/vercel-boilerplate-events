"use client";

import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-05-07T09:30:00-07:00").getTime();

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calcTimeLeft = (): TimeLeft => {
  const diff = Math.max(0, TARGET_DATE - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const pad = (n: number) => String(n).padStart(2, "0");

type CountdownProps = {
  variant: "stacked" | "inline";
};

export default function CountdownClient({ variant }: CountdownProps) {
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Minutes" },
    { value: time.seconds, label: "Seconds" },
  ];

  if (variant === "stacked") {
    return (
      <div className="flex flex-col gap-0">
        {units.map((unit, i) => (
          <div
            key={unit.label}
            className="flex items-baseline gap-4"
            data-animate="hero"
            data-delay={String(0.1 + i * 0.12)}
          >
            <span
              className="font-sans font-extrabold uppercase tabular-nums text-fg-primary"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 1.05 }}
            >
              {pad(unit.value)}
            </span>
            <span className="text-body-3 text-fg-quaternary uppercase tracking-[0.2em]">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // inline variant
  return (
    <div className="grid grid-cols-4 gap-6">
      {units.map((unit, i) => (
        <div
          key={unit.label}
          className="text-center"
          data-animate="hero"
          data-delay={String(0.3 + i * 0.08)}
        >
          <p className="text-h1 font-serif tabular-nums text-fg-primary">
            {pad(unit.value)}
          </p>
          <p className="text-body-3 text-fg-tertiary mt-1">{unit.label}</p>
        </div>
      ))}
    </div>
  );
}
