import { ShoppingCart, Code, Settings, Zap } from "lucide-react";

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
    title: "Management",
    description: "Comprehensive account management, campaign oversight, and strategic optimization to ensure consistent growth and maximum performance across all platforms.",
  },
  {
    icon: Zap,
    title: "AI Marketing Automation",
    description: "Intelligent campaign workflows, automated bidding strategies, and AI-powered optimization that reduce manual work while improving advertising performance.",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-background" aria-labelledby="services-heading">
      <div className="container mx-auto px-4 md:px-6">
        <header className="text-center mb-10 md:mb-16">
          <h2 id="services-heading" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 md:mb-4">
            Our <span className="text-accent">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto px-4">
            Complete digital marketing solutions for businesses ready to grow online
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <article
              key={index}
              className="glass-card rounded-xl p-6 md:p-8 hover-lift cursor-pointer group"
            >
              <div className="mb-4 md:mb-6 inline-block p-3 md:p-4 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-6 h-6 md:w-8 md:h-8 text-accent" aria-hidden="true" />
              </div>
              
              <h3 className="text-lg md:text-xl font-heading font-semibold mb-2 md:mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              
              <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
