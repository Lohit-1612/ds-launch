import type { FC } from 'react';
import { ArrowUpRight, Users, Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';
import { soundManager } from '../utils/audio';

interface RegistrationProps {
  onOpenRegisterModal: () => void;
}

export const Registration: FC<RegistrationProps> = ({ onOpenRegisterModal }) => {
  const handleRegisterClick = () => {
    soundManager.playClick();
    onOpenRegisterModal();
  };

  return (
    <section id="register" className="relative py-28 overflow-hidden">
      {/* Background Volumetric Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#287BFF]/15 via-[#00E5FF]/20 to-[#8755FF]/15 blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0A1025] to-[#050817] border-2 border-[#00E5FF]/40 backdrop-blur-2xl p-8 sm:p-14 lg:p-16 shadow-[0_0_60px_rgba(0,229,255,0.25)] overflow-hidden text-center flex flex-col items-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#050817] border border-[#00E5FF]/30 mb-6 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-widest font-semibold">
              [08] REGISTRATION PORTAL
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white max-w-4xl leading-[1.05]">
            Your Next Big Idea{' '}
            <span className="bg-gradient-to-r from-[#00E5FF] via-[#287BFF] to-[#8755FF] bg-clip-text text-transparent">
              Starts Here.
            </span>
          </h2>

          {/* Description */}
          <p className="mt-6 text-base sm:text-xl text-[#A7B1CC] max-w-2xl leading-relaxed">
            {eventConfig.description} Assemble your team of {eventConfig.team.minMembers}–{eventConfig.team.maxMembers} builders and compete against the country's best minds.
          </p>

          {/* Info Pill Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#050817] border border-[#00E5FF]/20 text-[#E0E8FF]">
              <Users className="w-4 h-4 text-[#00E5FF]" />
              <span>Team Size: {eventConfig.team.minMembers} - {eventConfig.team.maxMembers} Members</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#050817] border border-[#00E5FF]/20 text-[#E0E8FF]">
              <Calendar className="w-4 h-4 text-[#287BFF]" />
              <span>Deadline: {eventConfig.dates.displayDeadline}</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#050817] border border-[#00E5FF]/20 text-[#E0E8FF]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Registration Fee: {eventConfig.registration.fee}</span>
            </div>
          </div>

          {/* Big Action Button */}
          <div className="mt-10">
            <button
              onClick={handleRegisterClick}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-[#287BFF] to-[#00E5FF] text-[#050817] font-heading font-black text-base tracking-wider shadow-[0_0_35px_rgba(0,229,255,0.5)] hover:shadow-[0_0_60px_rgba(0,229,255,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>APPLY / REGISTER NOW</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>

          {/* Registration Instructions Checklist */}
          <div className="mt-14 pt-10 border-t border-[#00E5FF]/15 w-full max-w-3xl text-left">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#00E5FF] font-semibold mb-4 text-center sm:text-left">
              Registration Steps & Guidelines:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { step: "01", text: "Form your squad of 2 to 4 eligible college students." },
                { step: "02", text: "Choose your desired track & draft a brief project abstract." },
                { step: "03", text: "Fill the official application form with verifiable college IDs." },
                { step: "04", text: "Receive confirmation & shortlisted hall passes via email." },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#050817]/60 border border-white/5">
                  <span className="font-mono text-xs font-bold text-[#00E5FF] px-2 py-0.5 rounded bg-[#00E5FF]/10 shrink-0">
                    {item.step}
                  </span>
                  <span className="text-xs text-[#A7B1CC]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
