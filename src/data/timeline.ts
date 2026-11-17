export interface MilestoneItem {
  id: string;
  phase: string;
  time: string;
  date: string;
  title: string;
  description: string;
  status: 'upcoming' | 'active' | 'completed';
  highlightBadge?: string;
  details: string[];
}

export const timelineData: MilestoneItem[] = [
  {
    id: "reg-open",
    phase: "PHASE 01",
    time: "00:00 IST",
    date: "March 01, 2026",
    title: "Registration Opens",
    description: "Official registration portal goes live. Teams submit abstracts, team member details, and track preferences.",
    status: "completed",
    highlightBadge: "Online",
    details: ["Team formation (2-4 members)", "Selection of preferred problem track", "Initial abstract submission"]
  },
  {
    id: "reg-close",
    phase: "PHASE 02",
    time: "23:59 IST",
    date: "March 20, 2026",
    title: "Registration Closes & Shortlisting",
    description: "Final deadline for registrations. Expert jury reviews submitted proposals and announces shortlisted teams.",
    status: "upcoming",
    highlightBadge: "Deadline",
    details: ["Verification of participant credentials", "Jury review of team portfolios", "Confirmation email with pass code dispatched"]
  },
  {
    id: "inauguration",
    phase: "PHASE 03",
    time: "09:00 AM IST",
    date: "March 27, 2026",
    title: "Grand Inauguration & Keynote",
    description: "Opening ceremony at Panimalar Auditorium with keynote addresses by leading industry AI architects and college leadership.",
    status: "upcoming",
    highlightBadge: "On-Campus",
    details: ["Welcome address by dignitaries", "Keynote address: The Age of Sovereign AI", "Orientation & hackathon rules briefing"]
  },
  {
    id: "release",
    phase: "PHASE 04",
    time: "10:30 AM IST",
    date: "March 27, 2026",
    title: "Problem Statements Release",
    description: "Detailed industry problem statements, challenge datasets, and sandbox API credentials officially unlocked.",
    status: "upcoming",
    highlightBadge: "Hack Begins",
    details: ["Access to sponsor API keys & datasets", "Q&A with domain industry mentors", "Repository initialization and sprint start"]
  },
  {
    id: "development",
    phase: "PHASE 05",
    time: "11:00 AM - Overnight",
    date: "March 27 – 28, 2026",
    title: "24-Hour Continuous Development Phase",
    description: "Teams code non-stop through the night with scheduled checkpoint reviews, midnight coffee, and 1-on-1 mentor guidance.",
    status: "upcoming",
    highlightBadge: "Sprint",
    details: ["Mentorship Round 1 (Architecture & Feasibility)", "Midnight energy snacks & developer lounge", "Mentorship Round 2 (Code quality & UX)"]
  },
  {
    id: "submission",
    phase: "PHASE 06",
    time: "11:00 AM IST",
    date: "March 28, 2026",
    title: "Project Submission & Code Freeze",
    description: "All GitHub repositories locked, final commits registered, and demo video links submitted to the evaluation platform.",
    status: "upcoming",
    highlightBadge: "Hard Freeze",
    details: ["GitHub commit freeze", "Live deployment check", "Submission of architecture deck & demo walkthrough"]
  },
  {
    id: "evaluation",
    phase: "PHASE 07",
    time: "01:30 PM IST",
    date: "March 28, 2026",
    title: "Final Jury Pitching & Evaluation",
    description: "Top finalist teams present live 5-minute pitches followed by intense 3-minute technical jury Q&A sessions.",
    status: "upcoming",
    highlightBadge: "Jury Round",
    details: ["Live prototype demonstration", "Technical architecture defense", "Evaluation on innovation, impact & viability"]
  },
  {
    id: "awards",
    phase: "PHASE 08",
    time: "04:30 PM IST",
    date: "March 28, 2026",
    title: "Valedictory & Prize Distribution",
    description: "Grand closing ceremony, felicitation of winners, distribution of cash awards, trophies, and internship offers.",
    status: "upcoming",
    highlightBadge: "Celebration",
    details: ["Announcement of Grand Winner & Category champions", "Distribution of cheques & trophies", "Networking high tea & group photographs"]
  }
];
