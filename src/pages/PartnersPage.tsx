import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Award, CheckCircle } from "lucide-react";
import googleLogo from "@/assets/google-logo.png";
import tiktokLogo from "@/assets/tiktok-logo.png";
import metaLogo from "@/assets/meta-logo-new.png";
import shopifyLogo from "@/assets/shopify-logo.svg";

const PartnersPage = () => {
  const partners = [
    {
      name: "Meta",
      logo: metaLogo,
      description: "Official Meta Business Partner with advanced access to advertising tools and beta features."
    },
    {
      name: "Google",
      logo: googleLogo,
      description: "Google Partner certified in Search, Display, Video, and Shopping campaigns."
    },
    {
      name: "TikTok",
      logo: tiktokLogo,
      description: "TikTok Marketing Partner with expertise in creative strategy and performance campaigns."
    },
    {
      name: "Shopify",
      logo: shopifyLogo,
      description: "Shopify Partner specializing in custom store development and optimization."
    },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <section className="py-24 md:py-32 bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <Award className="text-accent" size={32} />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold">
                  Official <span className="text-accent">Partners</span>
                </h1>
              </div>
              <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
                Certified and backed by the leading platforms in digital advertising and e-commerce
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="glass-card p-8 rounded-xl hover-lift"
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-w-[120px] max-h-16 object-contain mb-6 opacity-80"
                  />
                  <h3 className="text-2xl font-heading font-bold mb-3 text-accent">
                    {partner.name}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-graphite/50 p-8 md:p-12 rounded-xl space-y-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-center">
                What Partnership <span className="text-accent">Means</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-heading font-semibold mb-2">Priority Support</h3>
                    <p className="text-foreground/70 text-sm">Direct access to platform representatives for faster issue resolution and strategic guidance.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-heading font-semibold mb-2">Beta Access</h3>
                    <p className="text-foreground/70 text-sm">Early access to new features and advertising products before they're publicly available.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-heading font-semibold mb-2">Advanced Tools</h3>
                    <p className="text-foreground/70 text-sm">Access to premium analytics, reporting tools, and optimization features not available to standard users.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-heading font-semibold mb-2">Certified Expertise</h3>
                    <p className="text-foreground/70 text-sm">Our team is trained and certified on each platform's best practices and latest updates.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => window.open('https://calendly.com/revupagencygroup-info/30min?month=2025-11', '_blank')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-11 rounded-md px-8 text-base md:text-lg py-6"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PartnersPage;
