import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export const Hero = () => {
  const [displayedText1, setDisplayedText1] = useState("");
  const [displayedText2, setDisplayedText2] = useState("");
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  const text1 = "Scale faster,";
  const text2 = "grow smarter.";

  useEffect(() => {
    let index = 0;
    const timer1 = setInterval(() => {
      if (index < text1.length) {
        setDisplayedText1(text1.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer1);
        // Start second text
        let index2 = 0;
        const timer2 = setInterval(() => {
          if (index2 < text2.length) {
            setDisplayedText2(text2.slice(0, index2 + 1));
            index2++;
          } else {
            clearInterval(timer2);
            setTimeout(() => setShowSubtitle(true), 300);
            setTimeout(() => setShowButton(true), 600);
          }
        }, 80);
      }
    }, 80);

    return () => clearInterval(timer1);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent/5 via-background to-background cyber-grid" role="banner">
      {/* Animated background elements - reduced opacity */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow floating-orb" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl animate-pulse-glow floating-orb" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/3 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }} />
        {/* Rotating ring - reduced opacity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-accent/5 rounded-full animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-accent/3 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse' }} />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Main heading with typewriter effect */}
          <div className="relative mb-8 md:mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
              <span className="text-foreground font-semibold block mb-4 min-h-[1.2em]">
                {displayedText1}
                {displayedText1.length < text1.length && (
                  <span className="inline-block w-[3px] h-[0.9em] bg-accent ml-1 animate-pulse" />
                )}
              </span>
              <span className="text-accent font-semibold block min-h-[1.2em]">
                {displayedText2}
                {displayedText1.length === text1.length && displayedText2.length < text2.length && (
                  <span className="inline-block w-[3px] h-[0.9em] bg-accent ml-1 animate-pulse" />
                )}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className={`relative mb-12 md:mb-16 transition-all duration-700 ${showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-4xl mx-auto">
              Boost revenue, reduce workload, and scale faster & smarter with data and AI — let us show you how.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`flex justify-center transition-all duration-700 ${showButton ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <Button 
              onClick={() => window.open('https://calendly.com/revupagencygroup-info/30min?month=2025-11', '_blank')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full text-lg md:text-xl px-10 md:px-14 py-6 md:py-7 h-auto hover:scale-105 transition-all duration-500 shadow-xl"
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
