"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePerspectiveStore } from "@/domains/perspective/store";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";

export function BackgroundEffects() {
  const { perspective } = usePerspectiveStore();
  const shouldReduceMotion = useMotionPreference();

  return (
    <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden">
      <AnimatePresence mode="wait">
        {perspective === "overview" ? (
          <OverviewBackground key="overview" shouldReduceMotion={shouldReduceMotion} />
        ) : (
          <ArchitectureBackground key="architecture" shouldReduceMotion={shouldReduceMotion} />
        )}
      </AnimatePresence>
    </div>
  );
}

function OverviewBackground({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  // Concept: "The Horizon"
  // A single, massive, elegant glow at the bottom of the screen (like a digital sunrise)
  // Represents a broad, high-level overview. Extremely simple and clean.
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <motion.div
        animate={shouldReduceMotion ? undefined : { opacity: [0.15, 0.3, 0.15], scaleY: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-30%] left-[-20%] right-[-20%] h-[60%] bg-primary/10 blur-[120px] rounded-[100%]"
      />
    </motion.div>
  );
}

function ArchitectureBackground({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  // Stark tech grid with a subtle scanning line
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="absolute inset-0 pointer-events-none"
    >
      {/* Grid pattern using CSS gradient */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-primary) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      />
      
      {!shouldReduceMotion && (
        <motion.div
          initial={{ top: "-10%" }}
          animate={{ top: "110%" }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-0 right-0 h-[1px] bg-primary/10"
        />
      )}
    </motion.div>
  );
}
