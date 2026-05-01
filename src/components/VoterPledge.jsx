import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useElectionStore } from '../store/useElectionStore';
import { useTranslation } from '../hooks/useTranslation';
import { Handshake, Users, CheckCircle } from 'lucide-react';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

export const VoterPledge = () => {
  const { totalPledges, hasPledged, takePledge } = useElectionStore();

  const handlePledge = () => {
    if (!hasPledged) {
      takePledge();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#E47A2E', '#1A365D', '#FFFFFF']
      });
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-secondary-bg border-2 border-primary-border rounded-[3rem] p-12 shadow-2xl relative overflow-hidden"
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E47A2E]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-ashoka-blue-500/5 rounded-full -ml-32 -mb-32 blur-3xl" />

        <div className="relative z-10">
          <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8 transform rotate-12">
             <Handshake className="w-10 h-10 text-[#E47A2E]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-primary-text mb-6">
            <TranslatedText text="I Pledge to" /> <span className="text-[#E47A2E]"><TranslatedText text="Vote" /></span>
          </h2>
          
          <p className="text-xl text-muted-text mb-12 max-w-xl mx-auto leading-relaxed">
            <TranslatedText text="Join thousands of responsible citizens who have committed to shaping the future of India through their vote." />
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
             <div className="flex items-center gap-3 px-6 py-3 bg-primary-bg rounded-2xl border border-primary-border">
                <Users className="w-6 h-6 text-[#E47A2E]" />
                <div className="text-left">
                   <p className="text-2xl font-black text-primary-text leading-none">{totalPledges.toLocaleString()}</p>
                   <p className="text-[10px] font-bold text-muted-text uppercase tracking-widest"><TranslatedText text="Total Pledges" /></p>
                </div>
             </div>
             
             <button
               onClick={handlePledge}
               disabled={hasPledged}
               className={`group flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl hover:shadow-2xl active:scale-95 ${
                 hasPledged 
                  ? 'bg-green-500 text-white cursor-default' 
                  : 'bg-[#E47A2E] text-white hover:bg-[#d66a1e]'
               }`}
             >
               {hasPledged ? (
                 <>
                   <CheckCircle className="w-6 h-6" /> <TranslatedText text="Pledged Taken" />
                 </>
               ) : (
                 <>
                   <TranslatedText text="Take the Pledge" />
                 </>
               )}
             </button>
          </div>

          <p className="text-sm text-muted-text italic">
            <TranslatedText text="*This is a symbolic pledge to encourage democratic participation." />
          </p>
        </div>
      </motion.div>
    </section>
  );
};
