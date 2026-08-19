"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { Perspective } from "@/domains/perspective/types";
import { usePerspectiveStore } from "@/domains/perspective/store";
import { profile } from "../../../../content/profile/profile";
import { PerspectiveTransition } from "@/features/perspective/components/perspective-transition";
import { Button } from "@/shared/components/button/button";
import Link from "next/link";

interface HeroSectionProps {
  perspective?: Perspective;
  onPerspectiveChange?: (p: Perspective) => void;
}

const nameContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1],
    },
  },
};

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

  const shouldReduceMotion = useReducedMotion();
  const nameWords = profile.name.split(" ");

  return (
    <section className="relative w-full py-20 md:py-32 flex flex-col gap-6">
      {/* Ambient Radial Glow (Subtle depth) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -left-10 w-[400px] h-[300px] -z-10 blur-3xl opacity-40"
        style={{
          background: "radial-gradient(ellipse at center, color-mix(in oklab, var(--color-primary) 20%, transparent), transparent 70%)",
        }}
      />

      {/* Stable Identity Anchor with One-Time Word Stagger Entrance */}
      <motion.h1
        variants={shouldReduceMotion ? undefined : nameContainerVariants}
        initial="hidden"
        animate="show"
        className="text-4xl md:text-6xl font-bold tracking-tight text-text"
      >
        {nameWords.map((word) => (
          <motion.span
            key={word}
            variants={shouldReduceMotion ? undefined : wordVariants}
            className="inline-block mr-3"
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      <PerspectiveTransition perspective={perspective}>
        {perspective === "overview" ? (
          <div className="flex flex-col gap-8 items-start">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium text-primary">
                {profile.title}
              </h2>
              <p className="text-lg text-muted max-w-2xl leading-relaxed">
                {profile.summary}
              </p>
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
    </section>
  );
}
