import { create } from 'zustand';

export const useElectionStore = create((set) => ({
  activeTab: 'timeline', // 'timeline', 'voter-quest', 'myth-vs-fact', 'civic-guru'
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
