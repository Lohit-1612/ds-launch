import { useState } from 'react';
import type { FC } from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon, Clock, Sparkles } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';
import type { TimerMode } from '../hooks/useTimer';
import { eventConfig } from '../config/eventConfig';
import { soundManager } from '../utils/audio';
import { FuturisticAnalogClock } from './FuturisticAnalogClock';
import confetti from 'canvas-confetti';

interface DigitBoxProps {
  value: string;
  label: string;
  isGlowing?: boolean;
}

const DigitBox: FC<DigitBoxProps> = ({ value, label, isGlowing = true }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Outer Card with cybernetic border */}
      <div className="relative group">
        {/* Glow ambient layer */}
        {isGlowing && (
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00E5FF]/25 via-[#287BFF]/25 to-[#8755FF]/25 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition duration-500" />
        )}

        {/* Digit Container with glassmorphism */}
        <div className="relative w-16 sm:w-24 md:w-32 lg:w-40 h-20 sm:h-28 md:h-36 lg:h-44 rounded-xl sm:rounded-2xl bg-[#070C22]/85 border border-[#00E5FF]/35 backdrop-blur-2xl flex items-center justify-center shadow-[0_10px_35px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 group-hover:border-[#00E5FF] group-hover:shadow-[0_0_40px_rgba(0,229,255,0.35)]">
          {/* Subtle horizontal scanline split */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-[#00E5FF]/20 z-10" />

          {/* Corner tech notches */}
          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t-2 border-l-2 border-[#00E5FF]/70" />
          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t-2 border-r-2 border-[#00E5FF]/70" />
          <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 border-b-2 border-l-2 border-[#00E5FF]/70" />
          <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 border-b-2 border-r-2 border-[#00E5FF]/70" />

          {/* Digital Digit Display */}
          <span className="font-mono text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_20px_rgba(0,229,255,0.75)] select-none">
            {value}
          </span>
        </div>
      </div>

      {/* Unit Label */}
      <span className="mt-2 sm:mt-3 font-mono text-[9px] sm:text-xs md:text-sm tracking-[0.2em] text-[#00E5FF] uppercase font-bold drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
        {label}
      </span>
    </div>
  );
};

export const Timer: FC = () => {
  const [showCelebration, setShowCelebration] = useState(false);

  const timer = useTimer({
    mode: eventConfig.timerDefaults.mode,
    targetDate: eventConfig.timerDefaults.targetDate,
    persistKey: 'hero_timer',
    onComplete: () => {
      setShowCelebration(true);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // Ignore confetti if unsupported
      }
    },
  });

  // Sound effects on interactions
  const handleStart = () => {
    soundManager.playStart();
    timer.start();
  };

  const handlePause = () => {
    soundManager.playPause();
    timer.pause();
  };

  const handleResume = () => {
    soundManager.playStart();
    timer.resume();
  };

  const handleReset = () => {
    soundManager.playClick();
    timer.reset();
  };

  const handleModeChange = (newMode: TimerMode) => {
    soundManager.playClick();
    timer.setMode(newMode);
  };

  const parsedHours = parseInt(timer.time.hours, 10) || 0;
  const parsedMinutes = parseInt(timer.time.minutes, 10) || 0;
  const parsedSeconds = parseInt(timer.time.seconds, 10) || 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 sm:py-8">
      {/* Timer Frame Header / Status Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 pb-3 border-b border-[#00E5FF]/20">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_12px_#00E5FF]" />
          <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-widest font-semibold drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
            HOLOGRAPHIC CHRONOMETER // {timer.mode.toUpperCase()}
          </span>
        </div>

        {/* Mode Switcher Toggle */}
        <div className="flex items-center bg-[#070C22]/90 p-1 rounded-xl border border-[#00E5FF]/30 backdrop-blur-md">
          <button
            onClick={() => handleModeChange('stopwatch')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
              timer.mode === 'stopwatch'
                ? 'bg-gradient-to-r from-[#287BFF] to-[#00E5FF] text-[#050817] shadow-[0_0_15px_rgba(0,229,255,0.6)] font-bold'
                : 'text-[#A7B1CC] hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Stopwatch
          </button>

          <button
            onClick={() => handleModeChange('countdown')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
              timer.mode === 'countdown'
                ? 'bg-gradient-to-r from-[#8755FF] to-[#00E5FF] text-white shadow-[0_0_15px_rgba(135,85,255,0.6)] font-bold'
                : 'text-[#A7B1CC] hover:text-white'
            }`}
          >
            <TimerIcon className="w-3.5 h-3.5" />
            Countdown
          </button>
        </div>
      </div>

      {/* Completion Banner */}
      {showCelebration && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[#00E5FF]/20 via-[#287BFF]/20 to-[#8755FF]/20 border border-[#00E5FF] text-center animate-bounce shadow-[0_0_30px_rgba(0,229,255,0.4)]">
          <div className="flex items-center justify-center gap-2 text-[#00E5FF] font-bold text-lg font-mono">
            <Sparkles className="w-5 h-5" />
            <span>EVENT STARTED! WELCOME TO DATASCAPE 2.0</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      )}

      {/*
        ═══════════════════════════════════════════════════════════════════
        THE BIG ANALOG CLOCK BEHIND THE DIGITAL CLOCK
        Overlayed right behind the digital timer digits with high-tech gears
        ═══════════════════════════════════════════════════════════════════
      */}
      <div className="relative flex items-center justify-center my-6 sm:my-10 min-h-[220px] sm:min-h-[340px]">
        {/* Massive Futuristic Holographic Analog Clock in Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-visible">
          <FuturisticAnalogClock
            timeValues={
              timer.status !== 'idle'
                ? {
                    hours: parsedHours,
                    minutes: parsedMinutes,
                    seconds: parsedSeconds,
                  }
                : undefined
            }
            isRunning={timer.status === 'running'}
          />
        </div>

        {/* The Digital Digits Grid (Foreground with backdrop-blur glass) */}
        <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          <DigitBox value={timer.time.days} label="DAYS" isGlowing={timer.status === 'running'} />
          <span className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold text-[#00E5FF]/60 -mt-5 select-none animate-pulse">
            :
          </span>

          <DigitBox value={timer.time.hours} label="HOURS" isGlowing={timer.status === 'running'} />
          <span className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold text-[#00E5FF]/60 -mt-5 select-none animate-pulse">
            :
          </span>

          <DigitBox value={timer.time.minutes} label="MINUTES" isGlowing={timer.status === 'running'} />
          <span className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold text-[#00E5FF]/60 -mt-5 select-none animate-pulse">
            :
          </span>

          <DigitBox value={timer.time.seconds} label="SECONDS" isGlowing={timer.status === 'running'} />
        </div>
      </div>

      {/* Action Controls */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 relative z-20">
        {timer.status === 'idle' && (
          <button
            onClick={handleStart}
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#287BFF] via-[#00E5FF] to-[#287BFF] bg-[length:200%_auto] hover:bg-right text-[#050817] font-heading font-extrabold text-sm tracking-wide shadow-[0_0_30px_rgba(0,229,255,0.5)] hover:shadow-[0_0_50px_rgba(0,229,255,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
            <span>START TIMER</span>
          </button>
        )}

        {timer.status === 'running' && (
          <button
            onClick={handlePause}
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-300 font-heading font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:bg-amber-500 hover:text-[#050817] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Pause className="w-4 h-4 fill-current" />
            <span>PAUSE TIMER</span>
          </button>
        )}

        {timer.status === 'paused' && (
          <button
            onClick={handleResume}
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#287BFF] to-[#00E5FF] text-[#050817] font-heading font-extrabold text-sm tracking-wide shadow-[0_0_25px_rgba(0,229,255,0.45)] hover:shadow-[0_0_40px_rgba(0,229,255,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>RESUME TIMER</span>
          </button>
        )}

        {timer.status !== 'idle' && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#0A1025] border border-[#00E5FF]/35 text-[#A7B1CC] hover:text-white hover:border-[#00E5FF] font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 shadow-[0_0_15px_rgba(0,229,255,0.15)]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Sub-label explaining mode */}
      <div className="mt-4 text-center">
        <p className="text-xs text-[#A7B1CC]/80 font-mono">
          {timer.mode === 'stopwatch'
            ? 'Stopwatch mode active • Initiates upward count from 00:00:00:00 upon clicking Start.'
            : `Countdown mode active • Counting down to official event opening: ${eventConfig.dates.displayDate}.`}
        </p>
      </div>
    </div>
  );
};
