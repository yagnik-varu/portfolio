"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Perspective } from "@/domains/perspective/types";
import { usePerspectiveStore } from "@/domains/perspective/store-provider";
import { PERSPECTIVE_TIMING } from "./perspective-transition";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";

interface PerspectiveGaterProps {
  children: React.ReactNode;
  requiredPerspective: Perspective;
  /**
   * Rendered when the required perspective is NOT active. Use it to leave a
   * trace of what is hidden (e.g. the project-page architecture teaser) so
   * visitors know the deeper layer exists.
   */
  fallback?: React.ReactNode;
}

const enterTransition = {
  opacity: {
    duration: PERSPECTIVE_TIMING.stage3Enter,
    delay: PERSPECTIVE_TIMING.stage1Activation,
    ease: [0.16, 1, 0.3, 1] as const,
  },
  height: {
    duration: PERSPECTIVE_TIMING.stage3Enter,
    delay: PERSPECTIVE_TIMING.stage1Activation,
    ease: [0.16, 1, 0.3, 1] as const,
  },
};

const exitTransition = {
  opacity: { duration: PERSPECTIVE_TIMING.stage2Exit, ease: [0.32, 0, 0.67, 0] as const },
  height: { duration: PERSPECTIVE_TIMING.stage2Exit, ease: [0.32, 0, 0.67, 0] as const },
};

function GatedBlock({
  children,
  shouldReduceMotion,
}: {
  children: React.ReactNode;
  shouldReduceMotion: boolean;
}) {
  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0, overflow: "hidden" }}
      animate={{ opacity: 1, height: "auto", overflow: "hidden", transition: enterTransition }}
      exit={{ opacity: 0, height: 0, overflow: "hidden", transition: exitTransition }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Client-gates server-rendered children by perspective using the standard
 * progressive-reveal height/opacity animation (docs/02 §5). Server Components
 * can be passed as children (and as `fallback`), so content still renders on
 * the server; only the reveal decision happens on the client.
 */
export function PerspectiveGater({ children, requiredPerspective, fallback }: PerspectiveGaterProps) {
  const perspective = usePerspectiveStore((state) => state.perspective);
  const shouldReduceMotion = useMotionPreference();
  const isActive = perspective === requiredPerspective;

  return (
    <AnimatePresence initial={false}>
      {isActive ? (
        <GatedBlock key="gated-content" shouldReduceMotion={shouldReduceMotion}>
          {children}
        </GatedBlock>
      ) : fallback ? (
        <GatedBlock key="gated-fallback" shouldReduceMotion={shouldReduceMotion}>
          {fallback}
        </GatedBlock>
      ) : null}
    </AnimatePresence>
  );
}
