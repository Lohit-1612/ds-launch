export interface TrackItem {
  id: string;
  tag: string;
  number: string;
  title: string;
  description: string;
  suggestedThemes: string[];
  technologies: string[];
  accentColor: string;
  iconName: 'Brain' | 'Sparkles' | 'BarChart3' | 'Globe' | 'Smartphone' | 'Lightbulb';
}

export const tracksData: TrackItem[] = [
  {
    id: "ai-ml",
    number: "01",
    tag: "INTELLIGENT SYSTEMS",
    title: "Artificial Intelligence & Machine Learning",
    description: "Develop autonomous predictive models, deep learning networks, and computer vision systems that solve high-stakes challenges in healthcare, robotics, and industrial automation.",
    suggestedThemes: [
      "Real-time Computer Vision & Object Tracking",
      "Predictive Healthcare & Diagnostic AI",
      "Autonomous Decision Making & Robotics",
      "Automated Fraud Detection & Risk Modeling"
    ],
    technologies: ["PyTorch", "TensorFlow", "OpenCV", "Scikit-Learn", "CUDA"],
    accentColor: "#287BFF",
    iconName: "Brain",
  },
  {
    id: "gen-ai",
    number: "02",
    tag: "SYNTHETIC INTELLIGENCE",
    title: "Generative AI & Autonomous Agents",
    description: "Harness foundation models, multimodal synthesis, and autonomous multi-agent swarms to create interactive intelligence, code synthesis, and dynamic content generation.",
    suggestedThemes: [
      "Domain-Specific Fine-Tuned LLM Agents",
      "Multimodal Audio/Video Synthesis",
      "Retrieval-Augmented Generation (RAG) Pipelines",
      "Autonomous Workflow Orchestration"
    ],
    technologies: ["LangChain", "Llama 3", "OpenAI API", "Hugging Face", "Vector DBs"],
    accentColor: "#00E5FF",
    iconName: "Sparkles",
  },
  {
    id: "data-science",
    number: "03",
    tag: "DATA ARCHITECTURE",
    title: "Data Science & Big Data Analytics",
    description: "Architect high-throughput streaming pipelines, distributed computation pipelines, and interactive visual telemetry to extract actionable signal from unstructured chaos.",
    suggestedThemes: [
      "Massive Scale Streaming Data Pipelines",
      "Spatial-Temporal Urban Analytics",
      "Graph Neural Networks & Complex Networks",
      "Interactive High-Density Visualization"
    ],
    technologies: ["Apache Spark", "Kafka", "ClickHouse", "D3.js", "Python"],
    accentColor: "#8755FF",
    iconName: "BarChart3",
  },
  {
    id: "web-dev",
    number: "04",
    tag: "HYPER-WEB",
    title: "Full Stack & Distributed Web",
    description: "Engineer next-generation web applications with instant latency, real-time synchronization, edge computing, decentralized protocols, and responsive immersive UI.",
    suggestedThemes: [
      "Edge-Native Collaborative Applications",
      "Real-time Distributed Workspaces",
      "WebGPU & 3D Spatial Experiences",
      "Decentralized Data Protocols"
    ],
    technologies: ["Next.js", "React", "TypeScript", "WebSockets", "Cloudflare Workers"],
    accentColor: "#00E5FF",
    iconName: "Globe",
  },
  {
    id: "app-dev",
    number: "05",
    tag: "MOBILE SYSTEMS",
    title: "Next-Gen Mobile App Development",
    description: "Create seamless cross-platform mobile experiences with on-device machine learning, offline-first architectures, low-latency device sensory APIs, and elegant haptic interaction.",
    suggestedThemes: [
      "On-Device Edge ML for Mobile",
      "Smart City & IoT Companion Apps",
      "Accessibility & Assistive Tech Apps",
      "Micro-Interaction Design & Haptics"
    ],
    technologies: ["Flutter", "React Native", "Swift", "Kotlin", "CoreML"],
    accentColor: "#287BFF",
    iconName: "Smartphone",
  },
  {
    id: "open-innovation",
    number: "06",
    tag: "FRONTIER TECH",
    title: "Open Innovation & Frontier Tech",
    description: "No boundaries, no constraints. Blend multiple disciplines to build moonshot prototypes for climate tech, quantum computing concepts, cybersecurity, or social empowerment.",
    suggestedThemes: [
      "Climate Tech & Energy Grid Optimization",
      "Cybersecurity Defense & Zero-Trust Tools",
      "FinTech Inclusion & Micro-Economics",
      "Civic Tech & Public Good Innovations"
    ],
    technologies: ["Rust", "Solidity", "Go", "Docker", "IoT Hardware"],
    accentColor: "#8755FF",
    iconName: "Lightbulb",
  },
];
