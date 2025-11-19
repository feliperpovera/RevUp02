export const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-background to-graphite" aria-labelledby="about-heading">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 id="about-heading" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 md:mb-8 text-center">
            About <span className="text-accent">RevUp</span>
          </h2>
          
          <div className="space-y-6 md:space-y-8 text-base md:text-lg text-foreground/80 leading-relaxed px-4">
            <p>
              RevUp is a <strong>modern digital marketing and automation agency</strong> helping businesses grow smarter and faster through data-driven strategy and AI-powered solutions. We specialize in <strong>Google Ads</strong>, <strong>Meta advertising</strong>, <strong>TikTok marketing</strong>, high-performance <strong>Shopify and website development</strong>, and custom <strong>automations</strong> that streamline operations and boost efficiency.
            </p>
            
            <p>
              What sets us apart is our ability to blend <strong>AI</strong>, <strong>data</strong>, and <strong>performance marketing</strong> into one unified growth engine. Whether we're building your online presence, running your ads, or automating your workflows, our goal is simple: deliver measurable results, reduce workload, and make digital growth accessible to businesses of all sizes.
            </p>

            <div className="space-y-6 mt-8 md:mt-12">
              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-heading font-semibold text-accent">
                  Purpose
                </h3>
                <p>
                  To empower businesses with data-driven, AI-powered systems that help them work smarter, operate more efficiently, and reach their full growth potential.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-heading font-semibold text-accent">
                  Mission
                </h3>
                <p>
                  To turn clicks into clients, ideas into high-performing websites and e-commerce stores, and marketing into measurable growth—using the perfect mix of strategy, creativity, automation, and performance-driven advertising.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-heading font-semibold text-accent">
                  Vision
                </h3>
                <p>
                  To shape the future of digital marketing by bringing together AI, data, and technology—helping businesses scale intelligently, sustainably, and with complete clarity on their results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
