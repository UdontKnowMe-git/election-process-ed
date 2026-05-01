import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useElectionStore = create(
  persist(
    (set) => ({
      activeTab: 'timeline',
      theme: 'light',
      isSidebarOpen: false,

      // Accessibility States
      dyslexiaFont: false,
      reducedMotion: false,
      enhancedFocus: false,
      textScale: false, // Large Text Toggle
      language: 'en', // 'en', 'hi', 'ta', 'te', 'ml', 'gu'

      // Progress States (Gamification)
      questionsAnswered: 0,
      timelineViewed: 0, // Number of unique points visited
      totalPledges: 14250, // Mock global counter
      hasPledged: false,

      setActiveTab: (tab) => set({ activeTab: tab }),

      toggleTheme: () => set((state) => {
        const themes = ['light', 'dark', 'high-contrast'];
        const currentIndex = themes.indexOf(state.theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        return { theme: themes[nextIndex] };
      }),

      setTheme: (theme) => set({ theme }),

      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      // Accessibility Setters
      setDyslexiaFont: (val) => set({ dyslexiaFont: val }),
      setReducedMotion: (val) => set({ reducedMotion: val }),
      setEnhancedFocus: (val) => set({ enhancedFocus: val }),
      setTextScale: (val) => set({ textScale: val }),
      setLanguage: (lang) => set({ language: lang }),

      // Progress Actions
      incrementQuestions: () => set((state) => ({ questionsAnswered: state.questionsAnswered + 1 })),
      markTimelinePoint: (index) => set((state) => {
        if (index + 1 > state.timelineViewed) {
          return { timelineViewed: index + 1 };
        }
        return state;
      }),
      takePledge: () => set((state) => {
        if (!state.hasPledged) {
          return { totalPledges: state.totalPledges + 1, hasPledged: true };
        }
        return state;
      }),
    }),
    {
      name: 'democracy-journey-storage',
    }
  )
);
