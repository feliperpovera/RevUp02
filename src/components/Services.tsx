import { ShoppingCart, Code, BarChart3, Zap } from "lucide-react";

const services = [
  {
    icon: ShoppingCart,
    title: "Media Buying",
    description: "Data-driven ad performance across all major platforms to maximize your ROI.",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "High-conversion websites built with modern technology and user-centric design.",
  },
  {
    icon: BarChart3,
    title: "Data Strategy",
    description: "Custom analytics dashboards and insights that drive informed business decisions.",
  },
  {
    icon: Zap,
    title: "AI Automation",
    description: "Intelligent campaign flows that optimize performance and reduce manual work.",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 md:mb-4">
            Our <span className="text-accent">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto px-4">
            End-to-end digital solutions tailored to your business goals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-6 md:p-8 hover-lift cursor-pointer group"
            >
              <div className="mb-4 md:mb-6 inline-block p-3 md:p-4 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-6 h-6 md:w-8 md:h-8 text-accent" />
              </div>
              
              <h3 className="text-lg md:text-xl font-heading font-semibold mb-2 md:mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              
              <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
