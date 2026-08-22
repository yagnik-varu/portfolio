"use client";

import { useEffect } from "react";
import { usePetStore } from "../hooks/use-pet-store";

export function PetController() {
  const setVisible = usePetStore((s) => s.setVisible);

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

  // Phase 14.3, 14.4, 14.5 will add more logic here (Welcome, Events, Idle cycle)
  
  return null; // Controller doesn't render anything
}
