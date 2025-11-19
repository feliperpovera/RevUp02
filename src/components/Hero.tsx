import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent/20 via-background to-background" role="banner">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Main heading */}
          <div className="relative mb-16 md:mb-20 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
              <span className="text-foreground font-semibold block mb-4">Driven by data.</span>
              <span className="text-accent font-semibold block">Powered by growth.</span>
            </h1>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button 
              variant="glow" 
              size="lg" 
              onClick={() => window.open('https://calendly.com/revupagencygroup-info/30min?month=2025-11', '_blank')}
              className="text-lg md:text-xl px-10 md:px-14 py-7 md:py-9 h-auto hover:scale-105 transition-all duration-300 shadow-2xl"
              aria-label="Book a free digital marketing consultation"
            >
              Book a Free Consultation
              <ArrowRight className="ml-2 w-6 h-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
    </section>
  );
};
