import { Award } from "lucide-react";
import { Link } from "react-router-dom";
import { BrandCard, Eyebrow, GiantNumeral, Reveal } from "@/components/brand/kit";
import googleLogo from "@/assets/google-logo.png";
import tiktokLogo from "@/assets/tiktok-logo.png";
import metaLogo from "@/assets/meta-logo-new.png";
import shopifyLogo from "@/assets/shopify-logo.svg";
import chatgptLogo from "@/assets/chatgpt-logo.svg";
import { pagePath, useLang } from "@/config/i18n";

const CORNERS = ["tl", "tr", "bl", "br"] as const;

const COPY = {
  en: {
    eyebrow: "Official Partners",
    badge: "Certified",
    titleA: "We are",
    titleB: "Official Partners",
    lede: "Certified digital marketing partners with Meta, Google Ads, TikTok, Shopify and ChatGPT—delivering expert campaign management, e-commerce and AI solutions",
    cardLabel: (name: string) => `${name} official partner — learn more`,
    logoAlt: (name: string) => `${name} certified partner - Professional ${name} advertising and marketing management`,
  },
  es: {
    eyebrow: "Socios oficiales",
    badge: "Certificados",
    titleA: "Somos",
    titleB: "socios oficiales",
    lede: "Socios certificados de marketing digital con Meta, Google Ads, TikTok, Shopify y ChatGPT: manejo experto de campañas, e-commerce y soluciones con IA",
    cardLabel: (name: string) => `Socio oficial de ${name}: conoce más`,
    logoAlt: (name: string) => `Socio certificado de ${name}: manejo profesional de publicidad y marketing en ${name}`,
  },
};

export const Partners = () => {
  const lang = useLang();
  const t = COPY[lang];
  const partners = [
    { name: "Meta", logo: metaLogo },
    { name: "Google", logo: googleLogo },
    { name: "TikTok", logo: tiktokLogo },
    { name: "Shopify", logo: shopifyLogo },
    { name: "ChatGPT", logo: chatgptLogo, invertOnDark: true },
  ];

  return (
    <section
      id="partners"
      className="relative overflow-hidden bg-transparent py-24 md:py-32"
      aria-labelledby="partners-heading"
    >
      {/* Giant tinted chapter numeral, behind content */}
      <GiantNumeral value="002" className="right-[-3%] top-[-4%]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow index="002" label={t.eyebrow} className="mb-12 max-w-md" />
          </Reveal>

          <header className="mb-14 md:mb-20">
            <Reveal delay={0.1}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-card px-4 py-1.5">
                <Award className="h-4 w-4 text-performance" aria-hidden="true" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone">
                  {t.badge}
                </span>
              </div>

              <h2
                id="partners-heading"
                className="font-heading text-4xl leading-[1.05] text-foreground md:text-5xl lg:text-6xl"
              >
                {t.titleA} <span className="text-primary">{t.titleB}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-stone md:text-lg">
                {t.lede}
              </p>
            </Reveal>
          </header>

          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-5">
            {partners.map((partner, index) => (
              <Reveal as="li" key={partner.name} delay={index * 0.1}>
                <Link
                  to={pagePath("partners", lang)}
                  className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={t.cardLabel(partner.name)}
                >
                  <BrandCard
                    corner={CORNERS[index % CORNERS.length]}
                    className="flex h-full min-h-[180px] flex-col items-center justify-center gap-5 p-6 md:min-h-[200px] md:p-8"
                  >
                    <img
                      src={partner.logo}
                      alt={t.logoAlt(partner.name)}
                      className={`max-h-12 w-auto max-w-[110px] object-contain opacity-80 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 md:max-h-14 md:max-w-[130px] ${"invertOnDark" in partner ? "dark:invert" : ""}`}
                      loading="lazy"
                    />
                    <span className="flex items-center gap-2 font-heading text-base text-foreground/70 transition-colors duration-300 group-hover:text-performance md:text-lg">
                      {partner.name}
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </span>
                  </BrandCard>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
