"use client";

import { useLayoutEffect, useRef } from "react";
import { usePerspectiveStore } from "@/domains/perspective/store";
import { animatePerspectiveLayout } from "@/lib/motion/perspective-flip";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";

export function PerspectiveFlipProvider({ children }: { children: React.ReactNode }) {
  const perspective = usePerspectiveStore((state) => state.perspective);
  const shouldReduceMotion = useMotionPreference();
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    // We use requestAnimationFrame to ensure React has fully committed the layout
    // changes to the DOM before Flip calculates the final positions.
    const raf = requestAnimationFrame(() => {
      animatePerspectiveLayout(perspective === "architecture", shouldReduceMotion);
    });
    
    return () => cancelAnimationFrame(raf);
  }, [perspective, shouldReduceMotion]);

  return <>{children}</>;
}
