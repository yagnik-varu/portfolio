"use client";

import { useEffect, useRef } from "react";
import { usePetStore } from "../hooks/use-pet-store";
import { petConfig } from "../pet-config";

export function PetController() {
  const setVisible = usePetStore((s) => s.setVisible);
  const setStatus = usePetStore((s) => s.setStatus);
  const setMessage = usePetStore((s) => s.setMessage);
  const markIntroSeen = usePetStore((s) => s.markIntroSeen);
  
  const sequenceRunning = useRef(false);

  // Initialize visibility from localStorage safely (SSR guarded by useEffect)
  useEffect(() => {
    try {
      const isDisabled = localStorage.getItem("portfolio_pet_disabled");
      if (isDisabled === "true") {
        setVisible(false);
      }
    } catch (e) {
      // Ignore private browsing errors
    }
  }, [setVisible]);

  // Welcome sequence
  useEffect(() => {
    if (typeof window === "undefined" || sequenceRunning.current) return;

    try {
      const seen = localStorage.getItem("portfolio_pet_intro_seen");
      if (!seen) {
        sequenceRunning.current = true;
        
        let initialTimer: NodeJS.Timeout;
        let speechTimer: NodeJS.Timeout;
        let endTimer: NodeJS.Timeout;

        initialTimer = setTimeout(() => {
          setStatus("welcome");
          setMessage(petConfig.messages.welcome[0]);
          
          speechTimer = setTimeout(() => {
            const isMobile = window.matchMedia(`(max-width: ${petConfig.mobileBreakpointPx}px)`).matches;
            const hint = isMobile 
              ? petConfig.messages.welcomeHintMobile[0]
              : petConfig.messages.welcomeHintDesktop[0];
            
            setMessage(hint);
            
            endTimer = setTimeout(() => {
              setMessage(null);
              setStatus("idle");
              markIntroSeen();
              try {
                localStorage.setItem("portfolio_pet_intro_seen", "true");
              } catch (e) { /* ignore */ }
              sequenceRunning.current = false;
            }, petConfig.speechDurationMs);
            
          }, petConfig.speechDurationMs);
          
        }, petConfig.welcomeDelayMs);
        
        return () => {
          clearTimeout(initialTimer);
          clearTimeout(speechTimer);
          clearTimeout(endTimer);
        }
      }
    } catch (e) {
      // Ignore private browsing errors
    }
  }, [setStatus, setMessage, markIntroSeen]);

  // Phase 14.4, 14.5 will add more logic here (Events, Idle cycle)
  
  return null; // Controller doesn't render anything
}
