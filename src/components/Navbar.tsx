import { useState, useEffect } from "react";
import { openCalendly } from "@/config/links";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowUpRight, Menu, UserRound } from "lucide-react";
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
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-foreground/10 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center">
          <img src={currentLogo} alt="RevUp Agency Group Logo" className="h-10 md:h-11" />
        </Link>

        {/* Desktop menu */}
        <div className="hidden items-center gap-1 md:flex">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Link to="/admin/login" aria-label="Admin Portal">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-foreground/60 hover:text-foreground"
            >
              <UserRound className="h-5 w-5" />
            </Button>
          </Link>
          <ThemeToggle />
          <Button
            onClick={openCalendly}
            className="group rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:pl-5 hover:pr-7"
          >
            Work With Us
            <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] border-foreground/10 bg-background">
            <div className="mt-8 flex flex-col gap-6">
              <div className="mb-4 flex justify-end">
                <ThemeToggle />
              </div>
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-heading text-2xl text-foreground/80 transition-colors hover:text-performance"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-lg text-foreground/70 transition-colors hover:text-performance"
              >
                <UserRound className="h-5 w-5" />
                Admin Portal
              </Link>
              <Button
                className="mt-4 rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  openCalendly();
                  setMobileMenuOpen(false);
                }}
              >
                Work With Us
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
