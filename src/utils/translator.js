// src/utils/translator.js
import axios from 'axios';

// Multiple Lingva instances for redundancy and to avoid rate limits
const INSTANCES = [
  'https://lingva.ml',
  'https://lingva.garudadot.com',
  'https://lingva.lunar.icu',
  'https://lingva.0x0.st',
  'https://lingva.riverside.rocks',
  'https://lingva.firebird.fr'
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getTranslation = async (text, targetLang) => {
    if (!text || targetLang === 'en') return { success: true, text };

    const validCodes = ['hi', 'ta', 'te', 'ml', 'gu'];
    const langCode = validCodes.includes(targetLang) ? targetLang : 'hi';

    // 1. Check Cache first
    const cacheKey = `trans_${langCode}_${text.trim().substring(0, 50).replace(/\W+/g, '_')}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) return { success: true, text: cached };

    // 2. Try multiple instances if one fails
    for (const instance of INSTANCES) {
        try {
            // Randomized delay to prevent synchronized burst
            await sleep(Math.random() * 200);

            const url = `${instance}/api/v1/en/${langCode}/${encodeURIComponent(text.trim())}`;
            
            const response = await axios.get(url, {
                timeout: 6000 // 6 seconds per instance
            });

            if (response.data && response.data.translation) {
                const translatedText = response.data.translation;
                localStorage.setItem(cacheKey, translatedText);
                return { success: true, text: translatedText };
            }
        } catch (error) {
            console.warn(`Instance ${instance} failed for ${langCode}: ${error.message}. Trying next...`);
            continue; // Try next instance
        }
    }

    // 3. Signal failure if all instances fail
    console.error(`All translation instances failed for ${langCode}. Translation pending...`);
    return { success: false, text };
};