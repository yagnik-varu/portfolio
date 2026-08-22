"use client";

import { useEffect, useRef } from "react";
import { usePerspectiveStore } from "@/domains/perspective/store";
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

  const perspective = usePerspectiveStore((s) => s.perspective);
  const shortcutCount = usePerspectiveStore((s) => s.perspectiveShortcutCount);
  const recordInteraction = usePetStore((s) => s.recordInteraction);
  const hasSeenIntro = usePetStore((s) => s.hasSeenIntro);
  const isIdle = usePetStore((s) => s.status === 'idle');

  // React to Perspective Changes
  useEffect(() => {
    if (!hasSeenIntro || sequenceRunning.current) return;
    setStatus('happy');
    const msgs = petConfig.messages.perspectiveSwitched;
    setMessage(msgs[Math.floor(Math.random() * msgs.length)]);
    recordInteraction();
    
    const t = setTimeout(() => {
      setMessage(null);
      setStatus('idle');
    }, petConfig.speechDurationMs);
    
    return () => clearTimeout(t);
  }, [perspective, hasSeenIntro, setStatus, setMessage, recordInteraction]);

  // React to Shortcut Usage
  useEffect(() => {
    if (!hasSeenIntro || sequenceRunning.current || shortcutCount === 0) return;
    if (window.matchMedia(`(max-width: ${petConfig.mobileBreakpointPx}px)`).matches) return;

    setStatus('surprised');
    recordInteraction();
    
    const t = setTimeout(() => {
      setStatus('idle');
    }, petConfig.speechDurationMs);
    
    return () => clearTimeout(t);
  }, [shortcutCount, hasSeenIntro, setStatus, recordInteraction]);

  // Listen to Custom Pet Events
  useEffect(() => {
    const handlePetEvent = (e: Event) => {
      if (sequenceRunning.current) return;
      const customEvent = e as CustomEvent;
      const eventName = customEvent.detail?.event;
      recordInteraction();

      if (eventName === 'PROJECT_OPENED') {
        setStatus('happy');
        const msgs = petConfig.messages.projectOpened;
        setMessage(msgs[Math.floor(Math.random() * msgs.length)]);
        setTimeout(() => { setMessage(null); setStatus('idle'); }, petConfig.speechDurationMs);
      } else if (eventName === 'ARCHITECTURE_LAB_OPENED') {
        setStatus('point');
        setTimeout(() => { setStatus('idle'); }, petConfig.speechDurationMs);
      } else if (eventName === 'TELEMETRY_VIEWED') {
        setStatus('look');
        setTimeout(() => { setStatus('idle'); }, petConfig.speechDurationMs);
      }
    };
    
    window.addEventListener('portfolio-pet-event', handlePetEvent);
    return () => window.removeEventListener('portfolio-pet-event', handlePetEvent);
  }, [setStatus, setMessage, recordInteraction]);

  // Probability Loop (Background idle animations)
  useEffect(() => {
    if (!hasSeenIntro || sequenceRunning.current || !isIdle) return;

    const interval = setInterval(() => {
      const isMobile = window.matchMedia(`(max-width: ${petConfig.mobileBreakpointPx}px)`).matches;
      const rand = Math.random();
      
      if (rand < 0.8) {
        // 80% Idle (Do nothing)
      } else if (rand < 0.9) {
        // 10% Look
        setStatus('look');
        setTimeout(() => setStatus('idle'), 2000);
      } else if (rand < 0.95 && !isMobile) {
        // 5% Walk (Desktop only)
        setStatus('walk');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        // 5% Speech (just a random small bark/noise, but we might just do happy/point if no generic text is configured)
        setStatus('point');
        setTimeout(() => setStatus('idle'), 2000);
      }
    }, 10000); // Check every 10s

    return () => clearInterval(interval);
  }, [hasSeenIntro, isIdle, setStatus]);

  // Phase 14.5 will add more logic here (Idle cycle/Sleep)
  
  return null; // Controller doesn't render anything
}
