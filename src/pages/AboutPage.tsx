import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <section className="py-24 md:py-32 bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 text-center">
              About <span className="text-accent">RevUp</span>
            </h1>

            <div className="space-y-8 text-base md:text-lg text-foreground/80 leading-relaxed">
              <p>
                RevUp is a <strong>modern digital marketing and automation agency</strong> helping businesses grow smarter and faster through data-driven strategy and AI-powered solutions. We specialize in <strong>Google Ads</strong>, <strong>Meta advertising</strong>, <strong>TikTok marketing</strong>, high-performance <strong>Shopify and website development</strong>, and custom <strong>automations</strong> that streamline operations and boost efficiency.
              </p>

              <p>
                What sets us apart is our ability to blend <strong>AI</strong>, <strong>data</strong>, and <strong>performance marketing</strong> into one unified growth engine. Whether we're building your online presence, running your ads, or automating your workflows, our goal is simple: deliver measurable results, reduce workload, and make digital growth accessible to businesses of all sizes.
              </p>

              <div className="space-y-8 mt-12">
                <div className="bg-graphite/50 p-6 md:p-8 rounded-xl space-y-3">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-accent">
                    Purpose
                  </h2>
                  <p>
                    To empower businesses with data-driven, AI-powered systems that help them work smarter, operate more efficiently, and reach their full growth potential.
                  </p>
                </div>

                <div className="bg-graphite/50 p-6 md:p-8 rounded-xl space-y-3">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-accent">
                    Mission
                  </h2>
                  <p>
                    To turn clicks into clients, ideas into high-performing websites and e-commerce stores, and marketing into measurable growth—using the perfect mix of strategy, creativity, automation, and performance-driven advertising.
                  </p>
                </div>

                <div className="bg-graphite/50 p-6 md:p-8 rounded-xl space-y-3">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-accent">
                    Vision
                  </h2>
                  <p>
                    To shape the future of digital marketing by bringing together AI, data, and technology—helping businesses scale intelligently, sustainably, and with complete clarity on their results.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => window.open('https://calendly.com/revupagencygroup-info/30min?month=2025-11', '_blank')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-11 rounded-md px-8 text-base md:text-lg py-6"
              >
                Start Growing Today
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
