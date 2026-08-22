"use client";

import * as React from "react";
import Link from "next/link";
import type { Project } from "@/lib/validation/project.schema";
import type { Perspective } from "@/domains/perspective/types";
import { usePerspectiveStore } from "@/domains/perspective/store";
import { Card } from "@/shared/components/card/card";
import type { HTMLMotionProps } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/shared/components/badge/badge";
import { Button } from "@/shared/components/button/button";
import { cn } from "@/lib/utils/cn";
import { PERSPECTIVE_TIMING } from "@/features/perspective/components/perspective-transition";
import { ProjectImpactBadge } from "./project-impact-badge";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";

export interface ProjectCardProps extends HTMLMotionProps<"div"> {
  project: Project;
  perspective?: Perspective;
}

export function ProjectCardHeader({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <h3 className="text-xl font-bold tracking-tight text-text group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <Badge variant="status" className="capitalize shrink-0">
        {project.status}
      </Badge>
    </div>
  );
}

export function ProjectCardSummary({ project, className }: { project: Project; className?: string }) {
  return (
    <p className={cn("text-sm text-muted leading-relaxed line-clamp-3", className)}>
      {project.summary}
    </p>
  );
}

export function ProjectCardStack({ project, className }: { project: Project; className?: string }) {
  if (!project.stack) return null;

  // Flatten primary tech stack items for concise card display
  const techItems = [
    ...(project.stack.backend || []),
    ...(project.stack.frontend || []),
    ...(project.stack.database || []),
    ...(project.stack.infrastructure || []),
  ];

  if (techItems.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {techItems.map((tech) => (
        <Badge key={tech} variant="technology" className="text-xs">
          {tech}
        </Badge>
      ))}
    </div>
  );
}

export function ProjectArchitecturePanel({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2 p-3 bg-surface/60 border border-border/80 rounded-md font-mono text-xs", className)}>
      <div className="flex items-center justify-between text-muted">
        <span className="font-semibold uppercase tracking-wider text-[10px]">Pattern</span>
        <Badge variant="architecture" className="text-xs">
          {project.architectureType}
        </Badge>
      </div>
      <div className="flex items-center justify-between text-muted">
        <span className="font-semibold uppercase tracking-wider text-[10px]">Complexity</span>
        <Badge variant="architecture" className="text-xs capitalize">
          {project.complexity}
        </Badge>
      </div>
    </div>
  );
}

export function ProjectCardActions({ project, perspective, className }: { project: Project; perspective: Perspective; className?: string }) {
  const isArchitecture = perspective === "architecture";
  const targetHref = isArchitecture 
    ? `/projects/${project.slug}?perspective=architecture` 
    : `/projects/${project.slug}`;

  return (
    <div className={cn("flex items-center gap-3 pt-2 mt-auto", className)}>
      <Link href={targetHref} className="w-full">
        <Button 
          variant={isArchitecture ? "secondary" : "primary"} 
          size="sm" 
          className="w-full font-medium"
        >
          {isArchitecture ? "Inspect Architecture →" : "View Project"}
        </Button>
      </Link>
    </div>
  );
}

export function ProjectCard({ project, perspective: propPerspective, className, ...props }: ProjectCardProps) {
  const storePerspective = usePerspectiveStore((state) => state.perspective);
  const activePerspective = propPerspective ?? storePerspective;
  const isArchitecture = activePerspective === "architecture";
  const shouldReduceMotion = useMotionPreference();

  const targetHref = isArchitecture 
    ? `/projects/${project.slug}?perspective=architecture` 
    : `/projects/${project.slug}`;
  return (
    <motion.div
      className={cn(
        "relative p-6 sm:p-8 rounded-2xl flex flex-col justify-between gap-6 h-full transition-all duration-500 group border border-white/5 bg-surface/30 hover:bg-surface/60 hover:border-white/10 hover:shadow-2xl hover:-translate-y-1 overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Subtle top gradient accent on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex flex-col gap-4 relative z-10">
        <ProjectCardHeader project={project} />
        <ProjectCardSummary project={project} />
        <ProjectCardStack project={project} />
      </div>

      <div className="flex flex-col gap-6 mt-auto relative z-10">
        <AnimatePresence initial={false}>
          {isArchitecture && (
            <motion.div
              key="architecture-panel"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
              transition={{ 
                duration: PERSPECTIVE_TIMING.stage3Enter, 
                delay: PERSPECTIVE_TIMING.stage1Activation, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              {...(!shouldReduceMotion && {
                exit: {
                  opacity: 0,
                  height: 0,
                  transition: {
                    duration: PERSPECTIVE_TIMING.stage2Exit,
                    ease: [0.32, 0, 0.67, 0]
                  }
                }
              })}
              className="overflow-hidden"
            >
              <ProjectArchitecturePanel project={project} />
            </motion.div>
          )}
        </AnimatePresence>
        <Link href={targetHref} className="inline-block mt-4 w-fit">
          <span className="font-mono text-sm text-muted flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
            {isArchitecture ? "Inspect Architecture" : "View Project"}
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
