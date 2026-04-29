# Project: Democracy Now - Interactive Election Guide
## Tech Stack
- Frontend: React (Vite)
- State: Zustand
- Animation: Framer Motion
- 3D: @react-three/fiber, @react-three/drei
- AI: Gemini 2.5 API (via Google AI Studio)
- Icons: Lucide-react
- Testing: Vitest

## Evaluation Criteria (Do not compromise)
1. Code Quality: Modular, clean, and commented components.
2. Security: Never hardcode API keys; use .env files.
3. Efficiency: Lazy-load heavy 3D components using React Suspense.
4. Testing: Ensure all quiz logic and state transitions have Vitest units.
5. Accessibility: WCAG 2.1 compliant (ARIA labels, keyboard navigation, high contrast).
6. Google Services: Deep integration with Gemini 2.5 for AI insights.

## Feature Priorities
- Immersive 3D/2D Timelines: Scroll-based journey of the election cycle.
- "Voter's Quest": Kahoot-style quiz with confetti and streaks.
- Myth-Buster Swipe: Tinder-style cards for election facts.
- Civic Guru: Gemini-powered chatbot for real-time election Q&A.