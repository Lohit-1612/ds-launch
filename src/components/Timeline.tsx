import type { FC } from 'react';
import { Clock, Calendar, CheckCircle, Sparkles } from 'lucide-react';
import { timelineData } from '../data/timeline';
import { soundManager } from '../utils/audio';

export const Timeline: FC = () => {
  return (
    <section id="timeline" className="relative py-28 overflow-hidden">
      {/* Background radial lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#287BFF]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#00E5FF]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1025] border border-[#00E5FF]/30 mb-4 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-widest font-semibold">
              [04] EVENT TIMELINE
            </span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white max-w-4xl leading-[1.05]">
            Every Second{' '}
            <span className="bg-gradient-to-r from-[#00E5FF] via-[#287BFF] to-[#8755FF] bg-clip-text text-transparent">
              Counts.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-xl text-[#A7B1CC] max-w-2xl">
            A precision-engineered hackathon sequence. Follow each milestone from initial abstract submission to grand valedictory.
          </p>
        </div>

        {/* Futuristic Vertical Timeline */}
        <div className="relative">
          {/* Central Glowing Vertical Guide Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#00E5FF] via-[#287BFF] to-[#8755FF]/40 shadow-[0_0_12px_rgba(0,229,255,0.6)]" />

          {/* Left Vertical Line for Mobile/Tablet */}
          <div className="lg:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00E5FF] via-[#287BFF] to-[#8755FF]/40 shadow-[0_0_10px_rgba(0,229,255,0.5)]" />

          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => soundManager.playTick()}
                  className={`relative flex flex-col lg:flex-row items-start ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  } gap-8 lg:gap-16 group`}
                >
                  {/* Center Node / Indicator */}
                  <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="relative w-11 h-11 rounded-xl bg-[#050817] border-2 border-[#00E5FF] flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.6)] group-hover:scale-125 group-hover:border-white transition-all duration-300">
                      {item.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      ) : index === 7 ? (
                        <Sparkles className="w-5 h-5 text-amber-400" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
                      )}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="ml-14 lg:ml-0 lg:w-[calc(50%-4rem)] w-full">
                    <div className="relative rounded-2xl bg-[#0A1025]/80 border border-[#00E5FF]/20 hover:border-[#00E5FF]/80 backdrop-blur-xl p-7 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(0,229,255,0.2)]">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#00E5FF] px-2.5 py-1 rounded bg-[#00E5FF]/10 border border-[#00E5FF]/30">
                            {item.phase}
                          </span>
                          {item.highlightBadge && (
                            <span className="font-mono text-[11px] text-[#A7B1CC] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                              {item.highlightBadge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 font-mono text-xs text-[#00E5FF]">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{item.time}</span>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#A7B1CC] mb-2">
                        <Calendar className="w-3.5 h-3.5 text-[#287BFF]" />
                        <span>{item.date}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading font-black text-2xl text-white mb-3 group-hover:text-[#00E5FF] transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#A7B1CC] leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Step Sub-details */}
                      <div className="space-y-1.5 pt-4 border-t border-[#00E5FF]/10">
                        {item.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 text-xs text-[#E0E8FF]/90">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty Spacer on other side for desktop */}
                  <div className="hidden lg:block lg:w-[calc(50%-4rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
