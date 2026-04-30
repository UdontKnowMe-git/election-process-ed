import { create } from 'zustand';

export const useQuizStore = create((set) => ({
  status: 'idle', // 'idle', 'playing', 'finished'
  currentQuestionIndex: 0,
  score: 0,
  streakMultiplier: 1,

  startQuiz: () => set({ status: 'playing', currentQuestionIndex: 0, score: 0, streakMultiplier: 1 }),
  
  answerQuestion: (isCorrect, timeRemaining) => set((state) => {
    let newScore = state.score;
    let newMultiplier = state.streakMultiplier;

    if (isCorrect) {
      // Base points = 100
      let points = 100;
      // Double points if answered within first 5 seconds (timeRemaining >= 10 on a 15s timer)
      if (timeRemaining >= 10) {
        points *= 2;
      }
      
      // Apply streak
      points *= newMultiplier;
      newScore += points;
      
      // Increase streak (cap at 3x)
      newMultiplier = Math.min(newMultiplier + 1, 3);
    } else {
      // Reset streak
      newMultiplier = 1;
    }

    return {
      score: newScore,
      streakMultiplier: newMultiplier
    };
  }),

  nextQuestion: (totalQuestions) => set((state) => {
    const nextIndex = state.currentQuestionIndex + 1;
    if (nextIndex >= totalQuestions) {
      return { status: 'finished' };
    }
    return { currentQuestionIndex: nextIndex };
  }),

  resetQuiz: () => set({ status: 'idle', currentQuestionIndex: 0, score: 0, streakMultiplier: 1 })
}));
