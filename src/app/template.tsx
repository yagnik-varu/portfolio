"use client";

import { motion } from "framer-motion";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";
import type { ReactNode } from "react";

interface TemplateProps {
  children: ReactNode;
}

/**
 * Route-Level Transition Wrapper
 * 
 * In Next.js App Router, layout.tsx persists across navigations, but template.tsx
 * creates a new instance (remounts) on every route change. This makes it the standard,
 * minimal-footprint location to hook page-entry animations without custom routing logic.
 */
export default function Template({ children }: TemplateProps) {
  const prefersReducedMotion = useMotionPreference();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ 
        duration: 0.3, 
        ease: [0.16, 1, 0.3, 1] // Matches the smooth ease-out of the perspective transition
      }}
    >
      {children}
    </motion.div>
  );
}
