import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API only if the key exists
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const SYSTEM_INSTRUCTION = `
You are 'Civic Guru', a highly knowledgeable, completely non-partisan expert on the Indian Electoral Process and democracy.
Your goal is to educate the user. Explain complex political terms in simple, engaging, and accessible language.
Do not show bias towards any political party, candidate, or ideology.
Keep your responses concise, well-formatted, and highly relevant to Indian civics.
`;

export const sendMessageToGemini = async (messages, newMessage) => {
  if (!genAI) {
    throw new Error('Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // Format previous messages for the chat history
    const history = messages.map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.3, // Keep it relatively deterministic and factual
      },
    });

    const result = await chat.sendMessage(newMessage);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error('Error in Gemini API:', error);
    throw new Error('Failed to get a response from Civic Guru. Please try again later.');
  }
};
