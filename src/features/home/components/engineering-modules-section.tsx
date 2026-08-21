"use client";

import { useMotionPreference } from "@/shared/hooks/use-motion-preference";
import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import type { Perspective } from "@/domains/perspective/types";
import { usePerspectiveStore } from "@/domains/perspective/store";
import { Card } from "@/shared/components/card/card";
import { Badge } from "@/shared/components/badge/badge";
import { SectionHeader } from "@/shared/components/section-header/section-header";
import { engineeringModules } from "../../../../content/perspectives/engineering-modules";
import { PERSPECTIVE_TIMING } from "@/features/perspective/components/perspective-transition";
import { MagneticWrapper } from "@/shared/components/magnetic-wrapper";

interface EngineeringModulesSectionProps {
  perspective?: Perspective;
}

// Map presentation-only properties that don't belong in the domain content model
const presentationMetadata: Record<string, { category: string; actionText: string }> = {
  "architecture-lab": {
    category: "System Blueprint",
    actionText: "Explore Lab →",
  },
  "telemetry": {
    category: "Engineering Metrics",
    actionText: "View Telemetry →",
  },
  "learning-timeline": {
    category: "Growth Journey",
    actionText: "Inspect Journey →",
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0, height: 0, overflow: "visible" },
  visible: {
    opacity: 1,
    height: "auto",
    overflow: "visible",
    transition: {
      // Animate opacity, but height will snap instantly for Flip
      opacity: {
        duration: PERSPECTIVE_TIMING.stage3Enter,
        delay: PERSPECTIVE_TIMING.stage1Activation,
        ease: [0.16, 1, 0.3, 1],
      },
      staggerChildren: 0.08,
      delayChildren: PERSPECTIVE_TIMING.stage1Activation + 0.1,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    overflow: "visible",
    transition: {
      // Animate opacity, but height will snap instantly for Flip
      opacity: {
        duration: PERSPECTIVE_TIMING.stage2Exit,
        ease: [0.32, 0, 0.67, 0],
      },
      // Height transitions with 0 duration to collapse instantly
      height: { duration: 0 },
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0, 0, 0.2, 1] },
  },
};

export function EngineeringModulesSection({ perspective: propPerspective }: EngineeringModulesSectionProps) {
  const storePerspective = usePerspectiveStore((state) => state.perspective);
  const activePerspective = propPerspective ?? storePerspective;
  const shouldReduceMotion = useMotionPreference();

  return (
    <AnimatePresence initial={false}>
      {activePerspective === "architecture" && (
        <motion.section
          key="engineering-modules"
          aria-labelledby="engineering-modules-heading"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full flex flex-col gap-6"
        >
          <div className="border-t border-white/10 pt-8 mb-4">
            <h2 id="engineering-modules-heading" className="text-2xl font-bold text-text mb-2">
              Engineering Modules
            </h2>
            <p className="text-muted text-lg">
              Dedicated workspaces and architectural deep-dives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {engineeringModules.map((module) => {
              const meta = presentationMetadata[module.key] || { category: "Module", actionText: "View →" };
              return (
                <motion.div
                  key={module.key}
                  variants={shouldReduceMotion ? undefined : itemVariants}
                  className="h-full"
                >
                  <MagneticWrapper strength={5} className="block h-full w-full">
                    <Link
                      href={module.route}
                      className="block h-full focus:outline-none focus:ring-2 focus:ring-primary rounded-[1.5rem] group"
                    >
                      <div
                        className="py-6 flex flex-col justify-between gap-6 h-full border-t border-white/10 hover:border-text transition-colors duration-300 group"
                      >
                        
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-muted group-hover:text-text transition-colors">
                              {meta.category}
                            </span>
                            <span className="text-[10px] font-mono uppercase text-muted group-hover:text-text transition-colors">
                              Active
                            </span>
                          </div>

                          <h3 className="text-2xl font-bold font-sans text-text group-hover:text-text/80 transition-colors">
                            {module.title}
                          </h3>

                          <p className="text-base text-muted leading-relaxed font-sans">
                            {module.description}
                          </p>
                        </div>

                        <div className="pt-4 text-sm font-mono font-medium text-text flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                          {meta.actionText}
                        </div>
                      </div>
                    </Link>
                  </MagneticWrapper>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
