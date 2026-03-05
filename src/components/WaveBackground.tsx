import React from 'react';
import { cn } from '@/lib/utils';

interface WaveBackgroundProps {
  className?: string;
}

export const WaveBackground: React.FC<WaveBackgroundProps> = ({ className }) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden z-0 pointer-events-none", className)}>
      <div className="absolute inset-x-0 bottom-0 h-[50vh] min-h-[400px]">
        <svg
          className="absolute bottom-0 w-[200vw] h-full animate-[wave_15s_linear_infinite]"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,200 C300,300 300,100 600,200 C900,300 900,100 1200,200 L1200,400 L0,400 Z"
            fill="url(#wave-gradient-1)"
            className="opacity-40"
          />
          <path
            d="M0,250 C300,150 300,350 600,250 C900,150 900,350 1200,250 L1200,400 L0,400 Z"
            fill="url(#wave-gradient-2)"
            className="opacity-30"
          />
          <path
            d="M0,300 C300,350 300,200 600,300 C900,350 900,200 1200,300 L1200,400 L0,400 Z"
            fill="url(#wave-gradient-1)"
            className="opacity-50"
          />
          <defs>
            <linearGradient id="wave-gradient-1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--accent-glow))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
