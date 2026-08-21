"use client";

import { useMotionPreference } from "@/shared/hooks/use-motion-preference";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from 'framer-motion';

import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-background hover:bg-primary/90",
        secondary: "bg-surface text-text hover:bg-surface/80 border border-border",
        ghost: "hover:bg-surface hover:text-text text-muted",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends HTMLMotionProps<"button">,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const prefersReducedMotion = useMotionPreference();

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.02, y: -4 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        transition={prefersReducedMotion ? undefined : { type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
