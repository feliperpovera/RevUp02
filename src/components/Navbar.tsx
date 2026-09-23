import { useState, useEffect } from "react";
import { openCalendly } from "@/config/links";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import servicePages from "@/config/service-pages.json";
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
    { label: "Blog", path: "/blog" },
  ];

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-foreground/10 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center">
          <img src={currentLogo} alt="RevUp Agency Group Logo" className="h-14 md:h-16" />
        </Link>

        {/* Desktop menu */}
        <div className="hidden items-center gap-1 md:flex">
          {menuItems.map((item) =>
            item.path === "/services" ? (
              <div key={item.path} className="group relative">
                <Link
                  to={item.path}
                  aria-haspopup="true"
                  className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
                </Link>
                {/* Dropdown: opens on hover and on keyboard focus */}
                <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="rounded-2xl border border-foreground/10 bg-background p-2 shadow-[0_20px_50px_hsl(40_7%_16%/0.15)]">
                    {servicePages.map((page) => (
                      <li key={page.path}>
                        <Link
                          to={page.path}
                          className="block rounded-xl px-4 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-performance focus-visible:bg-foreground/5 focus-visible:outline-none"
                        >
                          {page.name}
                        </Link>
                      </li>
                    ))}
                    <li className="mt-1 border-t border-foreground/10 pt-1">
                      <Link
                        to="/services"
                        className="block rounded-xl px-4 py-2.5 text-sm font-medium text-performance transition-colors hover:bg-foreground/5 focus-visible:bg-foreground/5 focus-visible:outline-none"
                      >
                        All services
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button
            onClick={openCalendly}
            className="group rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:pl-5 hover:pr-7"
          >
            Book a free call
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
                <div key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-heading text-2xl text-foreground/80 transition-colors hover:text-performance"
                  >
                    {item.label}
                  </Link>
                  {item.path === "/services" ? (
                    <ul className="mt-3 space-y-2 border-l border-foreground/10 pl-4">
                      {servicePages.map((page) => (
                        <li key={page.path}>
                          <Link
                            to={page.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm text-foreground/70 transition-colors hover:text-performance"
                          >
                            {page.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
              <Button
                className="mt-4 rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  openCalendly();
                  setMobileMenuOpen(false);
                }}
              >
                Book a free call
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
