import type { FC } from 'react';
import { Trophy, Award, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { mainPrizes, specialAwards, certificateDetails } from '../data/prizes';
import { soundManager } from '../utils/audio';

export const Prizes: FC = () => {
  const getTrophyColor = (rank: string) => {
    switch (rank) {
      case '01':
        return 'text-amber-400 drop-shadow-[0_0_25px_rgba(251,191,36,0.8)]';
      case '02':
        return 'text-slate-200 drop-shadow-[0_0_25px_rgba(0,229,255,0.7)]';
      case '03':
        return 'text-amber-600 drop-shadow-[0_0_20px_rgba(135,85,255,0.7)]';
      default:
        return 'text-[#00E5FF]';
    }
  };

  return (
    <section id="prizes" className="relative py-28 overflow-hidden">
      {/* Background radial lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-amber-500/10 via-[#00E5FF]/10 to-[#8755FF]/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1025] border border-[#00E5FF]/30 mb-4 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-widest font-semibold">
              [05] PRIZES & REWARDS
            </span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white max-w-4xl leading-[1.05]">
            Build Something.{' '}
            <span className="bg-gradient-to-r from-[#00E5FF] via-[#287BFF] to-[#8755FF] bg-clip-text text-transparent">
              Win Something.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-xl text-[#A7B1CC] max-w-2xl">
            Total prize pool exceeding ₹1,00,000+ with cash rewards, physical trophies, direct interview fast-tracks, and industry cloud credits.
          </p>
        </div>

        {/* The 3 Main Podium Prize Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          {mainPrizes.map((prize) => {
            const isFirst = prize.rank === '01';

            return (
              <div
                key={prize.id}
                onMouseEnter={() => soundManager.playTick()}
                className={`group relative rounded-3xl bg-[#0A1025]/85 border transition-all duration-300 backdrop-blur-xl p-8 sm:p-10 flex flex-col justify-between hover:-translate-y-3 ${
                  isFirst
                    ? 'border-amber-400/60 shadow-[0_0_40px_rgba(251,191,36,0.25)] hover:shadow-[0_0_60px_rgba(251,191,36,0.45)] md:-translate-y-4'
                    : 'border-[#00E5FF]/25 hover:border-[#00E5FF]/70 hover:shadow-[0_0_40px_rgba(0,229,255,0.25)]'
                }`}
              >
                {/* Top Badge */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider ${
                        isFirst
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50'
                          : 'bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30'
                      }`}
                    >
                      {prize.badge}
                    </span>

                    <span className="font-mono text-xs text-[#A7B1CC]">
                      RANK #{prize.rank}
                    </span>
                  </div>

                  {/* Trophy Icon */}
                  <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="p-6 rounded-2xl bg-[#050817] border border-white/10 shadow-inner">
                      <Trophy className={`w-16 h-16 ${getTrophyColor(prize.rank)}`} />
                    </div>
                  </div>

                  {/* Prize Title & Cash Amount */}
                  <div className="text-center mb-8">
                    <h3 className="font-heading font-black text-2xl text-white mb-2">
                      {prize.title}
                    </h3>
                    <div className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight drop-shadow-[0_0_20px_rgba(0,229,255,0.5)]">
                      {prize.amount}
                    </div>
                    <span className="font-mono text-xs text-[#A7B1CC] uppercase tracking-wider">
                      Direct Cash Grant
                    </span>
                  </div>

                  {/* Perks List */}
                  <div className="space-y-3 pt-6 border-t border-[#00E5FF]/15">
                    {prize.perks.map((perk, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isFirst ? 'text-amber-400' : 'text-[#00E5FF]'
                          }`}
                        />
                        <span className="text-xs sm:text-sm text-[#E0E8FF]/90">
                          {perk}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 text-center border-t border-white/5">
                  <span className="font-mono text-[11px] text-[#A7B1CC]">
                    Plus commemorative Panimalar trophies & certificates
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Special Category Awards */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-[#00E5FF]" />
            <h3 className="font-heading font-bold text-2xl text-white">
              Special Category Awards & Bounties
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialAwards.map((sa) => (
              <div
                key={sa.id}
                onMouseEnter={() => soundManager.playTick()}
                className="group rounded-2xl bg-[#0A1025]/70 border border-[#00E5FF]/20 hover:border-[#00E5FF]/70 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(0,229,255,0.2)] flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#050817] border border-[#00E5FF]/30 flex items-center justify-center mb-4 text-[#00E5FF] group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5" />
                  </div>

                  <h4 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-[#00E5FF] transition-colors">
                    {sa.title}
                  </h4>

                  <div className="font-mono text-sm font-bold text-[#00E5FF] mb-3">
                    {sa.amount}
                  </div>

                  <p className="text-xs text-[#A7B1CC] leading-relaxed">
                    {sa.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Section Card */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0A1025]/90 via-[#050817]/90 to-[#0A1025]/90 border border-[#00E5FF]/30 backdrop-blur-xl p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#050817] border border-[#00E5FF]/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,229,255,0.4)]">
              <ShieldCheck className="w-9 h-9 text-[#00E5FF]" />
            </div>

            <div>
              <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-wider font-semibold">
                FOR ALL PARTICIPANTS
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1 mb-2">
                {certificateDetails.title}
              </h3>
              <p className="text-sm text-[#A7B1CC] max-w-2xl leading-relaxed">
                {certificateDetails.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto shrink-0 font-mono text-xs text-[#E0E8FF]">
            {certificateDetails.benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#050817] border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                <span className="truncate">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
