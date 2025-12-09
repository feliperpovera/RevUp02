import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent/10 via-background to-background cyber-grid" role="banner">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow floating-orb" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse-glow floating-orb" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }} />
        {/* Rotating ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-accent/10 rounded-full animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-accent/5 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse' }} />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Main heading */}
          <div className="relative mb-8 md:mb-10 opacity-0 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
              <span className="text-foreground font-semibold block mb-4">Smart growth,</span>
              <span className="text-accent font-semibold block animate-text-glow">fast results.</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="relative mb-12 md:mb-16 opacity-0 animate-fade-in stagger-2">
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-4xl mx-auto">
              Boost revenue, reduce workload, and scale faster & smarter with data and AI — let us show you how.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center opacity-0 animate-scale-in stagger-3">
            <Button 
              variant="glow" 
              size="lg" 
              onClick={() => window.open('https://calendly.com/revupagencygroup-info/30min?month=2025-11', '_blank')}
              className="text-lg md:text-xl px-10 md:px-14 py-7 md:py-9 h-auto hover:scale-110 transition-all duration-500 shadow-2xl animate-glow-pulse"
              aria-label="Book a free digital marketing consultation"
            >
              Book a Free Consultation
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
    </section>
  );
};
