# 17-portfolio-pet-rive-requirements.md

# Portfolio Pet: Rive Asset Requirements

This document provides the exact specifications and state machine triggers required to build the `portfolio-pet.riv` file. Hand this specification to your motion designer (or use it yourself) to ensure the Rive file plugs seamlessly into the existing frontend architecture.

## Asset Delivery Specifications

- **File Name**: `portfolio-pet.riv`
- **Location**: Must be placed in the `public/pet/` directory of the project.
- **State Machine Name**: Exactly `PetStateMachine`.
- **Inputs**: Use **Triggers** for each of the 9 states below.

---

## Required Animations & Triggers

The frontend is programmed to emit exactly 9 triggers based on user interaction and ambient idle loops. The Rive file must contain matching triggers.

### 1. Idle
- **Trigger Name**: `idle`
- **Animation**: The default resting loop (e.g., breathing, slight floating, or occasional blinking).
- **When it fires**: Continuously whenever the pet is doing nothing else.

### 2. Welcome
- **Trigger Name**: `welcome`
- **Animation**: A friendly wave, bow, or grand entrance.
- **When it fires**: Plays exactly once when a user visits the portfolio for the very first time.

### 3. Happy / Celebrate
- **Trigger Name**: `happy`
- **Animation**: A spin, jump, or big smile/cheer.
- **When it fires**: When the user does something positive, like switching the Perspective to Architecture or opening a Case Study.

### 4. Walk
- **Trigger Name**: `walk`
- **Animation**: Pacing back and forth, or waddling in place.
- **When it fires**: Triggers randomly on a 15-second ambient interval just to make the pet feel alive.

### 5. Point / Present
- **Trigger Name**: `point`
- **Animation**: Pointing an arm or looking sharply upwards/sideways.
- **When it fires**: When the user opens the "Architecture Lab", or randomly during idle time to draw attention.

### 6. Sleep
- **Trigger Name**: `sleep`
- **Animation**: Sitting down, eyes closed, maybe a "Zzz" bubble. Must loop smoothly.
- **When it fires**: When the user doesn't touch their mouse or keyboard for 60 seconds.

### 7. Wake Up
- **Trigger Name**: `wake`
- **Animation**: A startled shake, eye-rubbing, or quick yawn transitioning back to Idle.
- **When it fires**: The exact moment the user moves their mouse or types after the pet has fallen asleep.

### 8. Surprised
- **Trigger Name**: `surprised`
- **Animation**: Eyes wide open, popping up, or an exclamation mark (`!`) appearing.
- **When it fires**: When the user uses the "Power User" keyboard shortcut (`Shift + P`).

### 9. Look / Inspect
- **Trigger Name**: `look`
- **Animation**: Looking closely left, right, or pulling out a magnifying glass.
- **When it fires**: When the user visits the Telemetry/Analytics dashboard, or randomly during idle time.

---

## Frontend Integration Guide

Once the `.riv` file is created and placed in `public/pet/`, update the frontend code in `src/features/portfolio-pet/components/rive-pet.tsx` to bind the 9 triggers to the Zustand store status:

```tsx
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useEffect } from "react";
import type { PetStatus } from "../pet-types";

const STATE_MACHINE_NAME = "PetStateMachine";

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

  const idleInput = useStateMachineInput(rive, STATE_MACHINE_NAME, "idle");
  const welcomeInput = useStateMachineInput(rive, STATE_MACHINE_NAME, "welcome");
  const happyInput = useStateMachineInput(rive, STATE_MACHINE_NAME, "happy");
  const walkInput = useStateMachineInput(rive, STATE_MACHINE_NAME, "walk");
  const pointInput = useStateMachineInput(rive, STATE_MACHINE_NAME, "point");
  const sleepInput = useStateMachineInput(rive, STATE_MACHINE_NAME, "sleep");
  const wakeInput = useStateMachineInput(rive, STATE_MACHINE_NAME, "wake");
  const surprisedInput = useStateMachineInput(rive, STATE_MACHINE_NAME, "surprised");
  const lookInput = useStateMachineInput(rive, STATE_MACHINE_NAME, "look");

  useEffect(() => {
    if (!rive) return;

    // React strictly to the Zustand store status
    switch (status) {
      case 'idle': idleInput?.fire(); break;
      case 'welcome': welcomeInput?.fire(); break;
      case 'happy': happyInput?.fire(); break;
      case 'walk': walkInput?.fire(); break;
      case 'point': pointInput?.fire(); break;
      case 'sleep': sleepInput?.fire(); break;
      case 'wake': wakeInput?.fire(); break;
      case 'surprised': surprisedInput?.fire(); break;
      case 'look': lookInput?.fire(); break;
    }
  }, [
    status, rive, 
    idleInput, welcomeInput, happyInput, walkInput, 
    pointInput, sleepInput, wakeInput, surprisedInput, lookInput
  ]);

  return (
    <div className="w-full h-full relative" aria-hidden="true">
      <RiveComponent className="w-full h-full object-contain" />
    </div>
  );
}
```
