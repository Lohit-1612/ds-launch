export interface HighlightPillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: 'Zap' | 'Users' | 'Cpu' | 'Palette';
  accent: string;
  metrics: string;
}

export const aboutPillars: HighlightPillar[] = [
  {
    id: "innovation",
    number: "01",
    title: "Innovation",
    tagline: "Architecting Next-Gen Paradigms",
    description: "Challenge legacy assumptions. Blend cutting-edge artificial intelligence, streaming data pipelines, and frontier concepts to engineer transformative products.",
    icon: "Zap",
    accent: "#00E5FF",
    metrics: "100+ Ideas Synthesized"
  },
  {
    id: "collaboration",
    number: "02",
    title: "Collaboration",
    tagline: "Cross-Disciplinary Team Synergy",
    description: "Great breakthroughs happen when machine learning researchers, systems architects, and UI designers unite under one vision in high-intensity sprints.",
    icon: "Users",
    accent: "#287BFF",
    metrics: "500+ Top Innovators"
  },
  {
    id: "technology",
    number: "03",
    title: "Technology",
    tagline: "Industry-Standard Production Stacks",
    description: "Build on production-grade infrastructure, accelerated GPU clusters, low-latency microservices, and enterprise APIs provided by our leading tech partners.",
    icon: "Cpu",
    accent: "#8755FF",
    metrics: "Enterprise GPU Access"
  },
  {
    id: "creativity",
    number: "04",
    title: "Creativity",
    tagline: "Unconstrained Problem Solving",
    description: "Data without creativity is just raw telemetry. We celebrate aesthetic elegance, human-centric UX design, and out-of-the-box creative lateral thinking.",
    icon: "Palette",
    accent: "#00E5FF",
    metrics: "Pixel-Perfect Experiences"
  }
];

export interface EventFeature {
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  icon: string;
}

export const eventStats = [
  { value: "₹1,00,000+", label: "Total Prize Pool", subtitle: "Cash awards, trophies & goodies" },
  { value: "36+ Hours", label: "Non-Stop Hacking", subtitle: "Round-the-clock innovation" },
  { value: "500+", label: "Selected Hackers", subtitle: "Top engineering talent" },
  { value: "25+ Mentors", label: "Industry Leaders", subtitle: "1-on-1 guidance & review" },
];
