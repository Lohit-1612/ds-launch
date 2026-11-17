export interface PrizeItem {
  id: string;
  rank: string;
  title: string;
  amount: string;
  cashValue: number;
  perks: string[];
  gradient: string;
  glowColor: string;
  badge: string;
}

export interface SpecialAward {
  id: string;
  title: string;
  amount: string;
  description: string;
  icon: string;
}

export const mainPrizes: PrizeItem[] = [
  {
    id: "first-prize",
    rank: "01",
    title: "Grand Champion",
    amount: "₹ 50,000",
    cashValue: 50000,
    perks: [
      "Official Champion Trophy & Gold Medals",
      "Direct Fast-Track Internship Interview Rounds",
      "Premium Cloud & AI API Credits worth ₹50,000",
      "Winner Certificates of Grand Excellence",
      "Exclusive Media Feature on Panimalar Publications"
    ],
    gradient: "from-amber-400/20 via-yellow-500/10 to-transparent",
    glowColor: "rgba(251, 191, 36, 0.35)",
    badge: "1ST PLACE",
  },
  {
    id: "second-prize",
    rank: "02",
    title: "First Runner-Up",
    amount: "₹ 30,000",
    cashValue: 30000,
    perks: [
      "Official Silver Trophy & Silver Medals",
      "Partner Company Mentorship & Networking",
      "Cloud Credits & Developer Tool Subscriptions",
      "Distinction Certificates of Achievement",
      "Panimalar Innovation Cell Project Incubation"
    ],
    gradient: "from-slate-300/20 via-cyan-500/10 to-transparent",
    glowColor: "rgba(0, 229, 255, 0.35)",
    badge: "2ND PLACE",
  },
  {
    id: "third-prize",
    rank: "03",
    title: "Second Runner-Up",
    amount: "₹ 20,000",
    cashValue: 20000,
    perks: [
      "Official Bronze Trophy & Bronze Medals",
      "Developer Swag Kits & Tech Merchandise",
      "Cloud Credits & API Tool Vouchers",
      "Merit Certificates of Achievement",
      "Access to Annual Hackathon Alumni Network"
    ],
    gradient: "from-amber-700/20 via-purple-500/10 to-transparent",
    glowColor: "rgba(135, 85, 255, 0.35)",
    badge: "3RD PLACE",
  },
];

export const specialAwards: SpecialAward[] = [
  {
    id: "women-tech",
    title: "Best All-Women Team",
    amount: "₹ 10,000 + Trophy",
    description: "Awarded to the most impactful technical prototype designed and executed entirely by female innovators.",
    icon: "Users"
  },
  {
    id: "best-uiux",
    title: "Exceptional UI/UX Design",
    amount: "₹ 5,000 + Swag Box",
    description: "Honoring the prototype featuring extraordinary visual finesse, ergonomic user journeys, and design elegance.",
    icon: "Palette"
  },
  {
    id: "freshman",
    title: "Best Freshman Squad",
    amount: "₹ 5,000 + Tech Credits",
    description: "Recognizing outstanding engineering excellence built by first-year college participants.",
    icon: "Sparkles"
  },
  {
    id: "innovative-ai",
    title: "Moonshot AI Innovation",
    amount: "₹ 5,000 + Special Commendation",
    description: "Awarded to the project demonstrating the most daring, out-of-the-box machine learning architectural thinking.",
    icon: "Zap"
  }
];

export const certificateDetails = {
  title: "Verifiable Digital Certificates",
  description: "Every checked-in participant whose team submits a valid working prototype receives an authenticated, cryptographically signed Certificate of Participation, along with access to developer benefits from our partners.",
  benefits: [
    "ISO-standard digital certificate with unique QR verification",
    "Eligible for academic extra-curricular activity credits",
    "Exclusive discount coupons & credits from partner sponsor companies",
    "Official DATASCAPE 2.0 digital participant badge for LinkedIn"
  ]
};
