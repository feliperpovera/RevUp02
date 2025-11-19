import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Zap, Target } from "lucide-react";

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent/20 via-background to-background" role="banner">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 animate-bounce" style={{ animationDuration: '3s' }}>
        <TrendingUp className="w-12 h-12 text-accent/30" />
      </div>
      <div className="absolute top-40 right-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
        <Zap className="w-16 h-16 text-accent/20" />
      </div>
      <div className="absolute bottom-32 left-1/4 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
        <Target className="w-10 h-10 text-accent/25" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Top label with counter */}
          <div className="mb-8 md:mb-12">
            <div className="inline-block">
              <div className="flex items-baseline gap-2">
                <span className="text-7xl md:text-9xl font-heading font-black text-accent/20">01</span>
                <div className="flex flex-col">
                  <span className="text-accent font-heading font-bold text-lg md:text-xl uppercase tracking-wider">RevUp</span>
                  <span className="text-foreground/50 text-sm md:text-base">Your Growth Partner</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main heading with layered effect */}
          <div className="relative mb-8 md:mb-12">
            <h1 className="relative">
              {/* Background layer */}
              <span className="absolute inset-0 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black text-accent/10 blur-sm">
                GROWTH
              </span>
              {/* Mid layer */}
              <span className="absolute inset-0 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black text-accent/30 translate-x-1 translate-y-1">
                GROWTH
              </span>
              {/* Front layer */}
              <span className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black text-accent animate-fade-in">
                GROWTH
              </span>
            </h1>
          </div>

          {/* Subtitle section */}
          <div className="max-w-3xl mb-12 md:mb-16">
            <div className="glass-card p-6 md:p-8 rounded-2xl backdrop-blur-xl">
              <p className="text-lg md:text-2xl text-foreground/90 font-light leading-relaxed mb-4">
                <span className="text-accent font-semibold">Smart strategies.</span> <span className="text-accent font-semibold">Fast results.</span>
              </p>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                The perfect combination of AI-powered marketing and expert web development to accelerate your business growth.
              </p>
            </div>
          </div>

          {/* Interactive features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="glass-card p-4 md:p-6 rounded-xl hover-lift cursor-pointer group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <h3 className="text-accent font-heading font-bold text-sm md:text-base">What we do</h3>
              </div>
              <p className="text-foreground/60 text-xs md:text-sm group-hover:text-foreground/80 transition-colors">
                Google Ads, Meta advertising, and custom web development
              </p>
            </div>
            <div className="glass-card p-4 md:p-6 rounded-xl hover-lift cursor-pointer group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.3s' }} />
                <h3 className="text-accent font-heading font-bold text-sm md:text-base">Benefits</h3>
              </div>
              <p className="text-foreground/60 text-xs md:text-sm group-hover:text-foreground/80 transition-colors">
                Increased revenue, better ROI, and sustainable growth
              </p>
            </div>
            <div className="glass-card p-4 md:p-6 rounded-xl hover-lift cursor-pointer group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.6s' }} />
                <h3 className="text-accent font-heading font-bold text-sm md:text-base">Buying Options</h3>
              </div>
              <p className="text-foreground/60 text-xs md:text-sm group-hover:text-foreground/80 transition-colors">
                Flexible packages tailored to your business needs
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center md:justify-start">
            <Button 
              variant="glow" 
              size="lg" 
              onClick={() => window.open('https://calendly.com/revupagencygroup-info/30min?month=2025-11', '_blank')}
              className="text-base md:text-lg px-8 md:px-12 py-6 md:py-8 h-auto hover:scale-105 transition-transform"
              aria-label="Book a free digital marketing consultation"
            >
              Book a Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
    </section>
  );
};
