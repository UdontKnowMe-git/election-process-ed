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
      language: 'en', // 'en', 'hi', 'ta', 'te', 'ml', 'gu'

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
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'democracy-journey-storage',
    }
  )
);
