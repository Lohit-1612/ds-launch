import { useEffect, useState, useMemo } from 'react';
import type { FC } from 'react';

interface FuturisticAnalogClockProps {
  className?: string;
  size?: number;
  timeValues?: {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds?: number;
  };
  isRunning?: boolean;
}

export const FuturisticAnalogClock: FC<FuturisticAnalogClockProps> = ({
  className = '',
  timeValues,
  isRunning = true,
}) => {
  const [liveTime, setLiveTime] = useState(() => new Date());

  useEffect(() => {
    if (timeValues) return;
    const interval = setInterval(() => {
      setLiveTime(new Date());
    }, 50);
    return () => clearInterval(interval);
  }, [timeValues]);

  const { hours, minutes, seconds, millis } = useMemo(() => {
    if (timeValues) {
      return {
        hours: timeValues.hours % 12,
        minutes: timeValues.minutes % 60,
        seconds: timeValues.seconds % 60,
        millis: timeValues.milliseconds ?? 0,
      };
    }
    return {
      hours: liveTime.getHours() % 12,
      minutes: liveTime.getMinutes(),
      seconds: liveTime.getSeconds(),
      millis: liveTime.getMilliseconds(),
    };
  }, [timeValues, liveTime]);

  const secondAngle = (seconds + millis / 1000) * 6;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const hourAngle = (hours + minutes / 60) * 30;

  const ticks = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => {
      const angle = i * 6;
      const isMajor = i % 5 === 0;
      const isQuarter = i % 15 === 0;
      return {
        index: i,
        angle,
        isMajor,
        isQuarter,
        r1: isQuarter ? 240 : isMajor ? 245 : 252,
        r2: 260,
      };
    });
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ perspective: 1000 }}
    >
      <div className="absolute w-[450px] sm:w-[600px] md:w-[700px] h-[450px] sm:h-[600px] md:h-[700px] rounded-full bg-gradient-to-tr from-[#287BFF]/25 via-[#00E5FF]/20 to-[#8755FF]/25 blur-[90px] animate-pulse" />

      <svg
        viewBox="0 0 600 600"
        className="w-[340px] sm:w-[500px] md:w-[620px] lg:w-[720px] h-[340px] sm:h-[500px] md:h-[620px] lg:h-[720px] overflow-visible drop-shadow-[0_0_35px_rgba(0,229,255,0.35)]"
      >
        <defs>
          <filter id="clock-cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="dial-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0A1025" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#050817" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.15" />
          </radialGradient>

          <linearGradient id="laser-cyan" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#287BFF" />
          </linearGradient>
        </defs>

        {/* Outer Ring */}
        <g className="animate-[spin_60s_linear_infinite] origin-center opacity-40">
          <circle cx="300" cy="300" r="285" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="4 8" />
          <circle cx="300" cy="300" r="292" fill="none" stroke="#8755FF" strokeWidth="1" strokeDasharray="16 32" />
        </g>

        {/* Counter-Rotating Degree Ring */}
        <g className="animate-[spin_40s_linear_infinite_reverse] origin-center opacity-50">
          <circle cx="300" cy="300" r="275" fill="none" stroke="#00E5FF" strokeWidth="2" strokeDasharray="1 12" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <text
              key={deg}
              x={300 + 268 * Math.cos(((deg - 90) * Math.PI) / 180)}
              y={300 + 268 * Math.sin(((deg - 90) * Math.PI) / 180)}
              fill="#00E5FF"
              fontSize="8"
              fontFamily="monospace"
              textAnchor="middle"
              dominantBaseline="middle"
              opacity="0.7"
            >
              {deg}°
            </text>
          ))}
        </g>

        {/* Base Dial */}
        <circle cx="300" cy="300" r="260" fill="url(#dial-gradient)" stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.4" filter="url(#clock-cyan-glow)" />

        {/* Concentric Rings */}
        <circle cx="300" cy="300" r="210" fill="none" stroke="#287BFF" strokeWidth="1" strokeOpacity="0.25" />
        <circle cx="300" cy="300" r="160" fill="none" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 6" />
        <circle cx="300" cy="300" r="110" fill="none" stroke="#8755FF" strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="300" cy="300" r="60"  fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Ticks */}
        {ticks.map((tick) => {
          const rad = ((tick.angle - 90) * Math.PI) / 180;
          const x1 = 300 + tick.r1 * Math.cos(rad);
          const y1 = 300 + tick.r1 * Math.sin(rad);
          const x2 = 300 + tick.r2 * Math.cos(rad);
          const y2 = 300 + tick.r2 * Math.sin(rad);

          return (
            <line
              key={tick.index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={tick.isQuarter ? '#00E5FF' : tick.isMajor ? '#287BFF' : '#A7B1CC'}
              strokeWidth={tick.isQuarter ? 3.5 : tick.isMajor ? 2 : 1}
              strokeOpacity={tick.isMajor ? 0.9 : 0.4}
              strokeLinecap="round"
            />
          );
        })}

        {/* 12 Markers */}
        {[
          { label: 'XII', deg: 0 },
          { label: '01', deg: 30 },
          { label: '02', deg: 60 },
          { label: 'III', deg: 90 },
          { label: '04', deg: 120 },
          { label: '05', deg: 150 },
          { label: 'VI', deg: 180 },
          { label: '07', deg: 210 },
          { label: '08', deg: 240 },
          { label: 'IX', deg: 270 },
          { label: '10', deg: 300 },
          { label: '11', deg: 330 },
        ].map((item) => {
          const rad = ((item.deg - 90) * Math.PI) / 180;
          const tx = 300 + 225 * Math.cos(rad);
          const ty = 300 + 225 * Math.sin(rad);
          const isQuarter = item.deg % 90 === 0;

          return (
            <text
              key={item.label}
              x={tx}
              y={ty}
              fill={isQuarter ? '#00E5FF' : '#FFFFFF'}
              fontSize={isQuarter ? '15' : '11'}
              fontWeight={isQuarter ? '900' : '600'}
              fontFamily="Space Grotesk, monospace"
              textAnchor="middle"
              dominantBaseline="middle"
              opacity={isQuarter ? '1' : '0.75'}
            >
              {item.label}
            </text>
          );
        })}

        {/* Hour Hand */}
        <g transform={`rotate(${hourAngle} 300 300)`}>
          <polygon points="294,300 297,165 300,145 303,165 306,300 302,330 298,330" fill="#8755FF" opacity="0.85" />
          <line x1="300" y1="150" x2="300" y2="290" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* Minute Hand */}
        <g transform={`rotate(${minuteAngle} 300 300)`}>
          <polygon points="296,300 298,105 300,85 302,105 304,300 302,345 298,345" fill="#287BFF" opacity="0.9" />
          <line x1="300" y1="90" x2="300" y2="290" stroke="#00E5FF" strokeWidth="2" />
        </g>

        {/* Second Hand */}
        <g transform={`rotate(${secondAngle} 300 300)`}>
          <circle cx="300" cy="355" r="9" fill="none" stroke="#00E5FF" strokeWidth="2" />
          <line x1="300" y1="365" x2="300" y2="300" stroke="#00E5FF" strokeWidth="2.5" />
          <line x1="300" y1="300" x2="300" y2="55" stroke="url(#laser-cyan)" strokeWidth="2" filter="url(#clock-cyan-glow)" />
          <polygon points="300,42 296,55 300,52 304,55" fill="#00E5FF" filter="url(#clock-cyan-glow)" />
        </g>

        {/* Center Hub */}
        <circle cx="300" cy="300" r="16" fill="#0A1025" stroke="#00E5FF" strokeWidth="3" />
        <circle cx="300" cy="300" r="8" fill="#00E5FF" className={isRunning ? 'animate-ping' : ''} opacity="0.6" />
        <circle cx="300" cy="300" r="6" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
