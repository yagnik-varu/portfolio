"use client";

import { useReducedMotion } from "framer-motion";

/**
 * A centralized wrapper around Framer Motion's useReducedMotion hook.
 * Standardizes motion accessibility checks across the application.
 * All animated components must use this hook instead of calling Framer Motion directly,
 * guaranteeing a single source of truth for reduced-motion behavior.
 * 
 * @returns {boolean} True if the user has requested reduced motion.
 */
export function useMotionPreference(): boolean {
  // framer-motion's useReducedMotion returns boolean | null on first render depending on environment.
  // We strictly coerce to boolean to prevent hydration mismatch edge cases or complicated checks in consumers.
  return Boolean(useReducedMotion());
}
