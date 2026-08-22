"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/motion/gsap-config";
import { ScrollTrigger } from "@/lib/motion/gsap-config";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Reactively tracks `prefers-reduced-motion` via a MediaQueryList listener so
 * it responds to live OS setting changes, not just the initial value at mount.
 */
function useReducedMotionMediaQuery(): boolean {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mql.addEventListener("change", handleChange);
    // Sync the initial value in case it changed between SSR and first paint
    setPrefersReduced(mql.matches);

    return () => {
      mql.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReduced;
}

/**
 * SmoothScrollProvider
 *
 * Mounts a single root-level Lenis instance and wires it into GSAP's ticker
 * so ScrollTrigger and Lenis share one rAF loop and never fight over scroll
 * position (per the official GSAP + Lenis integration guide).
 *
 * When `prefers-reduced-motion` is set, Lenis is fully disabled — not just
 * softened — and the browser's native scroll is used instead. The check is
 * reactive via a MediaQueryList listener so it responds to live OS changes.
 *
 * This provider does NOT interact with the Perspective URL-sync system
 * (docs/05-system-architecture.md §8). Perspective state is driven exclusively
 * by `?perspective=` URL query params and Zustand store mutations; scroll
 * position never touches that path.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const prefersReducedMotion = useReducedMotionMediaQuery();
  // Hold a stable ref to the lenis instance for the GSAP ticker cleanup
  const lenisRef = useRef<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change to prevent layout issues like navbar overlapping
    // Route changes should be immediate so we don't see jarring cross-page scrolls
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    // Listen for manual trigger (e.g. clicking same-page links) which should be smooth
    const handleManualScrollTop = () => {
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.scrollTo(0, { immediate: false });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("trigger-scroll-top", handleManualScrollTop);
    return () => window.removeEventListener("trigger-scroll-top", handleManualScrollTop);
  }, []);

  useEffect(() => {
    // When reduced motion is active we bail out immediately — no ticker wired
    if (prefersReducedMotion) return;

    // Wire Lenis into GSAP's ticker so both run on the same rAF loop.
    // `time` from gsap.ticker is in seconds; lenis.raf() expects milliseconds.
    const tick = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    // Keep ScrollTrigger's internal scroll state aligned with Lenis on every
    // lenis scroll event (required for correct trigger start/end calculation).
    const syncScrollTrigger = () => {
      ScrollTrigger.update();
    };

    gsap.ticker.add(tick);
    // Disable lag-smoothing so GSAP never introduces artificial scroll delay
    gsap.ticker.lagSmoothing(0);
    lenisRef.current?.lenis?.on("scroll", syncScrollTrigger);

    return () => {
      gsap.ticker.remove(tick);
      lenisRef.current?.lenis?.off("scroll", syncScrollTrigger);
    };
  }, [prefersReducedMotion]);

  // When the user prefers reduced motion, render children without any Lenis
  // wrapper so the browser's native scroll behaviour is used unchanged.
  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      // autoRaf must be false — we drive the loop via gsap.ticker above.
      options={{ autoRaf: false }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}
