"use client";

import { usePetStore } from "../hooks/use-pet-store";
import { useEffect, useState } from "react";

export function PetToggleFooterLink() {
  const visible = usePetStore((s) => s.visible);
  const setVisible = usePetStore((s) => s.setVisible);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || visible) return null;

  const handleShowPet = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      localStorage.removeItem("portfolio_pet_disabled");
    } catch (e) {}
    setVisible(true);
  };

  return (
    <button
      onClick={handleShowPet}
      className="text-sm font-medium text-muted hover:text-primary transition-colors cursor-pointer"
    >
      Show Pet
    </button>
  );
}
