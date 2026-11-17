import { useState } from 'react';
import type { FC } from 'react';

interface BackgroundVideoProps {
  className?: string;
}

export const BackgroundVideo: FC<BackgroundVideoProps> = ({ className = '' }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* Looping Background Video */}
      <video
        src="/background-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-35' : 'opacity-0'
        } mix-blend-screen filter contrast-125 saturate-140`}
      />

      {/* Cyber gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030511]/90 via-[#050817]/75 to-[#030511]/95" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, #030511 90%)',
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 229, 255, 0.05) 50%, rgba(5, 8, 23, 0.6) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Neon Lighting */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#287BFF]/20 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-[#00E5FF]/15 rounded-full blur-[160px]" />
      <div className="absolute -bottom-32 left-1/3 w-[550px] h-[550px] bg-[#8755FF]/18 rounded-full blur-[150px]" />
    </div>
  );
};
