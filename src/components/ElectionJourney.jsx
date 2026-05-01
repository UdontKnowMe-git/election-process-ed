import React from 'react';
import { Timeline2D } from './Timeline2D';
import { VoterQuest } from './VoterQuest';
import { MythVsFact } from './MythVsFact';
import { LatestNews } from './LatestNews';
import { Navbar } from './Navbar';
import { useElectionStore } from '../store/useElectionStore';
import { useTranslation } from '../hooks/useTranslation';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

export const ElectionJourney = () => {
  const { activeTab } = useElectionStore();

  return (
    <div className="min-h-screen bg-primary-bg text-primary-text">
      <Navbar />

      {/* Main Content Area */}
      <main className="pt-20 h-full w-full relative">
        {activeTab === 'timeline' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
             <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h2 className="text-5xl md:text-7xl font-black text-primary-text mb-6 tracking-tighter">
                   <TranslatedText text="The Road to Lok Sabha" />
                </h2>
                <p className="text-xl text-muted-text max-w-2xl mx-auto leading-relaxed">
                   <TranslatedText text="Follow the rigorous and historic timeline that defines how the Indian Government is elected." />
                </p>
             </div>
            <Timeline2D />
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

        {activeTab === 'latest-news' && (
          <div className="animate-in fade-in duration-500">
             <LatestNews />
          </div>
        )}
      </main>
    </div>
  );
};
