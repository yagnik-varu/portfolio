import { create } from 'zustand';
import type { PetState, PetStatus } from '../pet-types';

export const usePetStore = create<PetState>((set) => ({
  status: 'idle',
  message: null,
  visible: true,
  hasSeenIntro: false,
  lastInteractionAt: Date.now(),
  setStatus: (status: PetStatus) => set({ status }),
  setMessage: (message: string | null) => set({ message }),
  setVisible: (visible: boolean) => set({ visible }),
  markIntroSeen: () => set({ hasSeenIntro: true }),
  recordInteraction: () => set({ lastInteractionAt: Date.now() }),
}));
