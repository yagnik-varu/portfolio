import type { PetEvent } from '../pet-types';

export function dispatchPetEvent(event: PetEvent, payload?: any) {
  // Scaffold for event dispatcher. Will be wired in Phase 14.4
  if (typeof window !== 'undefined') {
    const customEvent = new CustomEvent('portfolio-pet-event', { detail: { event, payload } });
    window.dispatchEvent(customEvent);
  }
}
