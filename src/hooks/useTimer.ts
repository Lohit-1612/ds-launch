import { useState, useEffect, useRef, useCallback } from 'react';

export type TimerMode = 'stopwatch' | 'countdown';
export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

export interface FormattedTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  totalMilliseconds: number;
}

export interface UseTimerOptions {
  mode?: TimerMode;
  targetDate?: string | Date; // Target date for countdown
  persistKey?: string;
  onComplete?: () => void;
}

export interface TimerControls {
  mode: TimerMode;
  status: TimerStatus;
  time: FormattedTime;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  setMode: (mode: TimerMode) => void;
  isCompleted: boolean;
}

const STORAGE_PREFIX = 'datascape_timer_';

export function useTimer(options: UseTimerOptions = {}): TimerControls {
  const {
    mode: initialMode = 'stopwatch',
    targetDate = '2026-03-27T09:00:00+05:30',
    persistKey = 'main',
    onComplete,
  } = options;

  const [mode, setModeState] = useState<TimerMode>(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem(`${STORAGE_PREFIX}${persistKey}_mode`);
      if (savedMode === 'stopwatch' || savedMode === 'countdown') {
        return savedMode;
      }
    }
    return initialMode;
  });

  const [status, setStatus] = useState<TimerStatus>('idle');
  const [, setElapsedMs] = useState<number>(0);

  // References for precision timing calculations
  const startTimeRef = useRef<number | null>(null);
  const accumulatedMsRef = useRef<number>(0);
  const intervalRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Target timestamp for countdown
  const targetTimestamp = useRef<number>(new Date(targetDate).getTime());

  // Function to calculate countdown remaining ms
  const getCountdownRemaining = useCallback((): number => {
    const diff = targetTimestamp.current - Date.now();
    return Math.max(0, diff);
  }, []);

  // Format milliseconds into DAYS : HOURS : MINUTES : SECONDS
  const formatTime = useCallback((ms: number): FormattedTime => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      totalMilliseconds: ms,
    };
  }, []);

  // Calculate current display value
  const calculateCurrentMs = useCallback((): number => {
    if (mode === 'stopwatch') {
      if (status === 'running' && startTimeRef.current !== null) {
        return accumulatedMsRef.current + (performance.now() - startTimeRef.current);
      }
      return accumulatedMsRef.current;
    } else {
      // Countdown mode
      if (status === 'idle') {
        return getCountdownRemaining();
      }
      if (status === 'running') {
        const remaining = targetTimestamp.current - Date.now();
        return Math.max(0, remaining);
      }
      return accumulatedMsRef.current;
    }
  }, [mode, status, getCountdownRemaining]);

  // Tick function using wall-clock / performance timestamps to avoid drift
  const tick = useCallback(() => {
    if (mode === 'stopwatch') {
      if (startTimeRef.current !== null) {
        const current = accumulatedMsRef.current + (performance.now() - startTimeRef.current);
        setElapsedMs(current);
      }
    } else {
      // Countdown
      const remaining = targetTimestamp.current - Date.now();
      if (remaining <= 0) {
        setElapsedMs(0);
        setStatus('completed');
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      } else {
        setElapsedMs(remaining);
      }
    }
  }, [mode]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Update elapsedMs when mode changes or initially
  useEffect(() => {
    if (status === 'idle') {
      if (mode === 'stopwatch') {
        setElapsedMs(0);
      } else {
        setElapsedMs(getCountdownRemaining());
      }
    }
  }, [mode, status, getCountdownRemaining]);

  // Timer controls
  const start = useCallback(() => {
    if (status === 'running') return;

    if (mode === 'stopwatch') {
      startTimeRef.current = performance.now();
    } else {
      // Countdown mode
      const remaining = getCountdownRemaining();
      if (remaining <= 0) {
        setStatus('completed');
        setElapsedMs(0);
        return;
      }
    }

    setStatus('running');

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(tick, 100);
  }, [status, mode, getCountdownRemaining, tick]);

  const pause = useCallback(() => {
    if (status !== 'running') return;

    if (mode === 'stopwatch' && startTimeRef.current !== null) {
      accumulatedMsRef.current += performance.now() - startTimeRef.current;
      startTimeRef.current = null;
    } else if (mode === 'countdown') {
      accumulatedMsRef.current = getCountdownRemaining();
    }

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setStatus('paused');
  }, [status, mode, getCountdownRemaining]);

  const resume = useCallback(() => {
    if (status !== 'paused') return;

    if (mode === 'stopwatch') {
      startTimeRef.current = performance.now();
    }

    setStatus('running');

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(tick, 100);
  }, [status, mode, tick]);

  const reset = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    startTimeRef.current = null;
    accumulatedMsRef.current = 0;
    setStatus('idle');

    if (mode === 'stopwatch') {
      setElapsedMs(0);
    } else {
      setElapsedMs(getCountdownRemaining());
    }
  }, [mode, getCountdownRemaining]);

  const setMode = useCallback((newMode: TimerMode) => {
    if (newMode === mode) return;

    // Reset current timer before switching mode
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    startTimeRef.current = null;
    accumulatedMsRef.current = 0;
    setStatus('idle');
    setModeState(newMode);

    if (typeof window !== 'undefined') {
      localStorage.setItem(`${STORAGE_PREFIX}${persistKey}_mode`, newMode);
    }

    if (newMode === 'stopwatch') {
      setElapsedMs(0);
    } else {
      setElapsedMs(getCountdownRemaining());
    }
  }, [mode, persistKey, getCountdownRemaining]);

  const displayMs = calculateCurrentMs();
  const time = formatTime(status === 'idle' ? (mode === 'stopwatch' ? 0 : getCountdownRemaining()) : displayMs);

  return {
    mode,
    status,
    time,
    start,
    pause,
    resume,
    reset,
    setMode,
    isCompleted: status === 'completed',
  };
}
