"use client";

import { useEffect, useState } from "react";
import { usePetStore } from "../hooks/use-pet-store";
import { petConfig } from "../pet-config";
import { PetVisual } from "./pet-visual";
import { PetSpeech } from "./pet-speech";
import { PetMenu } from "./pet-menu";
import { PetController } from "./pet-controller";

export function PortfolioPet() {
  const visible = usePetStore((s) => s.visible);
  const setVisible = usePetStore((s) => s.setVisible);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem("portfolio_pet_disabled") === "true") {
        setDisabled(true);
        setVisible(false);
      }
    } catch (e) {}

    setMounted(true);
    
    const mql = window.matchMedia(`(max-width: ${petConfig.mobileBreakpointPx}px)`);
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [setVisible]);

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) return null;

  // Immediately return null if disabled (prevents mounting PetController and listeners)
  if (disabled || !visible) return null;

  const size = isMobile ? petConfig.mobileSize : petConfig.desktopSize;

  return (
    <>
      <PetController />
      <div 
        className="fixed bottom-6 right-6 z-40"
        style={{ width: size, height: size }}
        role="complementary"
        aria-label="Portfolio assistant"
      >
        <div className="relative w-full h-full">
          <PetSpeech />
          <PetMenu />
          <PetVisual />
        </div>
      </div>
    </>
  );
}
