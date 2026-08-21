"use client";

import * as React from "react";
import type { Perspective } from "@/domains/perspective/types";
import { usePerspectiveStore } from "@/domains/perspective/store";

interface PerspectiveGaterProps {
  children: React.ReactNode;
  requiredPerspective: Perspective;
}

import { AnimatePresence, motion } from "framer-motion";
import { PERSPECTIVE_TIMING } from "./perspective-transition";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";

/**
 * A Client Component that conditionally renders its children based on the current perspective.
 * This utilizes the standardized progressive reveal height animation synchronized with
 * the global perspective timing (Phase 4), ensuring elements gated by perspective enter
 * and exit at the exact same pace as the rest of the UI.
 */
export function PerspectiveGater({ children, requiredPerspective }: PerspectiveGaterProps) {
  const perspective = usePerspectiveStore((state) => state.perspective);
  const shouldReduceMotion = useMotionPreference();
  const isActive = perspective === requiredPerspective;

  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          key="perspective-gater-content"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, overflow: "hidden" }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto", overflow: "hidden" }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, overflow: "hidden" }}
          transition={{
            opacity: { duration: PERSPECTIVE_TIMING.stage3Enter, delay: PERSPECTIVE_TIMING.stage1Activation, ease: [0.16, 1, 0.3, 1] },
            height: { duration: PERSPECTIVE_TIMING.stage3Enter, delay: PERSPECTIVE_TIMING.stage1Activation, ease: [0.16, 1, 0.3, 1] },
          }}
          // We override exit transition specifically for the exit state
          // to match the faster exit timing defined in Phase 4.
          {...(!shouldReduceMotion && {
            exit: {
              opacity: 0,
              height: 0,
              overflow: "hidden",
              transition: {
                opacity: { duration: PERSPECTIVE_TIMING.stage2Exit, ease: [0.32, 0, 0.67, 0] },
                height: { duration: PERSPECTIVE_TIMING.stage2Exit, ease: [0.32, 0, 0.67, 0] }
              }
            }
          })}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
