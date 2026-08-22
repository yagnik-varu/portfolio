"use client";

import { useEffect } from "react";
import { dispatchPetEvent } from "../lib/pet-events";
import type { PetEvent } from "../pet-types";

export function PetEventTrigger({ event }: { event: PetEvent }) {
  useEffect(() => {
    dispatchPetEvent(event);
  }, [event]);
  
  return null;
}
