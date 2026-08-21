"use client";

import { useMotionPreference } from "@/shared/hooks/use-motion-preference";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';

interface RotatingStatProps {
  summary: string;
  highlights?: string[];
}

export function RotatingStat({ summary, highlights = [] }: RotatingStatProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useMotionPreference();

  useEffect(() => {
    if (highlights.length === 0 || shouldReduceMotion) return;

    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % highlights.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [highlights.length, isPaused, shouldReduceMotion]);

  if (highlights.length === 0 || shouldReduceMotion) {
    return <p className="text-lg text-muted max-w-2xl leading-relaxed">{summary}</p>;
  }

  return (
    <div
      className="relative flex items-center h-[28px] overflow-visible"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      tabIndex={0}
      aria-label="Highlights"
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute text-lg text-muted max-w-2xl leading-relaxed whitespace-nowrap"
        >
          {highlights[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
