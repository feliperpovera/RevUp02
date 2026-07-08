import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Instagram } from "lucide-react";
import revupLogoMain from "@/assets/revup-logo-main.png";
import { CALENDLY_URL } from "@/config/links";
import { DeviceAsterisk, Reveal } from "@/components/brand/kit";

const EASE = [0.22, 1, 0.36, 1] as const;

const QUICK_LINKS = [
  { label: "About", to: "/about" },
  { label: "Strategy", to: "/strategy" },
  { label: "Partners", to: "/partners" },
  { label: "Services", to: "/services" },
  { label: "Process", to: "/process" },
  { label: "Testimonials", to: "/testimonials" },
];

export const Footer = () => {
  const prefersReducedMotion = useReducedMotion();

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/revupagencygroup/", label: "Instagram" },
  ];

  return (
    <footer className="relative overflow-hidden bg-graphite text-cream">
      {/* Hairline asterisk device — faint, upper right */}
      <DeviceAsterisk className="pointer-events-none absolute -top-12 right-[4%] h-56 w-56 text-cream/10 md:top-8 md:h-64 md:w-64" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        {/* Editorial statement row */}
        <Reveal className="border-b border-cream/15 py-16 md:py-20">
          <p className="max-w-4xl font-heading text-3xl leading-[1.08] text-cream sm:text-4xl lg:text-5xl">
            Driven by data.{" "}
            <span className="block sm:inline">
              Powered by{" "}
              <span className="relative inline-block">
                <motion.span
                  aria-hidden="true"
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
                  className="absolute inset-x-[-0.08em] bottom-[0.04em] top-[0.52em] -z-10 origin-left bg-accent/30"
                />
                growth.
              </span>
            </span>
          </p>
        </Reveal>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-[1.4fr_1fr_1.2fr_0.7fr] lg:gap-10">
          {/* Brand */}
          <Reveal delay={0}>
            <img src={revupLogoMain} alt="RevUp Agency Group Logo" className="h-14 w-auto md:h-16" />
            <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-cream/60 md:text-base">
              Grow smarter. Move faster. Data-driven digital marketing excellence.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Quick Links */}
          <Reveal delay={0.1}>
            <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-cream/50">
              Quick Links
            </h3>
            <ul className="mt-6 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm font-light text-cream/70 transition-colors duration-300 hover:text-accent md:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Get In Touch */}
          <Reveal delay={0.2}>
            <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-cream/50">
              Get In Touch
            </h3>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-cream/70 md:text-base">
              Ready to transform your digital presence?
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all hover:underline md:text-base"
            >
              Let&apos;s talk.
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>

          {/* Admin */}
          <Reveal delay={0.3}>
            <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-cream/50">
              Admin
            </h3>
            <Link
              to="/admin/login"
              className="mt-6 inline-block text-sm font-light text-cream/70 transition-colors duration-300 hover:text-accent md:text-base"
            >
              Admin Portal
            </Link>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <Reveal
          distance={16}
          className="flex flex-col items-center justify-between gap-3 border-t border-cream/15 py-8 sm:flex-row"
        >
          <p className="text-xs font-light text-cream/50 md:text-sm">
            © {new Date().getFullYear()} RevUp Agency Group. All rights reserved.
          </p>
          <span aria-hidden="true" className="font-heading text-xs tracking-wide text-cream/40">
            /RevUp
          </span>
        </Reveal>
      </div>
    </footer>
  );
};
