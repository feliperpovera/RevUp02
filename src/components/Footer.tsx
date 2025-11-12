import revupLogoFull from "@/assets/revup-logo-full.png";

export const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background border-t border-accent/20 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <img src={revupLogoFull} alt="RevUp Agency Group Logo" className="h-14" />
            </div>
            <p className="text-foreground/60">
              Grow smarter. Move faster. Data-driven digital marketing excellence.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection("services")}
                className="block text-foreground/60 hover:text-accent transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("insights")}
                className="block text-foreground/60 hover:text-accent transition-colors"
              >
                Insights
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block text-foreground/60 hover:text-accent transition-colors"
              >
                Contact
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Get In Touch</h3>
            <p className="text-foreground/60">
              Ready to transform your digital presence?<br />
              <span className="text-accent">Let's talk.</span>
            </p>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 text-center text-foreground/50 text-sm">
          <p>© {new Date().getFullYear()} RevUp Agency Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
