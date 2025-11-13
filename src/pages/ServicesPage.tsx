import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShoppingCart, Code, Settings, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AngularLinesDecor, CirclesDecor } from "@/components/decorative/GeometricShapes";

const ServicesPage = () => {
  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-24 md:py-32 bg-gradient-to-b from-background to-graphite relative overflow-hidden">
        <AngularLinesDecor className="absolute top-24 left-8 opacity-20 animate-pulse" />
        <CirclesDecor className="absolute bottom-16 right-8 opacity-20" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                Our <span className="text-accent">Services</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
                End-to-end digital solutions tailored to your business goals
              </p>
            </div>

            <div className="space-y-12">
              {/* Paid Media */}
              <div className="glass-card p-8 md:p-12 rounded-xl">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-lg bg-accent/10">
                    <ShoppingCart className="w-10 h-10 md:w-12 md:h-12 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                      Paid Media
                    </h2>
                    <p className="text-foreground/70 mb-6 leading-relaxed">
                      We create & manage ad campaigns that bring targeted traffic, increase visibility, and help your brand grow across all major platforms.
                    </p>
                    <ul className="space-y-3 text-foreground/70">
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Meta Ads (Facebook & Instagram) - Precise audience targeting and retargeting campaigns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Google Ads (Search, Display, Shopping) - Capture high-intent customers actively searching</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>TikTok Ads - Engage younger audiences with creative, viral-worthy content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Campaign optimization and A/B testing for maximum ROI</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Website & Store Development */}
              <div className="glass-card p-8 md:p-12 rounded-xl">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-lg bg-accent/10">
                    <Code className="w-10 h-10 md:w-12 md:h-12 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                      Website & Store Development
                    </h2>
                    <p className="text-foreground/70 mb-6 leading-relaxed">
                      We build high-performing websites, e-commerce stores, and landing pages designed to convert visitors into customers.
                    </p>
                    <ul className="space-y-3 text-foreground/70">
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Custom Shopify stores optimized for conversions and user experience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Landing pages built for specific campaigns with clear CTAs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Responsive design that looks great on all devices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Speed optimization for better user experience and SEO</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Website & Store Management */}
              <div className="glass-card p-8 md:p-12 rounded-xl">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-lg bg-accent/10">
                    <Settings className="w-10 h-10 md:w-12 md:h-12 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                      Website & Store Management
                    </h2>
                    <p className="text-foreground/70 mb-6 leading-relaxed">
                      Keep your website and store updated, optimized, and performing at their best with our ongoing management services.
                    </p>
                    <ul className="space-y-3 text-foreground/70">
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Regular content updates and product additions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Performance monitoring and speed optimization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Security updates and backup management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Conversion rate optimization through continuous testing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* AI Automation */}
              <div className="glass-card p-8 md:p-12 rounded-xl">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-lg bg-accent/10">
                    <Zap className="w-10 h-10 md:w-12 md:h-12 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                      AI Automation
                    </h2>
                    <p className="text-foreground/70 mb-6 leading-relaxed">
                      Intelligent campaign flows and automation that optimize performance and reduce manual work, allowing you to scale efficiently.
                    </p>
                    <ul className="space-y-3 text-foreground/70">
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Automated email sequences based on customer behavior</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Smart bidding strategies that adjust in real-time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>AI-powered audience segmentation for better targeting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Chatbots and automated customer service workflows</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button 
                variant="glow" 
                size="lg" 
                onClick={scrollToContact}
                className="text-base md:text-lg px-8 py-6"
              >
                Get Started Today
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
