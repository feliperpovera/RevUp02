import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    type: "result",
    company: "TechStart Co",
    logo: "TS",
    description: "We Helped Them Go From $15K/Month To",
    result: "+$180K",
    period: "Per Month",
    bgColor: "bg-gradient-to-br from-accent/20 to-accent/5",
  },
  {
    type: "quote",
    quote: "We had no idea what Google Ads was or how it worked. They took over and exceeded all expectations—our site got tons of traffic, sales went up, and ROI was quick and impressive.",
    author: "Ian Greenberg",
    role: "Business Owner",
    avatar: "IG",
  },
  {
    type: "result",
    company: "V CRÉATION",
    logo: "VC",
    description: "We Helped Them Go From $40K/Month To",
    result: "+$280K",
    period: "Per Month",
    bgColor: "bg-gradient-to-br from-card to-muted",
  },
  {
    type: "quote",
    quote: "Before working with this team, our Google Ads campaigns were going nowhere. In just a short time, they completely turned things around—our traffic and sales increased significantly.",
    author: "Laura Castro",
    role: "Marketing Director",
    avatar: "LC",
  },
  {
    type: "result",
    company: "(code)word",
    logo: "CW",
    subtitle: "Garments That Give™",
    description: "We Helped Them Go From $40K/Month To",
    result: "+$225K",
    period: "Per Month",
    bgColor: "bg-gradient-to-br from-accent/20 to-accent/5",
  },
  {
    type: "result",
    company: "Golightly Cashmere",
    logo: "GC",
    description: "We Helped Them Generate An Additional",
    result: "$500K",
    period: "In 3 Months",
    bgColor: "bg-gradient-to-br from-card to-muted",
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
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <header className="text-center mb-6">
          <p className="text-sm uppercase tracking-widest text-foreground/50 mb-3">
            Our Clients And Results
          </p>
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Meet Our Amazing <span className="text-accent">Clients And Partners.</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/60 max-w-3xl mx-auto">
            We collaborate with driven brands and entrepreneurs who are ready to scale. With every partnership, our goal stays the same: deliver paid advertising that fuels real growth and lasting impact.
          </p>
        </header>

        {/* Navigation arrows */}
        <div className="flex justify-end gap-2 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-full border-border/50 hover:border-accent hover:bg-accent/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-full border-border/50 hover:border-accent hover:bg-accent/10"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrolling carousel */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((item, index) => (
            <article
              key={index}
              className={`flex-shrink-0 w-[280px] md:w-[320px] snap-start rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/10 ${
                item.type === "result" ? item.bgColor : "bg-card"
              } border border-border/30`}
              itemScope
              itemType="https://schema.org/Review"
            >
              {item.type === "result" ? (
                <div className="p-6 h-full flex flex-col justify-between min-h-[280px]">
                  {/* Company info */}
                  <div>
                    <div className="text-xl md:text-2xl font-heading font-bold text-foreground mb-1">
                      {item.company}
                    </div>
                    {item.subtitle && (
                      <p className="text-xs text-foreground/50 mb-4">{item.subtitle}</p>
                    )}
                  </div>
                  
                  {/* Result */}
                  <div className="mt-auto">
                    <p className="text-sm text-foreground/60 mb-2">{item.description}</p>
                    <div className="text-4xl md:text-5xl font-heading font-bold text-accent mb-1">
                      {item.result}
                    </div>
                    <p className="text-sm text-foreground/50">{item.period}</p>
                  </div>
                </div>
              ) : (
                <div className="p-6 h-full flex flex-col min-h-[280px]">
                  {/* Quote */}
                  <p itemProp="reviewBody" className="text-sm md:text-base text-foreground/70 leading-relaxed flex-1 line-clamp-6">
                    "{item.quote}"
                  </p>
                  
                  {/* Author */}
                  <div className="mt-4 pt-4 border-t border-border/30 flex items-center gap-3" itemProp="author" itemScope itemType="https://schema.org/Person">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold text-sm">
                      {item.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm" itemProp="name">{item.author}</div>
                      <div className="text-xs text-foreground/50" itemProp="jobTitle">{item.role}</div>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
