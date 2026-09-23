import React from 'react';

/**
 * Global page backdrop for the Open Air canvas — intentionally quiet so the
 * editorial content carries the page. Two slow-breathing Electric Green
 * washes and a faint dot grid add depth without competing with sections.
 */
export const AnimatedBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]" aria-hidden="true">
            {/* Base canvas */}
            <div className="absolute inset-0 bg-background" />

            {/* Faint dot grid */}
            <div className="absolute inset-0 animated-dots opacity-30" />

            {/* Soft accent washes */}
            <div className="absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-accent/10 blur-[120px] animate-pulse-glow" />
            <div
                className="absolute bottom-[-15%] left-[-8%] h-[640px] w-[640px] rounded-full bg-performance/[0.06] blur-[140px] animate-pulse-glow"
                style={{ animationDelay: "2.5s" }}
            />
        </div>
    );
};
