import { useEffect, useCallback, useRef, useState } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TargetAndTransition, Transition } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Hero } from './Hero';
import { About } from './About';
import { Tracks } from './Tracks';
import { Highlights } from './Highlights';
import { Timeline } from './Timeline';
import { Prizes } from './Prizes';
import { Sponsors } from './Sponsors';
import { FAQ } from './FAQ';
import { Registration } from './Registration';
import { Footer } from './Footer';
import { soundManager } from '../utils/audio';
import type { SectionMeta } from '../hooks/useScrollSpy';

export interface ExtendedSectionMeta extends SectionMeta {
  name: string;
}

export const SECTIONS_LIST: ExtendedSectionMeta[] = [
  { id: 'hero',       name: 'Home',      number: '00', label: 'WELCOME',    title: 'Experiences, Engineered' },
  { id: 'about',      name: 'About',     number: '01', label: 'ABOUT',      title: 'Beyond Data. Beyond Limits.' },
  { id: 'tracks',     name: 'Tracks',    number: '02', label: 'TRACKS',     title: 'Choose Your Innovation Track' },
  { id: 'highlights', name: 'Highlights',number: '03', label: 'HIGHLIGHTS', title: 'Every Second Counts' },
  { id: 'timeline',   name: 'Timeline',  number: '04', label: 'TIMELINE',   title: 'Event Roadmap' },
  { id: 'prizes',     name: 'Prizes',    number: '05', label: 'PRIZES',     title: 'Build Something. Win Something' },
  { id: 'sponsors',   name: 'Sponsors',  number: '06', label: 'SPONSORS',   title: 'Powered By Innovation' },
  { id: 'faq',        name: 'FAQ',       number: '07', label: 'FAQ',        title: "Questions? We've Got Answers" },
  { id: 'register',   name: 'Register',  number: '08', label: 'REGISTER',   title: 'Your Next Big Idea Starts Here' },
];

interface SectionMotionDef {
  label: string;
  duration: number;
  ease: [number, number, number, number];
  enter: (dir: number) => TargetAndTransition;
  center: TargetAndTransition;
  exit: (dir: number) => TargetAndTransition;
}

const SECTION_MOTIONS: SectionMotionDef[] = [
  {
    label: 'PARALLAX DRIFT',
    duration: 0.65,
    ease: [0.25, 0.46, 0.45, 0.94],
    enter: (d) => ({ x: `${d * 100}%`, scale: 1.05, opacity: 0.25, filter: 'blur(8px)' }),
    center: { x: '0%', scale: 1, opacity: 1, filter: 'blur(0px)' },
    exit: (d) => ({ x: `${-d * 100}%`, scale: 0.95, opacity: 0.2, filter: 'blur(6px)' }),
  },
  {
    label: 'PAGE TURN 3D',
    duration: 0.68,
    ease: [0.16, 1, 0.3, 1],
    enter: (d) => ({ x: `${d * 100}%`, rotateY: d * 20, scale: 0.92, opacity: 0.2 }),
    center: { x: '0%', rotateY: 0, scale: 1, opacity: 1 },
    exit: (d) => ({ x: `${-d * 100}%`, rotateY: -d * 20, scale: 0.92, opacity: 0.2 }),
  },
  {
    label: 'WARP SKEW',
    duration: 0.58,
    ease: [0.22, 1, 0.36, 1],
    enter: (d) => ({ x: `${d * 100}%`, skewX: -d * 8, scale: 0.96, opacity: 0.3 }),
    center: { x: '0%', skewX: 0, scale: 1, opacity: 1 },
    exit: (d) => ({ x: `${-d * 100}%`, skewX: d * 8, scale: 0.96, opacity: 0.3 }),
  },
  {
    label: 'QUANTUM ZOOM',
    duration: 0.62,
    ease: [0.4, 0, 0.2, 1],
    enter: (d) => ({ x: `${d * 100}%`, scale: 0.82, opacity: 0.2 }),
    center: { x: '0%', scale: 1, opacity: 1 },
    exit: (d) => ({ x: `${-d * 100}%`, scale: 1.15, opacity: 0.2 }),
  },
  {
    label: 'GRAVITY ARC',
    duration: 0.65,
    ease: [0.34, 1.2, 0.64, 1],
    enter: (d) => ({ x: `${d * 100}%`, y: 40, opacity: 0.25 }),
    center: { x: '0%', y: 0, opacity: 1 },
    exit: (d) => ({ x: `${-d * 100}%`, y: -30, opacity: 0.2 }),
  },
  {
    label: 'CURTAIN REVEAL',
    duration: 0.68,
    ease: [0.16, 1, 0.3, 1],
    enter: (d) => ({ x: `${d * 100}%`, rotateZ: d * 2.5, scale: 0.92, opacity: 0.25 }),
    center: { x: '0%', rotateZ: 0, scale: 1, opacity: 1 },
    exit: (d) => ({ x: `${-d * 100}%`, rotateZ: -d * 2.5, scale: 0.92, opacity: 0.2 }),
  },
  {
    label: 'VENETIAN SHUTTER',
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94],
    enter: (d) => ({ x: `${d * 100}%`, rotateX: 15, opacity: 0.25 }),
    center: { x: '0%', rotateX: 0, opacity: 1 },
    exit: (d) => ({ x: `${-d * 100}%`, rotateX: -12, opacity: 0.2 }),
  },
  {
    label: 'DOMINO FOLD',
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1],
    enter: (d) => ({ x: `${d * 100}%`, skewY: d * 3, opacity: 0.25 }),
    center: { x: '0%', skewY: 0, opacity: 1 },
    exit: (d) => ({ x: `${-d * 100}%`, skewY: -d * 3, opacity: 0.2 }),
  },
  {
    label: 'POWER SURGE',
    duration: 0.65,
    ease: [0.16, 1, 0.3, 1],
    enter: (d) => ({ x: `${d * 100}%`, scale: 0.88, opacity: 0.3, filter: 'brightness(1.8)' }),
    center: { x: '0%', scale: 1, opacity: 1, filter: 'brightness(1)' },
    exit: (d) => ({ x: `${-d * 100}%`, scale: 1.08, opacity: 0.2, filter: 'brightness(0.6)' }),
  },
];

