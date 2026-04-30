import React from 'react';
import { Timeline2D } from './Timeline2D';
import { VoterQuest } from './VoterQuest';
import { MythVsFact } from './MythVsFact';
import { Navbar } from './Navbar';
import { useElectionStore } from '../store/useElectionStore';

export const ElectionJourney = () => {
  const { activeTab } = useElectionStore();

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A365D]">
      <Navbar />

      {/* Main Content Area */}
      <main className="pt-20 h-full w-full relative">
        {activeTab === 'timeline' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
             <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h2 className="text-5xl md:text-7xl font-black text-[#1A365D] mb-6 tracking-tighter">
                   The Path to the <br/><span className="text-[#E47A2E]">Lok Sabha</span>
                </h2>
                <p className="text-xl text-[#1A365D]/70 max-w-2xl mx-auto leading-relaxed">
                   Follow the rigorous and historic timeline that defines how the Indian Government is elected.
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

        {activeTab === 'civic-guru' && (
          <div className="animate-in fade-in duration-500 flex items-center justify-center min-h-[60vh]">
             <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-[#1A365D]/10 max-w-md">
                <h2 className="text-3xl font-black text-[#1A365D] mb-4">Civic Guru</h2>
                <p className="text-[#1A365D]/70">
                  Click the floating chat bubble in the bottom right corner to speak with the Civic Guru AI!
                </p>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};
