"use client";

import { petConfig } from "../pet-config";
import { usePetStore } from "../hooks/use-pet-store";

export function PetVisual() {
  const status = usePetStore((s) => s.status);
  
  return (
    <div className="w-full h-full bg-surface border border-border rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105">
      <span className="text-2xl" role="img" aria-label="pet placeholder">
        {status === 'sleep' ? '💤' : '👾'}
      </span>
    </div>
  );
}
