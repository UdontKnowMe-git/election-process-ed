import { GoogleGenAI } from "@google/genai"; // Note the name change to GoogleGenAI
import 'dotenv/config';

const listAvailableModels = async () => {
    const API_KEY = process.env.VITE_GEMINI_API_KEY;

    if (!API_KEY) {
        console.error("Error: VITE_GEMINI_API_KEY not found.");
        return;
    }

    // New Client Initialization
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    try {
        // New Method: .models.list()
        const response = await ai.models.list();

        console.log(response);
    } catch (error) {
        console.error("Error listing models:", error.message);
    }
};

listAvailableModels();