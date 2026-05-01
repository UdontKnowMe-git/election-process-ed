import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Search,
  Building2,
  User,
  Info,
  Globe,
  Building,
  ArrowRight,
  Loader2,
  AlertCircle,
  Landmark,
  Users,
  ShieldCheck,
  Flag
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

const CoalitionCard = ({ name, leadParty, focus, figures, color, vision, tagline, delay = 0 }) => (
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
        <h4 className={`text-3xl font-black mb-2 ${color.replace('bg-', 'text-')}`}>{name}</h4>
        <p className="text-xs font-black uppercase tracking-widest text-muted-text">{tagline}</p>
      </div>
      <div className={`p-4 rounded-2xl ${color} text-white shadow-lg`}>
        <Flag className="w-6 h-6" />
      </div>
    </div>

    <div className="space-y-6 flex-1">
      <div className="p-4 bg-primary-bg/50 rounded-2xl border border-primary-border/50">
        <p className="text-[10px] font-black uppercase text-muted-text mb-2">Lead Party</p>
        <p className="text-lg font-bold text-primary-text">{leadParty}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-primary-bg/50 rounded-2xl border border-primary-border/50">
          <p className="text-[10px] font-black uppercase text-muted-text mb-2">Focus Area</p>
          <p className="text-sm font-bold text-primary-text">{focus}</p>
        </div>
        <div className="p-4 bg-primary-bg/50 rounded-2xl border border-primary-border/50">
          <p className="text-[10px] font-black uppercase text-muted-text mb-2">Key Figures</p>
          <p className="text-xs font-bold text-primary-text">{figures}</p>
        </div>
      </div>

      <div className="pt-4 border-t border-primary-border">
        <p className="text-sm italic text-muted-text leading-relaxed">
          "{vision}"
        </p>
      </div>
    </div>
  </motion.div>
);

