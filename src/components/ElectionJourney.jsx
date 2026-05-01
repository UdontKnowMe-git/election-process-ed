import React from 'react';
import { Timeline2D } from './Timeline2D';
import { VoterQuest } from './VoterQuest';
import { MythVsFact } from './MythVsFact';
import { LatestNews } from './LatestNews';
import { VoterPledge } from './VoterPledge';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useElectionStore } from '../store/useElectionStore';
import { useTranslation } from '../hooks/useTranslation';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

export const ElectionJourney = () => {
  const { activeTab } = useElectionStore();

  // Smooth scroll to top on tab change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-primary-bg text-primary-text flex flex-col">
      <Navbar />

      {/* Main Content Area */}
      <main className="pt-20 flex-1 w-full relative">
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
