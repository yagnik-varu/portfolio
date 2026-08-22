"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { usePetStore } from "../hooks/use-pet-store";

// SSR-safe lazy loading for the Rive runtime
const RivePet = dynamic(() => import("./rive-pet").then((mod) => mod.RivePet), { ssr: false });

export function PetVisual() {
  const status = usePetStore((s) => s.status);
  const prefersReducedMotion = useReducedMotion();
  const [assetError, setAssetError] = useState(false);
  
  // Render the static stub if motion is reduced, or if the Rive asset fails to load
  if (prefersReducedMotion || assetError) {
    return (
      <div className="w-full h-full bg-surface border border-border rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105">
        <span className="text-2xl" role="img" aria-label="pet placeholder">
          {status === 'sleep' ? '💤' : '👾'}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-full shadow-lg rounded-full overflow-hidden bg-transparent">
       <RivePet status={status} onError={() => setAssetError(true)} />
    </div>
  );
}
