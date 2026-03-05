import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Search, Map, Rocket, TrendingUp } from "lucide-react";

const ProcessPage = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <section className="py-24 md:py-32 bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                Our <span className="text-accent">Process</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
                From strategy to scale — a clear path to measurable growth
              </p>
            </div>

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="glass-card p-8 md:p-12 rounded-xl relative">
                <div className="absolute top-4 right-4 text-6xl md:text-7xl font-bold text-accent/10">
                  1
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-lg bg-accent/10">
                    <Search className="w-10 h-10 md:w-12 md:h-12 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                      Understand your Business
                    </h2>
                    <p className="text-foreground/70 mb-6 leading-relaxed">
                      We start with a strategy call to understand your business, goals, and audience. This step ensures every action we take is aligned with your vision and built around your growth objectives.
                    </p>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <p className="text-sm text-foreground/60">
                        <strong>What we cover:</strong> Business model, target audience, current challenges, growth goals, competitive landscape, and success metrics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="glass-card p-8 md:p-12 rounded-xl relative">
                <div className="absolute top-4 right-4 text-6xl md:text-7xl font-bold text-accent/10">
                  2
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-lg bg-accent/10">
                    <Map className="w-10 h-10 md:w-12 md:h-12 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                      Strategy & Roadmap
                    </h2>
                    <p className="text-foreground/70 mb-6 leading-relaxed">
                      Next, we create a tailored plan that connects all key areas — advertising, web, email, and funnels. You'll receive a clear roadmap outlining timelines, tools, and deliverables so you know exactly what to expect.
                    </p>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <p className="text-sm text-foreground/60">
                        <strong>What you get:</strong> Detailed project timeline, budget breakdown, platform recommendations, content strategy, and KPIs we'll track.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="glass-card p-8 md:p-12 rounded-xl relative">
                <div className="absolute top-4 right-4 text-6xl md:text-7xl font-bold text-accent/10">
                  3
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-lg bg-accent/10">
                    <Rocket className="w-10 h-10 md:w-12 md:h-12 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                      Build & Launch
                    </h2>
                    <p className="text-foreground/70 mb-6 leading-relaxed">
                      Once the strategy is approved, our team gets to work — launching ad campaigns, designing or optimizing your website/store and setting up automations.
                    </p>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <p className="text-sm text-foreground/60">
                        <strong>What happens:</strong> Campaign setup, creative development, website implementation, tracking configuration, and quality assurance testing before launch.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="glass-card p-8 md:p-12 rounded-xl relative">
                <div className="absolute top-4 right-4 text-6xl md:text-7xl font-bold text-accent/10">
                  4
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-lg bg-accent/10">
                    <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                      Optimize & Scale
                    </h2>
                    <p className="text-foreground/70 mb-6 leading-relaxed">
                      After launch, we continually monitor and refine your campaigns and systems using data and AI insights. We test, tweak, and improve performance to help you scale efficiently and exceed your growth goals.
                    </p>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <p className="text-sm text-foreground/60">
                        <strong>Ongoing work:</strong> Performance analysis, A/B testing, budget reallocation, creative refresh, conversion rate optimization, and monthly reporting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => window.open('https://calendly.com/revupagencygroup-info/30min?month=2025-11', '_blank')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-11 rounded-md px-8 text-base md:text-lg py-6"
              >
                Let's Discuss Your Growth
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProcessPage;
