import { useEffect } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HorizontalWipeProps {
  isTransitioning: boolean;
  targetSectionName: string;
  onComplete: () => void;
}

export const HorizontalWipe: FC<HorizontalWipeProps> = ({
  isTransitioning,
  targetSectionName,
  onComplete,
}) => {
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, onComplete]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 w-full flex items-center justify-center"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white shadow-[0_0_40px_#00E5FF,0_0_80px_#287BFF]" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00E5FF]/10 to-[#00E5FF]/25" />
            <div className="relative px-6 py-2 rounded-xl bg-[#0A1025]/90 border border-[#00E5FF] text-[#00E5FF] font-mono text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(0,229,255,0.4)] backdrop-blur-xl">
              INITIALIZING: {targetSectionName}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
