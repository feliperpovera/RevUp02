import { Award } from "lucide-react";
import googleLogo from "@/assets/google-logo.png";
import tiktokLogo from "@/assets/tiktok-logo.png";
import metaLogo from "@/assets/meta-logo.png";
import shopifyLogo from "@/assets/shopify-logo.svg";

export const Partners = () => {
  const partners = [
    { name: "Meta", logo: metaLogo },
    { name: "Google", logo: googleLogo },
    { name: "TikTok", logo: tiktokLogo },
    { name: "Shopify", logo: shopifyLogo },
  ];

  return (
    <section id="partners" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 mb-3 md:mb-4">
            <Award className="text-accent" size={24} />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold">
              We are <span className="text-accent">Official Partners</span>
            </h2>
          </div>
          <p className="text-foreground/70 text-base md:text-lg max-w-2xl mx-auto px-4">
            Certified and backed by the leading platforms in digital advertising and e-commerce
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 items-center justify-items-center max-w-5xl mx-auto">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="glass-card p-6 md:p-8 rounded-xl md:rounded-2xl hover:scale-105 transition-transform duration-300 w-full flex items-center justify-center min-h-[120px]"
            >
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`}
                className="max-w-full max-h-16 md:max-h-20 object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
