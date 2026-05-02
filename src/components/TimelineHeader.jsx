import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';

/**
 * TimelineHeader Component
 * Role: Controls the title text and the main toggle switch between the Historical Milestones and the Voter Roadmap.
 */
export const TimelineHeader = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex flex-col items-center mb-20 text-center relative z-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-black !text-primary-text mb-4">
          {viewMode === 'historical' ? 'Historical Milestones' : 'The Voter Journey'}
        </h2>
        <p className="!text-muted-text max-w-2xl mx-auto">
          {viewMode === 'historical'
            ? 'Trace the evolution of democracy through these key historical moments.'
            : 'A step-by-step roadmap for every Indian citizen to exercise their franchise.'}
        </p>
      </motion.div>

      <div className="flex items-center p-1.5 dark:bg-white/5 bg-[#E5E7EB] border dark:border-white/10 border-gray-300 rounded-2xl backdrop-blur-md">
        <button
          onClick={() => setViewMode('historical')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${viewMode === 'historical'
              ? 'bg-[#E47A2E] text-white shadow-lg'
              : '!text-muted-text hover:!text-primary-text hover:bg-black/5 dark:hover:bg-white/5'
            }`}
        >
          Historical Timeline
        </button>
        <button
          onClick={() => setViewMode('voter')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${viewMode === 'voter'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
              : '!text-muted-text hover:!text-primary-text hover:bg-black/5 dark:hover:bg-white/5'
            }`}
        >
          <MousePointer2 size={16} /> Voter Roadmap
        </button>
      </div>
    </div>
  );
};
