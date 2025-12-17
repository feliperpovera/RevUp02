import revupLogoMain from "@/assets/revup-logo-main.png";
import { Link } from "react-router-dom";

export const Footer = () => {

  return (
    <footer className="bg-background border-t border-accent/20 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-6 md:mb-8">
          <div>
            <div className="flex items-center mb-3 md:mb-4">
              <img src={revupLogoMain} alt="RevUp Agency Group Logo" className="h-16 md:h-20" />
            </div>
            <p className="text-sm md:text-base text-foreground/60">
              Grow smarter. Move faster. Data-driven digital marketing excellence.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-base md:text-lg mb-3 md:mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link
                to="/about"
                className="block text-sm md:text-base text-foreground/60 hover:text-accent transition-colors"
              >
                About
              </Link>
              <Link
                to="/strategy"
                className="block text-sm md:text-base text-foreground/60 hover:text-accent transition-colors"
              >
                Strategy
              </Link>
              <Link
                to="/partners"
                className="block text-sm md:text-base text-foreground/60 hover:text-accent transition-colors"
              >
                Partners
              </Link>
              <Link
                to="/services"
                className="block text-sm md:text-base text-foreground/60 hover:text-accent transition-colors"
              >
                Services
              </Link>
              <Link
                to="/process"
                className="block text-sm md:text-base text-foreground/60 hover:text-accent transition-colors"
              >
                Process
              </Link>
              <Link
                to="/testimonials"
                className="block text-sm md:text-base text-foreground/60 hover:text-accent transition-colors"
              >
                Testimonials
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-base md:text-lg mb-3 md:mb-4">Get In Touch</h3>
            <p className="text-sm md:text-base text-foreground/60">
              Ready to transform your digital presence?<br />
              <a 
                href="https://calendly.com/revupagencygroup-info/30min?month=2025-11" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:underline transition-all cursor-pointer"
              >
                Let&apos;s talk.
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-border/30 pt-6 md:pt-8 text-center text-foreground/50 text-xs md:text-sm">
          <p>© {new Date().getFullYear()} RevUp Agency Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
