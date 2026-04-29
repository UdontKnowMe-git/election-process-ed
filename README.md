# 🗳️ Democracy Now: An Interactive Election Journey

**Democracy Now** is an immersive, AI-powered educational platform designed to demystify the election process.  Built for the **Virtual: Prompt Wars** hackathon on Hack2skill, this application replaces traditional, "textbook-style" learning with a highly interactive, gamified experience.

## 🌟 Key Features

*  **Dual-Perspective Timelines**: Explore the election cycle through a smooth 2D vertical timeline or an experimental 3D "fly-through" experience.
*  **Voter's Quest Quiz**: A fast-paced, Kahoot-style challenge with point multipliers, streaks, and real-time feedback to test your civic knowledge.
*  **Civic Guru AI Assistant**: An intelligent chatbot powered by **Gemini 2.5** that provides non-partisan, context-aware answers to complex election questions.
*  **Myth vs. Fact Swipe**: A "Tinder-style" card interface for quickly debunking common election misconceptions.
*  **Butterfly Effect Visualizer**: An interactive tool that illustrates the long-term impact of local policy votes on a community.

## 🛠️ Tech Stack

 This project leverages a modern, high-performance stack optimized for "vibe coding" and efficiency:

*  **Frontend**: React + Vite 
*  **Styling**: Tailwind CSS (with native Light/Dark mode support)
*  **3D Graphics**: @react-three/fiber & @react-three/drei 
*  **Animations**: Framer Motion
*  **AI Integration**: Google Gemini 2.5 API via Google AI Studio 
*  **State Management**: Zustand
*  **Gamification**: canvas-confetti & use-sound

## 🚀 Getting Started

### Prerequisites
* Node.js (v18 or higher)
*  A Google AI Studio API Key (for the Civic Guru assistant)

### Installation
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/UdontKnowMe-git/election-process-ed.git
    cd election-process-ed
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set up environment variables**:
    Create a `.env` file in the root directory and add your Gemini API key:
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```

## 🏆 Evaluation Criteria Compliance

*  **Code Quality**: Built with modular, reusable React components and strictly enforced linting rules.
*  **Security**: API keys are managed via environment variables and never exposed in the frontend codebase.
*  **Efficiency**: Utilizes Vite's fast HMR and implements code-splitting (React.lazy) for heavy 3D components.
*  **Accessibility**: Designed with semantic HTML, ARIA labels, and keyboard-navigable interfaces.
* **Google Services**: Deep integration with Gemini 2.5 for educational AI agents.

## 📄 License
This project is licensed under the MIT License.