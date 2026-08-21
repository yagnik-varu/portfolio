import { gsap, Flip } from "./gsap-config";

let lastFlipState: Flip.FlipState | null = null;

export const capturePerspectiveLayout = () => {
  lastFlipState = Flip.getState("[data-flip-id]");
};

export const animatePerspectiveLayout = (isEnteringArchitecture: boolean, prefersReducedMotion: boolean) => {
  if (!lastFlipState || prefersReducedMotion) {
    lastFlipState = null;
    return;
  }
  
  const duration = isEnteringArchitecture ? 0.35 : 0.18;
  const delay = isEnteringArchitecture ? 0.1 : 0;
  const ease = isEnteringArchitecture ? "cubic-bezier(0, 0, 0.2, 1)" : "cubic-bezier(0.4, 0, 1, 1)";

  Flip.from(lastFlipState, {
    duration,
    delay,
    ease,
    absolute: true,
    onComplete: () => { lastFlipState = null; }
  });
};
