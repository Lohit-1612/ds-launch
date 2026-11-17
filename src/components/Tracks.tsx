import { useState, useRef } from 'react';
import type { FC } from 'react';
import {
  Brain,
  Sparkles,
  BarChart3,
  Globe,
  Smartphone,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Layers,
  ArrowUpRight,
  SlidersHorizontal,
  LayoutGrid,
} from 'lucide-react';
import { tracksData } from '../data/tracks';
import type { TrackItem } from '../data/tracks';
import { soundManager } from '../utils/audio';

interface TracksProps {
  onSelectTrack?: (track: TrackItem) => void;
}

export const Tracks: FC<TracksProps> = ({ onSelectTrack }) => {
  const [activeTrackModal, setActiveTrackModal] = useState<TrackItem | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'horizontal' | 'grid'>('horizontal');
  const sliderRef = useRef<HTMLDivElement>(null);

  const renderIcon = (iconName: string) => {
    const props = { className: 'w-7 h-7 text-[#00E5FF]' };
    switch (iconName) {
      case 'Brain':
        return <Brain {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'BarChart3':
        return <BarChart3 {...props} />;
      case 'Globe':
        return <Globe {...props} />;
      case 'Smartphone':
        return <Smartphone {...props} />;
      case 'Lightbulb':
        return <Lightbulb {...props} />;
      default:
        return <Layers {...props} />;
    }
  };

  const nextSlide = () => {
    soundManager.playClick();
    setActiveSlideIndex((prev) => (prev + 1) % tracksData.length);
  };

  const prevSlide = () => {
    soundManager.playClick();
    setActiveSlideIndex((prev) => (prev - 1 + tracksData.length) % tracksData.length);
  };

  const goToSlide = (index: number) => {
    soundManager.playClick();
    setActiveSlideIndex(index);
  };

  return (
    <section id="tracks" className="relative py-28 overflow-hidden">
      {/* Background radial lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#00E5FF]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#287BFF]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & View Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1025] border border-[#00E5FF]/30 mb-4 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
              <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-widest font-semibold">
                [02] HACKATHON TRACKS
              </span>
            </div>

            <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white max-w-4xl leading-[1.05]">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-[#00E5FF] via-[#287BFF] to-[#8755FF] bg-clip-text text-transparent">
                Innovation Track.
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-xl text-[#A7B1CC] max-w-2xl">
              Navigate horizontally through 6 specialized tracks. Tackle high-impact engineering challenges or forge frontier solutions.
            </p>
          </div>

          {/* Mode Switcher & Horizontal Nav Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Switcher */}
            <div className="flex items-center bg-[#0A1025] p-1 rounded-xl border border-[#00E5FF]/20">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setViewMode('horizontal');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  viewMode === 'horizontal'
                    ? 'bg-[#00E5FF] text-[#050817] font-bold shadow-[0_0_12px_rgba(0,229,255,0.5)]'
                    : 'text-[#A7B1CC] hover:text-white'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Horizontal Slider</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setViewMode('grid');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#287BFF] text-white font-bold shadow-[0_0_12px_rgba(40,123,255,0.5)]'
                    : 'text-[#A7B1CC] hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
            </div>

            {/* Next / Prev Buttons for Horizontal View */}
            {viewMode === 'horizontal' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-xl bg-[#0A1025] border border-[#00E5FF]/30 hover:border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF]/10 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                  aria-label="Previous Track"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="px-3 py-2 rounded-xl bg-[#0A1025] border border-[#00E5FF]/20 font-mono text-xs text-[#00E5FF] font-bold">
                  {tracksData[activeSlideIndex].number} / 06
                </div>

                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-xl bg-[#0A1025] border border-[#00E5FF]/30 hover:border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF]/10 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                  aria-label="Next Track"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Horizontal Track Step Bar (Click to Jump horizontally) */}
        {viewMode === 'horizontal' && (
          <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {tracksData.map((t, idx) => {
              const isActive = activeSlideIndex === idx;
              return (
                <button
                  key={t.id}
                  onClick={() => goToSlide(idx)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF] font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)] scale-105'
                      : 'bg-[#0A1025]/60 text-[#A7B1CC] border border-white/10 hover:border-[#00E5FF]/40 hover:text-white'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>{t.number}. {t.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* 1. HORIZONTAL SLIDING DECK VIEW */}
        {viewMode === 'horizontal' && (
          <div className="relative w-full overflow-hidden rounded-3xl" ref={sliderRef}>
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translateX(-${activeSlideIndex * 100}%)`,
              }}
            >
              {tracksData.map((track) => (
                <div key={track.id} className="w-full shrink-0 px-1 sm:px-2">
                  <div className="relative rounded-3xl bg-gradient-to-b from-[#0A1025]/95 to-[#050817]/95 border-2 border-[#00E5FF]/40 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-[0_0_50px_rgba(0,229,255,0.2)] overflow-hidden">
                    {/* Background glow accent */}
                    <div
                      className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none"
                      style={{ backgroundColor: track.accentColor }}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left: Icon & Title info */}
                      <div className="lg:col-span-7">
                        <div className="flex items-center gap-3 mb-6">
                          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30 uppercase">
                            TRACK {track.number} • {track.tag}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 rounded-2xl bg-[#050817] border border-[#00E5FF]/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                            {renderIcon(track.iconName)}
                          </div>

                          <h3 className="font-heading font-black text-3xl sm:text-4xl text-white">
                            {track.title}
                          </h3>
                        </div>

                        <p className="text-base sm:text-lg text-[#A7B1CC] leading-relaxed mb-6">
                          {track.description}
                        </p>

                        <div className="space-y-2 mb-8">
                          <div className="font-mono text-xs uppercase tracking-wider text-[#00E5FF] font-semibold">
                            Core Challenge Themes:
                          </div>
                          {track.suggestedThemes.map((th, i) => (
                            <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#E0E8FF]">
                              <ChevronRight className="w-4 h-4 text-[#00E5FF] shrink-0" />
                              <span>{th}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                          <button
                            onClick={() => {
                              soundManager.playClick();
                              setActiveTrackModal(track);
                              if (onSelectTrack) onSelectTrack(track);
                            }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#287BFF] to-[#00E5FF] text-[#050817] font-heading font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                          >
                            <span>EXPLORE SPECIFICATIONS</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </button>

                          <div className="flex items-center gap-1.5 font-mono text-xs text-[#A7B1CC]">
                            <span>Swipe or use arrows to navigate tracks</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Tech Stack & Architecture Matrix */}
                      <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#050817]/80 border border-[#00E5FF]/20 shadow-inner">
                        <div className="font-mono text-xs text-[#00E5FF] font-bold uppercase tracking-wider mb-4 pb-2 border-b border-[#00E5FF]/15">
                          RECOMMENDED DEV STACK
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {track.technologies.map((tech) => (
                            <div
                              key={tech}
                              className="p-3 rounded-xl bg-[#0A1025] border border-[#00E5FF]/20 text-center font-mono text-xs text-white hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all"
                            >
                              {tech}
                            </div>
                          ))}
                        </div>

                        <div className="p-4 rounded-xl bg-[#0A1025]/60 border border-white/5 text-[11px] font-mono text-[#A7B1CC] space-y-1">
                          <div className="text-white font-semibold">Evaluation Weightage:</div>
                          <div>• Technical Feasibility & Architecture: 40%</div>
                          <div>• Innovation & Practical Utility: 30%</div>
                          <div>• UI/UX Polish & Working Demo: 30%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. GRID OVERVIEW VIEW */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tracksData.map((track) => (
              <div
                key={track.id}
                onMouseEnter={() => soundManager.playTick()}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTrackModal(track);
                  if (onSelectTrack) onSelectTrack(track);
                }}
                className="group relative rounded-2xl bg-[#0A1025]/80 border border-[#00E5FF]/20 hover:border-[#00E5FF]/80 backdrop-blur-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,229,255,0.25)] flex flex-col justify-between cursor-pointer overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold tracking-wider bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 uppercase">
                      {track.tag}
                    </span>
                    <span className="font-mono text-2xl font-bold text-[#A7B1CC]/40 group-hover:text-[#00E5FF] transition-colors">
                      {track.number}
                    </span>
                  </div>

                  <div className="w-14 h-14 rounded-xl bg-[#050817] border border-[#00E5FF]/30 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:border-[#00E5FF] transition-all duration-300">
                    {renderIcon(track.iconName)}
                  </div>

                  <h3 className="font-heading font-black text-2xl text-white mb-3 group-hover:text-[#00E5FF] transition-colors">
                    {track.title}
                  </h3>

                  <p className="text-sm text-[#A7B1CC] leading-relaxed mb-6">
                    {track.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#00E5FF]/15 flex items-center justify-between text-xs font-mono text-[#00E5FF]">
                  <span>Explore Track Specs</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Modal */}
        {activeTrackModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050817]/85 backdrop-blur-xl animate-in fade-in duration-200"
            onClick={() => setActiveTrackModal(null)}
          >
            <div
              className="relative max-w-2xl w-full rounded-2xl bg-[#0A1025] border border-[#00E5FF]/40 p-8 shadow-[0_0_50px_rgba(0,229,255,0.3)] max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30">
                  TRACK {activeTrackModal.number} • {activeTrackModal.tag}
                </span>
                <button
                  onClick={() => setActiveTrackModal(null)}
                  className="font-mono text-sm text-[#A7B1CC] hover:text-white px-2 py-1 rounded cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              <h3 className="font-heading font-black text-3xl text-white mb-3">
                {activeTrackModal.title}
              </h3>
              <p className="text-sm text-[#A7B1CC] leading-relaxed mb-6">
                {activeTrackModal.description}
              </p>

              <div className="mb-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#00E5FF] font-semibold mb-3">
                  Suggested Challenge Statements & Domains:
                </h4>
                <div className="space-y-2">
                  {activeTrackModal.suggestedThemes.map((theme, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#050817] border border-[#00E5FF]/15">
                      <ChevronRight className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                      <span className="text-sm text-white">{theme}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#00E5FF]/20 flex justify-end">
                <button
                  onClick={() => setActiveTrackModal(null)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#287BFF] to-[#00E5FF] text-[#050817] font-heading font-bold text-xs cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
