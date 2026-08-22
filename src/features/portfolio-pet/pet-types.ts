export type PetStatus = 'idle' | 'welcome' | 'happy' | 'walk' | 'point' | 'sleep' | 'wake' | 'surprised' | 'look';
export type PetEvent = 'FIRST_VISIT' | 'PERSPECTIVE_CHANGED' | 'PROJECT_OPENED' | 'ARCHITECTURE_LAB_OPENED' | 'TELEMETRY_VIEWED' | 'SHORTCUT_USED' | 'RESUME_DOWNLOADED' | 'CONTACT_CLICKED' | 'USER_IDLE' | 'USER_RETURNED' | 'PET_CLICKED';

export interface PetState {
  status: PetStatus;
  message: string | null;
  visible: boolean;
  hasSeenIntro: boolean;
  lastInteractionAt: number;
  setStatus: (status: PetStatus) => void;
  setMessage: (message: string | null) => void;
  setVisible: (visible: boolean) => void;
  markIntroSeen: () => void;
  recordInteraction: () => void;
}
