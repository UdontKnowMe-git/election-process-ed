import React from 'react';
import { Timeline2D } from './Timeline2D';
import { Navbar } from './Navbar';

export const ElectionJourney = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A365D]">
      <Navbar />

      {/* Main Content Area */}
      <main className="pt-20 h-full w-full relative">
        <div className="animate-in fade-in zoom-in-95 duration-500">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h2 className="text-5xl md:text-7xl font-black text-[#1A365D] mb-6 tracking-tighter">
              The Path to the <br /><span className="text-[#E47A2E]">Lok Sabha</span>
            </h2>
            <p className="text-xl text-[#1A365D]/70 max-w-2xl mx-auto leading-relaxed">
              Follow the rigorous and historic timeline that defines how the Indian Government is elected.
            </p>
          </div>
          <Timeline2D />
        </div>
      </main>
    </div>
  );
};
