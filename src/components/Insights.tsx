import { FileText, TrendingUp, Target } from "lucide-react";

const insights = [
  {
    icon: FileText,
    title: "The Future of AI in Marketing",
    excerpt: "How artificial intelligence is reshaping digital advertising strategies for modern businesses.",
    date: "Mar 2024",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Growth Strategies",
    excerpt: "Leveraging analytics to create sustainable business growth and improved conversion rates.",
    date: "Feb 2024",
  },
  {
    icon: Target,
    title: "Optimizing Media Buying ROI",
    excerpt: "Advanced techniques for maximizing return on ad spend across multiple platforms.",
    date: "Jan 2024",
  },
];

export const Insights = () => {
  return (
    <section id="insights" className="py-24 bg-graphite">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Latest <span className="text-accent">Insights</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Expert perspectives on digital marketing trends and strategies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-8 hover-lift cursor-pointer group"
            >
              <div className="mb-6 inline-block p-4 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <insight.icon className="w-8 h-8 text-accent" />
              </div>
              
              <div className="text-sm text-accent font-semibold mb-3">{insight.date}</div>
              
              <h3 className="text-xl font-heading font-semibold mb-3 group-hover:text-accent transition-colors">
                {insight.title}
              </h3>
              
              <p className="text-foreground/70 leading-relaxed">
                {insight.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
