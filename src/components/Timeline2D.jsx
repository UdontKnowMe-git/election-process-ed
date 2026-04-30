import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import timelineData from '../data/timelineData.json';

const TimelineItem = ({ data, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.3 1"]
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

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
        <div className="relative group overflow-hidden rounded-2xl shadow-xl">
          <div className="absolute inset-0 bg-[#1A365D] opacity-20 group-hover:opacity-0 transition-opacity duration-500 z-10 rounded-2xl" />
          <img
            src={data.imageUrl}
            alt={data.title}
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>
      </div>
      
      {/* Center timeline point */}
      <div className="hidden md:flex flex-col items-center justify-center w-2/12 relative">
        <div className="w-4 h-4 bg-[#E47A2E] rounded-full border-4 border-[#FDFBF7] shadow-[0_0_15px_rgba(228,122,46,0.6)] z-20" />
        {/* Connection line */}
        <div className="absolute top-4 bottom-[-100%] w-1 bg-gradient-to-b from-[#E47A2E]/50 to-transparent z-10" />
      </div>

      <div className={`w-full md:w-5/12 px-4 md:px-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#1A365D]/10 text-[#1A365D] font-bold tracking-wider text-sm mb-4 border border-[#1A365D]/20 shadow-sm backdrop-blur-sm">
          {data.date}
        </span>
        <h3 className="text-3xl font-extrabold text-[#1A365D] mb-4 tracking-tight">
          {data.title}
        </h3>
        <p className="text-[#1A365D]/80 leading-relaxed text-lg">
          {data.description}
        </p>
      </div>
    </motion.div>
  );
};

export const Timeline2D = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20 relative bg-[#FDFBF7]">
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#1A365D]/10 transform -translate-x-1/2 hidden md:block" />
      
      <div className="relative z-10">
        {timelineData.map((item, index) => (
          <TimelineItem key={item.id} data={item} index={index} />
        ))}
      </div>
    </div>
  );
};
