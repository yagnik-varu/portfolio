"use client";

import * as React from "react";
import { useRef } from "react";
import { TextHoverFill } from "@/shared/components/motion/text-hover-fill";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";

export function ProjectsHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useMotionPreference();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || shouldReduceMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--x", `${x}px`);
    containerRef.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col gap-6 w-full py-8 group"
    >
      <div className="relative z-10 w-full max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-text relative">
          <span className="block group-hover:opacity-20 transition-opacity duration-300">
            All Projects
          </span>
          <span 
            className="absolute inset-0 block text-primary pointer-events-none transition-opacity duration-300"
            style={{
              opacity: shouldReduceMotion ? 0 : 1,
              maskImage: shouldReduceMotion ? "none" : "radial-gradient(250px circle at var(--x, -100%) var(--y, -100%), black 20%, transparent 100%)",
              WebkitMaskImage: shouldReduceMotion ? "none" : "radial-gradient(250px circle at var(--x, -100%) var(--y, -100%), black 20%, transparent 100%)"
            }}
            aria-hidden="true"
          >
            All Projects
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted mt-6 max-w-2xl">
          A complete directory of all software systems and architectures built, from full-stack platforms to module integrations.
        </p>
      </div>
    </div>
  );
}
