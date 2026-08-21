"use client";

import React from "react";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";

interface TextHoverFillProps {
  children: string;
  className?: string;
}

/**
 * A highly premium hover effect:
 * The text sits as a solid color by default.
 * On hover, it smoothly transitions into a transparent outline,
 * while a solid primary color sweeps across it from left to right.
 */
export function TextHoverFill({ children, className = "" }: TextHoverFillProps) {
  const shouldReduceMotion = useMotionPreference();

  if (shouldReduceMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span 
      className={`group relative inline-block cursor-default ${className}`}
    >
      {/* Base layer: Solid text normally, becomes an outline on hover */}
      <span 
        className="relative z-10 transition-all duration-300 group-hover:text-transparent group-hover:[-webkit-text-stroke:1px_var(--color-border)]"
      >
        {children}
      </span>
      
      {/* Fill layer: Sweeps solid primary color from left to right using clip-path for safe wrapping */}
      <span 
        className="absolute inset-0 z-20 text-primary transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}
