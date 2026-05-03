import React, { useEffect } from 'react';
import { ElectionJourney } from './components/ElectionJourney';
import { CivicGuruSidebar } from './components/CivicGuruSidebar';
import { ProfileSidebar } from './components/ProfileSidebar';
import { useElectionStore } from './store/useElectionStore';
import './App.css';

function App() {
  const { 
    theme, 
    isSidebarOpen, 
    dyslexiaFont, 
    reducedMotion, 
    enhancedFocus,
    textScale,
    language 
  } = useElectionStore();

  useEffect(() => {
    // Theme
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Accessibility Classes on body
    if (dyslexiaFont) {
      document.body.classList.add('font-lexend');
    } else {
      document.body.classList.remove('font-lexend');
    }

    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }

    if (enhancedFocus) {
      document.body.classList.add('enhanced-focus');
    } else {
      document.body.classList.remove('enhanced-focus');
    }

    if (textScale) {
      document.body.classList.add('text-scale-large');
    } else {
      document.body.classList.remove('text-scale-large');
    }

    // Language attribute
    document.documentElement.setAttribute('lang', language);

  }, [theme, dyslexiaFont, reducedMotion, enhancedFocus, textScale, language]);

  return (
    <div className="flex min-h-screen bg-primary-bg transition-colors duration-300">
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarOpen ? 'md:mr-[400px]' : ''}`}>
        <ElectionJourney />
      </div>
      <CivicGuruSidebar />
      <ProfileSidebar />
    </div>
  );
}

export default App;
