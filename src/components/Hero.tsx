import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" role="banner">
      <div className="absolute inset-0 animated-dots opacity-20" aria-hidden="true" />
      
      <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold mb-4 md:mb-6 leading-tight px-4">
            Smart Growth <span className="text-accent text-glow">Fast Results</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 mb-8 md:mb-12 max-w-3xl mx-auto font-light px-4">
            Ready to increase revenue and efficiency? Let&apos;s build a marketing system that works for you with expert Google Ads, Meta advertising, and custom web development.
          </p>
          
          <Button 
            variant="glow" 
            size="lg" 
            onClick={scrollToContact}
            className="text-base md:text-lg px-6 md:px-10 py-4 md:py-6 h-auto"
            aria-label="Book a free digital marketing consultation"
          >
            Book a Free Consultation
            <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
    </section>
  );
};
