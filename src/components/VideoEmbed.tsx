"use client";

import { useState } from "react";
import Image from "next/image";

type VideoEmbedProps = {
  videoId: string;
  posterSrc?: string;
  title?: string;
};

export default function VideoEmbed({ videoId, posterSrc, title = "Video" }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const thumbnail = posterSrc || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div data-animate="scroll">
      <div className="rounded-card overflow-hidden border border-border-tertiary relative aspect-video bg-bg-tertiary">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full cursor-pointer group"
            aria-label={`Play ${title}`}
          >
            {/* Poster image */}
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-200" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-fg-primary ml-1" aria-hidden="true">
                  <path d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86A1 1 0 008 5.14z" />
                </svg>
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
