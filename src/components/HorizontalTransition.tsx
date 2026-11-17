import type { FC } from 'react';
import { motion } from 'framer-motion';

interface HorizontalTransitionProps {
  label: string;
  chapterNumber?: string;
}

export const HorizontalTransition: FC<HorizontalTransitionProps> = ({
  label,
  chapterNumber,
}) => {
  return (
    <div className="relative w-full py-8 overflow-hidden pointer-events-none select-none z-20">
      {/* Central High-Intensity Horizontal Laser Line */}
      <div className="relative w-full h-[1px]">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent blur-sm" />
        {/* Core Laser Beam */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent" />
      </div>

      {/* Center Holographic Cyber Badge */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#050817]/90 border border-[#00E5FF]/30 backdrop-blur-xl shadow-[0_0_20px_rgba(0,229,255,0.2)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
        {chapterNumber && (
          <span className="font-mono text-[10px] text-[#00E5FF] font-bold tracking-widest">
            [{chapterNumber}]
          </span>
        )}
        <span className="font-mono text-[10px] text-[#A7B1CC] uppercase tracking-[0.25em] font-semibold">
          {label}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#8755FF]" />
      </div>

      {/* Subtle Horizontal Travelling Energy Wave */}
      <motion.div
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 -translate-y-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-75 blur-[1px]"
      />
    </div>
  );
};
