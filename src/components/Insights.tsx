import { Search, Map, Rocket, TrendingUp } from "lucide-react";
import { AngularLinesDecor, RectangleCircleDecor } from "./decorative/GeometricShapes";

const steps = [
  {
    icon: Search,
    number: "1",
    title: "Understand your Business",
    description: "We start with a strategy call to understand your business, goals, and audience. This step ensures every action we take is aligned with your vision and built around your growth objectives.",
  },
  {
    icon: Map,
    number: "2",
    title: "Strategy & Roadmap",
    description: "Next, we create a tailored plan that connects all key areas — advertising, web, email, and funnels. You'll receive a clear roadmap outlining timelines, tools, and deliverables so you know exactly what to expect.",
  },
  {
    icon: Rocket,
    number: "3",
    title: "Build & Launch",
    description: "Once the strategy is approved, our team gets to work — launching ad campaigns, designing or optimizing your website/store and setting up automations.",
  },
  {
    icon: TrendingUp,
    number: "4",
    title: "Optimize & Scale",
    description: "After launch, we continually monitor and refine your campaigns and systems using data and AI insights. We test, tweak, and improve performance to help you scale efficiently and exceed your growth goals.",
  },
];

export const Insights = () => {
  return (
    <section id="insights" className="py-16 md:py-24 bg-graphite relative overflow-hidden">
      <AngularLinesDecor className="absolute top-16 left-10 opacity-20" />
      <RectangleCircleDecor className="absolute bottom-16 right-10 opacity-20 animate-pulse" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-2">
            Our <span className="text-accent">Process</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-accent hidden md:block"></div>
          
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative mb-12 md:mb-16 last:mb-0 ${
                index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-graphite z-10 hidden md:block"></div>
              
              <div
                className={`glass-card rounded-xl p-6 md:p-8 hover-lift cursor-pointer group relative ${
                  index % 2 === 0 
                    ? 'md:mr-auto md:ml-0 md:mr-[calc(50%+2rem)]' 
                    : 'md:ml-auto md:mr-0 md:ml-[calc(50%+2rem)]'
                }`}
              >
                <div className="mb-4 md:mb-6 inline-block p-3 md:p-4 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <step.icon className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                </div>
                
                <h3 className="text-lg md:text-xl font-heading font-semibold mb-2 md:mb-3 group-hover:text-accent transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
