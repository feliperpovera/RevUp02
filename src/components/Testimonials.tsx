import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import client logos
import mianLogo from "@/assets/clients/mian-logo.jpg";
import newlifeLogo from "@/assets/clients/newlife-logo.png";
import hostuLogo from "@/assets/clients/hostu-logo.jpeg";
import europeanLogo from "@/assets/clients/european-logo.png";
import velezLogo from "@/assets/clients/velez-logo.png";
import intrawestLogo from "@/assets/clients/intrawest-logo.png";

const testimonials = [
  {
    type: "result",
    company: "Vélez",
    subtitle: "Retail & Fashion",
    description: "We Supported Them Through The Entire Advertising Process In The USA",
    result: "Full",
    period: "Support",
    logo: velezLogo,
  },
  {
    type: "result",
    company: "IntraWest Management",
    subtitle: "Real Estate",
    description: "We Supported Them Through The Entire Advertising Process In The USA",
    result: "Full",
    period: "Support",
    logo: intrawestLogo,
  },
  {
    type: "result",
    company: "MIAN",
    subtitle: "E-commerce",
    description: "We Achieved A Return On Ad Spend Of",
    result: "20.2x",
    period: "ROAS",
    logo: mianLogo,
  },
  {
    type: "result",
    company: "New Life Furniture",
    subtitle: "Home & Living",
    description: "We Achieved A Return On Ad Spend Of",
    result: "7.4x",
    period: "ROAS",
    logo: newlifeLogo,
  },
  {
    type: "result",
    company: "Host U",
    subtitle: "Web Development",
    description: "We Created A Complete Web Presence",
    result: "Website",
    period: "Creation",
    logo: hostuLogo,
  },
  {
    type: "result",
    company: "European Luxury Wall Finishes",
    subtitle: "Web Development",
    description: "We Created A Complete Web Presence",
    result: "Website",
    period: "Creation",
    logo: europeanLogo,
  },
];

export const Testimonials = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background relative overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="absolute inset-0 cyber-grid opacity-5" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <header className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4">
            Our Clients And Results
          </p>
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Meet Our Amazing <span className="text-accent">Clients And Partners.</span>
          </h2>
          <p className="text-sm md:text-base text-foreground/50 max-w-3xl mx-auto leading-relaxed">
            We collaborate with driven brands and entrepreneurs who are ready to scale. With every partnership, our goal stays the same: deliver paid advertising that fuels real growth and lasting impact.
          </p>
        </header>

        {/* Navigation */}
        <div className="flex justify-end gap-2 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-full border border-border/30 hover:border-accent/50 hover:bg-accent/5 h-10 w-10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-full border border-border/30 hover:border-accent/50 hover:bg-accent/5 h-10 w-10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Carousel */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory -mx-4 px-4"
        >
          {testimonials.map((item, index) => (
            <article
              key={index}
              className="flex-shrink-0 w-[220px] md:w-[260px] snap-start rounded-2xl overflow-hidden bg-card border border-border/20 p-6 flex flex-col justify-between min-h-[320px] md:min-h-[380px] transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
            >
              {/* Logo */}
              <div className="mb-4 flex justify-center">
                <div className="w-24 h-24 flex items-center justify-center p-3 bg-white rounded-full overflow-hidden shadow-sm">
                  <img 
                    src={item.logo} 
                    alt={`${item.company} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-lg md:text-xl font-heading font-bold text-foreground mb-1">
                  {item.company}
                </h3>
                {item.subtitle && (
                  <p className="text-[10px] uppercase tracking-wider text-accent/70">{item.subtitle}</p>
                )}
              </div>
              
              {/* Result */}
              <div className="mt-auto">
                <p className="text-xs text-foreground/50 mb-2 leading-relaxed">{item.description}</p>
                <div className="text-4xl md:text-5xl font-heading font-bold text-accent mb-1">
                  {item.result}
                </div>
                <p className="text-xs text-foreground/40">{item.period}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
