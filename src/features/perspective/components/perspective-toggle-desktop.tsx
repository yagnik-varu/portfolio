"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { Perspective } from "@/domains/perspective/types";
import { KbdHint } from "@/shared/components/kbd-hint";

export interface PerspectiveToggleProps {
  perspective: Perspective;
  onChange: (perspective: Perspective) => void;
  className?: string;
}

/**
 * Desktop-specific perspective slider with spring physics.
 * Visible on md (768px) and up.
 */
export function PerspectiveToggleDesktop({
  perspective,
  onChange,
  className = "",
}: PerspectiveToggleProps) {
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    if (!sessionStorage.getItem("hasSeenPerspectiveHint")) {
      const timer = setTimeout(() => {
        setShowPulse(true);
      }, 800);
      
      const autoDismiss = setTimeout(() => {
        dismissPulse();
      }, 800 + 6000);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(autoDismiss);
      };
    }
  }, []);

  const dismissPulse = () => {
    setShowPulse(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasSeenPerspectiveHint", "true");
    }
  };

  const handleChange = (newPerspective: Perspective) => {
    if (showPulse) dismissPulse();
    else if (typeof window !== "undefined" && !sessionStorage.getItem("hasSeenPerspectiveHint")) {
      sessionStorage.setItem("hasSeenPerspectiveHint", "true");
    }
    onChange(newPerspective);
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative">
        <div
          role="group"
          aria-label="Perspective View Mode"
          className="relative flex h-9 items-center rounded-full bg-surface p-1 shadow-sm border border-border"
        >
          <button
            onClick={() => handleChange("overview")}
            aria-pressed={perspective === "overview"}
            className={`relative z-10 flex w-[110px] items-center justify-center rounded-full px-4 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              perspective === "overview" ? "text-text" : "text-muted hover:text-text"
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => handleChange("architecture")}
            aria-pressed={perspective === "architecture"}
            className={`relative z-10 flex w-[110px] items-center justify-center rounded-full px-4 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              perspective === "architecture" ? "text-text" : "text-muted hover:text-text"
            }`}
          >
            Architecture
          </button>

          {/* Spring Physics Active Pill */}
          <motion.div
            initial={false}
            animate={{
              x: perspective === "overview" ? 0 : 110,
            }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            className="absolute top-1 bottom-1 left-1 w-[110px] rounded-full bg-primary shadow-md"
          />
        </div>

        <AnimatePresence>
          {showPulse && (
            <>
              {/* Emerald Ring Pulses */}
              <motion.div
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0, 1, 0], scale: [1, 1.05, 1.1] }}
                transition={{ duration: 1.2, repeat: 1, ease: "easeOut" }}
                className="pointer-events-none absolute inset-0 rounded-full border-2 border-emerald-500/50"
              />
              
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-full mt-4 w-64 rounded-lg border border-border bg-surface p-3 text-sm shadow-xl z-50 text-text"
              >
                <div className="flex items-start gap-2">
                  <p className="flex-1 text-muted leading-relaxed">
                    This portfolio has two perspectives. Try switching.
                  </p>
                  <button 
                    onClick={dismissPulse}
                    className="text-muted hover:text-text p-1 -mt-1 -mr-1 rounded transition-colors"
                    aria-label="Dismiss tooltip"
                  >
                    ×
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden lg:flex">
        <KbdHint>Shift+P</KbdHint>
      </div>
    </div>
  );
}
