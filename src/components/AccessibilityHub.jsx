import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Accessibility, 
  ChevronDown, 
  Type, 
  ZapOff, 
  Focus, 
  Languages, 
  Sun, 
  Moon, 
  Eye,
  Check,
  Maximize2
} from 'lucide-react';
import { useElectionStore } from '../store/useElectionStore';
import translations from '../data/translations.json';

const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'Hindi (हिन्दी)' },
  { id: 'ta', label: 'Tamil (தமிழ்)' },
  { id: 'te', label: 'Telugu (తెలుగు)' },
  { id: 'ml', label: 'Malayalam (മലയാളം)' },
  { id: 'gu', label: 'Gujarati (ગુજરાती)' },
];

const Toggle = ({ enabled, onChange, label, icon: Icon }) => (
  <div className="flex items-center justify-between py-3 px-2 border-b border-primary-border last:border-0">
    <div className="flex items-center gap-3 text-primary-text">
      <Icon className="w-4 h-4 text-[#E47A2E]" />
      <span className="text-sm font-medium">{label}</span>
    </div>
    <button
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all focus:outline-none ring-2 ring-transparent focus:ring-[#E47A2E] border border-[#d1d5db] ${
        enabled ? 'bg-[#E47A2E] border-[#E47A2E]' : 'bg-gray-100'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

export const AccessibilityHub = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const { 
    theme, toggleTheme,
    dyslexiaFont, setDyslexiaFont,
    reducedMotion, setReducedMotion,
    enhancedFocus, setEnhancedFocus,
    textScale, setTextScale,
    language, setLanguage
  } = useElectionStore();

  const t = translations[language]?.accessibility || translations.en.accessibility;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langId) => {
    setLanguage(langId);
    // UI will re-render automatically because setLanguage updates the Zustand store
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility options menu"
        aria-expanded={isOpen}
        className={`flex items-center gap-2 p-2 rounded-xl transition-all border shadow-sm ${
          isOpen ? 'bg-[#E47A2E] text-white border-[#E47A2E]' : 'bg-[#f3f4f6] text-primary-text border-[#d1d5db] hover:border-[#E47A2E]'
        }`}
      >
        <Accessibility className="w-5 h-5" />
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-3 w-72 bg-secondary-bg border border-primary-border rounded-2xl shadow-2xl z-[100] overflow-hidden flex flex-col max-h-[70vh]"
          >
            <div className="p-4 bg-primary-bg/50 border-b border-primary-border sticky top-0 z-10 backdrop-blur-md">
               <h3 className="text-xs font-black uppercase tracking-widest text-muted-text">{t.hub_title}</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 styled-scrollbar pb-8">
              {/* Theme Selector */}
              <div className="flex items-center justify-between py-3 border-b border-primary-border">
                <div className="flex items-center gap-3 text-primary-text">
                   {theme === 'light' ? <Sun className="w-4 h-4 text-[#E47A2E]" /> : theme === 'dark' ? <Moon className="w-4 h-4 text-[#E47A2E]" /> : <Eye className="w-4 h-4 text-[#E47A2E]" />}
                   <span className="text-sm font-medium">{t.theme_mode}</span>
                </div>
                <button 
                  onClick={toggleTheme}
                  className="text-xs font-bold px-3 py-1 bg-[#E47A2E] text-white rounded-full border border-[#E47A2E] hover:opacity-90 transition-all uppercase shadow-sm"
                >
                  {theme === 'high-contrast' ? 'Contrast' : theme}
                </button>
              </div>

              {/* Toggles */}
              <Toggle 
                label={t.dyslexia_font} 
                icon={Type} 
                enabled={dyslexiaFont} 
                onChange={setDyslexiaFont} 
              />
              <Toggle 
                label={t.reduced_motion} 
                icon={ZapOff} 
                enabled={reducedMotion} 
                onChange={setReducedMotion} 
              />
              <Toggle 
                label={t.enhanced_focus} 
                icon={Focus} 
                enabled={enhancedFocus} 
                onChange={setEnhancedFocus} 
              />
              <Toggle 
                label={t.text_scaling} 
                icon={Maximize2} 
                enabled={textScale} 
                onChange={setTextScale} 
              />

              {/* Language Selection */}
              <div className="mt-4 pt-4 border-t border-primary-border">
                <div className="flex items-center gap-3 text-primary-text mb-3">
                   <Languages className="w-4 h-4 text-[#E47A2E]" />
                   <span className="text-sm font-bold">{t.translation}</span>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => handleLanguageChange(lang.id)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                        language === lang.id 
                          ? 'bg-[#E47A2E] text-white font-bold shadow-md' 
                          : 'text-primary-text bg-gray-100 border border-[#d1d5db] hover:border-[#E47A2E] mb-1'
                      }`}
                    >
                      {lang.label}
                      {language === lang.id && <Check className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary-bg/30 text-[10px] text-center text-muted-text italic border-t border-primary-border">
               {t.motto}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
