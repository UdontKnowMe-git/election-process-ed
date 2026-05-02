import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTimelineLogic } from '../hooks/useTimelineLogic';
import { useTranslation } from '../hooks/useTranslation';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

/**
 * JourneyStage Component
 * Role: Represents an individual interactive stage node in the Voter Roadmap.
 * Clicking this node will open the VoterJourneyModal to view the detailed steps.
 */
export const JourneyStage = ({ data, index, totalItems, onClick }) => {
  const { ref, scaleProgress, opacityProgress } = useTimelineLogic(index);

  const isFirst = index === 0;
  const isLast = index === totalItems - 1;

  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className={`flex flex-col md:flex-row items-center justify-between mb-24 w-full cursor-pointer group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
        }`}
      onClick={() => onClick(data)}
    >
      <div className="w-full md:w-5/12 mb-6 md:mb-0">
        <div className="relative aspect-video rounded-3xl overflow-hidden dark:bg-blue-500/5 bg-slate-200 border dark:border-blue-500/20 border-gray-300 group-hover:border-blue-400/50 transition-all duration-500 shadow-lg group-hover:shadow-blue-500/10">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <data.icon className="text-blue-600 dark:text-blue-500 relative z-10 group-hover:scale-110 transition-transform duration-500" size={80} />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-blue-900/40 to-transparent">
            <div className="flex items-center gap-2 text-blue-300 font-bold text-xs uppercase tracking-widest">
              Learn More <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col items-center justify-center w-2/12 relative self-stretch">
        <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-blue-500/20 z-0
          ${isFirst ? 'top-1/2 bottom-[-100px]' : isLast ? 'bottom-1/2 top-[-100px]' : 'top-[-100px] bottom-[-100px]'}
        `} />
        <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-[#0F172A] shadow-[0_0_20px_rgba(37,99,235,0.8)] z-20 sticky top-1/2 transition-transform duration-300 group-hover:scale-125" />
      </div>

      <div className={`w-full md:w-5/12 px-4 md:px-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 !text-blue-700 dark:!text-blue-400 font-bold tracking-wider text-xs mb-4 border border-blue-500/20 shadow-sm">
          {data.stage}
        </span>
        <h3 className="text-3xl font-black !text-primary-text mb-4 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <TranslatedText text={data.title} />
        </h3>
        <p className="!text-muted-text leading-relaxed text-lg">
          <TranslatedText text={data.description} />
        </p>
      </div>
    </motion.div>
  );
};
