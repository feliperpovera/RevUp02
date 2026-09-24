import { Link } from "react-router-dom";
import { ArrowUpRight, Instagram, MessageCircle } from "lucide-react";
import revupLogoMain from "@/assets/revup-logo-main.png";
import { CALENDLY_URL, PHONE_URL, WHATSAPP_NUMBER, WHATSAPP_URL, whatsappUrl } from "@/config/links";
import { localizePath, useLang } from "@/config/i18n";
import { DeviceAsterisk, Reveal } from "@/components/brand/kit";

/** `to` is the English path; localizePath maps it to the Spanish page. */
const QUICK_LINKS = [
  { label: { en: "About", es: "Nosotros" }, to: "/about" },
  { label: { en: "Strategy", es: "Estrategia" }, to: "/strategy" },
  { label: { en: "Partners", es: "Aliados" }, to: "/partners" },
  { label: { en: "Services", es: "Servicios" }, to: "/services" },
  { label: { en: "Process", es: "Proceso" }, to: "/process" },
  { label: { en: "Testimonials", es: "Testimonios" }, to: "/testimonials" },
  { label: { en: "Blog", es: "Blog" }, to: "/blog" },
  { label: { en: "Service Businesses", es: "Negocios de servicios" }, to: "/service-business-marketing" },
  { label: { en: "Google Ads", es: "Google Ads" }, to: "/google-ads-management" },
  { label: { en: "Meta Ads", es: "Meta Ads" }, to: "/meta-ads-management" },
  { label: { en: "TikTok Ads", es: "TikTok Ads" }, to: "/tiktok-ads-management" },
  { label: { en: "Shopify & Web", es: "Shopify y Web" }, to: "/shopify-web-development" },
];

const COPY = {
  en: {
    statementA: "Driven by data.",
    statementB: "Powered by",
    statementC: "growth.",
    logoAlt: "RevUp Agency Group Logo",
    tagline: "Grow smarter. Move faster. Data-driven digital marketing excellence.",
    quickLinks: "Quick Links",
    contact: "Get In Touch",
    ready: "Ready to transform your digital presence?",
    talk: "Let's talk.",
    rights: "All rights reserved.",
    whatsapp: WHATSAPP_URL,
  },
  es: {
    statementA: "Guiados por datos.",
    statementB: "Impulsados por el",
    statementC: "crecimiento.",
    logoAlt: "Logo de RevUp Agency Group",
    tagline: "Crece con inteligencia. Avanza más rápido. Marketing digital de excelencia basado en datos.",
    quickLinks: "Enlaces rápidos",
    contact: "Contáctanos",
    ready: "¿Listo para transformar tu presencia digital?",
    talk: "Hablemos.",
    rights: "Todos los derechos reservados.",
    whatsapp: whatsappUrl("¡Hola RevUp! Quiero hacer crecer mi negocio."),
  },
};

export const Footer = () => {
  const lang = useLang();
  const t = COPY[lang];
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/revupagencygroup/", label: "Instagram" },
    { icon: MessageCircle, href: t.whatsapp, label: "WhatsApp" },
  ];

  return (
    <footer className="relative overflow-hidden bg-graphite text-cream">
      {/* Hairline asterisk device — faint, upper right */}
      <DeviceAsterisk className="pointer-events-none absolute -top-12 right-[4%] h-56 w-56 text-cream/10 md:top-8 md:h-64 md:w-64" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        {/* Editorial statement row */}
        <Reveal className="border-b border-cream/15 py-16 md:py-20">
          <p className="max-w-4xl font-heading text-3xl leading-[1.08] text-cream sm:text-4xl lg:text-5xl">
            {t.statementA}{" "}
            <span className="block sm:inline">
              {t.statementB}{" "}
              <span className="text-accent">{t.statementC}</span>
            </span>
          </p>
        </Reveal>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-[1.4fr_1fr_1.2fr_0.7fr] lg:gap-10">
          {/* Brand */}
          <Reveal delay={0}>
            <img src={revupLogoMain} alt={t.logoAlt} className="h-16 w-auto md:h-20" />
            <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-cream/60 md:text-base">
              {t.tagline}
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
              {t.quickLinks}
            </h3>
            <ul className="mt-6 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={localizePath(link.to, lang)}
                    className="text-sm font-light text-cream/70 transition-colors duration-300 hover:text-accent md:text-base"
                  >
                    {link.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Get In Touch */}
          <Reveal delay={0.2}>
            <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-cream/50">
              {t.contact}
            </h3>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-cream/70 md:text-base">
              {t.ready}
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all hover:underline md:text-base"
            >
              {t.talk}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href={PHONE_URL} className="mt-3 block text-sm text-cream/70 transition-colors hover:text-accent md:text-base">
              {WHATSAPP_NUMBER}
            </a>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <Reveal
          distance={16}
          className="flex flex-col items-center justify-between gap-3 border-t border-cream/15 py-8 sm:flex-row"
        >
          <p className="text-xs font-light text-cream/50 md:text-sm">
            © {new Date().getFullYear()} RevUp Agency Group. {t.rights}
          </p>
          <span aria-hidden="true" className="font-heading text-xs tracking-wide text-cream/40">
            /RevUp
          </span>
        </Reveal>
      </div>
    </footer>
  );
};
