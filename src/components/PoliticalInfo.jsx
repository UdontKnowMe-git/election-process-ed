import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, User, Users } from 'lucide-react';
import { POLITICAL_DATA } from '../data/POLITICAL_DATA';
import { CoalitionCard } from './CoalitionCard';
import { NationalPartyGrid } from './NationalPartyGrid';
import { RegionalMarquee } from './RegionalMarquee';

export const PoliticalInfo = () => {
  const [activeTier, setActiveTier] = useState(null);
  
  // Note: getPoliticalData search feature logic remains intact but is omitted from this layout-only file 
  // as per the user's focus on UI layout modularity. To fully integrate, it should be in a custom hook.
  const [result, setResult] = useState(null); 
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-4xl md:text-6xl font-black !text-primary-text mb-6 tracking-tighter">
            Political <span className="text-ashoka-blue-600 italic">Landscape</span>
          </h2>
          <p className="text-lg !text-muted-text max-w-2xl mx-auto leading-relaxed font-medium">
            Explore the governance structure of India and identify your representatives.
          </p>
        </motion.div>
      </div>

      {/* Governance Pyramid */}
      <div className="flex flex-col items-center gap-4 mb-32">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-black !text-primary-text uppercase tracking-widest flex items-center justify-center gap-3">
            <ShieldCheck className="text-ashoka-blue-600" />
            Governance Pyramid
          </h3>
          <p className="text-sm !text-muted-text mt-2">Click or hover on a tier to explore</p>
        </div>

        <div className="w-full max-w-4xl flex flex-col items-center gap-4 md:gap-6">
          {POLITICAL_DATA.tiers.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => setActiveTier(tier.id)}
              onMouseLeave={() => setActiveTier(null)}
              onClick={() => setActiveTier(activeTier === tier.id ? null : tier.id)}
              className={`
                ${tier.width} 
                relative cursor-pointer transition-all duration-500
                bg-secondary-bg/40 backdrop-blur-2xl border-2 border-primary-border
                rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8
                ${activeTier === tier.id ? tier.glow + ' scale-105' : 'hover:scale-[1.02]'}
              `}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl bg-primary-bg border border-primary-border ${tier.color} shadow-lg`}>
                    {/* Simplified icon rendering for modularity */}
                    <div className="w-6 h-6 md:w-8 md:h-8 font-bold">{tier.title[0]}</div>
                  </div>
                  <div>
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-50 !text-primary-text">{tier.level}</span>
                    <h4 className="text-lg md:text-2xl font-black !text-primary-text leading-tight">{tier.title}</h4>
                  </div>
                </div>

                {result && !loading && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center !text-white flex-shrink-0 ${tier.color.replace('text-', 'bg-')}`}>
                      <User className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] font-black uppercase opacity-60 !text-primary-text">Your Representative</p>
                      <p className="text-xs font-black !text-primary-text truncate">
                        {tier.id === 'union' ? result.mp?.name : tier.id === 'state' ? result.mla?.name : result.local_body || 'Gram Panchayat'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              <AnimatePresence>
                {activeTier === tier.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-6 pt-6 border-t border-primary-border"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <h5 className="text-[10px] font-black uppercase !text-muted-text mb-2 tracking-widest">Jurisdiction</h5>
                        <p className="text-xs font-medium !text-primary-text leading-relaxed">{tier.jurisdiction}</p>
                      </div>
                      <div>
                        <h5 className="text-[10px] font-black uppercase !text-muted-text mb-2 tracking-widest">Representation</h5>
                        <p className="text-xs font-medium !text-primary-text leading-relaxed">{tier.representation}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* National Coalitions */}
      <div className="mt-32">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-5xl font-black !text-primary-text mb-4 tracking-tighter">
            The Political <span className="text-saffron-500 italic">Landscape</span>
          </h3>
          <p className="!text-muted-text max-w-2xl mx-auto font-medium">
            Understanding the major political forces and their visions for the 2024-2029 term.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative">
          <CoalitionCard {...POLITICAL_DATA.coalitions[0]} />

          <div className="flex flex-col gap-8 h-full">
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <div className="w-[2px] h-full bg-gradient-to-b from-saffron-500 via-primary-border to-ashoka-blue-600 absolute left-1/2 -translate-x-1/2 opacity-20 hidden md:block" />
              <div className="w-16 h-16 rounded-full bg-primary-bg border-4 border-primary-border flex items-center justify-center z-10 font-black text-2xl !text-muted-text italic shadow-2xl relative">
                VS
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-secondary-bg/30 backdrop-blur-xl border border-primary-border rounded-[2rem] p-6 text-center"
            >
              <div className="w-10 h-10 bg-muted-text/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-5 h-5 !text-muted-text" />
              </div>
              <h4 className="text-sm font-black !text-primary-text uppercase tracking-widest mb-2">Unaligned / Others</h4>
              <p className="text-[10px] !text-muted-text leading-relaxed">
                Parties and Independents not formally aligned with either major coalition, maintaining their unique regional or ideological stance.
              </p>
            </motion.div>
          </div>

          <CoalitionCard {...POLITICAL_DATA.coalitions[1]} />
        </div>
      </div>

      <NationalPartyGrid parties={POLITICAL_DATA.nationalParties} />
      <RegionalMarquee parties={POLITICAL_DATA.regionalParties} />

      {/* Footer Context Note */}
      <div className="mt-24 p-8 bg-secondary-bg/30 border border-primary-border rounded-[2.5rem] text-center max-w-4xl mx-auto">
        <p className="text-xs !text-muted-text font-medium leading-relaxed">
          * Representative data is based on 2024 General Election results and current assembly status.
          Powered by Google Gemini 2.5 Flash for high-precision mapping.
          <br /><br />
          <span className="opacity-60">
            India has over 60 recognized state parties and 2,000+ registered parties, ensuring a diverse democratic voice.
          </span>
        </p>
      </div>
    </div>
  );
};
