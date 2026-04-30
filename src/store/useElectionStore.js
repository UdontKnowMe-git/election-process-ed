import { create } from 'zustand';

export const useElectionStore = create((set) => ({
  // Store ready for upcoming features like Voter Quest
  score: 0,
}));
