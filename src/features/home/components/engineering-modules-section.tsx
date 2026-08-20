"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { Perspective } from "@/domains/perspective/types";
import { usePerspectiveStore } from "@/domains/perspective/store";
import { Card } from "@/shared/components/card/card";
import { Badge } from "@/shared/components/badge/badge";
import { SectionHeader } from "@/shared/components/section-header/section-header";
import { engineeringModules } from "../../../../content/perspectives/engineering-modules";

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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0, 0, 0.2, 1],
      staggerChildren: 0.08,
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
  const shouldReduceMotion = useReducedMotion();

  // Explicit Perspective Visibility Rule (docs/05-system-architecture.md §14)
  // Only rendered in Architecture perspective
  if (activePerspective !== "architecture") {
    return null;
  }

  return (
    <motion.section
      aria-labelledby="engineering-modules-heading"
      variants={shouldReduceMotion ? undefined : containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col gap-6"
    >
      <SectionHeader
        id="engineering-modules-heading"
        title="Engineering Modules"
        description="Dedicated workspaces and architectural deep-dives available in Architecture Perspective."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {engineeringModules.map((module) => {
          const meta = presentationMetadata[module.key] || { category: "Module", actionText: "View →" };
          return (
            <motion.div
              key={module.key}
              variants={shouldReduceMotion ? undefined : itemVariants}
            >
              <Link
                href={module.route}
                className="block h-full focus:outline-none focus:ring-2 focus:ring-primary rounded-lg group"
              >
                <Card
                  variant="technical"
                  className="p-5 flex flex-col justify-between gap-4 h-full border-border/80 bg-surface/40 hover:bg-surface hover:border-primary/50 transition-all duration-200"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-muted group-hover:text-primary transition-colors">
                        {meta.category}
                      </span>
                      <Badge variant="architecture" className="text-[10px]">
                        Active
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold font-sans text-text group-hover:text-primary transition-colors">
                      {module.title}
                    </h3>

                    <p className="text-xs text-muted leading-relaxed font-sans">
                      {module.description}
                    </p>
                  </div>

                  <div className="pt-2 text-xs font-mono font-medium text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {meta.actionText}
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
