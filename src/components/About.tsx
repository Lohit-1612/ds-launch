import type { FC } from 'react';
import { Zap, Users, Cpu, Palette, CheckCircle2, Sparkles, Building, Rocket } from 'lucide-react';
import { aboutPillars, eventStats } from '../data/highlights';
import { eventConfig } from '../config/eventConfig';
import { soundManager } from '../utils/audio';

export const About: FC = () => {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#00E5FF]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-[#287BFF]" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#8755FF]" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#00E5FF]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#00E5FF]" />;
    }
  };

  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Background radial lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#287BFF]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8755FF]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1025] border border-[#00E5FF]/30 mb-4 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-widest font-semibold">
              [01] ABOUT DATASCAPE 2.0
            </span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white max-w-4xl leading-[1.05]">
            Beyond Data.{' '}
            <span className="bg-gradient-to-r from-[#00E5FF] via-[#287BFF] to-[#8755FF] bg-clip-text text-transparent">
              Beyond Limits.
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-xl text-[#A7B1CC] max-w-3xl leading-relaxed">
            {eventConfig.extendedDescription}
          </p>
        </div>

        {/* Editorial Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Main narrative card */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0A1025]/70 border border-[#00E5FF]/20 backdrop-blur-xl p-8 sm:p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00E5FF]/20 transition-all duration-700" />

            <div className="flex items-center gap-2.5 text-[#00E5FF] font-mono text-xs uppercase tracking-wider mb-4">
              <Building className="w-4 h-4" />
              <span>ACADEMIC HERITAGE & VISION</span>
            </div>

            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-4">
              Organized by {eventConfig.organizer.college}
            </h3>

            <p className="text-sm sm:text-base text-[#A7B1CC] leading-relaxed mb-6">
              Founded under the banner of Panimalar Engineering College, DATASCAPE has evolved into one of South India's premier student innovation launchpads. By bridging theoretical computer science with ruthless real-world execution, we create an arena where aspiring engineers prototype viable solutions within 36 hours.
            </p>

            <div className="space-y-3">
              {[
                "24/7 dedicated computing labs with high-speed campus gigabit mesh",
                "Direct mentorship from senior machine learning architects & founders",
                "Rigorous industry-aligned evaluation rubrics focusing on architecture & UX",
                "Incubation pathway & seed mentorship for top winning concepts"
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#E0E8FF]">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {eventStats.map((st, i) => (
              <div
                key={i}
                className="rounded-2xl bg-[#0A1025]/60 border border-[#00E5FF]/15 backdrop-blur-md p-6 flex flex-col justify-between hover:border-[#00E5FF]/40 hover:shadow-[0_0_25px_rgba(0,229,255,0.15)] transition-all duration-300"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] mb-4" />
                <div>
                  <div className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                    {st.value}
                  </div>
                  <div className="font-mono text-xs text-[#00E5FF] font-semibold uppercase tracking-wider mt-1">
                    {st.label}
                  </div>
                  <div className="text-[11px] text-[#A7B1CC] mt-0.5">
                    {st.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Four Visual Highlight Pillars */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <Rocket className="w-4 h-4 text-[#00E5FF]" />
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
              The Four Pillars of DATASCAPE
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutPillars.map((p) => (
              <div
                key={p.id}
                onMouseEnter={() => soundManager.playTick()}
                className="group relative rounded-2xl bg-[#0A1025]/80 border border-[#00E5FF]/20 hover:border-[#00E5FF]/70 backdrop-blur-xl p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_35px_rgba(0,229,255,0.2)] flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Number and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-[#00E5FF] font-bold tracking-widest px-2 py-0.5 rounded bg-[#00E5FF]/10 border border-[#00E5FF]/30">
                      {p.number}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#050817] border border-[#00E5FF]/30 group-hover:scale-110 transition-transform">
                      {getIcon(p.icon)}
                    </div>
                  </div>

                  <h4 className="font-heading font-black text-xl text-white mb-2 group-hover:text-[#00E5FF] transition-colors">
                    {p.title}
                  </h4>

                  <div className="text-xs font-mono text-[#00E5FF]/90 font-medium mb-3">
                    {p.tagline}
                  </div>

                  <p className="text-xs sm:text-sm text-[#A7B1CC] leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Bottom Metric Pill */}
                <div className="mt-6 pt-4 border-t border-[#00E5FF]/15 flex items-center justify-between text-[11px] font-mono text-[#A7B1CC]">
                  <span className="text-white/60">Metric:</span>
                  <span className="text-[#00E5FF] font-semibold">{p.metrics}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
