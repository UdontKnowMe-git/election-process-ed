import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import timelineData from '../data/timelineData.json';
import { VOTER_JOURNEY_DATA } from '../data/voterJourneyData';
import { useTimelineLogic } from '../hooks/useTimelineLogic';
import { useTranslation } from '../hooks/useTranslation';
import { useElectionStore } from '../store/useElectionStore';

import { TimelineHeader } from './TimelineHeader';
import { JourneyStage } from './JourneyStage';
import { VoterJourneyModal } from './VoterJourneyModal';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

const TimelineItem = ({ data, index, totalItems }) => {
  const { ref, scaleProgress, opacityProgress } = useTimelineLogic(index);

  const isFirst = index === 0;
  const isLast = index === totalItems - 1;

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className={`flex flex-col md:flex-row items-center justify-between mb-16 sm:mb-24 w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
        }`}
    >
      <div className="w-full md:w-5/12 mb-6 md:mb-0">
        <div className="relative group overflow-hidden rounded-2xl shadow-xl border border-primary-border">
          <div className="absolute inset-0 bg-ashoka-blue-500 opacity-20 group-hover:opacity-0 transition-opacity duration-500 z-10 rounded-2xl" />
          <img
            src={data.imageUrl}
            alt={data.title}
            loading="lazy"
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>
      </div>

      <div className={`hidden md:flex flex-col items-center justify-center w-2/12 relative self-stretch
        before:absolute before:left-1/2 before:-translate-x-1/2 before:w-[2px] before:bg-[rgba(255,165,0,0.3)] before:z-0
        ${isFirst ? 'before:top-1/2 before:bottom-[-100px]' :
          isLast ? 'before:bottom-1/2 before:top-[-100px]' :
            'before:top-[-100px] before:bottom-[-100px]'}
      `}>
        <div className="w-4 h-4 bg-[#E47A2E] rounded-full border-4 border-primary-bg shadow-[0_0_15px_rgba(228,122,46,0.6)] z-20 sticky top-1/2" />
      </div>

      <div className={`w-full md:w-5/12 px-4 md:px-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
        <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-bg !text-primary-text font-bold tracking-wider text-sm mb-4 border border-primary-border shadow-sm backdrop-blur-sm">
          {data.date}
        </span>
        <h3 className="text-3xl font-extrabold !text-primary-text mb-4 tracking-tight">
          <TranslatedText text={data.title} />
        </h3>
        <p className="!text-muted-text leading-relaxed text-lg">
          <TranslatedText text={data.description} />
        </p>
      </div>
    </motion.div>
  );
};

export const Timeline2D = () => {
  // A single state variable handling the transition between historical and voter timelines
  const [viewMode, setViewMode] = useState('historical'); // 'historical' or 'voter'
  const [selectedStage, setSelectedStage] = useState(null);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 relative dark:bg-transparent bg-[#F5F7F8] overflow-hidden rounded-3xl">
      <TimelineHeader viewMode={viewMode} setViewMode={setViewMode} />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {viewMode === 'historical' ? (
            <motion.div
              key="historical"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              {timelineData.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  data={item}
                  index={index}
                  totalItems={timelineData.length}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="voter"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {VOTER_JOURNEY_DATA.map((item, index) => (
                <JourneyStage
                  key={item.id}
                  data={item}
                  index={index}
                  totalItems={VOTER_JOURNEY_DATA.length}
                  onClick={(stage) => setSelectedStage(stage)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedStage && (
          <VoterJourneyModal
            isOpen={!!selectedStage}
            onClose={() => setSelectedStage(null)}
            data={selectedStage}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
