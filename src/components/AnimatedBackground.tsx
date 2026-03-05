import React from 'react';
import { WaveBackground } from './WaveBackground';

export const AnimatedBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]" aria-hidden="true">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />

            {/* Wave Component */}
            <WaveBackground className="opacity-100" />

            {/* Animated background orbs from Hero */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow floating-orb" />
                <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl animate-pulse-glow floating-orb" style={{ animationDelay: "2s" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/3 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "4s" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-accent/5 rounded-full animate-spin-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-accent/3 rounded-full animate-rotate-slow" style={{ animationDirection: "reverse" }} />
            </div>

            {/* Vignette effect */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
    );
};
