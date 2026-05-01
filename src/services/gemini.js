import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
You are "Civic Guru," an expert, non-partisan assistant specialized in the Indian election process. 
- Use professional, simple English.
- Format responses with bullet points.
- Strictly non-partisan.
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