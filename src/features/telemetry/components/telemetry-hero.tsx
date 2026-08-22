"use client";

import * as React from "react";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";

export function TelemetryHero() {
  const shouldReduceMotion = useMotionPreference();

  return (
    <div className="flex flex-col w-full py-8 group relative z-10 max-w-4xl">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter cursor-default">
        <span 
          className={`
            inline-block bg-clip-text text-transparent 
            bg-[length:200%_auto] bg-left
            bg-gradient-to-r from-text via-text to-text
            group-hover:from-primary group-hover:via-white group-hover:to-primary
            transition-all duration-1000 ease-in-out
            ${!shouldReduceMotion ? "group-hover:bg-[position:-200%_center]" : ""}
          `}
        >
          Engineering Telemetry
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-muted mt-6 max-w-2xl">
        Live architectural metrics and open-source contribution activity.
      </p>
    </div>
  );
}
