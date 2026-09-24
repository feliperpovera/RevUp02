import { Navbar } from "@/components/Navbar";
import { goToForm } from "@/config/links";
import { Footer } from "@/components/Footer";
import { Award, CheckCircle } from "lucide-react";
import googleLogo from "@/assets/google-logo.png";
import tiktokLogo from "@/assets/tiktok-logo.png";
import metaLogo from "@/assets/meta-logo-new.png";
import shopifyLogo from "@/assets/shopify-logo.svg";
import { useLang } from "@/config/i18n";

const PARTNERS = [
  {
    name: "Meta",
    logo: metaLogo,
    description: {
      en: "Official Meta Business Partner with advanced access to advertising tools and beta features.",
      es: "Meta Business Partner oficial, con acceso avanzado a herramientas publicitarias y funciones beta.",
    },
  },
  {
    name: "Google",
    logo: googleLogo,
    description: {
      en: "Google Partner certified in Search, Display, Video, and Shopping campaigns.",
      es: "Google Partner certificado en campañas de Búsqueda, Display, Video y Shopping.",
    },
  },
  {
    name: "TikTok",
    logo: tiktokLogo,
    description: {
      en: "TikTok Marketing Partner with expertise in creative strategy and performance campaigns.",
      es: "TikTok Marketing Partner con experiencia en estrategia creativa y campañas de resultados.",
    },
  },
  {
    name: "Shopify",
    logo: shopifyLogo,
    description: {
      en: "Shopify Partner specializing in custom store development and optimization.",
      es: "Shopify Partner especializado en el desarrollo y la optimización de tiendas a la medida.",
    },
  },
];

const COPY = {
  en: {
    title: (
      <>
        Official <span className="text-accent">Partners</span>
      </>
    ),
    subtitle: "Certified and backed by the leading platforms in digital advertising and e-commerce",
    logoAlt: (name: string) => `${name} logo`,
    meansTitle: (
      <>
        What Partnership <span className="text-accent">Means</span>
      </>
    ),
    benefits: [
      { title: "Priority Support", text: "Direct access to platform representatives for faster issue resolution and strategic guidance." },
      { title: "Beta Access", text: "Early access to new features and advertising products before they're publicly available." },
      { title: "Advanced Tools", text: "Access to premium analytics, reporting tools, and optimization features not available to standard users." },
      { title: "Certified Expertise", text: "Our team is trained and certified on each platform's best practices and latest updates." },
    ],
    cta: "Book a Consultation",
  },
  es: {
    title: (
      <>
        <span className="text-accent">Aliados</span> oficiales
      </>
    ),
    subtitle: "Certificados y respaldados por las plataformas líderes en publicidad digital y comercio electrónico",
    logoAlt: (name: string) => `Logo de ${name}`,
    meansTitle: (
      <>
        Qué significa ser <span className="text-accent">aliado oficial</span>
      </>
    ),
    benefits: [
      { title: "Soporte prioritario", text: "Acceso directo a representantes de cada plataforma para resolver problemas más rápido y recibir orientación estratégica." },
      { title: "Acceso a betas", text: "Acceso anticipado a nuevas funciones y productos publicitarios antes de que estén disponibles para todos." },
      { title: "Herramientas avanzadas", text: "Acceso a analítica premium, herramientas de reportes y funciones de optimización que no están disponibles para usuarios estándar." },
      { title: "Experiencia certificada", text: "Nuestro equipo está capacitado y certificado en las mejores prácticas y las últimas novedades de cada plataforma." },
    ],
    cta: "Agenda una consulta",
  },
};

const PartnersPage = () => {
  const lang = useLang();
  const t = COPY[lang];

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <section className="py-24 md:py-32 bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <Award className="text-accent" size={32} />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold">
                  {t.title}
                </h1>
              </div>
              <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {PARTNERS.map((partner) => (
                <div
                  key={partner.name}
                  className="glass-card p-8 rounded-xl hover-lift"
                >
                  <img
                    src={partner.logo}
                    alt={t.logoAlt(partner.name)}
                    className="max-w-[120px] max-h-16 object-contain mb-6 opacity-80"
                  />
                  <h3 className="text-2xl font-heading font-bold mb-3 text-accent">
                    {partner.name}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {partner.description[lang]}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-graphite/50 p-8 md:p-12 rounded-xl space-y-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-center">
                {t.meansTitle}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.benefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-start gap-4">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-heading font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-foreground/70 text-sm">{benefit.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={goToForm}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-11 rounded-md px-8 text-base md:text-lg py-6"
              >
                {t.cta}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PartnersPage;
