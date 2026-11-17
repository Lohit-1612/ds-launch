import type { FC } from 'react';
import { Network, Coffee, Gift, Briefcase, GraduationCap, Wifi, Trophy, Terminal } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const Highlights: FC = () => {
  const highlights = [
    {
      icon: <Network className="w-6 h-6 text-[#00E5FF]" />,
      title: "1-on-1 Veteran Mentorship",
      description: "Direct round-the-clock reviews from Lead AI Scientists, Staff Architects, and Startup Founders.",
      tag: "GUIDANCE"
    },
    {
      icon: <Briefcase className="w-6 h-6 text-[#287BFF]" />,
      title: "Recruitment & Fast-Track",
      description: "Top-performing builders receive direct internship interview invitations from our sponsor ecosystem.",
      tag: "CAREERS"
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-[#8755FF]" />,
      title: "Hands-on Technical Keynotes",
      description: "Exclusive deep-dive masterclasses on agentic workflows, fine-tuning LLMs, and distributed data systems.",
      tag: "LEARNING"
    },
    {
      icon: <Gift className="w-6 h-6 text-[#00E5FF]" />,
      title: "Premium Swag & Merchandise",
      description: "Custom hackathon hoodies, metal badges, stickers, hardware credits, and partner company vouchers.",
      tag: "SWAG"
    },
    {
      icon: <Coffee className="w-6 h-6 text-[#287BFF]" />,
      title: "24/7 Food, Coffee & Energy",
      description: "Gourmet hot meals, midnight pizzas, artisan coffee bars, and energy drinks completely free of charge.",
      tag: "HOSPITALITY"
    },
    {
      icon: <Wifi className="w-6 h-6 text-[#8755FF]" />,
      title: "High-Speed Gigabit Mesh",
      description: "Dedicated ultra-low latency Wi-Fi 6E infrastructure across all computing labs and hacking halls.",
      tag: "INFRASTRUCTURE"
    },
    {
      icon: <Trophy className="w-6 h-6 text-amber-400" />,
      title: "₹1,00,000+ Prize Pool",
      description: "Grand cash prizes, runner-up accolades, special track bounties, and category excellence awards.",
      tag: "REWARDS"
    },
    {
      icon: <Terminal className="w-6 h-6 text-[#00E5FF]" />,
      title: "Open Cloud Sandboxes",
      description: "Instant access to pre-provisioned GPU notebooks, vector DB clusters, and partner testing environments.",
      tag: "SANDBOX"
    }
  ];

  return (
    <section id="highlights" className="relative py-28 overflow-hidden">
      {/* Background radial lighting */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[400px] bg-[#8755FF]/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1025] border border-[#00E5FF]/30 mb-4 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-widest font-semibold">
              [03] EVENT HIGHLIGHTS
            </span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white max-w-4xl leading-[1.05]">
            Engineered For{' '}
            <span className="bg-gradient-to-r from-[#00E5FF] via-[#287BFF] to-[#8755FF] bg-clip-text text-transparent">
              Maximum Impact.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-xl text-[#A7B1CC] max-w-2xl">
            More than just a competition. An immersive 36-hour developer festival designed to accelerate your engineering journey.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => soundManager.playTick()}
              className="group rounded-2xl bg-[#0A1025]/75 border border-[#00E5FF]/15 hover:border-[#00E5FF]/70 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,229,255,0.2)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#050817] border border-[#00E5FF]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-[#00E5FF] px-2 py-0.5 rounded bg-[#00E5FF]/10 border border-[#00E5FF]/20">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-[#00E5FF] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A7B1CC] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#00E5FF]/10 flex items-center gap-1.5 text-[11px] font-mono text-[#00E5FF]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                <span>Complimentary for all teams</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
