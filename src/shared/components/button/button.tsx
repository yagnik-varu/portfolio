"use client";
"use client";

import { useMotionPreference } from "@/shared/hooks/use-motion-preference";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from 'framer-motion';

import { gsap } from "@/lib/motion/gsap-config";
import { useGSAP } from "@gsap/react";
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

function MagneticWrapper({ children, className }: { children: React.ReactNode, className?: string }) {
  const wrapperRef = React.useRef<HTMLSpanElement>(null);
  const xTo = React.useRef<gsap.QuickToFunc | null>(null);
  const yTo = React.useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    if (!wrapperRef.current) return;
    
    // Create quickTo instances for 60fps tracking without tween buildup
    xTo.current = gsap.quickTo(wrapperRef.current, "x", { duration: 0.4, ease: "power3.out" });
    yTo.current = gsap.quickTo(wrapperRef.current, "y", { duration: 0.4, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      // Ignore touch devices (primary pointer is coarse)
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const currentX = gsap.getProperty(el, "x") as number;
      const currentY = gsap.getProperty(el, "y") as number;

      // Base bounds without current GSAP translation to prevent jitter
      const left = rect.left - currentX;
      const right = rect.right - currentX;
      const top = rect.top - currentY;
      const bottom = rect.bottom - currentY;

      const triggerRadius = 40; // 40px activation zone outside the button
      const isHovering = 
        e.clientX >= left - triggerRadius &&
        e.clientX <= right + triggerRadius &&
        e.clientY >= top - triggerRadius &&
        e.clientY <= bottom + triggerRadius;

      if (isHovering) {
        const centerX = (left + right) / 2;
        const centerY = (top + bottom) / 2;
        
        // Normalize max pull to 4px based on distance from center
        const pullX = ((e.clientX - centerX) / ((right - left) / 2 + triggerRadius)) * 4;
        const pullY = ((e.clientY - centerY) / ((bottom - top) / 2 + triggerRadius)) * 4;

        xTo.current?.(pullX);
        yTo.current?.(pullY);
      } else {
        xTo.current?.(0);
        yTo.current?.(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  });

  return (
    <span ref={wrapperRef} className={cn("inline-block relative", className)}>
      {children}
    </span>
  );
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size, ...props }, ref) => {
    const prefersReducedMotion = useMotionPreference();

    const buttonElement = (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.02, y: -4 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        transition={prefersReducedMotion ? undefined : { type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      />
    );

    if (variant === "primary" && !prefersReducedMotion) {
      const isWFull = className?.includes("w-full");
      return (
        <MagneticWrapper className={isWFull ? "w-full" : undefined}>
          {buttonElement}
        </MagneticWrapper>
      );
    }

    return buttonElement;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
