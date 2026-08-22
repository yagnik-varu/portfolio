"use client";

import { usePetStore } from "../hooks/use-pet-store";
import { petConfig } from "../pet-config";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, memo } from "react";

export const PetSpeech = memo(function PetSpeech() {
  const message = usePetStore((s) => s.message);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${petConfig.mobileBreakpointPx}px)`);
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const transitionDuration = prefersReducedMotion ? 0 : 0.3;

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: transitionDuration }}
          className="absolute bottom-full right-0 mb-4 bg-surface border border-border px-4 py-3 rounded-2xl rounded-br-none shadow-lg z-50 pointer-events-none"
          style={{ 
            width: isMobile ? "200px" : "280px",
            whiteSpace: "normal" 
          }}
        >
          <p className="text-sm font-medium text-text leading-relaxed">
            {message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
