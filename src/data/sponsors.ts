export interface SponsorTier {
  id: string;
  name: string;
  badge: string;
  description: string;
  sponsors: SponsorItem[];
}

export interface SponsorItem {
  name: string;
  role: string;
  tagline: string;
  category: string;
  logoPlaceholder: string; // SVG icon or stylized monogram
  websiteUrl?: string;
  accent: string;
}

export const sponsorTiers: SponsorTier[] = [
  {
    id: "title",
    name: "Title Sponsor",
    badge: "PRINCIPAL PARTNER",
    description: "Driving the frontier of computational intelligence and student innovation.",
    sponsors: [
      {
        name: "SYNAPSE DYNAMICS",
        role: "Title Partner",
        tagline: "Empowering Next-Gen Autonomous Systems",
        category: "Enterprise Cloud & AI",
        logoPlaceholder: "SD",
        accent: "#00E5FF",
      }
    ]
  },
  {
    id: "gold",
    name: "Gold Sponsors",
    badge: "GOLD LEVEL",
    description: "Empowering developers with cutting-edge infrastructure and cloud compute.",
    sponsors: [
      {
        name: "NEURACORE LABS",
        role: "Gold Sponsor",
        tagline: "Ultra-Low Latency Inference Engines",
        category: "AI Infrastructure",
        logoPlaceholder: "NL",
        accent: "#287BFF",
      },
      {
        name: "QUANTUM PULSE",
        role: "Gold Sponsor",
        tagline: "Distributed High-Throughput Analytics",
        category: "Data Platforms",
        logoPlaceholder: "QP",
        accent: "#8755FF",
      }
    ]
  },
  {
    id: "silver",
    name: "Silver Sponsors",
    badge: "SILVER LEVEL",
    description: "Supporting developer toolchains, modern frameworks, and cloud credits.",
    sponsors: [
      {
        name: "APEX PROTOCOL",
        role: "Silver Sponsor",
        tagline: "Decentralized Compute & Storage",
        category: "Web3 & Cloud",
        logoPlaceholder: "AP",
        accent: "#00E5FF",
      },
      {
        name: "DEVSTACK IO",
        role: "Silver Sponsor",
        tagline: "Unified API Orchestration Suite",
        category: "DevOps & Tooling",
        logoPlaceholder: "DS",
        accent: "#287BFF",
      },
      {
        name: "HYPERVECTOR",
        role: "Silver Sponsor",
        tagline: "Vector Search for Semantic Retrieval",
        category: "Database Systems",
        logoPlaceholder: "HV",
        accent: "#8755FF",
      }
    ]
  },
  {
    id: "tech-partners",
    name: "Technology & Platform Partners",
    badge: "TECH ECOSYSTEM",
    description: "Providing hackathon participants with API credits, hardware sandboxes, and cloud VMs.",
    sponsors: [
      {
        name: "CLOUD MATRIX",
        role: "Compute Partner",
        tagline: "Global Edge GPU Clusters",
        category: "Cloud Compute",
        logoPlaceholder: "CM",
        accent: "#00E5FF",
      },
      {
        name: "CYBERSEC SHIELD",
        role: "Security Partner",
        tagline: "Automated API Defense & Audits",
        category: "Cybersecurity",
        logoPlaceholder: "CS",
        accent: "#287BFF",
      },
      {
        name: "API FLIGHT",
        role: "Tooling Partner",
        tagline: "Instant Mocking & Testing Suites",
        category: "API Tools",
        logoPlaceholder: "AF",
        accent: "#8755FF",
      },
      {
        name: "STREAM FORGE",
        role: "Streaming Partner",
        tagline: "Real-time Event Ingestion Broker",
        category: "Event Streaming",
        logoPlaceholder: "SF",
        accent: "#00E5FF",
      }
    ]
  },
  {
    id: "community-partners",
    name: "Community & Ecosystem Partners",
    badge: "COMMUNITY REACH",
    description: "Student clubs, developer forums, and open-source communities across 50+ campuses.",
    sponsors: [
      {
        name: "CHENNAI DEV CIRCLE",
        role: "Community Partner",
        tagline: "Tamil Nadu's Largest Tech Community",
        category: "Student Developers",
        logoPlaceholder: "CDC",
        accent: "#287BFF",
      },
      {
        name: "OPEN DATA GUILD",
        role: "Knowledge Partner",
        tagline: "Open Source Data Initiatives",
        category: "Open Source",
        logoPlaceholder: "ODG",
        accent: "#8755FF",
      },
      {
        name: "AI STUDENT NETWORK",
        role: "Outreach Partner",
        tagline: "Empowering 10,000+ AI Enthusiasts",
        category: "Student Outreach",
        logoPlaceholder: "ASN",
        accent: "#00E5FF",
      }
    ]
  }
];
