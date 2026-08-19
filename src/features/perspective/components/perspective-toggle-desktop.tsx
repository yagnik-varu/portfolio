"use client";

import { motion } from "framer-motion";
import type { Perspective } from "@/domains/perspective/types";

export interface PerspectiveToggleProps {
  perspective: Perspective;
  onChange: (perspective: Perspective) => void;
  className?: string;
}

/**
 * Desktop-specific perspective slider with spring physics.
 * Visible on md (768px) and up.
 */
export function PerspectiveToggleDesktop({
  perspective,
  onChange,
  className = "",
}: PerspectiveToggleProps) {
  return (
    <div
      role="group"
      aria-label="Perspective View Mode"
      className={`relative inline-flex h-9 items-center rounded-full bg-surface p-1 shadow-sm border border-border ${className}`}
    >
      <button
        onClick={() => onChange("overview")}
        aria-pressed={perspective === "overview"}
        className={`relative z-10 flex w-[110px] items-center justify-center rounded-full px-4 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          perspective === "overview" ? "text-text" : "text-muted hover:text-text"
        }`}
      >
        Overview
      </button>

      <button
        onClick={() => onChange("architecture")}
        aria-pressed={perspective === "architecture"}
        className={`relative z-10 flex w-[110px] items-center justify-center rounded-full px-4 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          perspective === "architecture" ? "text-text" : "text-muted hover:text-text"
        }`}
      >
        Architecture
      </button>

      {/* Spring Physics Active Pill */}
      <motion.div
        initial={false}
        animate={{
          x: perspective === "overview" ? 0 : 110,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        className="absolute top-1 bottom-1 left-1 w-[110px] rounded-full bg-primary shadow-md"
      />
    </div>
  );
}
