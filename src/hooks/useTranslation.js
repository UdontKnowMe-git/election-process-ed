import { useState, useEffect, useRef } from 'react';
import { useElectionStore } from '../store/useElectionStore';
import { getTranslation } from '../utils/translator';

/**
 * useTranslation Hook
 * Handles asynchronous translation of strings with caching, failure detection, 
 * and persistent retry logic.
 */
export const useTranslation = (text) => {
  const { language } = useElectionStore();
  const [translatedText, setTranslatedText] = useState(text);
  const [loading, setLoading] = useState(false);
  const retryTimerRef = useRef(null);

  useEffect(() => {
    // Reset if text is empty or English
    if (!text || language === 'en') {
      setTranslatedText(text);
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
      return;
    }

    const translate = async () => {
      setLoading(true);
      try {
        const result = await getTranslation(text, language);
        
        if (result.success) {
          setTranslatedText(result.text);
          if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
        } else {
          // Persistence Mode: If it fails, retry in 3 seconds
          retryTimerRef.current = setTimeout(translate, 3000);
        }
      } catch (error) {
        console.error("Translation hook error:", error);
        // On hard crash, wait longer before retrying
        retryTimerRef.current = setTimeout(translate, 5000);
      } finally {
        setLoading(false);
      }
    };

    translate();

    return () => {
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    };
  }, [text, language]);

  return { translatedText, loading };
};
