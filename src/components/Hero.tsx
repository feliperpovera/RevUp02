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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 animated-dots opacity-20" />
      
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight">
            Grow <span className="text-accent text-glow">Smarter</span>.
            <br />
            Move <span className="text-accent text-glow">Faster</span>.
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-3xl mx-auto font-light">
            RevUp helps businesses grow through data-driven media buying and intelligent web development.
          </p>
          
          <Button 
            variant="glow" 
            size="lg" 
            onClick={scrollToContact}
            className="text-lg px-10 py-6 h-auto"
          >
            Let's RevUp Your Growth
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
