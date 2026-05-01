import { useState, useEffect } from 'react';
import { useElectionStore } from '../store/useElectionStore';
import { getTranslation } from '../utils/translator';

/**
 * useTranslation Hook
 * Handles asynchronous translation of strings with caching and fallback logic.
 */
export const useTranslation = (text) => {
  const { language } = useElectionStore();
  const [translatedText, setTranslatedText] = useState(text);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!text || language === 'en') {
      setTranslatedText(text);
      return;
    }

    const translate = async () => {
      setLoading(true);
      try {
        const result = await getTranslation(text, language);
        setTranslatedText(result);
      } catch (error) {
        console.error("Translation hook error:", error);
        setTranslatedText(text);
      } finally {
        setLoading(false);
      }
    };

    translate();
  }, [text, language]);

  return { translatedText, loading };
};
