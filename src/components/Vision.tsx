export const Vision = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-graphite relative overflow-hidden">
      <div className="absolute inset-0 animated-dots opacity-10" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* About RevUp Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 md:mb-8">
              About <span className="text-accent">RevUp</span>
            </h2>
            
            <div className="space-y-6 text-base md:text-lg text-foreground/80 leading-relaxed max-w-4xl mx-auto">
              <p>
                RevUp is a <strong>modern digital marketing and automation agency</strong> helping businesses grow smarter and faster through data-driven strategy and AI-powered solutions. We specialize in <strong>Google Ads</strong>, <strong>Meta advertising</strong>, <strong>TikTok marketing</strong>, high-performance <strong>Shopify and website development</strong>, and custom <strong>automations</strong> that streamline operations and boost efficiency.
              </p>
              
              <p>
                What sets us apart is our ability to blend <strong>AI</strong>, <strong>data</strong>, and <strong>performance marketing</strong> into one unified growth engine. Whether we're building your online presence, running your ads, or automating your workflows, our goal is simple: deliver measurable results, reduce workload, and make digital growth accessible to businesses of all sizes.
              </p>
            </div>
          </div>

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
                />
                <text
                  x="200"
                  y="205"
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
                    Purpose
                  </h3>
                  <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                    To empower businesses with <span className="text-accent font-semibold">data-driven, AI-powered systems</span> that help them work smarter, operate more efficiently, and reach their full growth potential.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-heading font-semibold text-accent">
                    Mission
                  </h3>
                  <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                    To turn clicks into clients, ideas into high-performing websites and e-commerce stores, and marketing into <span className="text-accent font-semibold">measurable growth</span>—using the perfect mix of strategy, creativity, automation, and performance-driven advertising.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-heading font-semibold text-accent">
                    Vision
                  </h3>
                  <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                    To shape the future of digital marketing by bringing together <span className="text-accent font-semibold">AI, data, and technology</span>—helping businesses scale intelligently, sustainably, and with complete clarity on their results.
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
