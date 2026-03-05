import { Search, Map, Rocket, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: Search,
    number: "1",
    title: "Understand Your Business Goals",
    description: "We begin with an in-depth strategy consultation to understand your business model, target audience, competitive landscape, and growth objectives. This ensures every marketing dollar is strategically invested for maximum impact.",
  },
  {
    icon: Map,
    number: "2",
    title: "Custom Marketing Strategy & Roadmap",
    description: "Our team develops a comprehensive digital marketing plan connecting paid advertising, website optimization, email campaigns, and conversion funnels. You receive a clear roadmap with timelines, platform recommendations, KPIs, and expected ROI.",
  },
  {
    icon: Rocket,
    number: "3",
    title: "Build & Launch Campaigns",
    description: "Once approved, we execute your strategy—launching Google Ads and Meta campaigns, optimizing your website for conversions, and implementing marketing automation to drive immediate results.",
  },
  {
    icon: TrendingUp,
    number: "4",
    title: "Optimize & Scale for Growth",
    description: "We continuously monitor campaign performance, conduct A/B testing, and leverage AI-driven insights to improve your advertising ROI, reduce cost-per-acquisition, and scale your business efficiently.",
  },
];

export const Insights = () => {
  return (
    <section id="insights" className="py-16 md:py-24 bg-transparent relative overflow-hidden" aria-labelledby="process-heading">


      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <header className="text-center mb-12 md:mb-20">
          <h2 id="process-heading" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-2 opacity-0 animate-fade-in">
            Our <span className="text-accent gradient-text">Process</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto animate-glow-pulse"></div>
        </header>

        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Timeline Line - Animated */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-accent via-accent/50 to-accent hidden md:block animate-border-glow"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative mb-12 md:mb-16 last:mb-0 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'
                }`}
            >
              {/* Timeline Dot - Animated */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-graphite z-10 hidden md:block animate-glow-pulse pulse-ring"></div>

              <Link
                to="/process"
                className={`futuristic-card rounded-xl p-6 md:p-8 cursor-pointer group relative block opacity-0 ${index % 2 === 0
                    ? 'md:mr-auto md:ml-0 md:mr-[calc(50%+2rem)] animate-slide-in-left'
                    : 'md:ml-auto md:mr-0 md:ml-[calc(50%+2rem)] animate-slide-in-right'
                  }`}
                style={{ animationDelay: `${0.2 + index * 0.2}s` }}
              >
                <div className="mb-4 md:mb-6 inline-block p-3 md:p-4 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-all duration-500 group-hover:animate-float">
                  <step.icon className="w-6 h-6 md:w-8 md:h-8 text-accent group-hover:drop-shadow-[0_0_10px_hsl(var(--accent))]" />
                </div>

                <h3 className="text-lg md:text-xl font-heading font-semibold mb-2 md:mb-3 group-hover:text-accent transition-colors duration-300">
                  {step.title}
                </h3>

                <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                  {step.description}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
