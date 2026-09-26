"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/motion/gsap-config";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";

interface ScrubCountUpProps {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function ScrubCountUp({ value, suffix = "", decimals = 0, className }: ScrubCountUpProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useMotionPreference();

  useGSAP(() => {
    if (!containerRef.current || !numRef.current || shouldReduceMotion) {
      return;
    }

    const obj = { val: 0 };
    const format = (n: number) =>
      decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();

    const tween = gsap.to(obj, {
      val: value,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%",   // Start when the top of the element hits 95% of the viewport
        end: "bottom 75%",  // End when the bottom of the element hits 75% of the viewport
        scrub: 0.5,         // Slight smoothing for the scrub
      },
      // Render from the tween (not the ScrollTrigger): with scrub smoothing the
      // tween lags behind scroll progress, so the trigger reaching 1 does not
      // mean the displayed value has reached `value`.
      onUpdate: () => {
        if (numRef.current) numRef.current.innerText = format(obj.val);
      },
      // "once: true" equivalent for scrubs: lock on the exact final value
      // only after the smoothed tween itself has finished.
      onComplete: () => {
        if (numRef.current) numRef.current.innerText = format(value);
        tween.scrollTrigger?.kill();
      },
    });
  }, [value, decimals, shouldReduceMotion]);

  return (
    <span ref={containerRef} className={className}>
      <span ref={numRef}>{shouldReduceMotion ? (decimals > 0 ? value.toFixed(decimals) : value) : "0"}</span>
      {suffix}
    </span>
  );
}
