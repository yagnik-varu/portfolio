"use client";

import { useMotionPreference } from "@/shared/hooks/use-motion-preference";
import { motion, type Variants } from 'framer-motion';
import type { Perspective } from "@/domains/perspective/types";
import { usePerspectiveStore } from "@/domains/perspective/store-provider";
import { profile } from "../../../../content/profile/profile";
import { PerspectiveTransition } from "@/features/perspective/components/perspective-transition";
import { Button, buttonVariants } from "@/shared/components/button/button";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { RotatingStat } from "./rotating-stat";
import { StaggeredSection, StaggeredItem } from "./staggered-section";
import { useRef } from "react";
import { MagneticWrapper } from "@/shared/components/magnetic-wrapper";
import { TextHoverFill } from "@/shared/components/motion/text-hover-fill";

// Navigation CTAs are real links (<a>), styled with the shared button classes.
// Wrapping a <button> in <Link legacyBehavior> produced invalid <a><button>
// nesting and is deprecated in Next 16. MagneticWrapper still supplies the
// pull; the lift mirrors Button's hover spring and is skipped for users who
// prefer reduced motion.
const heroPrimaryLinkClass = cn(
  buttonVariants({ variant: "primary", size: "lg" }),
  "w-full sm:w-auto h-12 sm:h-16 px-6 sm:px-10 text-base sm:text-lg rounded-none bg-text text-background hover:bg-text/90",
  "motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-1 motion-safe:active:scale-[0.98]"
);

// Secondary (perspective) CTA: same responsive sizing as the primary link.
const heroSecondaryButtonClass =
  "w-full sm:w-auto h-12 sm:h-16 px-6 sm:px-10 text-base sm:text-lg rounded-none border-text text-text hover:bg-surface";

// Phones: buttons stack full-width. sm+: side by side, as before.
const heroCtaRowClass =
  "flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:pt-4";

interface HeroSectionProps {
  perspective?: Perspective;
  onPerspectiveChange?: (p: Perspective) => void;
}

// Badge stagger variants (architecture mode only)
const badgeContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const badgeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
  },
};

