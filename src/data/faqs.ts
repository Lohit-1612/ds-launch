export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    id: "eligibility",
    category: "Participation",
    question: "Who can participate?",
    answer: "DATASCAPE 2.0 is open to all enrolled undergraduate (B.E. / B.Tech / B.Sc / BCA) and postgraduate (M.E. / M.Tech / MCA / M.Sc) students from any recognized college or university across India. Students from all branches and academic years are enthusiastically welcome."
  },
  {
    id: "team-format",
    category: "Participation",
    question: "Is participation individual or team-based?",
    answer: "Participation is strictly team-based. Hackathons thrive on diverse perspectives, pair programming, and cross-disciplinary collaboration. Individual solo entries are not accepted."
  },
  {
    id: "team-size",
    category: "Team Setup",
    question: "How many members can a team have?",
    answer: "Each team must consist of 2 to 4 members. You can form teams with classmates from your own department, across different departments within your college, or even cross-college teams."
  },
  {
    id: "fee",
    category: "Registration",
    question: "Is there a registration fee?",
    answer: "No! Registration for DATASCAPE 2.0 is 100% free of cost. Panimalar Engineering College and our generous industry partners are sponsoring the entire event, including food, high-speed Wi-Fi, mentorship, developer kits, and certificates."
  },
  {
    id: "tech-stack",
    category: "Development",
    question: "What technologies can participants use?",
    answer: "There are no restrictions on your choice of programming languages, libraries, cloud platforms, or frameworks. Whether you build with Python, TypeScript, PyTorch, Flutter, Next.js, Rust, or Docker, you are free to deploy any technology stack that best solves your chosen problem statement."
  },
  {
    id: "what-to-bring",
    category: "Logistics",
    question: "What should participants bring?",
    answer: "Shortlisted participants should bring: (1) Valid College ID Card, (2) Laptops and charging adapters, (3) Extension cords / surge protectors for your team, (4) Required personal hardware/devices, and (5) Your enthusiasm and innovative mindset! Refreshments and sleeping lounges are provided on campus."
  },
  {
    id: "certificates",
    category: "Rewards",
    question: "Will certificates be provided?",
    answer: "Yes! Every participant whose team attends the offline hackathon and submits a functional prototype will receive an official, cryptographically verifiable Certificate of Participation from Panimalar Engineering College. Winners will additionally receive Distinction Certificates, Trophies, and Cash Prizes."
  },
  {
    id: "venue",
    category: "Logistics",
    question: "Where will the event take place?",
    answer: "The grand offline hackathon takes place at the Panimalar Engineering College Main Campus, located on Bangalore Trunk Road, Varadharajapuram, Poonamallee, Chennai, Tamil Nadu 600123. College transit assistance from major Chennai junctions will be communicated to shortlisted teams."
  },
  {
    id: "contact",
    category: "Support",
    question: "How can participants contact the organizers?",
    answer: "You can reach out directly via email at datascape2.0@panimalar.ac.in, join our official Discord server for instant mentor assistance, or contact our student organizing leads at +91 98400 12345. We are active 24/7 to support your questions."
  }
];
