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
import { gsap } from "@/lib/motion/gsap-config";
import { useGSAP } from "@gsap/react";
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
  
  const cardRef = React.useRef<HTMLDivElement>(null);
  const xTo = React.useRef<gsap.QuickToFunc | null>(null);
  const yTo = React.useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    if (shouldReduceMotion || !cardRef.current) return;
    // Apply perspective to the parent to make the 3D rotation visible.
    // Setting transformPerspective on the element itself allows its children/rotation to be drawn in 3D space.
    gsap.set(cardRef.current, { transformPerspective: 1000 });
    xTo.current = gsap.quickTo(cardRef.current, "rotateY", { duration: 0.5, ease: "power3.out" });
    yTo.current = gsap.quickTo(cardRef.current, "rotateX", { duration: 0.5, ease: "power3.out" });
  }, [shouldReduceMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    // Skip on touch devices where hover states get stuck
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const yPct = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    xTo.current?.(xPct * 3);
    yTo.current?.(-yPct * 3); // Invert Y so card tilts toward cursor
    
    // Call any passed onMouseMove
    props.onMouseMove?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!shouldReduceMotion) {
      xTo.current?.(0);
      yTo.current?.(0);
    }
    props.onMouseLeave?.(e);
  };

  const targetHref = isArchitecture 
    ? `/projects/${project.slug}?perspective=architecture` 
    : `/projects/${project.slug}`;

  return (
    <Card
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variant={isArchitecture ? "technical" : "elevated"}
      className={cn(
        "relative p-6 flex flex-col justify-between gap-5 h-full transition-colors duration-200 group hover:border-primary/50 overflow-hidden",
        isArchitecture && "border-primary/30 shadow-md",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-4 relative z-10">
        <ProjectCardHeader project={project} />
        <ProjectCardSummary project={project} />
        <ProjectCardStack project={project} />
      </div>

      <div className="flex flex-col gap-4 mt-auto relative z-10">
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
        <ProjectCardActions project={project} perspective={activePerspective} />
      </div>

      {/* Progressive Hover Reveal Panel */}
      <div className="absolute inset-x-0 bottom-0 p-6 bg-surface/95 backdrop-blur-sm border-t border-border translate-y-[110%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 flex flex-col gap-3 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Impact & Outcomes</p>
        <ProjectImpactBadge project={project} />
        <Link 
          href={targetHref}
          className="text-xs font-medium text-primary hover:underline mt-1 inline-flex items-center gap-1"
        >
          View Case Study <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </Card>
  );
}
