import React from 'react';
import { motion } from 'framer-motion';
import { Flag } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

/**
 * CoalitionCard Component
 * Role: Displays side-by-side comparisons of major national political coalitions (e.g., NDA vs I.N.D.I.A).
 * Helps voters understand the broad visions and key figures of the main political forces.
 */
export const CoalitionCard = ({ name, leadParty, focus, figures, color, vision, tagline, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -10 }}
    className={`relative bg-secondary-bg/40 backdrop-blur-xl border-2 border-primary-border rounded-[2.5rem] p-8 shadow-2xl overflow-hidden group h-full flex flex-col`}
  >
    <div className={`absolute top-0 right-0 w-40 h-40 ${color}/10 rounded-full -mr-20 -mt-20 blur-3xl`} />
    <div className="flex justify-between items-start mb-8">
      <div>
        <h4 className={`text-3xl font-black mb-2 ${color.replace('bg-', '!text-')}`}><TranslatedText text={name} /></h4>
        <p className="text-xs font-black uppercase tracking-widest !text-muted-text"><TranslatedText text={tagline} /></p>
      </div>
      <div className={`p-4 rounded-2xl ${color} !text-white shadow-lg`}>
        <Flag className="w-6 h-6" />
      </div>
    </div>

    <div className="space-y-6 flex-1">
      <div className="p-4 bg-primary-bg/50 rounded-2xl border border-primary-border/50">
        <p className="text-[10px] font-black uppercase !text-muted-text mb-2"><TranslatedText text="Lead Party" /></p>
        <p className="text-lg font-bold !text-primary-text"><TranslatedText text={leadParty} /></p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-primary-bg/50 rounded-2xl border border-primary-border/50">
          <p className="text-[10px] font-black uppercase !text-muted-text mb-2"><TranslatedText text="Focus Area" /></p>
          <p className="text-sm font-bold !text-primary-text"><TranslatedText text={focus} /></p>
        </div>
        <div className="p-4 bg-primary-bg/50 rounded-2xl border border-primary-border/50">
          <p className="text-[10px] font-black uppercase !text-muted-text mb-2"><TranslatedText text="Key Figures" /></p>
          <p className="text-xs font-bold !text-primary-text"><TranslatedText text={figures} /></p>
        </div>
      </div>

      <div className="pt-4 border-t border-primary-border">
        <p className="text-sm italic !text-muted-text leading-relaxed">
          "<TranslatedText text={vision} />"
        </p>
      </div>
    </div>
  </motion.div>
);
