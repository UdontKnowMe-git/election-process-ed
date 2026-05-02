export const POLITICAL_DATA = {
  tiers: [
    { id: 'union', title: 'Union Government', level: 'National Level', width: 'w-full md:w-1/2', color: 'text-ashoka-blue-600', glow: 'shadow-[0_0_30px_rgba(26,54,93,0.3)] border-ashoka-blue-600/50', icon: 'Landmark', jurisdiction: 'Defense, Foreign Affairs, Railways, National Economy', representation: 'Lok Sabha (543 Members of Parliament)', repKey: 'mp' },
    { id: 'state', title: 'State Government', level: 'Regional Level', width: 'w-full md:w-3/4', color: 'text-saffron-500', glow: 'shadow-[0_0_30px_rgba(228,122,46,0.3)] border-saffron-500/50', icon: 'Building', jurisdiction: 'Police, Health, Agriculture, Local Infrastructure', representation: 'Vidhan Sabha (MLA), Vidhan Parishad', repKey: 'mla' },
    { id: 'local', title: 'Local Government', level: 'Community Level', width: 'w-full', color: 'text-india-green-600', glow: 'shadow-[0_0_30px_rgba(46,139,87,0.3)] border-india-green-600/50', icon: 'Users', jurisdiction: 'Waste Management, Street Lights, Local Roads', representation: 'Gram Panchayats, Municipal Corporations', repKey: 'local_body' }
  ],
  nationalParties: [
    { name: 'BJP', color: 'bg-saffron-500' },
    { name: 'INC', color: 'bg-ashoka-blue-600' },
    { name: 'AAP', color: 'bg-blue-500' },
    { name: 'BSP', color: 'bg-indigo-700' },
    { name: 'CPI(M)', color: 'bg-red-600' },
    { name: 'NPP', color: 'bg-india-green-600' }
  ],
  regionalParties: ['YSRCP', 'TDP', 'TMC', 'BJD', 'DMK', 'AIADMK', 'Shiv Sena', 'NCP', 'JMM', 'RJD'],
  coalitions: [
    { id: 'nda', name: 'NDA', tagline: 'National Democratic Alliance', leadParty: 'BJP (Bharatiya Janata Party)', focus: 'Economic Growth & Digital India', figures: 'Narendra Modi, Amit Shah, J.P. Nadda', color: 'bg-saffron-500', vision: "To build a 'Viksit Bharat' (Developed India) by 2047, focusing on world-class infrastructure, digital transformation, and global leadership.", delay: 0 },
    { id: 'india', name: 'I.N.D.I.A.', tagline: 'Indian National Developmental Inclusive Alliance', leadParty: 'INC (Indian National Congress)', focus: 'Social Justice & Employment', figures: 'Rahul Gandhi, Mallikarjun Kharge, Priyanka Gandhi', color: 'bg-ashoka-blue-600', vision: "A vision of inclusive growth, constitutional safeguarding, and addressing unemployment through social justice and grassroots empowerment.", delay: 0.2 }
  ]
};
