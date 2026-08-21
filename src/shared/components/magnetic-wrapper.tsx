"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/motion/gsap-config";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";

interface MagneticWrapperProps {
  children: React.ReactNode;
  /** Maximum distance in pixels the element can be pulled from its origin */
  strength?: number;
  className?: string;
}

/**
 * MagneticWrapper
 * 
 * A highly interactive GSAP-powered wrapper that smoothly pulls its children 
 * toward the user's cursor on hover. Creates a tactile, premium feel for CTAs.
 */
export function MagneticWrapper({ 
  children, 
  strength = 15,
  className = "" 
}: MagneticWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useMotionPreference();

  useEffect(() => {
    if (shouldReduceMotion || !containerRef.current) return;

    const element = containerRef.current;
    
    // quickTo is highly optimized for performance (perfect for mousemove)
    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const moveX = (clientX - centerX) / (width / 2);
      const moveY = (clientY - centerY) / (height / 2);
      
      xTo(moveX * strength);
      yTo(moveY * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, shouldReduceMotion]);

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
