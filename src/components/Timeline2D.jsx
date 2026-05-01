import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import timelineData from '../data/timelineData.json';
import { useElectionStore } from '../store/useElectionStore';
import { useTranslation } from '../hooks/useTranslation';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

const TimelineItem = ({ data, index, totalItems }) => {
  const { reducedMotion, markTimelinePoint } = useElectionStore();
  const ref = useRef(null);
  
  // Track viewing
  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          markTimelinePoint(index);
        }
      }, { threshold: 0.5 });
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [index, markTimelinePoint]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.3 1"]
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [0.6, 1]);

  const isFirst = index === 0;
  const isLast = index === totalItems - 1;

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className={`flex flex-col md:flex-row items-center justify-between mb-16 sm:mb-24 w-full ${
        index % 2 === 0 ? 'md:flex-row-reverse' : ''
      }`}
    >
      <div className="w-full md:w-5/12 mb-6 md:mb-0">
        <div className="relative group overflow-hidden rounded-2xl shadow-xl border border-primary-border">
          <div className="absolute inset-0 bg-ashoka-blue-500 opacity-20 group-hover:opacity-0 transition-opacity duration-500 z-10 rounded-2xl" />
          <img
            src={data.imageUrl}
            alt={data.title}
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>
      </div>
      
      {/* Center timeline point with connector line */}
      <div className={`hidden md:flex flex-col items-center justify-center w-2/12 relative self-stretch
        before:absolute before:left-1/2 before:-translate-x-1/2 before:w-[2px] before:bg-[rgba(255,165,0,0.3)] before:z-0
        ${isFirst ? 'before:top-1/2 before:bottom-[-100px]' : 
          isLast ? 'before:bottom-1/2 before:top-[-100px]' : 
          'before:top-[-100px] before:bottom-[-100px]'}
      `}>
        {/* Glowing Dot */}
        <div className="w-4 h-4 bg-[#E47A2E] rounded-full border-4 border-primary-bg shadow-[0_0_15px_rgba(228,122,46,0.6)] z-20 sticky top-1/2" />
      </div>

      <div className={`w-full md:w-5/12 px-4 md:px-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
        <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-bg text-primary-text font-bold tracking-wider text-sm mb-4 border border-primary-border shadow-sm backdrop-blur-sm">
          {data.date}
        </span>
        <h3 className="text-3xl font-extrabold text-primary-text mb-4 tracking-tight">
          <TranslatedText text={data.title} />
        </h3>
        <p className="text-muted-text leading-relaxed text-lg">
          <TranslatedText text={data.description} />
        </p>
      </div>
    </motion.div>
  );
};

export const Timeline2D = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20 relative bg-transparent overflow-hidden">
      <div className="relative z-10">
        {timelineData.map((item, index) => (
          <TimelineItem 
            key={item.id} 
            data={item} 
            index={index} 
            totalItems={timelineData.length} 
          />
        ))}
      </div>
    </div>
  );
};
