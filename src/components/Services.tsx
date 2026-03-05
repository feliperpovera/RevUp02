import { ShoppingCart, Code, Settings, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
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
];

export const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-transparent relative overflow-hidden" aria-labelledby="services-heading">


      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <header className="text-center mb-10 md:mb-16">
          <h2 id="services-heading" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 md:mb-4 opacity-0 animate-fade-in">
            Our <span className="text-accent gradient-text">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto px-4 opacity-0 animate-fade-in stagger-1">
            Complete digital marketing solutions for businesses ready to grow online
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              to="/services"
              className={`futuristic-card rounded-xl p-6 md:p-8 cursor-pointer group opacity-0 animate-slide-up`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="mb-4 md:mb-6 inline-block p-3 md:p-4 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-all duration-500 group-hover:animate-float">
                <service.icon className="w-6 h-6 md:w-8 md:h-8 text-accent group-hover:drop-shadow-[0_0_10px_hsl(var(--accent))]" aria-hidden="true" />
              </div>

              <h3 className="text-lg md:text-xl font-heading font-semibold mb-2 md:mb-3 group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
