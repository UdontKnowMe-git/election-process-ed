import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Timeline2D } from './Timeline2D';
import { VoterQuest } from './VoterQuest';
import { MythVsFact } from './MythVsFact';
import { LatestNews } from './LatestNews';
import { VoterPledge } from './VoterPledge';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PoliticalInfo } from './PoliticalInfo';
import { useElectionStore } from '../store/useElectionStore';
import { useTranslation } from '../hooks/useTranslation';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

export const ElectionJourney = () => {
  const { activeTab } = useElectionStore();
  const { scrollY } = useScroll();

  // Scroll-linked background transitions
  const mapOpacity = useTransform(scrollY, [0, 800], [0.1, 0.4]);
  const blurValue = useTransform(scrollY, [0, 800], [0, 12]);
  const tintOpacity = useTransform(scrollY, [0, 800], [0, 0.15]);

  // Smooth out the spring transitions for mobile fluidity
  const smoothOpacity = useSpring(mapOpacity, { stiffness: 100, damping: 30 });
  const smoothBlur = useSpring(blurValue, { stiffness: 100, damping: 30 });
  const smoothTint = useSpring(tintOpacity, { stiffness: 100, damping: 30 });

  // Smooth scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen text-primary-text flex flex-col relative">
      {/* Fixed Background Architecture */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        {/* Base Background Color (moved from parent div) */}
        <div className="absolute inset-0 bg-primary-bg -z-20" />

        {/* Dynamic Tint Overlay */}
        <motion.div 
          style={{ opacity: smoothTint }}
          className="absolute inset-0 bg-white/20 dark:bg-ashoka-blue-500/10 -z-10"
        />
        
        {/* India Map Fixed Image */}
        <motion.img
          src="/in-map.svg"
          alt=""
          style={{ 
            opacity: smoothOpacity,
            filter: useTransform(smoothBlur, (v) => `blur(${v}px)`),
            willChange: 'transform, opacity, filter'
          }}
          className="w-full h-full object-contain max-w-5xl scale-110 lg:scale-125 -z-10"
        />
      </div>

      <Navbar />

      {/* Main Content Area */}
      <main className="pt-20 flex-1 w-full relative">
        {activeTab === 'timeline' && (
          <div className="animate-in fade-in zoom-in-95 duration-500 relative">
            {/* Removed the local absolute background to use the global fixed one */}

            <div className="max-w-4xl mx-auto px-4 py-16 text-center relative z-10">
              {/* Thirukkural 740 Quote */}
              <div
                className="mb-12 animate-in slide-in-from-top duration-1000"
                aria-label="Thirukkural 740: Verse on Governance"
              >
                <p className="font-serif text-lg md:text-xl text-ashoka-blue-500 dark:text-saffron-500 mb-3 italic">
                  'ஆங்கமை வெய்தியக் கண்ணும் பயமின்றே வேந்தமை வில்லாத நாடு.'
                </p>
                <p className="font-serif text-sm md:text-base text-muted-text max-w-2xl mx-auto leading-relaxed">
                  <TranslatedText text="Though blessed with every other excellence, a land gains nothing if it is not at peace with its ruler (or lacks a righteous government)." />
                </p>
              </div>

              <h2 className="text-5xl md:text-7xl font-black text-primary-text mb-6 tracking-tighter">
                <TranslatedText text="The Path To Lok Sabha" />
              </h2>
              <p className="text-xl text-muted-text max-w-2xl mx-auto leading-relaxed">
                <TranslatedText text="Follow the rigorous and historic timeline that defines how the Indian Government is elected." />
              </p>
            </div>
            <Timeline2D />

            {/* Home Page Bottom Section */}
            <VoterPledge />

            {/* Mission Statement Section */}
            <section id="mission-statement" className="py-24 px-6 border-t border-primary-border bg-secondary-bg/30">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-3xl md:text-5xl font-black text-primary-text mb-8 tracking-tight">
                  <TranslatedText text="Mission Statement" />
                </h3>
                <p className="text-xl md:text-2xl text-muted-text leading-relaxed font-medium italic">
                  <TranslatedText text="&ldquo;Empowering Indian citizens through interactive civic education.&rdquo;" />
                </p>
                <div className="mt-12 flex justify-center gap-4">
                  <div className="w-12 h-1 bg-saffron-500 rounded-full" />
                  <div className="w-12 h-1 bg-white rounded-full" />
                  <div className="w-12 h-1 bg-india-green-500 rounded-full" />
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'voter-quest' && (
          <div className="animate-in fade-in duration-500">
            <VoterQuest />
          </div>
        )}

        {activeTab === 'myth-vs-fact' && (
          <div className="animate-in fade-in duration-500">
            <MythVsFact />
          </div>
        )}

        {activeTab === 'rep-finder' && (
          <div className="animate-in fade-in duration-500">
            <PoliticalInfo />
          </div>
        )}
        
        {activeTab === 'latest-news' && (
          <div className="animate-in fade-in duration-500">
            <LatestNews />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
