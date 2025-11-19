import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Target, TrendingUp, Rocket } from "lucide-react";

const StrategyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-24 md:py-32 bg-graphite relative overflow-hidden">
        <div className="absolute inset-0 animated-dots opacity-10" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-16 text-center">
              Our <span className="text-accent">Strategy</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
              <div className="glass-card p-8 rounded-xl text-center">
                <div className="inline-block p-4 rounded-full bg-accent/10 mb-6">
                  <Target className="w-12 h-12 text-accent" />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-accent">
                  Purpose
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  To empower businesses with data-driven, AI-powered systems that help them work smarter, operate more efficiently, and reach their full growth potential.
                </p>
              </div>

              <div className="glass-card p-8 rounded-xl text-center">
                <div className="inline-block p-4 rounded-full bg-accent/10 mb-6">
                  <Rocket className="w-12 h-12 text-accent" />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-accent">
                  Mission
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  To turn clicks into clients, ideas into high-performing websites and e-commerce stores, and marketing into measurable growth—using the perfect mix of strategy, creativity, automation, and performance-driven advertising.
                </p>
              </div>

              <div className="glass-card p-8 rounded-xl text-center">
                <div className="inline-block p-4 rounded-full bg-accent/10 mb-6">
                  <TrendingUp className="w-12 h-12 text-accent" />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-accent">
                  Vision
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  To shape the future of digital marketing by bringing together AI, data, and technology—helping businesses scale intelligently, sustainably, and with complete clarity on their results.
                </p>
              </div>
            </div>

            <div className="space-y-8 text-base md:text-lg text-foreground/80 leading-relaxed">
              <div className="bg-background/50 p-6 md:p-8 rounded-xl">
                <h3 className="text-2xl font-heading font-bold mb-4 text-accent">
                  How We Think About Growth
                </h3>
                <p className="mb-4">
                  Growth isn't just about spending more on ads or building a prettier website. It's about understanding your business, your customers, and the market you operate in — then using that knowledge to make strategic decisions that compound over time.
                </p>
                <p>
                  Our approach combines three core pillars: <span className="text-accent font-semibold">AI-powered automation</span> to scale efficiently, <span className="text-accent font-semibold">data analytics</span> to make informed decisions, and <span className="text-accent font-semibold">strategic execution</span> to deliver consistent results.
                </p>
              </div>

              <div className="bg-background/50 p-6 md:p-8 rounded-xl">
                <h3 className="text-2xl font-heading font-bold mb-4 text-accent">
                  Why Data Matters
                </h3>
                <p>
                  Every successful marketing campaign starts with understanding the numbers. We track everything — from customer acquisition costs to lifetime value, conversion rates to engagement metrics. This data becomes the foundation for every decision we make, ensuring your budget is allocated to what actually works.
                </p>
              </div>

              <div className="bg-background/50 p-6 md:p-8 rounded-xl">
                <h3 className="text-2xl font-heading font-bold mb-4 text-accent">
                  The Role of AI
                </h3>
                <p>
                  AI isn't a buzzword for us — it's a practical tool that helps us work smarter. From automating repetitive tasks to optimizing ad spend in real-time, AI enables us to do more with less and deliver better results for our clients. We integrate AI across our workflows, from campaign management to website personalization.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <button 
                onClick={() => window.open('https://calendly.com/revupagencygroup-info/30min?month=2025-11', '_blank')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-11 rounded-md px-8 text-base md:text-lg py-6"
              >
                Start Your Strategy
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default StrategyPage;
