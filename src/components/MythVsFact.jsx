import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import quizData from '../data/quizData.json';
import { Check, X as XIcon, RotateCcw } from 'lucide-react';
import { useElectionStore } from '../store/useElectionStore';
import { useTranslation } from '../hooks/useTranslation';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

export const MythVsFact = () => {
  const { theme, language } = useElectionStore();
  const [myths] = useState(quizData.myths || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const activeCard = myths[currentIndex];
  const nextCard = myths[currentIndex + 1];

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0]);
  
  const backgroundColor = useTransform(
    x,
    [-150, 0, 150],
    theme === 'dark' 
      ? ['#450a0a', 'var(--bg-secondary)', '#064e3b'] 
      : theme === 'high-contrast'
        ? ['#000000', '#000000', '#000000']
        : ['#fee2e2', '#ffffff', '#dcfce7']
  );
  
  const borderColor = useTransform(
    x,
    [-150, 0, 150],
    theme === 'high-contrast'
      ? ['#FFFF00', '#FFFF00', '#FFFF00']
      : ['#f87171', 'var(--border-color)', '#4ade80']
  );

  const mythOpacity = useTransform(x, [-100, -50], [1, 0]);
  const factOpacity = useTransform(x, [50, 100], [0, 1]);

  const handleSwipe = (userThinksIsFact) => {
    if (!activeCard) return;
    const isCorrect = userThinksIsFact === activeCard.isFact;
    setResults(prev => [...prev, { ...activeCard, userCorrect: isCorrect }]);

    if (currentIndex < myths.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleDragEnd = async (event, info) => {
    const threshold = 150;
    if (info.offset.x > threshold) {
      await animate(x, 500, { duration: 0.2 });
      handleSwipe(true);
      x.set(0);
    } else if (info.offset.x < -threshold) {
      await animate(x, -500, { duration: 0.2 });
      handleSwipe(false);
      x.set(0);
    } else {
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 20 });
    }
  };

  useEffect(() => {
    const handleKeyDown = async (e) => {
      if (isFinished || myths.length === 0) return;
      if (x.get() !== 0) return;

      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        await animate(x, 500, { duration: 0.2 });
        handleSwipe(true);
        x.set(0);
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        await animate(x, -500, { duration: 0.2 });
        handleSwipe(false);
        x.set(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFinished, x, myths]);

  const restart = () => {
    setCurrentIndex(0);
    setResults([]);
    setIsFinished(false);
    x.set(0);
  };

  if (myths.length === 0) {
    return <div className="p-8 text-center text-muted-text">No myth data available.</div>;
  }

  if (isFinished) {
    const correctCount = results.filter(r => r.userCorrect).length;
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-8">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-secondary-bg p-8 rounded-3xl shadow-xl max-w-md w-full border border-primary-border">
          <h2 className="text-4xl font-black text-primary-text mb-4">
            <TranslatedText text="Results" />
          </h2>
          <div className="text-6xl font-black text-[#E47A2E] mb-8">{correctCount} <span className="text-2xl text-muted-text">/ {myths.length}</span></div>
          
          <div className="flex flex-col gap-4 text-left max-h-[50vh] overflow-y-auto pr-2 mb-6 styled-scrollbar">
            {results.map((r, i) => (
              <div key={i} className={`p-4 rounded-xl border ${r.userCorrect ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                 <div className="flex items-start justify-between mb-2">
                   <p className="font-bold text-sm text-primary-text leading-snug pr-4">
                     "<TranslatedText text={r.statement} />"
                   </p>
                   {r.userCorrect ? <Check className="w-5 h-5 text-green-500 flex-shrink-0" /> : <XIcon className="w-5 h-5 text-red-500 flex-shrink-0" />}
                 </div>
                 <p className="text-xs text-muted-text bg-primary-bg/50 p-2 rounded-lg">
                   <TranslatedText text={r.explanation} />
                 </p>
              </div>
            ))}
          </div>

          <button onClick={restart} className="flex items-center justify-center gap-2 w-full py-4 bg-accent-main text-accent-foreground rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg active:scale-95">
            <RotateCcw className="w-5 h-5" /> <TranslatedText text="Play Again" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12 min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-primary-text mb-2 tracking-tight">
          <TranslatedText text="Myth vs. Fact" />
        </h2>
        <p className="text-muted-text font-medium">
          <TranslatedText text="Swipe or use A / D keys" />
        </p>
      </div>

      {/* Swipe Indicators */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 pointer-events-none z-20">
        <motion.div style={{ opacity: mythOpacity }} className="bg-red-500 text-white p-4 rounded-r-3xl shadow-lg">
          <XIcon className="w-8 h-8" />
        </motion.div>
      </div>
      
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 pointer-events-none z-20">
        <motion.div style={{ opacity: factOpacity }} className="bg-green-500 text-white p-4 rounded-l-3xl shadow-lg">
          <Check className="w-8 h-8" />
        </motion.div>
      </div>

      <div className="relative w-full max-w-[400px] h-[60vh] max-h-[500px] flex justify-center items-center">
        
        {/* Next Card (Background Stack) */}
        {nextCard && (
          <motion.div
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 0.95, y: 10 }}
            className="absolute inset-0 bg-secondary-bg p-8 rounded-3xl shadow-md border border-primary-border flex flex-col justify-center text-center z-0 overflow-hidden"
          >
            <span className="text-[#E47A2E]/50 font-bold text-sm mb-6 uppercase tracking-widest bg-[#E47A2E]/5 py-1 px-3 rounded-full inline-block mx-auto">
              <TranslatedText text="Statement" /> {currentIndex + 2}
            </span>
            <div className="w-3/4 h-4 bg-primary-border/20 rounded mx-auto mb-2"></div>
            <div className="w-full h-4 bg-primary-border/20 rounded mx-auto mb-2"></div>
            <div className="w-5/6 h-4 bg-primary-border/20 rounded mx-auto"></div>
          </motion.div>
        )}

        {/* Active Card */}
        <AnimatePresence>
          {activeCard && (
            <motion.div
              key={currentIndex}
              style={{ x, rotate, opacity, backgroundColor, borderColor }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
              initial={{ scale: 0.95, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
              className="absolute inset-0 p-8 rounded-3xl shadow-2xl border-2 flex flex-col cursor-grab z-10 touch-none overflow-hidden"
            >
              <div className="flex-1 overflow-y-auto styled-scrollbar flex flex-col justify-center">
                <span className="text-[#E47A2E] font-bold text-sm mb-6 uppercase tracking-widest bg-[#E47A2E]/10 py-1 px-3 rounded-full inline-block mx-auto">
                  <TranslatedText text="Statement" /> {currentIndex + 1}
                </span>
                <p className="text-2xl font-bold text-primary-text leading-relaxed mb-4 text-center">
                  "<TranslatedText text={activeCard?.statement} />"
                </p>
              </div>
              
              <div className="mt-auto pt-4 text-sm font-bold text-muted-text uppercase tracking-widest flex justify-between px-2 border-t border-primary-border/20">
                 <span className="text-red-400">← <TranslatedText text="Myth" /></span>
                 <span className="text-green-400"><TranslatedText text="Fact" /> →</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