export function HeroSection({
  perspective: propPerspective,
  onPerspectiveChange: propOnPerspectiveChange,
}: HeroSectionProps = {}) {
  const storePerspective = usePerspectiveStore((state) => state.perspective);
  const storeSetPerspective = usePerspectiveStore((state) => state.setPerspective);

  const perspective = propPerspective ?? storePerspective;
  const onPerspectiveChange =
    propOnPerspectiveChange ??
    ((p: Perspective) => storeSetPerspective(p, "hero_cta"));

  const shouldReduceMotion = useMotionPreference();
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const overlayH1Ref = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--x", `${x}px`);
    containerRef.current.style.setProperty("--y", `${y}px`);
  };

  // Fallback entrance for text
  const heroTextVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <StaggeredSection className="relative w-full pt-2 pb-8 md:pt-8 md:pb-16 flex flex-col gap-4 md:gap-8" delay={0.1} animateInView={false}>
      
      {/* No Background Orbs or Spotlights in Precise Aesthetic */}

      {/* Massive Stark Hero Title with Spotlight Hover */}
      <motion.div 
        ref={containerRef}
        className="relative z-10 flex flex-col items-start px-2 mt-0 md:mt-2 group"
        onMouseMove={handleMouseMove}
        variants={shouldReduceMotion ? undefined : heroTextVariants}
      >
        <h1
          ref={h1Ref}
          className="text-5xl md:text-7xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.9] text-text pb-2 md:pb-4 transition-opacity duration-300 group-hover:opacity-20"
        >
          {profile.name}
        </h1>
        
        <h1
          ref={overlayH1Ref}
          className="absolute inset-0 px-2 text-5xl md:text-7xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.9] text-primary pb-2 md:pb-4 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ 
            maskImage: `radial-gradient(150px circle at var(--x, 50%) var(--y, 50%), black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(150px circle at var(--x, 50%) var(--y, 50%), black 0%, transparent 100%)`
          }}
          aria-hidden="true"
        >
          {profile.name}
        </h1>
      </motion.div>

      <StaggeredItem className="relative z-10 w-full mt-2 md:mt-12 px-2">
        <div className="relative">
          <PerspectiveTransition perspective={perspective}>
            {perspective === "overview" ? (
              <div className="flex flex-col gap-8 md:gap-12 items-start max-w-4xl">
                <div className="flex flex-col gap-3 md:gap-6">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text">
                    <TextHoverFill>{profile.title}</TextHoverFill>
                  </h2>
                  <div className="text-muted leading-relaxed font-light max-w-3xl">
                    <RotatingStat summary={profile.summary} highlights={profile.highlights} />
                  </div>
                </div>

                <div className={heroCtaRowClass}>
                  <MagneticWrapper strength={15} className="w-full sm:w-auto">
                    <Link href="/projects" className={heroPrimaryLinkClass}>
                      View Projects
                    </Link>
                  </MagneticWrapper>
                  
                  <MagneticWrapper strength={10} className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className={heroSecondaryButtonClass}
                      onClick={() => onPerspectiveChange("architecture")}
                    >
                      Explore Architecture
                    </Button>
                  </MagneticWrapper>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-8 md:gap-12 items-start max-w-5xl">
                <div className="flex flex-col gap-6 md:gap-8">
                  {/* Engineer lens (docs/02 §9): headline + how I design systems.
                      Falls back to a derived title when profile.engineering is absent. */}
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-text font-mono tracking-tight">
                    <TextHoverFill>
                      {profile.engineering?.headline ?? `System Architect & ${profile.title}`}
                    </TextHoverFill>
                  </h2>
                  {profile.engineering && (
                    <div className="flex flex-col gap-4 md:gap-5 max-w-3xl">
                      <p className="text-lg md:text-2xl text-muted leading-relaxed font-light">
                        {profile.engineering.philosophy}
                      </p>
                      <ul className="flex flex-wrap gap-2" aria-label="Engineering principles">
                        {profile.engineering.principles.map((principle) => (
                          <li
                            key={principle.title}
                            className="px-3 py-1.5 rounded-md border border-border/80 bg-surface/40 text-xs font-mono text-text/80"
                          >
                            {principle.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex items-center gap-4">
                      <div className="h-px w-12 bg-text" />
                      <p className="text-sm font-bold text-text uppercase tracking-widest">
                        Current Technical Focus
                      </p>
                    </div>
                    <motion.ul
                      variants={shouldReduceMotion ? undefined : badgeContainerVariants}
                      initial="hidden"
                      animate="show"
                      className="flex flex-wrap gap-2 md:gap-3"
                    >
                      {profile.currentFocus.map((tech) => (
                         <MagneticWrapper key={tech} strength={8}>
                           <motion.li
                            variants={shouldReduceMotion ? undefined : badgeVariants}
                            className="px-3 py-2 md:px-5 md:py-3 border border-border text-sm md:text-base font-mono text-text hover:border-text transition-colors cursor-default"
                          >
                            <TextHoverFill>{tech}</TextHoverFill>
                          </motion.li>
                         </MagneticWrapper>
                      ))}
                    </motion.ul>
                  </div>
                </div>

                <div className={heroCtaRowClass}>
                  <MagneticWrapper strength={15} className="w-full sm:w-auto">
                    <Link href="/architecture-lab" className={heroPrimaryLinkClass}>
                      Enter Architecture Lab
                    </Link>
                  </MagneticWrapper>

                  <MagneticWrapper strength={10} className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className={heroSecondaryButtonClass}
                      onClick={() => onPerspectiveChange("overview")}
                    >
                      Return to Overview
                    </Button>
                  </MagneticWrapper>
                </div>
              </div>
            )}
          </PerspectiveTransition>
        </div>
      </StaggeredItem>
    </StaggeredSection>
  );
}
