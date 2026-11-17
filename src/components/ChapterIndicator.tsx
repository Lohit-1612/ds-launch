import type { FC } from 'react';
import type { SectionMeta } from '../hooks/useScrollSpy';

interface ChapterIndicatorProps {
  activeSection: SectionMeta;
  scrollProgress: number;
}

export const ChapterIndicator: FC<ChapterIndicatorProps> = ({ activeSection, scrollProgress }) => {
  return (
    <>
      {/* Lower Left Chapter Status Badge */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-3 bg-[#0A1025]/85 backdrop-blur-xl border border-[#00E5FF]/20 px-4 py-2.5 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-[#00E5FF]">
            [{activeSection.number}]
          </span>
          <span className="w-1 h-3 bg-[#00E5FF]/40 rounded-full" />
          <span className="font-mono text-xs tracking-wider text-white uppercase font-medium">
            CHAPTER: {activeSection.label}
          </span>
        </div>
      </div>

      {/* Floating Vertical Award/Badge on the Right edge */}
      <div className="fixed top-1/2 right-0 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center bg-[#0A1025]/80 backdrop-blur-md border-l border-t border-b border-[#00E5FF]/20 py-4 px-2 rounded-l-xl shadow-2xl">
        <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF] mb-3" />
        <span
          className="font-mono text-[10px] text-[#A7B1CC] uppercase tracking-widest font-semibold select-none"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          PANIMALAR • DATASCAPE 2.0
        </span>
      </div>

      {/* Top Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#287BFF] via-[#00E5FF] to-[#8755FF] z-50 origin-left"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </>
  );
};
