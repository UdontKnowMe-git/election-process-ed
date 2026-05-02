import React from 'react';
import { motion } from 'framer-motion';
import { Flag } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

/**
 * NationalPartyGrid Component
 * Role: Renders a clean grid of ECI-recognized national parties to educate voters on parties with widespread presence.
 */
export const NationalPartyGrid = ({ parties }) => (
  <div className="mt-32">
    <div className="text-center mb-12">
      <h3 className="text-2xl font-black !text-primary-text uppercase tracking-widest mb-4">
        <TranslatedText text="National Parties" />
      </h3>
      <p className="text-xs !text-muted-text max-w-lg mx-auto font-medium">
        <TranslatedText text="Parties recognized by the ECI as having a significant presence across multiple states." />
      </p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {parties.map((party, idx) => (
        <motion.div
          key={party.name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-secondary-bg/40 backdrop-blur-lg border border-primary-border rounded-2xl p-4 text-center group hover:border-primary-text/20 transition-all"
        >
          <div className={`w-12 h-12 ${party.color} rounded-xl mx-auto mb-3 flex items-center justify-center !text-white shadow-lg group-hover:scale-110 transition-transform`}>
            <Flag className="w-6 h-6" />
          </div>
          <p className="text-sm font-black !text-primary-text"><TranslatedText text={party.name} /></p>
        </motion.div>
      ))}
    </div>
  </div>
);
