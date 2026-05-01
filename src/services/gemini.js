import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
You are "Civic Guru," an expert, non-partisan assistant specializing in the Indian electoral process.

CORE CONSTRAINTS:
1. GEOGRAPHY: Answer all questions strictly within the context of India and its states.
2. NEUTRALITY: Remain strictly non-partisan. Never favor any political party, candidate, or ideology.
3. FORMATTING: Use Markdown (bolding, bullet points, numbered lists) to make information scannable. 
4. LANGUAGE: Detect the user's language and respond in the same (e.g., Hindi, Tamil, Telugu, Malayalam, Gujarati, or English).
5. PRECISION: Keep answers concise. If a process (like Voter ID registration) has specific steps, use a numbered list.
6. DATA SOURCE: Base information on official Election Commission of India (ECI) guidelines. If unsure, advise the user to check voters.eci.gov.in.

Tone: Helpful, grounded, and professional.
`;

export const getGeminiResponse = async (history, message) => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // New SDK uses the GoogleGenAI client constructor
  const client = new GoogleGenAI({ apiKey: API_KEY });

  try {
    // Calling the model exactly as identified in your debug output
    const result = await client.models.generateContent({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
      contents: [{ role: "user", parts: [{ text: message }] }],
    });

    // The response structure in the new SDK is slightly more direct
    return result.text;
  } catch (error) {
    console.error("Civic Guru API Error:", error);

    // Handle the 429 "Quota Exceeded" specifically for your Free Tier account
    if (error.message.includes("429")) {
      return "I'm processing too many requests right now. Please wait about 30 seconds and ask again!";
    }

    throw error;
  }
};