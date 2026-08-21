"use client";

import { useMotionPreference } from "@/shared/hooks/use-motion-preference";
import { motion, type Variants } from 'framer-motion';
import type { Perspective } from "@/domains/perspective/types";
import { usePerspectiveStore } from "@/domains/perspective/store";
import { profile } from "../../../../content/profile/profile";
import { PerspectiveTransition } from "@/features/perspective/components/perspective-transition";
import { Button } from "@/shared/components/button/button";
import Link from "next/link";
import { RotatingStat } from "./rotating-stat";
import { StaggeredSection, StaggeredItem } from "./staggered-section";
import { useRef } from "react";
import { MagneticWrapper } from "@/shared/components/magnetic-wrapper";
import { TextHoverFill } from "@/shared/components/motion/text-hover-fill";

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
  const onPerspectiveChange = propOnPerspectiveChange ?? storeSetPerspective;

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
    <StaggeredSection className="relative w-full pt-4 pb-12 md:pt-8 md:pb-16 flex flex-col gap-8" delay={0.1} animateInView={false}>
      
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
          className="text-5xl md:text-7xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.9] text-text pb-4 transition-opacity duration-300 group-hover:opacity-20"
        >
          {profile.name}
        </h1>
        
        <h1
          ref={overlayH1Ref}
          className="absolute inset-0 px-2 text-5xl md:text-7xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.9] text-primary pb-4 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ 
            maskImage: `radial-gradient(150px circle at var(--x, 50%) var(--y, 50%), black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(150px circle at var(--x, 50%) var(--y, 50%), black 0%, transparent 100%)`
          }}
          aria-hidden="true"
        >
          {profile.name}
        </h1>
      </motion.div>

      <StaggeredItem className="relative z-10 w-full mt-8 md:mt-12 px-2">
        <div className="relative">
          <PerspectiveTransition perspective={perspective}>
            {perspective === "overview" ? (
              <div className="flex flex-col gap-12 items-start max-w-4xl">
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text">
                    <TextHoverFill>{profile.title}</TextHoverFill>
                  </h2>
                  <div className="text-xl md:text-2xl text-muted leading-relaxed font-light max-w-3xl">
                    <RotatingStat summary={profile.summary} highlights={profile.highlights} />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <MagneticWrapper strength={15}>
                    <Link href="/projects" passHref legacyBehavior>
                      <Button variant="primary" size="lg" className="h-16 px-10 text-lg rounded-none bg-text text-background hover:bg-text/90">
                        View Projects
                      </Button>
                    </Link>
                  </MagneticWrapper>
                  
                  <MagneticWrapper strength={10}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-16 px-10 text-lg rounded-none border-text text-text hover:bg-surface"
                      onClick={() => onPerspectiveChange("architecture")}
                    >
                      Explore Architecture
                    </Button>
                  </MagneticWrapper>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-12 items-start max-w-5xl">
                <div className="flex flex-col gap-8">
                  <h2 className="text-3xl md:text-5xl font-bold text-text font-mono tracking-tight">
                    <TextHoverFill>{`System Architect & ${profile.title}`}</TextHoverFill>
                  </h2>
                  <div className="flex flex-col gap-6">
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
                      className="flex flex-wrap gap-3"
                    >
                      {profile.currentFocus.map((tech) => (
                         <MagneticWrapper key={tech} strength={8}>
                           <motion.li
                            variants={shouldReduceMotion ? undefined : badgeVariants}
                            className="px-5 py-3 border border-border text-base font-mono text-text hover:border-text transition-colors cursor-default"
                          >
                            <TextHoverFill>{tech}</TextHoverFill>
                          </motion.li>
                         </MagneticWrapper>
                      ))}
                    </motion.ul>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <MagneticWrapper strength={15}>
                    <Link href="/architecture-lab" passHref legacyBehavior>
                      <Button variant="primary" size="lg" className="h-16 px-10 text-lg rounded-none bg-text text-background hover:bg-text/90">
                        Enter Architecture Lab
                      </Button>
                    </Link>
                  </MagneticWrapper>

                  <MagneticWrapper strength={10}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-16 px-10 text-lg rounded-none border-text text-text hover:bg-surface"
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
