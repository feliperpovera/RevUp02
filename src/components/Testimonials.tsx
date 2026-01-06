import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    type: "featured",
    company: "TJR",
    stats: { publications: "56", followers: "688 K", surveys: "83" },
  },
  {
    type: "result",
    company: "V CRÉATION",
    subtitle: "BIJOUX",
    description: "We Helped Them Go From $40K/Month To",
    result: "+$280K",
    period: "Per Month",
  },
  {
    type: "featured",
    company: "TAI LOPEZ",
    subtitle: "INVESTOR. ENTREPRENEUR. AUTHOR.",
    stats: { publications: "3,661", followers: "2.9 M", surveys: "4,415" },
  },
  {
    type: "result",
    company: "New Life Furniture",
    subtitle: "Home & Living",
    description: "We Achieved A Return On Ad Spend Of",
    result: "7.4x",
    period: "ROAS",
  },
  {
    type: "featured",
    company: "S&T SECTION8",
    subtitle: "TRAINING BY SECTION 8 KARIM",
    stats: { publications: "746", followers: "546 K", surveys: "0" },
  },
  {
    type: "result",
    company: "Golightly Cashmere",
    description: "We Helped Them Generate An Additional",
    result: "$500K",
    period: "In 3 Months",
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
          {testimonials.map((item, index) => {
            if (item.type === "featured") {
              return (
                <article
                  key={index}
                  className="flex-shrink-0 w-[220px] md:w-[260px] snap-start rounded-2xl overflow-hidden bg-gradient-to-b from-muted/80 to-card border border-border/20 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                >
                  {/* Placeholder for client image */}
                  <div className="h-[280px] md:h-[340px] bg-gradient-to-br from-muted to-card flex items-end p-4">
                    <div className="text-2xl md:text-3xl font-heading font-bold text-foreground/20">
                      {item.company}
                    </div>
                  </div>
                  
                  {/* Stats footer */}
                  <div className="p-4 bg-card/80 backdrop-blur-sm border-t border-border/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground/60">
                        {item.company.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-foreground">{item.company}</div>
                        {item.subtitle && (
                          <div className="text-[10px] text-foreground/40">{item.subtitle}</div>
                        )}
                      </div>
                    </div>
                    {item.stats && (
                      <div className="flex justify-between text-[10px] text-foreground/50">
                        <div className="text-center">
                          <div className="font-semibold text-foreground/70">{item.stats.publications}</div>
                          <div>publications</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-foreground/70">{item.stats.followers}</div>
                          <div>followers</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-foreground/70">{item.stats.surveys}</div>
                          <div>surveys</div>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            }

            // Result type
            return (
              <article
                key={index}
                className="flex-shrink-0 w-[220px] md:w-[260px] snap-start rounded-2xl overflow-hidden bg-card border border-border/20 p-6 flex flex-col justify-between min-h-[320px] md:min-h-[380px] transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
              >
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
            );
          })}
        </div>
      </div>
    </section>
  );
};
