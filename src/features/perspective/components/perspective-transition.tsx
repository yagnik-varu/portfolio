"use client";

import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import type { Perspective } from "@/domains/perspective/types";

/**
 * Transformation stages defined in docs/02-perspective-transformation-model.md §5
 * Total round-trip duration: ~630ms
 */
export const PERSPECTIVE_TIMING = {
  stage1Activation: 0.1, // 100ms: Switch activated
  stage2Exit: 0.18,      // 180ms: Fast exit snap
  stage3Enter: 0.35,     // 350ms: Spring-like settle entrance
  stage4Ready: 0.1,      // 100ms: Workspace ready
};

const transitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: PERSPECTIVE_TIMING.stage3Enter,
      delay: PERSPECTIVE_TIMING.stage1Activation,
      ease: [0, 0, 0.2, 1], // Spring-like ease-out
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: "blur(6px)",
    transition: {
      duration: PERSPECTIVE_TIMING.stage2Exit,
      ease: [0.4, 0, 1, 1], // Fast ease-in
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
