import React from 'react';
import { Building2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

/**
 * RegionalMarquee Component
 * Role: A scrolling ticker of regional parties ("Kingmakers") highlighting the importance of regional voices in forming coalition governments.
 */
export const RegionalMarquee = ({ parties }) => (
  <div className="mt-32 overflow-hidden relative py-10">
    <div className="text-center mb-12">
      <h3 className="text-2xl font-black !text-primary-text uppercase tracking-widest mb-4">
        <TranslatedText text="Regional Kingmakers" />
      </h3>
    </div>

    <div className="flex gap-6 animate-marquee whitespace-nowrap">
      {[...parties, ...parties].map((party, idx) => (
        <div
          key={idx}
          className="bg-secondary-bg/40 backdrop-blur-lg border border-primary-border rounded-2xl px-8 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors"
        >
          <div className="w-8 h-8 bg-primary-bg rounded-lg flex items-center justify-center">
            <Building2 className="w-4 h-4 !text-muted-text" />
          </div>
          <span className="text-lg font-black !text-primary-text uppercase tracking-widest">
            <TranslatedText text={party} />
          </span>
        </div>
      ))}
    </div>
  </div>
);
