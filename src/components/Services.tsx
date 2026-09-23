import { ShoppingCart, Code, Settings, Zap, Search, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import servicePages from "@/config/service-pages.json";
import { BrandCard, Eyebrow, GiantNumeral, Reveal, SectionHeading } from "@/components/brand/kit";

const services: { icon: typeof Search; title: string; description: string; to?: string; wide?: boolean }[] = [
  {
    icon: ShoppingCart,
    title: "Paid Media Management",
    description: "Expert Google Ads, Meta Ads (Facebook & Instagram), and TikTok advertising campaigns that drive targeted traffic, boost conversions, and maximize ROI for US businesses.",
  },
  {
    icon: Code,
    title: "Website & E-commerce Development",
    description: "Custom Shopify stores, high-converting landing pages, and responsive websites designed to turn visitors into customers and drive online sales.",
  },
  {
    icon: Settings,
    title: "Website & Store Management",
    description: "Ongoing website maintenance, performance optimization, and conversion rate improvements to keep your digital presence competitive and profitable.",
  },
  {
    icon: Zap,
    title: "AI Marketing Automation",
    description: "Intelligent campaign workflows, automated bidding strategies, and AI-powered optimization that reduce manual work while improving advertising performance.",
  },
  {
    icon: Search,
    title: "SEO for Service Businesses",
    description: "Local SEO that gets your business found on Google Search and Google Maps — on its own or combined with paid ads as a complete SEO + SEM package that brings calls now and free traffic over time.",
    to: "/seo-for-service-businesses",
    wide: true,
  },
];

/** One oversized corner per card, rotating around the 2×2 grid. */
const CORNERS = ["tl", "tr", "bl", "br"] as const;

export const Services = () => {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-background py-24 md:py-32"
      aria-labelledby="services-heading"
    >
      {/* Giant tinted chapter numeral behind the grid */}
      <GiantNumeral value="04" className="right-[-1.5rem] top-6 md:right-0" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow index="004" label="Our Services" className="mb-10 max-w-md" />
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading
              title={
                <span id="services-heading">
                  Our <span className="text-primary">Services</span>
                </span>
              }
              lede="Complete digital marketing solutions for businesses ready to grow online"
              className="mb-14 md:mb-20"
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.1} className={service.wide ? "h-full md:col-span-2" : "h-full"}>
                <Link
                  to={service.to ?? "/services"}
                  className="group block h-full focus-visible:outline-none"
                  aria-label={`${service.title} — learn more about our services`}
                >
                  <BrandCard
                    corner={CORNERS[index % CORNERS.length]}
                    className="flex h-full flex-col p-8 group-focus-visible:border-performance/40 md:p-10"
                  >
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20 text-performance transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105 motion-reduce:transition-none">
                      <service.icon className="h-7 w-7" aria-hidden="true" />
                    </div>

                    <h3 className="font-heading text-2xl text-foreground transition-colors duration-300 group-hover:text-performance">
                      {service.title}
                    </h3>

                    <p className="mt-3 flex-1 text-base font-light leading-relaxed text-stone">
                      {service.description}
                    </p>

                    {/* Learn-more row slides into view on hover */}
                    <div className="mt-8 flex items-center gap-1.5 border-t border-foreground/10 pt-5 text-sm font-medium text-performance">
                      <span className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:translate-x-0 motion-reduce:opacity-100">
                        Learn more
                      </span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
                    </div>
                  </BrandCard>
                </Link>
              </Reveal>
            ))}
          </div>
          <nav aria-label="Service pages" className="mt-12 flex flex-wrap items-center gap-3">
            <span className="mr-2 text-xs font-medium uppercase tracking-[0.3em] text-stone">Explore</span>
            {servicePages.map((p) => (
              <Link
                key={p.path}
                to={p.path}
                className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-5 py-2.5 text-sm text-foreground/80 transition-colors hover:border-performance hover:text-performance"
              >
                {p.name}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};
