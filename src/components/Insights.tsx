import { Search, Map, Rocket, TrendingUp } from "lucide-react";

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
    <section id="insights" className="py-16 md:py-24 bg-graphite">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 md:mb-4">
            Our <span className="text-accent">Process</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto px-4">
            From strategy to scale — a clear path to measurable growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-6 md:p-8 hover-lift cursor-pointer group relative"
            >
              <div className="absolute top-4 right-4 text-5xl md:text-6xl font-bold text-accent/10 group-hover:text-accent/20 transition-colors">
                {step.number}
              </div>
              
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
          ))}
        </div>
      </div>
    </section>
  );
};
