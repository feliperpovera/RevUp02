import { Award } from "lucide-react";
import { Link } from "react-router-dom";
import googleLogo from "@/assets/google-logo.png";
import tiktokLogo from "@/assets/tiktok-logo.png";
import metaLogo from "@/assets/meta-logo-new.png";
import shopifyLogo from "@/assets/shopify-logo.svg";

export const Partners = () => {
  const partners = [
    { name: "Meta", logo: metaLogo },
    { name: "Google", logo: googleLogo },
    { name: "TikTok", logo: tiktokLogo },
    { name: "Shopify", logo: shopifyLogo },
  ];

  return (
    <section id="partners" className="py-16 md:py-20 bg-background relative overflow-hidden" aria-labelledby="partners-heading">
      {/* Floating orbs background */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <header className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 mb-3 md:mb-4 opacity-0 animate-scale-in">
            <Award className="text-accent animate-float" size={24} aria-hidden="true" />
            <h2 id="partners-heading" className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold">
              We are <span className="text-accent gradient-text">Official Partners</span>
            </h2>
          </div>
          <p className="text-foreground/70 text-base md:text-lg max-w-2xl mx-auto px-4 opacity-0 animate-fade-in stagger-1">
            Certified digital marketing partners with Meta, Google Ads, TikTok, and Shopify—delivering expert campaign management and e-commerce solutions
          </p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 items-center justify-items-center max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <Link
              key={partner.name}
              to="/partners"
              className="futuristic-card p-6 md:p-8 rounded-xl md:rounded-2xl w-full flex flex-col items-center justify-center gap-4 min-h-[140px] group opacity-0 animate-slide-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <img 
                src={partner.logo} 
                alt={`${partner.name} certified partner - Professional ${partner.name} advertising and marketing management`}
                className="max-w-[100px] md:max-w-[120px] max-h-14 md:max-h-16 object-contain opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_hsl(var(--accent)/0.5)]"
                loading="lazy"
              />
              <span className="text-base md:text-lg font-heading font-semibold text-foreground/70 group-hover:text-accent transition-colors duration-300">
                {partner.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
