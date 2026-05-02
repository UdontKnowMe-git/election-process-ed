import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ClipboardList,
  Search,
  Vote,
  TrendingUp,
  X,
  ChevronRight,
  CheckCircle2,
  Info,
  MousePointer2,
  AlertCircle
} from 'lucide-react';
import timelineData from '../data/timelineData.json';
import { useElectionStore } from '../store/useElectionStore';
import { useTranslation } from '../hooks/useTranslation';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

const voterJourneyData = [
  {
    id: 'stage1',
    stage: 'Stage 1',
    title: 'Registration',
    description: 'The foundation of your democratic right.',
    icon: ClipboardList,
    accent: '#3B82F6', // Electric Blue
    details: {
      steps: [
        'Fill Form 6 for new registration.',
        'Ensure you are 18+ years of age.',
        'Apply for your Voter ID (EPIC card).'
      ],
      howTo: 'Visit the National Voters\' Service Portal (NVSP) or use the Voter Helpline App to register online.'
    }
  },
  {
    id: 'stage2',
    stage: 'Stage 2',
    title: 'Verification',
    description: 'Ensure your name is in the roll.',
    icon: Search,
    accent: '#3B82F6',
    details: {
      steps: [
        'Check your name in the Electoral Roll.',
        'Locate your designated Polling Booth.',
        'Download your Digital Voter Slip.'
      ],
      howTo: 'Search your details on electoralsearch.in using your EPIC number or personal details.'
    }
  },
  {
    id: 'stage3',
    stage: 'Stage 3',
    title: 'The Big Day',
    description: 'The 5-step booth process.',
    icon: Vote,
    accent: '#3B82F6',
    hasEVM: true,
    details: {
      steps: [
        'ID Check: Verification by First Polling Officer.',
        'Inking: Marking with indelible ink.',
        'Register: Signing the 17A Register.',
        'EVM Vote: Pressing the blue button.',
        'VVPAT: Verifying the printed slip.'
      ],
      howTo: 'Carry one of the 12 approved ID proofs along with your Voter Slip to the polling station.'
    }
  },
  {
    id: 'stage4',
    stage: 'Stage 4',
    title: 'Post-Poll',
    description: 'Counting and Results.',
    icon: TrendingUp,
    accent: '#3B82F6',
    details: {
      steps: [
        'Monitor Voter Turnout in real-time.',
        'Counting Day: The tallying process.',
        'Declaration of Results.'
      ],
      howTo: 'Follow the results on the ECI Results website or the Voter Helpline App.'
    }
  }
];

const GlassmorphismModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl dark:bg-white/10 bg-[rgba(255,255,255,0.8)] border dark:border-white/20 border-gray-300 backdrop-blur-xl rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[85vh] styled-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full dark:bg-white/5 bg-gray-200 hover:bg-gray-300 dark:hover:bg-white/10 transition-colors border dark:border-white/10 border-gray-300 dark:text-white text-gray-800"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-400/30">
            <data.icon className="text-blue-600 dark:text-blue-400" size={32} />
          </div>
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest text-sm uppercase">{data.stage}</span>
            <h2 className="text-3xl font-black text-[#1A1A1A] dark:text-white"><TranslatedText text={data.title} /></h2>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-[#1A1A1A]/70 dark:text-white/60 font-semibold mb-3 flex items-center gap-2">
              <Info size={16} /> Key Steps
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.details.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 p-3 rounded-xl dark:bg-white/5 bg-gray-100 border dark:border-white/10 border-gray-200">
                  <CheckCircle2 size={18} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-[#1A1A1A]/80 dark:text-white/80 text-sm"><TranslatedText text={step} /></span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-400/20">
            <h4 className="text-blue-700 dark:text-blue-400 font-bold mb-2 flex items-center gap-2">
              <MousePointer2 size={16} /> How to proceed:
            </h4>
            <p className="text-[#1A1A1A]/80 dark:text-white/80 text-sm leading-relaxed">
              <TranslatedText text={data.details.howTo} />
            </p>
          </div>

          {data.hasEVM && <VirtualEVM />}
        </div>
      </motion.div>
    </motion.div>
  );
};

