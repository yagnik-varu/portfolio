"use client";

import { useMotionPreference } from "@/shared/hooks/use-motion-preference";
import { useState, useEffect } from "react";


/**
 * Manages the first-visit discovery affordance for the Perspective toggle.
 * Uses sessionStorage so the pulse resets per browsing session, but not per page reload.
 */
export function usePerspectiveDiscovery() {
  const [shouldPulse, setShouldPulse] = useState(false);
  const shouldReduceMotion = useMotionPreference();

  useEffect(() => {
    // Only run on the client
    const hasSeen = sessionStorage.getItem("perspective-discovery-seen");

    if (!hasSeen && !shouldReduceMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldPulse(true);

      // Auto-hide the pulse after 8 seconds so it doesn't permanently distract the user
      const timer = setTimeout(() => {
        setShouldPulse(false);
        sessionStorage.setItem("perspective-discovery-seen", "true");
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [shouldReduceMotion]);

  const registerInteraction = () => {
    if (shouldPulse) {
      setShouldPulse(false);
      sessionStorage.setItem("perspective-discovery-seen", "true");
    }
  };

  return { shouldPulse, registerInteraction };
}
