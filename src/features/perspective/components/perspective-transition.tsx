"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import type { Perspective } from "@/domains/perspective/types";

/**
 * Transformation stages defined in docs/02-perspective-transformation-model.md §5
 * Total duration: 600-900ms
 */
export const PERSPECTIVE_TIMING = {
  stage1Activation: 0.1, // 100ms: Switch activated
  stage2Layout: 0.25, // 250ms: Layout adjustments
  stage3Expansion: 0.25, // 250ms: Information expansion
  stage4Ready: 0.15, // 150ms: Workspace ready
};

interface PerspectiveTransitionProps {
  children: ReactNode;
  perspective: Perspective;
}

/**
 * A reusable animation wrapper that orchestrates the perspective switch.
 * If prefers-reduced-motion is enabled, the state change applies instantly.
 */
export function PerspectiveTransition({
  children,
  perspective,
}: PerspectiveTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  // Instant transition if reduced motion is requested
  // Also acts as a fallback ensuring state applies regardless of animation status
  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={perspective}
        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
        transition={{
          duration: PERSPECTIVE_TIMING.stage3Expansion,
          delay: PERSPECTIVE_TIMING.stage1Activation, // Begin after initial switch
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
