export interface EventConfig {
  name: string;
  version: string;
  fullName: string;
  organizer: {
    college: string;
    department: string;
    location: string;
    address: string;
  };
  tagline: string;
  description: string;
  extendedDescription: string;
  dates: {
    startDate: string; // ISO format
    endDate: string;
    displayDate: string;
    registrationDeadline: string;
    displayDeadline: string;
  };
  venue: {
    name: string;
    hall: string;
    city: string;
    mapsUrl: string;
  };
  team: {
    minMembers: number;
    maxMembers: number;
    eligibility: string;
  };
  registration: {
    isOpen: boolean;
    url: string; // empty string triggers "Coming Soon" modal
    fee: string;
    platform: string;
  };
  contact: {
    email: string;
    phone: string;
    instagram: string;
    linkedin: string;
    github: string;
    discord: string;
  };
  timerDefaults: {
    mode: 'stopwatch' | 'countdown';
    targetDate: string; // ISO date for countdown
  };
}

export const eventConfig: EventConfig = {
  name: "DATASCAPE",
  version: "2.0",
  fullName: "DATASCAPE 2.0",
  organizer: {
    college: "Panimalar Engineering College",
    department: "Department of Information Technology & Computer Science",
    location: "Chennai, Tamil Nadu, India",
    address: "Bangalore Trunk Road, Varadharajapuram, Poonamallee, Chennai - 600123",
  },
  tagline: "Where Data Meets Imagination.",
  description: "Think beyond boundaries. Build intelligent solutions. Shape the future through innovation.",
  extendedDescription: "DATASCAPE 2.0 is the premier national-level hackathon bringing together the brightest engineering minds, data architects, and creative technologists to solve real-world industry problems in high-impact domains.",
  dates: {
    startDate: "2026-03-27T09:00:00+05:30",
    endDate: "2026-03-28T18:00:00+05:30",
    displayDate: "March 27 – 28, 2026",
    registrationDeadline: "2026-03-20T23:59:59+05:30",
    displayDeadline: "March 20, 2026",
  },
  venue: {
    name: "Panimalar Engineering College Campus",
    hall: "Dr. K. S. Audithan Auditorium & Advanced Computing Labs",
    city: "Chennai, Tamil Nadu",
    mapsUrl: "https://maps.google.com/?q=Panimalar+Engineering+College",
  },
  team: {
    minMembers: 2,
    maxMembers: 4,
    eligibility: "Open to undergraduate & postgraduate students from all recognized engineering institutions across India.",
  },
  registration: {
    isOpen: true,
    url: "https://unstop.com/hackathons/datascape-20-panimalar", // configurable registration link
    fee: "Free of cost",
    platform: "Unstop / Official Portal",
  },
  contact: {
    email: "datascape2.0@panimalar.ac.in",
    phone: "+91 98400 12345 / +91 94440 67890",
    instagram: "https://instagram.com/datascape.pec",
    linkedin: "https://linkedin.com/company/panimalar-engineering-college",
    github: "https://github.com/datascape-pec",
    discord: "https://discord.gg/datascape2",
  },
  timerDefaults: {
    mode: "stopwatch", // default stopwatch starting from 00:00:00:00
    targetDate: "2027-03-27T09:00:00+05:30",
  },
};
