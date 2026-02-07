"use client";

import { useState } from "react";
import Link from "next/link";
import type { Session, Track } from "@/data/sessions";

type Level = Session["level"];

function SessionCard({
  session,
  levelColors,
}: {
  session: Session;
  levelColors: Record<Level, string>;
}) {
  return (
    <Link
      href={`/sessions/${session.id}`}
      className="group block bg-bg-primary rounded-card border border-border-tertiary p-7 lg:p-8 hover:bg-bg-secondary hover:border-border-secondary transition-colors"
    >
      {/* Track pill */}
      <p className="text-caption text-fg-quaternary mb-3">{session.track}</p>

      {/* Title */}
      <h3 className="text-h5 font-serif text-fg-primary mb-2">
        {session.title}
      </h3>

      {/* Speaker */}
      <p className="text-body-3 text-fg-tertiary mb-6">
        {session.speaker.name}
        <span className="mx-1.5 text-border-primary">&middot;</span>
        {session.speaker.role}
      </p>

      {/* Bottom row: time, duration, level */}
      <div className="flex flex-wrap items-center gap-3 text-caption text-fg-quaternary">
        <span className="font-mono">{session.time}</span>
        <span className="text-border-primary">&middot;</span>
        <span>{session.duration}</span>
        <span
          className={`ml-auto inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${levelColors[session.level]}`}
        >
          {session.level}
        </span>
      </div>
    </Link>
  );
}

export default function SessionFilter({
  tracks,
  sessions,
  levelColors,
}: {
  tracks: readonly Track[];
  sessions: Session[];
  levelColors: Record<Level, string>;
}) {
  const [activeTrack, setActiveTrack] = useState<string>("All");
  const [activeLevel, setActiveLevel] = useState<string>("All");

  const filtered = sessions.filter((s) => {
    const matchesTrack = activeTrack === "All" || s.track === activeTrack;
    const matchesLevel = activeLevel === "All" || s.level === activeLevel;
    return matchesTrack && matchesLevel;
  });

  return (
    <>
      {/* Filter groups */}
      <div className="space-y-4 mb-10">
        {/* Track filter */}
        <div>
          <p className="text-label text-fg-quaternary mb-3">Track</p>
          <div className="flex flex-wrap items-center gap-3">
            {["All", ...tracks].map((track) => {
              const isActive = activeTrack === track;
              return (
                <button
                  key={track}
                  onClick={() => setActiveTrack(track)}
                  aria-pressed={isActive}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-bg-inverse text-fg-inverse"
                      : "bg-bg-tertiary text-fg-secondary border border-border-secondary hover:bg-bg-primary"
                  }`}
                >
                  {track}
                </button>
              );
            })}
          </div>
        </div>

        {/* Level filter */}
        <div>
          <p className="text-label text-fg-quaternary mb-3">Level</p>
          <div className="flex flex-wrap items-center gap-3">
            {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((level) => {
              const isActive = activeLevel === level;
              return (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  aria-pressed={isActive}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-bg-inverse text-fg-inverse"
                      : "bg-bg-tertiary text-fg-secondary border border-border-secondary hover:bg-bg-primary"
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sessions grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            levelColors={levelColors}
          />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-body-1 text-fg-tertiary">
            No sessions found for the selected filters.
          </p>
        </div>
      )}
    </>
  );
}
