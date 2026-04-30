import { useState } from 'react';
import { sendMessageToGemini } from '../services/gemini';

export const useGemini = () => {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: "Hello! I am your Civic Guru. I'm here to answer any questions you have about the Indian electoral process, voting rights, or democracy. How can I help you today?",
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message to state immediately
    const userMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Call the API service (passing the history BEFORE the new message)
      const responseText = await sendMessageToGemini(messages, text);
      
      // Add AI response to state
      setMessages((prev) => [...prev, { role: 'ai', content: responseText }]);
    } catch (err) {
      setError(err.message);
      // Optional: Add a system message indicating failure
      setMessages((prev) => [...prev, { role: 'ai', content: "I'm having trouble connecting to my knowledge base right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage
  };
};
