import React, { useState } from 'react';
import { Menu, X, Flag, Award, Search } from 'lucide-react';
import { useElectionStore } from '../store/useElectionStore';
import { AccessibilityHub } from './AccessibilityHub';
import { useTranslation } from '../hooks/useTranslation';
import { motion } from 'framer-motion';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

const ProgressRing = () => {
  const { questionsAnswered, timelineViewed } = useElectionStore();

  // Total milestones: 25 quiz questions + 7 timeline points (approx)
  const totalMilestones = 32;
  const currentProgress = questionsAnswered + timelineViewed;
  const percentage = Math.min((currentProgress / totalMilestones) * 100, 100);

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center group cursor-help" title={`Your Progress: ${Math.round(percentage)}%`}>
      <svg className="w-12 h-12 transform -rotate-90">
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          className="text-primary-border"
        />
        <motion.circle
          cx="24"
          cy="24"
          r={radius}
          stroke="#E47A2E"
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Award className={`w-5 h-5 ${percentage >= 100 ? 'text-[#E47A2E] fill-[#E47A2E]/20' : 'text-muted-text'}`} />
      </div>

      {/* Tooltip */}
      <div className="absolute top-full mt-2 hidden group-hover:block bg-secondary-bg border border-primary-border p-2 rounded-lg shadow-xl z-50 whitespace-nowrap">
        <p className="text-[10px] font-bold text-primary-text uppercase tracking-tighter">
          <TranslatedText text="Voter Level" />: {percentage >= 100 ? 'Guru' : percentage >= 50 ? 'Advocate' : 'Novice'}
        </p>
        <div className="w-full h-1 bg-primary-border rounded-full mt-1 overflow-hidden">
          <div className="h-full bg-[#E47A2E]" style={{ width: `${percentage}%` }} />
        </div>
      </div>
    </div>
  );
};

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showVoterQuestBadge, setShowVoterQuestBadge] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { activeTab, setActiveTab } = useElectionStore();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const siteFilter = "site:voters.eci.gov.in OR site:eci.gov.in";
    const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)} ${encodeURIComponent(siteFilter)}`;
    window.open(url, '_blank');
    setSearchQuery('');
  };

  const dismissBadge = () => setShowVoterQuestBadge(false);

  const navLinks = [
    { id: 'timeline', label: "Timeline" },
    { id: 'voter-quest', label: "Voter Quest" },
    { id: 'myth-vs-fact', label: "Myth vs. Fact" },
    { id: 'rep-finder', label: "Political Info" },
    { id: 'latest-news', label: "Latest News" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-8 py-4 bg-primary-bg/90 backdrop-blur-lg border-b border-primary-border shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img
            src="/flag.svg"
            alt="Official Flag of India - Democracy Journey Logo"
            className="indian-flag-logo"
          />
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-primary-text">
            <TranslatedText text="Democracy Journey" />
          </h1>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative w-full group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search official ECI data..."
              aria-label="Search official ECI data"
              className="w-full bg-secondary-bg/50 border-2 border-primary-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#E47A2E] focus:border-transparent transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text group-focus-within:text-[#E47A2E] transition-colors" />
          </form>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav>
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <li key={link.id} className="relative">
                    <button
                      onClick={() => {
                        setActiveTab(link.id);
                        if (link.id === 'voter-quest') dismissBadge();
                      }}
                      className={`text-sm font-semibold transition-colors duration-300 py-1 ${isActive
                        ? 'text-[#E47A2E] border-b-2 border-[#E47A2E]'
                        : 'text-muted-text hover:text-primary-text'
                        }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <TranslatedText text={link.label} />
                    </button>
                    {link.id === 'voter-quest' && showVoterQuestBadge && activeTab !== 'voter-quest' && (
                      <div
                        className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap animate-pulse-soft cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTab('voter-quest');
                          dismissBadge();
                        }}
                      >
                        <div className="bg-[#E47A2E] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1 border border-white/20">
                          <TranslatedText text="Try Voter Quest here!" />
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                        </div>
                        <div className="w-2 h-2 bg-[#E47A2E] rotate-45 mx-auto -mt-1 border-r border-b border-white/20" />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="h-6 w-[1px] bg-primary-border mx-2" />

          {/* Gamification Progress */}
          <ProgressRing />

          {/* Accessibility Hub */}
          <AccessibilityHub />
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ProgressRing />
          <AccessibilityHub />
          <button
            className={`text-primary-text p-2 rounded-lg transition-all ${!isMobileMenuOpen && showVoterQuestBadge && activeTab !== 'voter-quest'
              ? 'ring-2 ring-[#E47A2E] animate-pulse shadow-[0_0_15px_rgba(228,122,46,0.4)]'
              : ''
              }`}
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              if (!isMobileMenuOpen) dismissBadge();
            }}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Global Mobile Floating Badge */}
      <div className="md:hidden">
        {showVoterQuestBadge && activeTab !== 'voter-quest' && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-12 left-10 z-50 animate-pulse-soft cursor-pointer"
            onClick={() => {
              setActiveTab('voter-quest');
              dismissBadge();
            }}
          >
            <div className="bg-[#E47A2E] text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-white/20">
              <TranslatedText text="Try Voter Quest here!" />
              <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            </div>
          </motion.div>
        )}
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
                      if (link.id === 'voter-quest') dismissBadge();
                    }}
                    className={`text-base font-semibold w-full text-left ${isActive ? 'text-[#E47A2E]' : 'text-muted-text'
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
