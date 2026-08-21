"use client";

import { useMotionPreference } from "@/shared/hooks/use-motion-preference";
import { useState, useEffect, useRef, useCallback } from "react";
import { gsap, SplitText } from "@/lib/motion/gsap-config";

interface RotatingStatProps {
  summary: string;
  highlights?: string[];
}

// Timing constants — keep in one place for easy tuning
const CHAR_TYPE_INTERVAL = 42;   // ms per character typed
const CHAR_DELETE_INTERVAL = 22; // ms per character deleted (faster = snappier)
const PAUSE_AFTER_TYPE = 2200;   // ms to hold the full string before deleting
const PAUSE_BEFORE_NEXT = 180;   // ms gap between deletion and next string

export function RotatingStat({ summary, highlights = [] }: RotatingStatProps) {
  const shouldReduceMotion = useMotionPreference();
  const displayRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  // Track the ticker ID so we can remove it on cleanup
  const tickerRef = useRef<((time: number, deltaTime: number, frame: number) => void) | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const splitRef = useRef<any>(null); // Type any since SplitText type might not be exported directly
  const [mounted, setMounted] = useState(false);

  // Avoid SSR mismatch — only run after mount
  useEffect(() => { setMounted(true); }, []);

  const runTypewriter = useCallback(() => {
    if (!displayRef.current || highlights.length === 0) return;

    let currentIndex = 0;
    let currentText = "";
    let targetText = highlights[0];
    // Phase: "typing" | "pausing" | "deleting" | "gap"
    let phase: "typing" | "pausing" | "deleting" | "gap" = "typing";
    let phaseTimer = 0; // accumulates elapsed ms in current phase
    let lastTime = 0;

    const tick = (time: number) => {
      const now = time * 1000; // gsap ticker time is seconds → ms
      if (lastTime === 0) { lastTime = now; return; }
      const delta = now - lastTime;
      lastTime = now;

      if (!displayRef.current) return;

      if (phase === "typing") {
        phaseTimer += delta;
        const charsToAdd = Math.floor(phaseTimer / CHAR_TYPE_INTERVAL);
        if (charsToAdd > 0) {
          phaseTimer %= CHAR_TYPE_INTERVAL;
          const nextLength = Math.min(currentText.length + charsToAdd, targetText.length);
          currentText = targetText.slice(0, nextLength);
          displayRef.current.textContent = currentText;
        }
        if (currentText.length === targetText.length) {
          phase = "pausing";
          phaseTimer = 0;
        }
      } else if (phase === "pausing") {
        phaseTimer += delta;
        if (phaseTimer >= PAUSE_AFTER_TYPE) {
          phase = "deleting";
          
          if (cursorRef.current) {
            cursorRef.current.style.display = "none";
          }
          
          splitRef.current = SplitText.create(displayRef.current, { type: "chars" });
          
          tweenRef.current = gsap.to(splitRef.current.chars, {
            opacity: 0,
            y: -6,
            filter: "blur(3px)",
            duration: 0.2,
            stagger: { amount: 0.25, from: "end" },
            ease: "power2.in",
            onComplete: () => {
              if (splitRef.current) splitRef.current.revert();
              if (displayRef.current) displayRef.current.textContent = "";
              if (cursorRef.current) cursorRef.current.style.display = "inline-block";
              
              currentText = "";
              phase = "gap";
              phaseTimer = 0;
              lastTime = 0; // reset to avoid large delta jump
              tweenRef.current = null;
              splitRef.current = null;
            }
          });
        }
      } else if (phase === "deleting") {
        // Handled entirely by the GSAP tween, ticker waits here until onComplete shifts phase to "gap"
      } else if (phase === "gap") {
        phaseTimer += delta;
        if (phaseTimer >= PAUSE_BEFORE_NEXT) {
          currentIndex = (currentIndex + 1) % highlights.length;
          targetText = highlights[currentIndex];
          phase = "typing";
          phaseTimer = 0;
          lastTime = 0;
        }
      }
    };

    gsap.ticker.add(tick);
    tickerRef.current = tick;
  }, [highlights]);

  useEffect(() => {
    if (!mounted || shouldReduceMotion || highlights.length === 0) return;

    runTypewriter();

    return () => {
      if (tickerRef.current) {
        gsap.ticker.remove(tickerRef.current);
        tickerRef.current = null;
      }
      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }
      if (splitRef.current) {
        splitRef.current.revert();
        splitRef.current = null;
      }
    };
  }, [mounted, shouldReduceMotion, highlights.length, runTypewriter]);

  // Reduced motion or no highlights → plain summary text
  if (shouldReduceMotion || highlights.length === 0) {
    return <p className="text-lg text-muted max-w-2xl leading-relaxed">{summary}</p>;
  }

  return (
    <div className="grid">
      {/* 
        Invisible placeholders for all highlights reserve exact max width/height needed.
        Since all items are in the same grid cell, the container sizes to the largest one,
        allowing text to wrap on mobile without causing layout shift while typing.
      */}
      {highlights.map((h, i) => (
        <p
          key={i}
          className="col-start-1 row-start-1 text-lg text-muted max-w-2xl leading-relaxed font-mono invisible pointer-events-none"
          aria-hidden="true"
        >
          {h}
          <span className="inline-block w-[2px] h-[1.1em] align-middle ml-[2px]" />
        </p>
      ))}

      {/* Visible typewriter */}
      <p
        className="col-start-1 row-start-1 text-lg text-muted max-w-2xl leading-relaxed font-mono"
        aria-label={`Rotating highlights: ${highlights.join(", ")}`}
        aria-live="polite"
      >
        <span ref={displayRef} />
        {/* Blinking cursor — CSS-only, no JS cost */}
        <span
          ref={cursorRef}
          aria-hidden="true"
          className="inline-block w-[2px] h-[1.1em] align-middle ml-[2px] bg-primary animate-[blink_1s_step-end_infinite]"
        />
      </p>
    </div>
  );
}
