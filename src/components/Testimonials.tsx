import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, GiantNumeral, Reveal, SectionHeading } from "@/components/brand/kit";

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

/** One oversized rounded corner per card, cycled across the carousel. */
const CORNER_CLASS = [
  "rounded-3xl rounded-tl-[3.5rem]",
  "rounded-3xl rounded-tr-[3.5rem]",
  "rounded-3xl rounded-br-[3.5rem]",
  "rounded-3xl rounded-bl-[3.5rem]",
] as const;

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
    <section
      id="testimonials"
      className="relative overflow-hidden bg-graphite py-24 md:py-32"
      aria-labelledby="testimonials-heading"
    >
      {/* Giant tinted chapter numeral, behind content */}
      <GiantNumeral value="003" className="-top-10 right-[-2%] text-cream/[0.04]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <Reveal>
            <Eyebrow index="003" label="Clients & Results" tone="light" className="mb-10" />
          </Reveal>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal delay={0.1} className="max-w-3xl">
              <SectionHeading
                tone="light"
                title={
                  <span id="testimonials-heading">
                    Meet Our Amazing <span className="text-accent">Clients And Partners.</span>
                  </span>
                }
                lede="We collaborate with driven brands and entrepreneurs who are ready to scale. With every partnership, our goal stays the same: deliver paid advertising that fuels real growth and lasting impact."
              />
            </Reveal>

            {/* Carousel navigation */}
            <Reveal delay={0.2} className="flex shrink-0 gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scroll("left")}
                aria-label="Scroll results left"
                className="h-12 w-12 rounded-full border border-cream/20 text-cream transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-graphite"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scroll("right")}
                aria-label="Scroll results right"
                className="h-12 w-12 rounded-full border border-cream/20 text-cream transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-graphite"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Reveal>
          </div>

          {/* Carousel */}
          <div
            ref={scrollContainerRef}
            className="scrollbar-hide -mx-4 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 md:mt-16"
          >
            {testimonials.map((item, index) => (
              <Reveal
                key={item.company}
                delay={index * 0.1}
                className="w-[260px] flex-shrink-0 snap-start md:w-[300px]"
              >
                <article
                  className={`group flex min-h-[380px] flex-col border border-cream/10 bg-cream/[0.06] p-7 backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:bg-cream/[0.09] md:min-h-[420px] ${
                    CORNER_CLASS[index % CORNER_CLASS.length]
                  }`}
                >
                  {/* Logo — white circular badge */}
                  <div className="mb-6">
                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white p-3 shadow-sm transition-transform duration-500 group-hover:scale-105">
                      <img
                        src={item.logo}
                        alt={`${item.company} logo`}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <h3 className="font-heading text-xl leading-tight text-cream md:text-2xl">
                      {item.company}
                    </h3>
                    {item.subtitle && (
                      <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-cream/50">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Result */}
                  <div className="mt-auto border-t border-cream/10 pt-5">
                    <p className="mb-3 text-xs font-light leading-relaxed text-cream/60">
                      {item.description}
                    </p>
                    <div className="font-heading text-4xl leading-none text-accent md:text-5xl">
                      {item.result}
                    </div>
                    <p className="mt-2 text-xs font-medium uppercase tracking-wider text-cream/50">
                      {item.period}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
