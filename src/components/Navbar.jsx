import React, { useState } from 'react';
import { Menu, X, Flag } from 'lucide-react';
import { useElectionStore } from '../store/useElectionStore';
import { AccessibilityHub } from './AccessibilityHub';
import { useTranslation } from '../hooks/useTranslation';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeTab, setActiveTab } = useElectionStore();

  const navLinks = [
    { id: 'timeline', label: "Timeline" },
    { id: 'voter-quest', label: "Voter Quest" },
    { id: 'myth-vs-fact', label: "Myth vs. Fact" },
    { id: 'latest-news', label: "Latest News" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-primary-bg/90 backdrop-blur-lg border-b border-primary-border shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
             <Flag className="w-6 h-6 text-[#E47A2E]" fill="currentColor" />
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-primary-text">
            <TranslatedText text="Democracy Journey" />
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav>
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <li key={link.id}>
                    <button
                      onClick={() => setActiveTab(link.id)}
                      className={`text-sm font-semibold transition-colors duration-300 py-1 ${
                        isActive
                          ? 'text-[#E47A2E] border-b-2 border-[#E47A2E]'
                          : 'text-muted-text hover:text-primary-text'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <TranslatedText text={link.label} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="h-6 w-[1px] bg-primary-border mx-2" />

          {/* Accessibility Hub */}
          <AccessibilityHub />
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <AccessibilityHub />
          <button
            className="text-primary-text p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-primary-bg border-b border-primary-border shadow-lg py-4 px-6 flex flex-col gap-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setActiveTab(link.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-base font-semibold w-full text-left ${
                      isActive ? 'text-[#E47A2E]' : 'text-muted-text'
                    }`}
                  >
                    <TranslatedText text={link.label} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
};
