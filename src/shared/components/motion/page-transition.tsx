"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useMotionPreference();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        exit={{ 
          opacity: 0, 
          y: -12,
          transition: { duration: 0.2, ease: "easeIn" }
        }}
        className="flex-1 flex flex-col w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}