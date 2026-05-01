import { useState, useCallback } from 'react';
import { getGeminiResponse } from '../services/gemini';

export const useGemini = () => {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: "Namaste! I am your Civic Guru. I can help you understand the election process, how to register, or explain how EVMs work. What's on your mind?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || isLoading) return;

    setError(null);
    setIsLoading(true);

    // 1. Snapshot the current messages for the API history
    const historySnapshot = [...messages];

    // 2. Add user message to UI immediately
    const userMessage = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // 3. Get response using the snapshot (so the new user message isn't duplicated in history)
      const botResponseText = await getGeminiResponse(historySnapshot, content);

      // 4. Add bot response to UI
      setMessages((prev) => [...prev, { role: 'bot', content: botResponseText }]);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      // Optional: Remove the last user message if the API failed
      // setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  return {
    messages,
    isLoading,
    error,
    sendMessage
  };
};