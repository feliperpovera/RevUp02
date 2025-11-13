import { ShoppingCart, Code, Settings, Zap } from "lucide-react";
import { RectangleCircleDecor, AsteriskDecor } from "./decorative/GeometricShapes";

const services = [
  {
    icon: ShoppingCart,
    title: "Paid Media",
    description: "We create & Manage ad campaigns that bring targeted traffic, increase visibility, and help your brand grow across all major platforms.",
  },
  {
    icon: Code,
    title: "Website & Store Development",
    description: "We build high-performing websites, e-commerce stores, and landing pages designed to convert.",
  },
  {
    icon: Settings,
    title: "Website & Store Management",
    description: "Keep your website and store updated, optimized, and performing at their best.",
  },
  {
    icon: Zap,
    title: "AI Automation",
    description: "Intelligent campaign flows that optimize performance and reduce manual work.",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <RectangleCircleDecor className="absolute top-16 left-8 opacity-20 animate-pulse" />
      <AsteriskDecor className="absolute bottom-16 right-8 opacity-20" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
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
