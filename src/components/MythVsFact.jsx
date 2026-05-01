import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mythData from '../data/mythData.json';
import { useTranslation } from '../hooks/useTranslation';
import { HelpCircle, CheckCircle2, AlertCircle, Gamepad2 } from 'lucide-react';
import { MythFlipCards } from './MythFlipCards';
import { useElectionStore } from '../store/useElectionStore';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

const FlipCard = ({ myth }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { reducedMotion } = useElectionStore();

  return (
    <motion.div
      whileHover={reducedMotion ? {} : { y: -8, scale: 1.02 }}
      className="perspective-1000 w-full h-80 cursor-pointer focus-within:ring-4 focus-within:ring-saffron-500 rounded-[2.5rem] outline-none group"
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => e.key === 'Enter' && setIsFlipped(!isFlipped)}
      tabIndex={0}
      role="button"
      aria-label={`Flip card for myth: ${myth.statement}`}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{
          rotateY: isFlipped ? 180 : 0,
          boxShadow: isFlipped
            ? "0 25px 50px -12px rgba(46, 139, 87, 0.25)"
            : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        transition={reducedMotion ? { duration: 0.2 } : { type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Side (Myth) */}
        <div className="absolute inset-0 backface-hidden bg-secondary-bg border-2 border-primary-border rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center z-20 overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#E47A2E_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
            <HelpCircle className="w-10 h-10" />
          </div>

          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-4 opacity-70">
            <TranslatedText text="Common Myth" />
          </h4>

          <p className="text-xl md:text-2xl font-black text-primary-text leading-[1.2] mb-6 px-2">
            "<TranslatedText text={myth.statement} />"
          </p>

          <div className="mt-auto text-[10px] font-black text-muted-text uppercase tracking-widest opacity-40 flex items-center gap-3">
            <div className="w-8 h-[1px] bg-muted-text/30" />
            <TranslatedText text="Reveal Fact" />
            <div className="w-8 h-[1px] bg-muted-text/30" />
          </div>
        </div>

        {/* Back Side (Fact) */}
        <div
          className="absolute inset-0 backface-hidden bg-secondary-bg border-2 border-india-green-500 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center rotate-y-180 z-10"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#2E8B57_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="w-16 h-16 bg-india-green-500/10 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm">
            <CheckCircle2 className="w-10 h-10 text-india-green-500" />
          </div>

          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-india-green-500 mb-4 opacity-70">
            <TranslatedText text="Verified Fact" />
          </h4>

          <p className="text-lg font-bold text-primary-text leading-relaxed px-2">
            <TranslatedText text={myth.explanation} />
          </p>

          <div className="mt-auto text-[10px] font-black text-muted-text uppercase tracking-widest opacity-40">
            <TranslatedText text="Source: ECI Guidelines" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const MythVsFact = () => {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const myths = mythData.myths || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-24 relative">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-primary-text mb-6 tracking-tighter">
            <TranslatedText text="Myth" /> <span className="text-saffron-500 italic"><TranslatedText text="Busters" /></span>
          </h2>
          <p className="text-xl text-muted-text max-w-2xl mx-auto leading-relaxed font-medium">
            <TranslatedText text="Challenge common misconceptions about the Indian electoral process with our interactive high-fidelity cards." />
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 perspective-1000">
        {myths.map((myth) => (
          <FlipCard key={myth.id} myth={myth} />
        ))}
      </div>

      {/* Game Trigger FAB */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: "5deg" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsGameOpen(true)}
        className="fixed bottom-12 left-10 p-6 bg-saffron-500 text-white rounded-[2rem] shadow-[0_20px_50px_rgba(228,122,46,0.4)] z-50 flex items-center gap-4 border-2 border-white/20 hover:bg-saffron-600 transition-colors group"
        aria-label="Launch Interactive Trivia Quest"
      >
        <Gamepad2 className="w-8 h-8 group-hover:animate-bounce" />
        <div className="flex flex-col items-start leading-none hidden md:flex">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">Interactive</span>
          <span className="font-black uppercase tracking-widest text-lg">
            <TranslatedText text="Trivia Quest" />
          </span>
        </div>
      </motion.button>

      {/* Footer Info */}
      <div className="mt-24 flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="flex items-center gap-4 text-sm text-muted-text bg-secondary-bg/50 py-4 px-8 rounded-3xl border border-primary-border shadow-sm backdrop-blur-md">
          <AlertCircle className="w-6 h-6 text-saffron-500" />
          <TranslatedText text="Accuracy is our priority. All facts are cross-referenced with ECI's Model Code of Conduct." />
        </div>
      </div>

      {/* Minigame Modal */}
      <AnimatePresence>
        {isGameOpen && (
          <MythFlipCards onClose={() => setIsGameOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};