export const PoliticalInfo = () => {
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeTier, setActiveTier] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }
    setLoading(true);
    setError(null);
    const data = await getPoliticalData(pincode);
    setLoading(false);
    if (data.error) setError(data.error);
    else setResult(data);
  };

  const tiers = [
    {
      id: 'union',
      title: 'Union Government',
      level: 'National Level',
      width: 'w-full md:w-1/2',
      color: 'text-ashoka-blue-600',
      glow: 'shadow-[0_0_30px_rgba(26,54,93,0.3)] border-ashoka-blue-600/50',
      icon: Landmark,
      jurisdiction: 'Defense, Foreign Affairs, Railways, National Economy',
      representation: 'Lok Sabha (543 Members of Parliament)',
      repKey: 'mp'
    },
    {
      id: 'state',
      title: 'State Government',
      level: 'Regional Level',
      width: 'w-full md:w-3/4',
      color: 'text-saffron-500',
      glow: 'shadow-[0_0_30px_rgba(228,122,46,0.3)] border-saffron-500/50',
      icon: Building,
      jurisdiction: 'Police, Health, Agriculture, Local Infrastructure',
      representation: 'Vidhan Sabha (MLA), Vidhan Parishad',
      repKey: 'mla'
    },
    {
      id: 'local',
      title: 'Local Government',
      level: 'Community Level',
      width: 'w-full',
      color: 'text-india-green-600',
      glow: 'shadow-[0_0_30px_rgba(46,139,87,0.3)] border-india-green-600/50',
      icon: Users,
      jurisdiction: 'Waste Management, Street Lights, Local Roads',
      representation: 'Gram Panchayats, Municipal Corporations',
      repKey: 'local_body'
    }
  ];

  const nationalParties = [
    { name: 'BJP', color: 'bg-saffron-500' },
    { name: 'INC', color: 'bg-ashoka-blue-600' },
    { name: 'AAP', color: 'bg-blue-500' },
    { name: 'BSP', color: 'bg-indigo-700' },
    { name: 'CPI(M)', color: 'bg-red-600' },
    { name: 'NPP', color: 'bg-india-green-600' }
  ];

  const regionalParties = ['YSRCP', 'TDP', 'TMC', 'BJD', 'DMK', 'AIADMK', 'Shiv Sena', 'NCP', 'JMM', 'RJD'];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-4xl md:text-6xl font-black text-primary-text mb-6 tracking-tighter">
            Political <span className="text-ashoka-blue-600 italic">Landscape</span>
          </h2>
          <p className="text-lg text-muted-text max-w-2xl mx-auto leading-relaxed font-medium">
            Explore the governance structure of India and identify your representatives.
          </p>
        </motion.div>
      </div>

      {/* Governance Pyramid */}
      <div className="flex flex-col items-center gap-4 mb-32">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-black text-primary-text uppercase tracking-widest flex items-center justify-center gap-3">
            <ShieldCheck className="text-ashoka-blue-600" />
            Governance Pyramid
          </h3>
          <p className="text-sm text-muted-text mt-2">Click or hover on a tier to explore</p>
        </div>

        <div className="w-full max-w-4xl flex flex-col items-center gap-4 md:gap-6">
          {tiers.map((tier, idx) => (
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
                    <tier.icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-50">{tier.level}</span>
                    <h4 className="text-lg md:text-2xl font-black text-primary-text leading-tight">{tier.title}</h4>
                  </div>
                </div>

                {/* Search Result Injection */}
                {result && !loading && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 ${tier.color.replace('text-', 'bg-')}`}>
                      <User className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] font-black uppercase opacity-60">Your Representative</p>
                      <p className="text-xs font-black text-primary-text truncate">
                        {tier.id === 'union' ? result.mp?.name : tier.id === 'state' ? result.mla?.name : result.local_body || 'Gram Panchayat'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Expansion Area */}
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
                        <h5 className="text-[10px] font-black uppercase text-muted-text mb-2 tracking-widest">Jurisdiction</h5>
                        <p className="text-xs font-medium text-primary-text leading-relaxed">{tier.jurisdiction}</p>
                      </div>
                      <div>
                        <h5 className="text-[10px] font-black uppercase text-muted-text mb-2 tracking-widest">Representation</h5>
                        <p className="text-xs font-medium text-primary-text leading-relaxed">{tier.representation}</p>
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
          <h3 className="text-3xl md:text-5xl font-black text-primary-text mb-4 tracking-tighter">
            The Political <span className="text-saffron-500 italic">Landscape</span>
          </h3>
          <p className="text-muted-text max-w-2xl mx-auto font-medium">
            Understanding the major political forces and their visions for the 2024-2029 term.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative">
          <CoalitionCard
            name="NDA"
            tagline="National Democratic Alliance"
            leadParty="BJP (Bharatiya Janata Party)"
            focus="Economic Growth & Digital India"
            figures="Narendra Modi, Amit Shah, J.P. Nadda"
            color="bg-saffron-500"
            vision="To build a 'Viksit Bharat' (Developed India) by 2047, focusing on world-class infrastructure, digital transformation, and global leadership."
            delay={0}
          />

          <div className="flex flex-col gap-8 h-full">
            {/* VS Badge */}
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <div className="w-[2px] h-full bg-gradient-to-b from-saffron-500 via-primary-border to-ashoka-blue-600 absolute left-1/2 -translate-x-1/2 opacity-20 hidden md:block" />
              <div className="w-16 h-16 rounded-full bg-primary-bg border-4 border-primary-border flex items-center justify-center z-10 font-black text-2xl text-muted-text italic shadow-2xl relative">
                VS
              </div>
            </div>

            {/* Unaligned Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-secondary-bg/30 backdrop-blur-xl border border-primary-border rounded-[2rem] p-6 text-center"
            >
              <div className="w-10 h-10 bg-muted-text/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-5 h-5 text-muted-text" />
              </div>
              <h4 className="text-sm font-black text-primary-text uppercase tracking-widest mb-2">Unaligned / Others</h4>
              <p className="text-[10px] text-muted-text leading-relaxed">
                Parties and Independents not formally aligned with either major coalition, maintaining their unique regional or ideological stance.
              </p>
            </motion.div>
          </div>

          <CoalitionCard
            name="I.N.D.I.A."
            tagline="Indian National Developmental Inclusive Alliance"
            leadParty="INC (Indian National Congress)"
            focus="Social Justice & Employment"
            figures="Rahul Gandhi, Mallikarjun Kharge, Priyanka Gandhi"
            color="bg-ashoka-blue-600"
            vision="A vision of inclusive growth, constitutional safeguarding, and addressing unemployment through social justice and grassroots empowerment."
            delay={0.2}
          />
        </div>
      </div>

      {/* National Parties Grid */}
      <div className="mt-32">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-black text-primary-text uppercase tracking-widest mb-4">
            National Parties
          </h3>
          <p className="text-xs text-muted-text max-w-lg mx-auto font-medium">
            Parties recognized by the ECI as having a significant presence across multiple states.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {nationalParties.map((party, idx) => (
            <motion.div
              key={party.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-secondary-bg/40 backdrop-blur-lg border border-primary-border rounded-2xl p-4 text-center group hover:border-primary-text/20 transition-all"
            >
              <div className={`w-12 h-12 ${party.color} rounded-xl mx-auto mb-3 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <Flag className="w-6 h-6" />
              </div>
              <p className="text-sm font-black text-primary-text">{party.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Regional Kingmakers Marquee */}
      <div className="mt-32 overflow-hidden relative py-10">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-black text-primary-text uppercase tracking-widest mb-4">
            Regional Kingmakers
          </h3>
        </div>

        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {[...regionalParties, ...regionalParties].map((party, idx) => (
            <div
              key={idx}
              className="bg-secondary-bg/40 backdrop-blur-lg border border-primary-border rounded-2xl px-8 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors"
            >
              <div className="w-8 h-8 bg-primary-bg rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-muted-text" />
              </div>
              <span className="text-lg font-black text-primary-text uppercase tracking-widest">{party}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Context Note */}
      <div className="mt-24 p-8 bg-secondary-bg/30 border border-primary-border rounded-[2.5rem] text-center max-w-4xl mx-auto">
        <p className="text-xs text-muted-text font-medium leading-relaxed">
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
