"use client";

import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import type { Perspective } from "@/domains/perspective/types";

/**
 * Transformation stages defined in docs/02-perspective-transformation-model.md §5
 * Total round-trip duration: ~900ms (Adjusted for smoother, deliberate pacing)
 */
export const PERSPECTIVE_TIMING = {
  stage1Activation: 0.15, // 150ms: Switch activated
  stage2Exit: 0.30,      // 300ms: Smooth exit snap
  stage3Enter: 0.45,     // 450ms: Deliberate settle entrance
  stage4Ready: 0.1,      // 100ms: Workspace ready
};

const transitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 16,
    z: -20,
    filter: "blur(4px)",
    transformPerspective: 1000,
  },
  animate: {
    opacity: 1,
    y: 0,
    z: 0,
    filter: "blur(0px)",
    transformPerspective: 1000,
    transition: {
      duration: PERSPECTIVE_TIMING.stage3Enter,
      delay: PERSPECTIVE_TIMING.stage1Activation,
      ease: [0.16, 1, 0.3, 1], // Smoother ease-out (more elegant settle)
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    z: -20,
    filter: "blur(4px)",
    transformPerspective: 1000,
    transition: {
      duration: PERSPECTIVE_TIMING.stage2Exit,
      ease: [0.32, 0, 0.67, 0], // Smoother ease-in
    },
  },
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
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
