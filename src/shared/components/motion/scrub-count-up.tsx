"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/motion/gsap-config";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";

interface ScrubCountUpProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function ScrubCountUp({ value, suffix = "", className }: ScrubCountUpProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useMotionPreference();

  useGSAP(() => {
    if (!containerRef.current || !numRef.current || shouldReduceMotion) {
      return;
    }

    const obj = { val: 0 };
    
    gsap.to(obj, {
      val: value,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%",   // Start when the top of the element hits 95% of the viewport
        end: "bottom 75%",  // End when the bottom of the element hits 75% of the viewport
        scrub: 0.5,         // Slight smoothing for the scrub
        onUpdate: (self) => {
          if (numRef.current) {
            numRef.current.innerText = Math.round(obj.val).toString();
          }
          // "once: true" equivalent for scrubs: lock it forever once completed
          if (self.progress === 1) {
            self.kill(false); 
          }
        }
      }
    });
  }, [value, shouldReduceMotion]);

  return (
    <span ref={containerRef} className={className}>
      <span ref={numRef}>{shouldReduceMotion ? value : "0"}</span>
      {suffix}
    </span>
  );
}
