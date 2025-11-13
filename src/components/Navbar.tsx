import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
          <Link to="/" className="flex items-center">
            <img src={revupLogoMain} alt="RevUp Agency Group Logo" className="h-20 md:h-24" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/about"
              className="text-foreground/80 hover:text-accent transition-colors font-medium"
            >
              About
            </Link>
            <Link
              to="/strategy"
              className="text-foreground/80 hover:text-accent transition-colors font-medium"
            >
              Strategy
            </Link>
            <Link
              to="/partners"
              className="text-foreground/80 hover:text-accent transition-colors font-medium"
            >
              Partners
            </Link>
            <Link
              to="/services"
              className="text-foreground/80 hover:text-accent transition-colors font-medium"
            >
              Services
            </Link>
            <Link
              to="/process"
              className="text-foreground/80 hover:text-accent transition-colors font-medium"
            >
              Process
            </Link>
            <Link
              to="/testimonials"
              className="text-foreground/80 hover:text-accent transition-colors font-medium"
            >
              Testimonials
            </Link>
          </div>

          <Button variant="glow" size="lg" onClick={() => {
            if (window.location.pathname === '/') {
              scrollToSection("contact");
            } else {
              window.location.href = "/#contact";
            }
          }}>
            Contact Us
          </Button>
        </div>
      </div>
    </nav>
  );
};
