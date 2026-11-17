import type { FC, MouseEvent } from 'react';
import { ArrowUpRight, Compass, ShieldCheck, MapPin, Calendar, Award } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';
import { Timer } from './Timer';
import { soundManager } from '../utils/audio';

interface HeroProps {
  onOpenRegisterModal: () => void;
}

export const Hero: FC<HeroProps> = ({ onOpenRegisterModal }) => {
  const handleExploreClick = (e: MouseEvent) => {
    e.preventDefault();
    soundManager.playClick();
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      {/* Volumetric Radial Light Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#287BFF]/20 via-[#00E5FF]/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#8755FF]/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#00E5FF]/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1025]/80 border border-[#00E5FF]/30 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(0,229,255,0.2)] animate-pulse">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
          <span className="font-mono text-[11px] sm:text-xs text-[#00E5FF] uppercase tracking-widest font-semibold">
            {eventConfig.organizer.college} PRESENTS
          </span>
        </div>

        {/* Grand Headline Display */}
        <div className="flex flex-col items-center justify-center my-2">
          <h1 className="font-heading font-black tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] leading-[0.88] select-none text-white">
            <span className="bg-gradient-to-b from-white via-[#E0E8FF] to-[#A7B1CC] bg-clip-text text-transparent">
              {eventConfig.name}
            </span>
          </h1>
          <div className="relative -mt-2 sm:-mt-6">
            <span className="font-heading font-black text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] tracking-tight bg-gradient-to-r from-[#00E5FF] via-[#287BFF] to-[#8755FF] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,229,255,0.5)]">
              {eventConfig.version}
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p className="mt-4 sm:mt-6 font-heading text-xl sm:text-2xl md:text-3xl text-white font-medium tracking-wide">
          "{eventConfig.tagline}"
        </p>

        {/* Sub-description */}
        <p className="mt-3 max-w-2xl text-sm sm:text-base md:text-lg text-[#A7B1CC] leading-relaxed">
          {eventConfig.description}
        </p>

        {/* Quick Event Pills Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono text-[#A7B1CC]">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A1025]/60 border border-[#00E5FF]/15 backdrop-blur-sm">
            <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>{eventConfig.dates.displayDate}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A1025]/60 border border-[#00E5FF]/15 backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 text-[#287BFF]" />
            <span>Panimalar Campus, Chennai</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A1025]/60 border border-[#00E5FF]/15 backdrop-blur-sm">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>₹1,00,000+ Prize Pool</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A1025]/60 border border-[#00E5FF]/15 backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Free Registration</span>
          </div>
        </div>

        {/* CTA Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenRegisterModal();
            }}
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#287BFF] to-[#00E5FF] text-[#050817] font-heading font-extrabold text-sm tracking-wider shadow-[0_0_30px_rgba(0,229,255,0.45)] hover:shadow-[0_0_50px_rgba(0,229,255,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>REGISTER NOW</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>

          <a
            href="#about"
            onClick={handleExploreClick}
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#0A1025]/80 hover:bg-[#0A1025] border border-[#00E5FF]/25 hover:border-[#00E5FF] text-white font-heading font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]"
          >
            <Compass className="w-4 h-4 text-[#00E5FF] group-hover:rotate-45 transition-transform" />
            <span>Explore Event</span>
          </a>
        </div>

        {/* The Mandatory Huge Digital Timer */}
        <div className="mt-14 w-full">
          <Timer />
        </div>
      </div>
    </section>
  );
};
