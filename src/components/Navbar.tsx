import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import revupLogoMain from "@/assets/revup-logo-main.png";
import revupLogoLight from "@/assets/revup-logo-light.png";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentLogo = mounted && resolvedTheme === "light" ? revupLogoLight : revupLogoMain;

  const menuItems = [
    { label: "Partners", path: "/partners" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Services", path: "/services" },
    { label: "About", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      {/* Floating pill container */}
      <div 
        className={`mx-auto max-w-5xl transition-all duration-500 ${
          scrolled 
            ? "bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/20" 
            : "bg-card/80 backdrop-blur-lg"
        } rounded-full border border-border/50 px-4 md:px-6`}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img 
              src={currentLogo} 
              alt="RevUp Agency Group Logo" 
              className="h-10 md:h-12" 
            />
          </Link>

          {/* Desktop Menu - Center */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-3 lg:px-4 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors font-medium rounded-full hover:bg-muted/50"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions - Right */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/portal">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-foreground/70 hover:text-foreground gap-2 rounded-full"
              >
                <User className="h-4 w-4" />
                Portal
              </Button>
            </Link>
            <ThemeToggle />
            <Button 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-6"
              onClick={() => window.open('https://calendly.com/revupagencygroup-info/30min?month=2025-11', '_blank')}
            >
              Work With Us
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-card/95 backdrop-blur-xl border-border/50">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex justify-end mb-4">
                  <ThemeToggle />
                </div>
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg text-foreground/80 hover:text-accent transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/portal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg text-foreground/80 hover:text-accent transition-colors font-medium flex items-center gap-2"
                >
                  <User className="h-5 w-5" />
                  Portal
                </Link>
                <Button 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full mt-4"
                  onClick={() => {
                    window.open('https://calendly.com/revupagencygroup-info/30min?month=2025-11', '_blank');
                    setMobileMenuOpen(false);
                  }}
                >
                  Work With Us
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
