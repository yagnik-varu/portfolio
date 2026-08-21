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
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/motion/gsap-config";

interface HeroSectionProps {
  perspective?: Perspective;
  onPerspectiveChange?: (p: Perspective) => void;
}

// Badge stagger variants (architecture mode only) — unchanged
const badgeContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const badgeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1],
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

  // Page-load-only word stagger via GSAP SplitText.
  // Empty dependency array ensures this fires exactly once on mount — never
  // replays on perspective switch (perspective state is not a dependency).
  useGSAP(
    () => {
      if (!h1Ref.current) return;

      // Under prefers-reduced-motion: skip animation, ensure text is visible.
      if (shouldReduceMotion) {
        gsap.set(h1Ref.current, { opacity: 1, visibility: "visible" });
        return;
      }

      // Split by words — matches existing stagger granularity (docs/11-design-system.md §13).
      const split = SplitText.create(h1Ref.current, { type: "words" });

      // Set words invisible before the tween starts (prevents FOUC).
      gsap.set(split.words, { opacity: 0, y: 20 });

      // Animate — exact spec from §13:
      // 80ms stagger delay, 500ms per-word, opacity 0→1, y 20→0, ease [0,0,0.2,1]
      gsap.to(split.words, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "cubic-bezier(0, 0, 0.2, 1)",
        stagger: 0.08,
        onComplete: () => {
          // Revert DOM wrapping after animation finishes to keep the DOM clean
          split.revert();
        },
      });
    },
    // No deps — intentional: animation is page-load-only, never replays
    { scope: h1Ref, dependencies: [] }
  );

  return (
    <StaggeredSection className="relative w-full py-20 md:py-32 flex flex-col gap-6" delay={0.1}>
      {/* Ambient Radial Glow (Subtle depth) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -left-10 w-[400px] h-[300px] -z-10 blur-3xl opacity-40"
        style={{
          background: "radial-gradient(ellipse at center, color-mix(in oklab, var(--color-primary) 20%, transparent), transparent 70%)",
        }}
      />

      {/* Stable Identity Anchor — SplitText word-stagger on page load only */}
      <h1
        ref={h1Ref}
        className="text-4xl md:text-6xl font-bold tracking-tight text-text"
      >
        {profile.name}
      </h1>

      <StaggeredItem>
        <PerspectiveTransition perspective={perspective}>
          {perspective === "overview" ? (
            <div className="flex flex-col gap-8 items-start">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl md:text-3xl font-medium text-primary">
                  {profile.title}
                </h2>
                <RotatingStat summary={profile.summary} highlights={profile.highlights} />
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/projects" passHref legacyBehavior>
                  <Button variant="primary" size="lg">
                    View Projects
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => onPerspectiveChange("architecture")}
                >
                  Explore Architecture Perspective
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8 items-start">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl md:text-3xl font-medium text-primary font-mono">
                  System Architect & {profile.title}
                </h2>
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-bold text-muted uppercase tracking-widest">
                    Current Technical Focus
                  </p>
                  <motion.ul
                    variants={shouldReduceMotion ? undefined : badgeContainerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex flex-wrap gap-2"
                  >
                    {profile.currentFocus.map((tech) => (
                      <motion.li
                        key={tech}
                        variants={shouldReduceMotion ? undefined : badgeVariants}
                        className="px-3 py-1.5 bg-surface border border-border rounded-md text-sm font-mono text-text shadow-sm"
                      >
                        {tech}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/architecture-lab" passHref legacyBehavior>
                  <Button variant="primary" size="lg">
                    Enter Architecture Lab
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => onPerspectiveChange("overview")}
                >
                  Return to Overview
                </Button>
              </div>
            </div>
          )}
        </PerspectiveTransition>
      </StaggeredItem>
    </StaggeredSection>
  );
}
