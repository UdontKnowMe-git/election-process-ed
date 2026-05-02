import { ClipboardList, Search, Vote, TrendingUp } from 'lucide-react';

export const VOTER_JOURNEY_DATA = [
  {
    id: 'stage1',
    stage: 'Stage 1',
    title: 'Registration',
    description: 'The foundation of your democratic right.',
    icon: ClipboardList,
    accent: '#3B82F6', // Electric Blue
    details: {
      steps: [
        'Fill Form 6 for new registration.',
        'Ensure you are 18+ years of age.',
        'Apply for your Voter ID (EPIC card).'
      ],
      howTo: 'Visit the National Voters\' Service Portal (NVSP) or use the Voter Helpline App to register online.'
    }
  },
  {
    id: 'stage2',
    stage: 'Stage 2',
    title: 'Verification',
    description: 'Ensure your name is in the roll.',
    icon: Search,
    accent: '#3B82F6',
    details: {
      steps: [
        'Check your name in the Electoral Roll.',
        'Locate your designated Polling Booth.',
        'Download your Digital Voter Slip.'
      ],
      howTo: 'Search your details on electoralsearch.in using your EPIC number or personal details.'
    }
  },
  {
    id: 'stage3',
    stage: 'Stage 3',
    title: 'The Big Day',
    description: 'The 5-step booth process.',
    icon: Vote,
    accent: '#3B82F6',
    hasEVM: true,
    details: {
      steps: [
        'ID Check: Verification by First Polling Officer.',
        'Inking: Marking with indelible ink.',
        'Register: Signing the 17A Register.',
        'EVM Vote: Pressing the blue button.',
        'VVPAT: Verifying the printed slip.'
      ],
      howTo: 'Carry one of the 12 approved ID proofs along with your Voter Slip to the polling station.'
    }
  },
  {
    id: 'stage4',
    stage: 'Stage 4',
    title: 'Post-Poll',
    description: 'Counting and Results.',
    icon: TrendingUp,
    accent: '#3B82F6',
    details: {
      steps: [
        'Monitor Voter Turnout in real-time.',
        'Counting Day: The tallying process.',
        'Declaration of Results.'
      ],
      howTo: 'Follow the results on the ECI Results website or the Voter Helpline App.'
    }
  }
];
