import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import triviaData from '../data/triviaData.json';
import { useTranslation } from '../hooks/useTranslation';
import { HelpCircle, CheckCircle2, X, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { useElectionStore } from '../store/useElectionStore';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

export const MythFlipCards = ({ onClose }) => {
  const { reducedMotion } = useElectionStore();
  const myths = triviaData.myths || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [flash, setFlash] = useState(null); // 'correct' | 'incorrect'
  const [isFinished, setIsFinished] = useState(false);
  const [lastUserGuess, setLastUserGuess] = useState(null);

  const controls = useAnimation();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const currentMyth = myths[currentIndex];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSwipe = async (direction) => {
    const userThinksIsFact = direction === 'right';
    const isCorrect = userThinksIsFact === currentMyth.isFact;

    setLastUserGuess(isCorrect);
    if (isCorrect) setScore(s => s + 1);

    // 1. Exit Animation
    await controls.start({
      x: direction === 'right' ? 1000 : -1000,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" }
    });

    // 2. Flash Sequence
    if (reducedMotion) {
      setFlash(isCorrect ? 'correct' : 'incorrect');
      await new Promise(r => setTimeout(r, 1000));
      setFlash(null);
    } else {
      setFlash(isCorrect ? 'correct' : 'incorrect');
      await new Promise(r => setTimeout(r, 600));
      setFlash(null);
    }

    // 3. Reveal Explanation
    setIsRevealing(true);
  };

  const nextCard = () => {
    if (currentIndex < myths.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsRevealing(false);
      x.set(0);
      controls.set({ x: 0, opacity: 1 });
    } else {
      setIsFinished(true);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsRevealing(false);
    setIsFinished(false);
    x.set(0);
    controls.set({ x: 0, opacity: 1 });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFinished || isRevealing || flash) return;
      if (e.key === 'ArrowLeft') handleSwipe('left');
      if (e.key === 'ArrowRight') handleSwipe('right');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isRevealing, flash, isFinished]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-primary-bg/98 backdrop-blur-3xl flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden"
    >
      {/* Fullscreen Flash Overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[110] flex items-center justify-center 
              ${flash === 'correct' ? 'bg-green-500/90' : 'bg-red-500/90'}`}
          >
            {reducedMotion ? (
              <div className="bg-white p-8 rounded-3xl text-3xl font-black shadow-2xl">
                <TranslatedText text={flash === 'correct' ? "Correct Answer!" : "Incorrect Answer"} />
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.5, rotate: -20 }}
                animate={{ scale: 1.2, rotate: 0 }}
                className="text-white"
              >
                {flash === 'correct' ? <Check className="w-48 h-48 stroke-[4px]" /> : <X className="w-48 h-48 stroke-[4px]" />}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-6 right-6 z-[120]">
        <button
          onClick={onClose}
          className="p-4 bg-secondary-bg border-2 border-primary-border rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl group"
          aria-label="Close Game"
        >
          <X className="w-8 h-8 text-primary-text group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center w-full max-w-2xl relative my-6">
        <AnimatePresence mode="wait">
          {isFinished ? (
            <motion.div
              key="results"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-secondary-bg p-8 md:p-12 rounded-[3.5rem] border-2 border-primary-border text-center shadow-2xl w-full max-w-[min(380px,85vw)] mx-auto"
            >
              <div className="w-20 h-20 bg-saffron-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-saffron-500" />
              </div>
              <h2 className="text-3xl font-black text-primary-text mb-4">
                <TranslatedText text="Mission Complete" />
              </h2>
              <div className="text-5xl font-black text-saffron-500 mb-8">
                {score} <span className="text-xl text-muted-text">/ {myths.length}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={restart} className="flex-1 py-4 bg-secondary-bg border-2 border-primary-border rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-bg transition-all">
                  <RotateCcw className="w-5 h-5" /> <TranslatedText text="Retry" />
                </button>
                <button onClick={onClose} className="flex-1 py-4 bg-saffron-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all">
                  <TranslatedText text="Finish" />
                </button>
              </div>
            </motion.div>
          ) : isRevealing ? (
            <motion.div
              key="reveal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`bg-secondary-bg p-8 md:p-10 rounded-[3.5rem] border-4 text-center shadow-2xl relative overflow-hidden w-full max-w-[min(380px,85vw)] mx-auto
                ${lastUserGuess ? 'border-india-green-500' : 'border-red-500'}`}
            >
              <div className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6
                ${lastUserGuess ? 'bg-india-green-500/10 text-india-green-500' : 'bg-red-500/10 text-red-500'}`}>
                <TranslatedText text={lastUserGuess ? "You Got It Right" : "Not Quite Right"} />
              </div>

              <p className="text-xl md:text-2xl font-bold text-primary-text leading-snug mb-8">
                <TranslatedText text={currentMyth?.explanation} />
              </p>

              <button
                onClick={nextCard}
                className="w-full py-5 bg-saffron-500 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
              >
                <TranslatedText text="Next Trivia" /> <ArrowRight className="w-6 h-6" />
              </button>
            </motion.div>
          ) : (
            <div className="relative w-full h-[480px] md:h-[500px] max-w-[420px] mx-auto perspective-1000">
              {/* Stack Background Cards */}
              {myths.slice(currentIndex + 1, currentIndex + 3).map((myth, index) => (
                <div
                  key={`stack-${myth.id}`}
                  className="absolute inset-0 bg-secondary-bg border-4 border-primary-border rounded-[3.5rem] shadow-xl"
                  style={{
                    transform: `translateY(${(index + 1) * 12}px) scale(${1 - (index + 1) * 0.04})`,
                    zIndex: -index - 1,
                    opacity: 0.5 / (index + 1)
                  }}
                />
              ))}

              <motion.div
                key={currentIndex}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.9}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 150) handleSwipe('right');
                  else if (info.offset.x < -150) handleSwipe('left');
                }}
                animate={controls}
                style={{ x, rotate, opacity }}
                whileDrag={{ scale: 1.05, rotate: "5deg" }}
                className="absolute inset-0 bg-secondary-bg border-4 border-primary-border rounded-[3rem] md:rounded-[3.5rem] p-8 md:p-10 flex flex-col items-center justify-center text-center shadow-2xl cursor-grab active:cursor-grabbing group overflow-hidden"
              >
                {/* Swipe Hints Icons */}
                <div className="absolute top-8 left-8 opacity-0 group-hover:opacity-20 transition-opacity">
                  <X className="w-12 h-12 text-red-500" />
                </div>
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-20 transition-opacity">
                  <Check className="w-12 h-12 text-india-green-500" />
                </div>

                <div className="w-20 h-20 bg-saffron-500/10 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-10 h-10 text-saffron-500" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-black text-saffron-500 uppercase tracking-[0.4em]">
                    <TranslatedText text="Trivia Card" /> {currentIndex + 1}
                  </h3>
                  <p className="text-xl md:text-2xl font-black text-primary-text leading-tight line-clamp-4">
                    "<TranslatedText text={currentMyth?.statement} />"
                  </p>
                </div>

                <div className="mt-auto w-full space-y-6">
                  <div className="flex items-center gap-4 text-[10px] font-black text-muted-text uppercase tracking-widest opacity-40">
                    <div className="flex-1 h-[1px] bg-muted-text/30" />
                    <TranslatedText text="Swipe to Decide" />
                    <div className="flex-1 h-[1px] bg-muted-text/30" />
                  </div>

                  <div className="flex justify-center gap-10">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg border-b-4 border-red-800">
                        <X className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black text-red-600 tracking-widest uppercase bg-red-600/10 px-2.5 py-0.5 rounded-full"><TranslatedText text="Myth" /></span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-india-green-600 text-white rounded-full flex items-center justify-center shadow-lg border-b-4 border-india-green-800">
                        <Check className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black text-india-green-500 tracking-widest uppercase bg-india-green-600/10 px-2.5 py-0.5 rounded-full"><TranslatedText text="Fact" /></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar (Bottom) */}
      <div className="w-full max-w-xs pb-4 md:pb-6">
        {!isFinished && (
          <div className="px-6">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-text mb-2">
              <TranslatedText text="Progress" />
              <span className="text-primary-text">{currentIndex + 1} / {myths.length}</span>
            </div>
            <div className="h-1.5 w-full bg-primary-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-saffron-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / myths.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
