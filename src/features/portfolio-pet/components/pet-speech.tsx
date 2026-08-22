"use client";

import { usePetStore } from "../hooks/use-pet-store";

export function PetSpeech() {
  const message = usePetStore((s) => s.message);

  if (!message) return null;

  return (
    <div className="absolute bottom-full right-0 mb-4 bg-surface border border-border px-4 py-2 rounded-2xl rounded-br-none shadow-lg whitespace-nowrap z-50">
      <p className="text-sm font-medium text-text">{message}</p>
    </div>
  );
}
