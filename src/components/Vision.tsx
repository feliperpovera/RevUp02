export const Vision = () => {
  return (
    <section id="vision" className="py-16 md:py-24 bg-graphite relative overflow-hidden">
      <div className="absolute inset-0 animated-dots opacity-10" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Concentric circles */}
            <div className="relative h-[400px] flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Outermost circle - Vision */}
                <circle
                  cx="200"
                  cy="200"
                  r="180"
                  fill="none"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="1"
                  opacity="0.3"
                />
                <text
                  x="200"
                  y="50"
                  textAnchor="middle"
                  fill="hsl(var(--foreground))"
                  opacity="0.7"
                  className="text-sm font-heading"
                >
                  Vision
                </text>

                {/* Middle circle - Mission */}
                <circle
                  cx="200"
                  cy="200"
                  r="120"
                  fill="none"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <text
                  x="200"
                  y="100"
                  textAnchor="middle"
                  fill="hsl(var(--foreground))"
                  opacity="0.7"
                  className="text-sm font-heading"
                >
                  Mission
                </text>

                {/* Inner circle - Purpose */}
                <circle
                  cx="200"
                  cy="200"
                  r="60"
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth="2"
                  opacity="0.8"
                  className="glow-accent"
                />
                <text
                  x="200"
                  y="150"
                  textAnchor="middle"
                  fill="hsl(var(--accent))"
                  className="text-sm font-heading font-bold"
                >
                  Purpose
                </text>
              </svg>
            </div>

            {/* Right side - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-heading font-semibold text-accent">
                    Vision
                  </h3>
                  <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                    To shape the future of digital marketing by combining <span className="text-accent font-semibold">AI</span>, <span className="text-accent font-semibold">data</span>, and <span className="text-accent font-semibold">strategy</span> to help businesses grow smarter and achieve measurable results.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-heading font-semibold text-accent">
                    Mission
                  </h3>
                  <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                    We create <span className="text-accent font-semibold">data-driven</span> digital marketing strategies that combine technology and human insight to deliver <span className="text-accent font-semibold">measurable results</span>.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-heading font-semibold text-accent">
                    Purpose
                  </h3>
                  <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                    To help businesses grow with <span className="text-accent font-semibold">purpose</span> and <span className="text-accent font-semibold">strategy</span>, powered by AI and driven by measurable impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