function renderSectionContent(index: number, onOpenRegisterModal: () => void) {
  switch (index) {
    case 0: return <Hero onOpenRegisterModal={onOpenRegisterModal} />;
    case 1: return <About />;
    case 2: return <Tracks />;
    case 3: return <Highlights />;
    case 4: return <Timeline />;
    case 5: return <Prizes />;
    case 6: return <Sponsors />;
    case 7: return <FAQ />;
    case 8: return <><Registration onOpenRegisterModal={onOpenRegisterModal} /><Footer /></>;
    default: return <Hero onOpenRegisterModal={onOpenRegisterModal} />;
  }
}

interface HorizontalSectionViewProps {
  currentSectionIndex: number;
  direction: number;
  onNavigateIndex: (index: number, direction: number) => void;
  onOpenRegisterModal: () => void;
}

export const HorizontalSectionView: FC<HorizontalSectionViewProps> = ({
  currentSectionIndex,
  direction,
  onNavigateIndex,
  onOpenRegisterModal,
}) => {
  const canGoPrev = currentSectionIndex > 0;
  const canGoNext = currentSectionIndex < SECTIONS_LIST.length - 1;

  const isCooldownRef = useRef(false);
  const accumulatedDeltaRef = useRef(0);
  const deltaResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [hudLabel, setHudLabel] = useState('');
  const [showHud, setShowHud] = useState(false);
  const hudTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateGuarded = useCallback((targetIndex: number, dir: number) => {
    if (isCooldownRef.current) return;
    if (targetIndex < 0 || targetIndex >= SECTIONS_LIST.length) return;

    isCooldownRef.current = true;
    accumulatedDeltaRef.current = 0;

    const motionDef = SECTION_MOTIONS[targetIndex] ?? SECTION_MOTIONS[0];
    setHudLabel(motionDef.label);
    setShowHud(true);
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    hudTimerRef.current = setTimeout(() => setShowHud(false), 1200);

    soundManager.playClick();
    onNavigateIndex(targetIndex, dir);

    setTimeout(() => {
      isCooldownRef.current = false;
      const newPanel = document.querySelector(`[data-section-panel="${targetIndex}"]`);
      if (newPanel) {
        newPanel.scrollTop = 0;
      }
    }, motionDef.duration * 1000 + 150);
  }, [onNavigateIndex]);

  const handlePrev = useCallback(() => {
    if (canGoPrev) navigateGuarded(currentSectionIndex - 1, -1);
  }, [canGoPrev, currentSectionIndex, navigateGuarded]);

  const handleNext = useCallback(() => {
    if (canGoNext) navigateGuarded(currentSectionIndex + 1, 1);
  }, [canGoNext, currentSectionIndex, navigateGuarded]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isCooldownRef.current) return;

      const activePanel = document.querySelector(
        `[data-section-panel="${currentSectionIndex}"]`
      ) as HTMLDivElement | null;

      if (!activePanel) return;

      const { scrollTop, scrollHeight, clientHeight } = activePanel;
      const isScrollable = scrollHeight > clientHeight + 20;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 15;
      const isAtTop = scrollTop <= 8;

      if (isScrollable) {
        if (e.deltaY > 0 && !isAtBottom) {
          accumulatedDeltaRef.current = 0;
          return;
        }
        if (e.deltaY < 0 && !isAtTop) {
          accumulatedDeltaRef.current = 0;
          return;
        }
      }

      accumulatedDeltaRef.current += e.deltaY;

      if (deltaResetTimerRef.current) clearTimeout(deltaResetTimerRef.current);
      deltaResetTimerRef.current = setTimeout(() => {
        accumulatedDeltaRef.current = 0;
      }, 250);

      const THRESHOLD = 65;

      if (accumulatedDeltaRef.current > THRESHOLD) {
        accumulatedDeltaRef.current = 0;
        handleNext();
      } else if (accumulatedDeltaRef.current < -THRESHOLD) {
        accumulatedDeltaRef.current = 0;
        handlePrev();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (deltaResetTimerRef.current) clearTimeout(deltaResetTimerRef.current);
    };
  }, [currentSectionIndex, handleNext, handlePrev]);

  // Touch Swipe for Mobile & Tablet
  useEffect(() => {
    let startX: number | null = null;
    let startY: number | null = null;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (startX === null || startY === null) return;
      const dx = startX - e.changedTouches[0].clientX;
      const dy = startY - e.changedTouches[0].clientY;
      const SWIPE_DIST = 60;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_DIST) {
        if (dx > 0) handleNext();
        else handlePrev();
      }

      startX = null;
      startY = null;
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [handleNext, handlePrev]);

  // Keyboard Navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') handleNext();
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') handlePrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleNext, handlePrev]);

  const activeMotion = SECTION_MOTIONS[currentSectionIndex] ?? SECTION_MOTIONS[0];
  const activeSectionMeta = SECTIONS_LIST[currentSectionIndex];

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ perspective: 1200 }}
    >
      {canGoPrev && (
        <button
          onClick={handlePrev}
          className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-2xl bg-[#0A1025]/85 border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF]/20 hover:border-[#00E5FF] hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.3)] backdrop-blur-xl cursor-pointer group"
          title={`Previous: ${SECTIONS_LIST[currentSectionIndex - 1].name}`}
          aria-label="Previous Section"
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
        </button>
      )}

      {canGoNext && (
        <button
          onClick={handleNext}
          className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-2xl bg-[#0A1025]/85 border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF]/20 hover:border-[#00E5FF] hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.3)] backdrop-blur-xl cursor-pointer group"
          title={`Next: ${SECTIONS_LIST[currentSectionIndex + 1].name}`}
          aria-label="Next Section"
        >
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
        </button>
      )}

      <AnimatePresence>
        {showHud && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4 py-1.5 rounded-full bg-[#070C22]/90 border border-[#00E5FF]/40 text-[#00E5FF] text-[10px] font-mono tracking-[0.25em] uppercase backdrop-blur-xl shadow-[0_0_20px_rgba(0,229,255,0.25)] flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
            <span>TRANSITION: {hudLabel}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-20 right-6 sm:right-12 z-40 pointer-events-none hidden sm:block">
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#070C22]/60 border border-[#00E5FF]/20 backdrop-blur-md">
          <span className="font-mono text-xs text-[#00E5FF] font-bold">
            {activeSectionMeta.number}
          </span>
          <span className="text-[#A7B1CC]/40 text-xs">/</span>
          <span className="font-mono text-xs text-[#A7B1CC]/70">08</span>
        </div>
      </div>

      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={currentSectionIndex}
          custom={direction}
          data-section-panel={currentSectionIndex}
          initial={activeMotion.enter(direction)}
          animate={activeMotion.center}
          exit={activeMotion.exit(direction)}
          transition={{
            duration: activeMotion.duration,
            ease: activeMotion.ease,
          } as Transition}
          className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#00E5FF]/30 hover:scrollbar-thumb-[#00E5FF]/60"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform, opacity',
          }}
        >
          <div className="relative w-full min-h-screen pt-20 pb-20">
            {renderSectionContent(currentSectionIndex, onOpenRegisterModal)}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 select-none">
        {SECTIONS_LIST.map((sec, idx) => {
          const isActive = idx === currentSectionIndex;
          return (
            <button
              key={sec.id}
              onClick={() => {
                const dir = idx > currentSectionIndex ? 1 : -1;
                navigateGuarded(idx, dir);
              }}
              title={`Go to ${sec.name}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'w-8 h-2 bg-gradient-to-r from-[#287BFF] to-[#00E5FF] shadow-[0_0_12px_#00E5FF]'
                  : 'w-2 h-2 bg-white/25 hover:bg-[#00E5FF]/60 hover:scale-125'
              }`}
              aria-label={`Jump to section ${sec.name}`}
            />
          );
        })}
      </div>
    </div>
  );
};
