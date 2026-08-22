"use client";

import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useEffect } from "react";
import type { PetStatus } from "../pet-types";

// TODO: Replace these constants with actual state machine and input names once the .riv file is provided.
const STATE_MACHINE_NAME = "State Machine 1";
const INPUT_IDLE = "Idle";
const INPUT_WELCOME = "Welcome";
const INPUT_HAPPY = "Happy";

interface RivePetProps {
  status: PetStatus;
  onError: () => void;
}

export function RivePet({ status, onError }: RivePetProps) {
  const { rive, RiveComponent } = useRive({
    src: "/pet/portfolio-pet.riv",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    onLoadError: () => onError(),
  });

  const idleInput = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_IDLE);
  const welcomeInput = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_WELCOME);
  const happyInput = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_HAPPY);

  useEffect(() => {
    if (!rive) return;

    // TODO: Verify if inputs are triggers or booleans once the asset is ready. 
    // Assuming triggers based on standard Rive interactive setups.
    if (status === 'welcome' && welcomeInput) {
      welcomeInput.fire();
    } else if (status === 'happy' && happyInput) {
      happyInput.fire();
    } else if (idleInput) {
      idleInput.fire();
    }
  }, [status, rive, idleInput, welcomeInput, happyInput]);

  return (
    <div className="w-full h-full relative" aria-hidden="true">
      <RiveComponent className="w-full h-full object-contain" />
    </div>
  );
}
