import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useElectionStore } from '../store/useElectionStore';
import { ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

// Custom SVG Icons for Brands (Since current Lucide version lacks them)
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ContactModal = ({ isOpen, onClose }) => {
  const { dyslexiaFont } = useElectionStore();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className={`relative w-full max-w-md p-8 rounded-3xl border shadow-2xl bg-card border-primary-border ${dyslexiaFont ? 'font-lexend' : ''
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary-bg transition-colors text-muted-text"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="text-center">
            <div className="w-20 h-20 bg-accent-main/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <img
                src="/flag.svg"
                alt="India Flag"
                className="w-12 h-auto"
              />
            </div>

            <h3 className="text-2xl font-black text-primary-text mb-2">
              Hariram S
            </h3>
            <p className="text-muted-text font-bold uppercase tracking-wider text-xs mb-8">
              Full Stack Developer & AI/ML Student
            </p>

            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/UdontKnowMe-git"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div className="p-4 bg-secondary-bg border border-primary-border rounded-2xl text-primary-text group-hover:bg-[#24292e] group-hover:text-white group-hover:border-[#24292e] transition-all duration-300 shadow-sm">
                  <GithubIcon size={28} />
                </div>
                <span className="text-[10px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/hariram-s-14a1l/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div className="p-4 bg-secondary-bg border border-primary-border rounded-2xl text-primary-text group-hover:bg-[#0077b5] group-hover:text-white group-hover:border-[#0077b5] transition-all duration-300 shadow-sm">
                  <LinkedinIcon size={28} />
                </div>
                <span className="text-[10px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export const Footer = () => {
  const { setActiveTab, activeTab } = useElectionStore();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleAboutClick = () => {
    if (activeTab !== 'timeline') {
      setActiveTab('timeline');
      // Delay scroll to allow tab to mount
      setTimeout(() => {
        const element = document.getElementById('mission-statement');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      const element = document.getElementById('mission-statement');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="w-full bg-secondary-bg border-t border-primary-border py-16 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

        {/* Branding Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/flag.svg"
              alt="Official Flag of India - Democracy Journey Logo"
              className="indian-flag-logo flex-shrink-0"
            />
            <div className="min-w-0">
              <h2 className="text-xl font-black text-primary-text truncate">
                <TranslatedText text="Democracy Journey" />
              </h2>
              <p className="text-[9px] md:text-[10px] text-muted-text uppercase tracking-widest font-black whitespace-nowrap overflow-hidden text-ellipsis">
                <TranslatedText text="A Civic Education Initiative" />
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-text leading-relaxed mt-2 max-w-xs">
            <TranslatedText text="Empowering citizens through interactive storytelling and verified electoral data." />
          </p>
          <a
            href="https://forms.gle/u1MfYuwSyoGc6igs7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-black uppercase tracking-widest text-[#E47A2E] hover:underline mt-2 flex items-center gap-2"
          >
            <TranslatedText text="Report an Issue" />
            <ExternalLink size={10} />
          </a>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary-text opacity-50">
            <TranslatedText text="Explore" />
          </h3>
          <nav className="flex flex-col gap-3 text-sm font-bold text-muted-text">
            <button
              onClick={handleAboutClick}
              className="hover:text-saffron-500 transition-colors text-left flex items-center gap-2 group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-saffron-500 scale-0 group-hover:scale-100 transition-transform" />
              <TranslatedText text="About the Project" />
            </button>
            <a
              href="https://voters.eci.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ashoka-blue-500 transition-colors text-left flex items-center gap-2 group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-ashoka-blue-500 scale-0 group-hover:scale-100 transition-transform" />
              <TranslatedText text="ECI Voter Guide" />
              <ExternalLink size={12} className="opacity-50" />
            </a>
            <button
              onClick={() => setIsContactOpen(true)}
              className="hover:text-india-green-500 transition-colors text-left flex items-center gap-2 group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-india-green-500 scale-0 group-hover:scale-100 transition-transform" />
              <TranslatedText text="Contact Developer" />
            </button>
          </nav>
        </div>

        {/* Socials Section */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary-text opacity-50">
            <TranslatedText text="Connect" />
          </h3>
          <div className="flex gap-4">
            <a
              href="https://github.com/UdontKnowMe-git"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary-bg border border-primary-border rounded-xl text-primary-text hover:bg-[#24292e] hover:text-white hover:border-[#24292e] transition-all shadow-sm group"
              aria-label="GitHub"
            >
              <GithubIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>

            <a
              href="https://www.linkedin.com/in/hariram-s-14a1l/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary-bg border border-primary-border rounded-xl text-primary-text hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all shadow-sm group"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
          </div>
          <div className="text-xs text-muted-text">
            <p>© 2024 Democracy Journey.</p>
            <p className="opacity-50 mt-1"><TranslatedText text="Built with transparency and civic pride." /></p>
          </div>
        </div>

      </div>

      {/* Contact Overlay */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </footer>
  );
};