const VirtualEVM = () => {
  const [isCasting, setIsCasting] = useState(false);
  const [showSlip, setShowSlip] = useState(false);

  const handleVote = () => {
    if (isCasting) return;
    setIsCasting(true);

    // Simulate EVM Process
    setTimeout(() => {
      setShowSlip(true);
      setTimeout(() => {
        setShowSlip(false);
        setIsCasting(false);
      }, 7000); // 7-second VVPAT verification
    }, 500);
  };

  return (
    <div className="mt-8 p-6 rounded-2xl bg-slate-900/50 border border-white/5 relative overflow-hidden">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="flex-1">
          <h4 className="text-white font-bold mb-2">Interactive EVM Simulation</h4>
          <p className="text-white/50 text-xs mb-4">Click the blue button to see how the VVPAT verification works.</p>

          <div className="w-48 h-64 bg-slate-800 rounded-xl p-4 shadow-inner border-2 border-slate-700 flex flex-col gap-4">
            <div className="h-8 bg-slate-900 rounded flex items-center px-3 border border-slate-700">
              <div className={`w-3 h-3 rounded-full ${isCasting ? 'bg-red-500 animate-pulse' : 'bg-green-500 shadow-[0_0_5px_#22c55e]'}`} />
              <span className="text-[8px] text-white/40 ml-2 uppercase font-mono">Ready to vote</span>
            </div>

            <div className="flex-1 bg-slate-700/50 rounded flex flex-col gap-2 p-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-8 bg-slate-800 rounded border border-slate-600 flex items-center justify-between px-2">
                  <div className="w-4 h-4 bg-white/10 rounded-sm" />
                  <button
                    onClick={handleVote}
                    disabled={isCasting}
                    className={`w-6 h-4 rounded-sm transition-all duration-300 ${isCasting ? 'bg-slate-700' : 'bg-blue-600 hover:bg-blue-500 shadow-[0_2px_0_#2563eb] active:translate-y-[1px] active:shadow-none'}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <div className="text-white/40 text-[10px] uppercase font-bold mb-2">VVPAT Unit</div>
          <div className="w-40 h-52 bg-slate-800 rounded-lg relative border-2 border-slate-700 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
            <div className="h-10 bg-slate-900 border-b border-slate-700 flex items-center justify-center">
              <div className="w-24 h-1 bg-black rounded-full" />
            </div>

            <AnimatePresence>
              {showSlip && (
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 150, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute top-12 left-1/2 -translate-x-1/2 w-28 h-32 bg-white rounded-sm p-2 shadow-2xl flex flex-col items-center justify-between"
                >
                  <div className="w-full h-[2px] bg-black/10" />
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                      <Vote className="text-blue-600" size={24} />
                    </div>
                    <span className="text-[6px] text-black font-black uppercase text-center">Your Vote Is Registered</span>
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="w-8 h-1 bg-black/5" />
                    <div className="w-8 h-1 bg-black/5" />
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6 }}
                    className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-4 flex justify-center">
              <div className="text-[8px] text-white/20 font-mono">Verification Window</div>
            </div>
          </div>
          <p className="text-[10px] text-white/40 mt-3 text-center italic">Slip remains visible for 7 seconds <br /> before falling into the box.</p>
        </div>
      </div>
    </div>
  );
};

const VoterJourneyItem = ({ data, index, totalItems, onClick }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.3 1"]
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

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
        <h3 className="text-3xl font-black text-primary-text mb-4 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <TranslatedText text={data.title} />
        </h3>
        <p className="text-muted-text leading-relaxed text-lg">
          <TranslatedText text={data.description} />
        </p>
      </div>
    </motion.div>
  );
};

const TimelineItem = ({ data, index, totalItems }) => {
  const { reducedMotion, markTimelinePoint } = useElectionStore();
  const ref = useRef(null);

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
  const [viewMode, setViewMode] = useState('historical'); // 'historical' or 'voter'
  const [selectedStage, setSelectedStage] = useState(null);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 relative dark:bg-transparent bg-[#F5F7F8] overflow-hidden rounded-3xl">
      {/* Timeline Header with Toggle */}
      <div className="flex flex-col items-center mb-20 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-black text-primary-text mb-4">
            {viewMode === 'historical' ? 'Historical Milestones' : 'The Voter Journey'}
          </h2>
          <p className="text-muted-text max-w-2xl mx-auto">
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
                : 'text-muted-text hover:text-primary-text hover:bg-black/5 dark:hover:bg-white/5'
              }`}
          >
            Historical Timeline
          </button>
          <button
            onClick={() => setViewMode('voter')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${viewMode === 'voter'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'text-muted-text hover:text-primary-text hover:bg-black/5 dark:hover:bg-white/5'
              }`}
          >
            <MousePointer2 size={16} /> Voter Roadmap
          </button>
        </div>
      </div>

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
              {voterJourneyData.map((item, index) => (
                <VoterJourneyItem
                  key={item.id}
                  data={item}
                  index={index}
                  totalItems={voterJourneyData.length}
                  onClick={(stage) => setSelectedStage(stage)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedStage && (
          <GlassmorphismModal
            isOpen={!!selectedStage}
            onClose={() => setSelectedStage(null)}
            data={selectedStage}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
