"use client";

import { useMotionPreference } from "@/shared/hooks/use-motion-preference";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from 'framer-motion';

import { cn } from "@/lib/utils/cn";

const cardVariants = cva(
  "rounded-lg border text-text transition-colors",
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        elevated: "bg-surface border-border shadow-sm",
        technical: "bg-background border-border font-mono text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CardProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => {
    const prefersReducedMotion = useMotionPreference();

    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.02, y: -4 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        transition={prefersReducedMotion ? undefined : { type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export { Card, cardVariants };
