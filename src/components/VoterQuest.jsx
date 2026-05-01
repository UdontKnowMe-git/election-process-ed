import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import confetti from 'canvas-confetti';
import { useQuizStore } from '../store/useQuizStore';
import { useElectionStore } from '../store/useElectionStore';
import { useTranslation } from '../hooks/useTranslation';
import quizData from '../data/quizData.json';
import translations from '../data/translations.json';
import { Timer, Zap, Trophy, PlayCircle } from 'lucide-react';

const TranslatedText = ({ text, className }) => {
    const { translatedText } = useTranslation(text);
    return <span className={className}>{translatedText}</span>;
};

export const VoterQuest = () => {
    const { status, currentQuestionIndex, score, streakMultiplier, startQuiz, answerQuestion, nextQuestion } = useQuizStore();
    const { language } = useElectionStore();
    const [questions, setQuestions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(15);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswering, setIsAnswering] = useState(false);

    const t = translations[language]?.voter_quest || translations.en.voter_quest;
    const enT = translations.en.voter_quest;

    const currentQ = questions[currentQuestionIndex];

    // Placeholder sound paths - need to be added by user
    const [playTick] = useSound('/sounds/tick.mp3', { volume: 0.5 });
    const [playSuccess] = useSound('/sounds/success.mp3', { volume: 0.8 });
    const [playError] = useSound('/sounds/error.mp3', { volume: 0.5 });

    useEffect(() => {
        // Select 5 random questions
        const shuffled = [...quizData.questions].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 5));
    }, [status === 'idle']); // Only shuffle when resetting or starting new

    useEffect(() => {
        let timer;
        if (status === 'playing' && !isAnswering && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 4 && prev > 1) playTick(); // Play tick at 3, 2, 1
                    return prev - 1;
                });
            }, 1000);
        } else if (timeLeft === 0 && !isAnswering) {
            handleAnswer(-1); // Time out
        }
        return () => clearInterval(timer);
    }, [timeLeft, status, isAnswering, playTick]);

    useEffect(() => {
        if (status === 'finished') {
            if (score > 0) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#1A365D', '#E47A2E', '#138808'] // Civic Blue, Saffron, India Green
                });
            }
        }
    }, [status, score]);

    const handleStart = () => {
        startQuiz();
        setTimeLeft(15);
        setSelectedAnswer(null);
        setIsAnswering(false);
    };

    const handleAnswer = (index) => {
        if (isAnswering) return;
        setIsAnswering(true);
        setSelectedAnswer(index);

        const isCorrect = index === currentQ?.correctAnswer;
        if (isCorrect) playSuccess();
        else if (index !== -1) playError(); // Don't play error sound for timeout

        answerQuestion(isCorrect, timeLeft);

        // Gamification: Track answered question
        useElectionStore.getState().incrementQuestions();

        setTimeout(() => {
            nextQuestion(questions.length);
            setTimeLeft(15);
            setSelectedAnswer(null);
            setIsAnswering(false);
        }, 1500); // Wait to show right/wrong
    };

    if (status === 'idle') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-secondary-bg p-8 rounded-3xl shadow-xl max-w-md w-full border border-primary-border">
                    <Trophy className="w-20 h-20 text-[#E47A2E] mx-auto mb-6" />
                    <h2 className="text-3xl font-black text-primary-text mb-4"><TranslatedText text={enT.title} /></h2>
                    <p className="text-muted-text mb-8 leading-relaxed">
                        <TranslatedText text={enT.subtitle} />
                    </p>
                    <button onClick={handleStart} className="flex items-center justify-center gap-2 w-full py-4 bg-accent-main text-accent-foreground rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-95 duration-200">
                        <PlayCircle className="w-6 h-6" /> <TranslatedText text={enT.start_btn} />
                    </button>
                </motion.div>
            </div>
        );
    }

    if (status === 'finished') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-secondary-bg p-8 rounded-3xl shadow-xl max-w-md w-full border border-primary-border">
                    <Trophy className="w-24 h-24 text-[#E47A2E] mx-auto mb-6 animate-bounce" />
                    <h2 className="text-4xl font-black text-primary-text mb-2"><TranslatedText text={enT.quest_complete} /></h2>
                    <p className="text-muted-text mb-6 text-lg"><TranslatedText text={enT.your_score} /></p>
                    <div className="text-6xl font-black text-primary-text mb-8">{score}</div>
                    <button onClick={handleStart} className="w-full py-4 bg-accent-main text-accent-foreground rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg active:scale-95">
                        <TranslatedText text={enT.play_again} />
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            {/* Top Bar: Stats */}
            <div className="flex justify-between items-center mb-8 bg-secondary-bg p-4 rounded-2xl shadow-sm border border-primary-border">
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-muted-text uppercase tracking-wider"><TranslatedText text={enT.score} /></span>
                    <span className="text-2xl font-black text-primary-text">{score}</span>
                </div>

                {/* Timer */}
                <div className="flex flex-col items-center">
                    <div className={`flex items-center gap-2 text-2xl font-black ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-primary-text'}`}>
                        <Timer className="w-6 h-6" /> {timeLeft}s
                    </div>
                    {timeLeft >= 10 && <span className="text-xs font-bold text-[#E47A2E] uppercase"><TranslatedText text={enT.points_active} /></span>}
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold text-muted-text uppercase tracking-wider"><TranslatedText text={enT.streak} /></span>
                    <div className="flex items-center gap-1 text-2xl font-black text-[#E47A2E]">
                        <Zap className="w-6 h-6 fill-current" /> {streakMultiplier}x
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-primary-border rounded-full mb-12 overflow-hidden">
                <motion.div
                    className="h-full bg-[#E47A2E]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
                />
            </div>

            {/* Question Container */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: -20, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-secondary-bg p-8 rounded-3xl shadow-xl border border-primary-border"
                >
                    <span className="inline-block px-3 py-1 bg-primary-bg text-primary-text rounded-lg text-sm font-bold mb-6 border border-primary-border">
                        <TranslatedText text={enT.question} /> {currentQuestionIndex + 1} of {questions.length}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary-text mb-8 leading-snug">
                        <TranslatedText text={currentQ?.text} />
                    </h3>

                    <div className="grid gap-4">
                        {currentQ?.options.map((option, index) => {
                            let buttonStateClass = "bg-primary-bg hover:bg-ashoka-blue-500/5 border-primary-border text-primary-text";

                            if (isAnswering) {
                                if (index === currentQ.correctAnswer) {
                                    buttonStateClass = "bg-green-500 text-white border-green-600 scale-[1.02] shadow-md"; // Correct highlight
                                } else if (index === selectedAnswer) {
                                    buttonStateClass = "bg-red-500 text-white border-red-600 opacity-50"; // Wrong highlight
                                } else {
                                    buttonStateClass = "bg-primary-bg opacity-50 border-primary-border"; // Other
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    disabled={isAnswering}
                                    className={`text-left p-5 rounded-2xl border-2 font-semibold text-lg transition-all duration-300 flex items-center ${buttonStateClass}`}
                                >
                                    <span className="inline-block w-8 h-8 rounded-full bg-black/10 text-center leading-8 mr-4 text-sm flex-shrink-0">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <TranslatedText text={option} />
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
