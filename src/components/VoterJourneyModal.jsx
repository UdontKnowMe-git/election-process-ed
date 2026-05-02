import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Info, MousePointer2, Vote } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
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
          <h4 className="text-white font-bold mb-2"><TranslatedText text="Interactive EVM Simulation" /></h4>
          <p className="text-white/50 text-xs mb-4"><TranslatedText text="Click the blue button to see how the VVPAT verification works." /></p>

          <div className="w-48 h-64 bg-slate-800 rounded-xl p-4 shadow-inner border-2 border-slate-700 flex flex-col gap-4">
            <div className="h-8 bg-slate-900 rounded flex items-center px-3 border border-slate-700">
              <div className={`w-3 h-3 rounded-full ${isCasting ? 'bg-red-500 animate-pulse' : 'bg-green-500 shadow-[0_0_5px_#22c55e]'}`} />
              <span className="text-[8px] text-white/40 ml-2 uppercase font-mono"><TranslatedText text="Ready to vote" /></span>
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
          <div className="text-white/40 text-[10px] uppercase font-bold mb-2"><TranslatedText text="VVPAT Unit" /></div>
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
                    <span className="text-[6px] text-black font-black uppercase text-center"><TranslatedText text="Your Vote Is Registered" /></span>
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
              <div className="text-[8px] text-white/20 font-mono"><TranslatedText text="Verification Window" /></div>
            </div>
          </div>
          <p className="text-[10px] text-white/40 mt-3 text-center italic">
            <TranslatedText text="Slip remains visible for 7 seconds before falling into the box." />
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * VoterJourneyModal Component
 * Role: A responsive glassmorphism modal that displays the detailed steps and interactive EVM 
 * for a selected stage of the Voter Journey.
 */
export const VoterJourneyModal = ({ isOpen, onClose, data }) => {
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
        className="relative w-full max-w-2xl dark:bg-white/10 bg-[rgba(255,255,255,0.8)] border dark:border-white/20 border-slate-300/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[85vh] styled-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full dark:bg-white/5 bg-gray-200 hover:bg-gray-300 dark:hover:bg-white/10 transition-colors border dark:border-white/10 border-slate-300/50 dark:!text-white !text-slate-900"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-400/30">
            <data.icon className="text-blue-600 dark:text-blue-400" size={32} />
          </div>
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest text-sm uppercase">{data.stage}</span>
            <h2 className="text-3xl font-black !text-primary-text"><TranslatedText text={data.title} /></h2>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="!text-muted-text font-semibold mb-3 flex items-center gap-2">
              <Info size={16} /> <TranslatedText text="Key Steps" />
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.details.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 p-3 rounded-xl dark:bg-white/5 bg-gray-100 border dark:border-white/10 border-slate-300/50">
                  <CheckCircle2 size={18} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span className="!text-muted-text text-sm"><TranslatedText text={step} /></span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-400/20">
            <h4 className="text-blue-700 dark:text-blue-400 font-bold mb-2 flex items-center gap-2">
              <MousePointer2 size={16} /> <TranslatedText text="How to proceed:" />
            </h4>
            <p className="!text-muted-text text-sm leading-relaxed">
              <TranslatedText text={data.details.howTo} />
            </p>
          </div>

          {data.hasEVM && <VirtualEVM />}
        </div>
      </motion.div>
    </motion.div>
  );
};
