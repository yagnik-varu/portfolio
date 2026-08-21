"use client";

import { motion } from "framer-motion";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";

interface LayoutShiftWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A highly performant Framer Motion wrapper that smoothly animates layout shifts 
 * (like height changes from other components mounting/unmounting).
 * This replaces the complex GSAP Flip logic and prevents UI jumps.
 */
export function LayoutShiftWrapper({ children, className = "" }: LayoutShiftWrapperProps) {
  const shouldReduceMotion = useMotionPreference();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      layout
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
