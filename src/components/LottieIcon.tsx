"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type LottieIconProps = {
  src: string;
  className?: string;
};

export default function LottieIcon({ src, className = "w-12 h-12" }: LottieIconProps) {
  return (
    <div className={className}>
      <DotLottieReact src={src} loop autoplay />
    </div>
  );
}
