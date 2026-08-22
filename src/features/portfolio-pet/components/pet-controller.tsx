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
    let eventTimer: NodeJS.Timeout;

    const handlePetEvent = (e: Event) => {
      if (sequenceRunning.current) return;
      const customEvent = e as CustomEvent;
      const eventName = customEvent.detail?.event;
      recordInteraction();

      clearTimeout(eventTimer);

      if (eventName === 'PROJECT_OPENED') {
        setStatus('happy');
        const msgs = petConfig.messages.projectOpened;
        setMessage(msgs[Math.floor(Math.random() * msgs.length)]);
        eventTimer = setTimeout(() => { setMessage(null); setStatus('idle'); }, petConfig.speechDurationMs);
      } else if (eventName === 'ARCHITECTURE_LAB_OPENED') {
        setStatus('point');
        eventTimer = setTimeout(() => { setStatus('idle'); }, petConfig.speechDurationMs);
      } else if (eventName === 'TELEMETRY_VIEWED') {
        setStatus('look');
        eventTimer = setTimeout(() => { setStatus('idle'); }, petConfig.speechDurationMs);
      }
    };
    
    window.addEventListener('portfolio-pet-event', handlePetEvent);
    return () => {
      window.removeEventListener('portfolio-pet-event', handlePetEvent);
      clearTimeout(eventTimer);
    };
  }, [setStatus, setMessage, recordInteraction]);

  // Ambient Idle Behaviors (Resettable Timeout)
  useEffect(() => {
    if (!hasSeenIntro || sequenceRunning.current) return;

    let ambientTimer: NodeJS.Timeout;
    let decayTimer: NodeJS.Timeout;

    const scheduleNext = () => {
      ambientTimer = setTimeout(() => {
        if (usePetStore.getState().status === 'idle') {
          const isMobile = window.matchMedia(`(max-width: ${petConfig.mobileBreakpointPx}px)`).matches;
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          const rand = Math.random();
          
          if (rand < 0.8) {
            // 80% Do nothing
          } else if (rand < 0.9) {
            setStatus('look');
            decayTimer = setTimeout(() => setStatus('idle'), 2000);
          } else if (rand < 0.95 && (!isMobile || petConfig.mobileWalkEnabled) && !prefersReducedMotion) {
            setStatus('walk');
            decayTimer = setTimeout(() => setStatus('idle'), 4000);
          } else {
            setStatus('point');
            decayTimer = setTimeout(() => setStatus('idle'), 2000);
          }
        }
        
        // Always schedule next check
        scheduleNext();
      }, 15000); // Check every 15s
    };

    scheduleNext();

    return () => {
      clearTimeout(ambientTimer);
      clearTimeout(decayTimer);
    };
  }, [hasSeenIntro, setStatus]);

  // Activity Tracking & Sleep Threshold
  useEffect(() => {
    if (!hasSeenIntro || sequenceRunning.current) return;

    let sleepTimer: NodeJS.Timeout;
    let wakeDecayTimer: NodeJS.Timeout;
    let throttleTimer: NodeJS.Timeout | null = null;

    const resetSleepTimer = () => {
      clearTimeout(sleepTimer);
      sleepTimer = setTimeout(() => {
        if (usePetStore.getState().status !== 'sleep') {
          setStatus('sleep');
        }
      }, petConfig.idleTimeoutMs); // defaults to 60s
    };

    const handleActivity = () => {
      const currentStatus = usePetStore.getState().status;
      if (currentStatus === 'sleep') {
        setStatus('wake');
        clearTimeout(wakeDecayTimer);
        wakeDecayTimer = setTimeout(() => {
          setStatus('idle');
        }, 2000); // Return to idle after a brief wake state
      }
      
      usePetStore.getState().recordInteraction();
      resetSleepTimer();
    };

    const throttledActivity = () => {
      if (throttleTimer) return;
      handleActivity();
      throttleTimer = setTimeout(() => {
        throttleTimer = null;
      }, 500); // Throttle global listeners to max 2 executions per second
    };

    // Initial start
    resetSleepTimer();

    const events = ['mousemove', 'click', 'keydown', 'scroll', 'touchstart'];
    events.forEach(e => window.addEventListener(e, throttledActivity, { passive: true }));

    return () => {
      events.forEach(e => window.removeEventListener(e, throttledActivity));
      clearTimeout(sleepTimer);
      clearTimeout(wakeDecayTimer);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [hasSeenIntro, setStatus]);

  return null; // Controller doesn't render anything
}
