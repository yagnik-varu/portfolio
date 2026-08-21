"use client";

import { useMotionPreference } from "@/shared/hooks/use-motion-preference";
import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from "react";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface StaggeredSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function StaggeredSection({ children, className = "", delay = 0 }: StaggeredSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const shouldReduceMotion = useMotionPreference();

  if (shouldReduceMotion) {
    return <section className={className}>{children}</section>;
  }

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export function StaggeredItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useMotionPreference();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      } 
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
