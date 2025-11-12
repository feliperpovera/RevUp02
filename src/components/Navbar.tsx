import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import revupLogoMain from "@/assets/revup-logo-main.png";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("hero")}>
            <img src={revupLogoMain} alt="RevUp Agency Group Logo" className="h-20 md:h-24" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("services")}
              className="text-foreground/80 hover:text-accent transition-colors font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("partners")}
              className="text-foreground/80 hover:text-accent transition-colors font-medium"
            >
              Official Partners
            </button>
            <button
              onClick={() => scrollToSection("insights")}
              className="text-foreground/80 hover:text-accent transition-colors font-medium"
            >
              Insights
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground/80 hover:text-accent transition-colors font-medium"
            >
              Contact
            </button>
          </div>

          <Button variant="glow" size="lg" onClick={() => scrollToSection("contact")}>
            Contact Us
          </Button>
        </div>
      </div>
    </nav>
  );
};
