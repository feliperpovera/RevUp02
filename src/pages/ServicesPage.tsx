import servicePages from "@/config/service-pages.json";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { openCalendly } from "@/config/links";
import { Footer } from "@/components/Footer";
import { ShoppingCart, Code, Settings, Zap, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { localizePath, pagePath, serviceLang, useLang } from "@/config/i18n";

/** Card icons, in the same order as COPY[lang].cards. The last card (SEO) also links to its service page. */
const ICONS = [ShoppingCart, Code, Settings, Zap, Search];

const COPY = {
  en: {
    title: "Our",
    titleAccent: "Services",
    subtitle: "End-to-end digital solutions tailored to your business goals",
    cards: [
      {
        title: "Paid Media",
        text: "We create & manage ad campaigns that bring targeted traffic, increase visibility, and help your brand grow across all major platforms.",
        bullets: [
          "Meta Ads (Facebook & Instagram) - Precise audience targeting and retargeting campaigns",
          "Google Ads (Search, Display, Shopping) - Capture high-intent customers actively searching",
          "TikTok Ads - Engage younger audiences with creative, viral-worthy content",
          "Campaign optimization and A/B testing for maximum ROI",
        ],
      },
      {
        title: "Website & Store Development",
        text: "We build high-performing websites, e-commerce stores, and landing pages designed to convert visitors into customers.",
        bullets: [
          "Custom Shopify stores optimized for conversions and user experience",
          "Landing pages built for specific campaigns with clear CTAs",
          "Responsive design that looks great on all devices",
          "Speed optimization for better user experience and SEO",
        ],
      },
      {
        title: "Website & Store Management",
        text: "Keep your website and store updated, optimized, and performing at their best with our ongoing management services.",
        bullets: [
          "Regular content updates and product additions",
          "Performance monitoring and speed optimization",
          "Security updates and backup management",
          "Conversion rate optimization through continuous testing",
        ],
      },
      {
        title: "AI Automation",
        text: "Intelligent campaign flows and automation that optimize performance and reduce manual work, allowing you to scale efficiently.",
        bullets: [
          "Automated email sequences based on customer behavior",
          "Smart bidding strategies that adjust in real-time",
          "AI-powered audience segmentation for better targeting",
          "Chatbots and automated customer service workflows",
        ],
      },
      {
        title: "Local SEO Services",
        text: "Get found on Google Search and Google Maps by customers in your service area — alone or combined with paid ads as a complete SEO + SEM package.",
        bullets: [
          "Google Business Profile optimization and local rankings",
          "Service and service-area pages optimized for local searches",
          "Review strategy and consistent business listings",
          "Monthly reporting on rankings, calls and traffic",
        ],
      },
    ],
    seoLink: "Learn about our local SEO services",
    cta: "Get Started Today",
    pricing: "See plans & pricing",
    navLabel: "Service pages",
    explore: "Explore",
  },
  es: {
    title: "Nuestros",
    titleAccent: "servicios",
    subtitle: "Soluciones digitales de principio a fin, adaptadas a los objetivos de tu negocio",
    cards: [
      {
        title: "Publicidad pagada",
        text: "Creamos y administramos campañas publicitarias que atraen tráfico calificado, aumentan tu visibilidad y hacen crecer tu marca en las principales plataformas.",
        bullets: [
          "Meta Ads (Facebook e Instagram) - Segmentación precisa de audiencias y campañas de retargeting",
          "Google Ads (Búsqueda, Display, Shopping) - Llega a clientes con alta intención que ya están buscando lo que ofreces",
          "TikTok Ads - Conecta con audiencias jóvenes con contenido creativo y con potencial viral",
          "Optimización de campañas y pruebas A/B para maximizar el ROI",
        ],
      },
      {
        title: "Desarrollo de sitios web y tiendas",
        text: "Creamos sitios web, tiendas en línea y landing pages de alto rendimiento, diseñados para convertir visitantes en clientes.",
        bullets: [
          "Tiendas Shopify a la medida, optimizadas para conversiones y experiencia de usuario",
          "Landing pages para campañas específicas, con llamados a la acción claros",
          "Diseño responsive que se ve muy bien en todos los dispositivos",
          "Optimización de velocidad para mejorar la experiencia de usuario y el SEO",
        ],
      },
      {
        title: "Administración de sitios web y tiendas",
        text: "Mantén tu sitio web y tu tienda actualizados, optimizados y funcionando al máximo con nuestro servicio de administración continua.",
        bullets: [
          "Actualizaciones de contenido y carga de productos de forma regular",
          "Monitoreo del rendimiento y optimización de velocidad",
          "Actualizaciones de seguridad y manejo de copias de seguridad",
          "Optimización de la tasa de conversión con pruebas continuas",
        ],
      },
      {
        title: "Automatización con IA",
        text: "Flujos de campaña inteligentes y automatizaciones que optimizan el rendimiento y reducen el trabajo manual, para que puedas crecer con eficiencia.",
        bullets: [
          "Secuencias de email automáticas según el comportamiento de tus clientes",
          "Estrategias de puja inteligentes que se ajustan en tiempo real",
          "Segmentación de audiencias con IA para llegar mejor a tu público",
          "Chatbots y flujos automatizados de atención al cliente",
        ],
      },
      {
        title: "Servicios de SEO local",
        text: "Haz que los clientes de tu zona te encuentren en Google y Google Maps — solo o combinado con anuncios pagados en un paquete completo de SEO + SEM.",
        bullets: [
          "Optimización de tu Perfil de Empresa en Google y posicionamiento local",
          "Páginas de servicios y zonas de servicio optimizadas para búsquedas locales",
          "Estrategia de reseñas y datos de tu negocio consistentes en directorios",
          "Reporte mensual de posiciones, llamadas y tráfico",
        ],
      },
    ],
    seoLink: "Conoce nuestros servicios de SEO local",
    cta: "Empieza hoy",
    pricing: "Ver planes y precios",
    navLabel: "Páginas de servicios",
    explore: "Explora",
  },
};

const ServicesPage = () => {
  const lang = useLang();
  const t = COPY[lang];

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <section className="py-24 md:py-32 bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                {t.title} <span className="text-accent">{t.titleAccent}</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </div>

            <div className="space-y-12">
              {t.cards.map((card, i) => {
                const Icon = ICONS[i];
                return (
                  <div key={card.title} className="glass-card p-8 md:p-12 rounded-xl">
                    <div className="flex items-start gap-6">
                      <div className="p-4 rounded-lg bg-accent/10">
                        <Icon className="w-10 h-10 md:w-12 md:h-12 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                          {card.title}
                        </h2>
                        <p className="text-foreground/70 mb-6 leading-relaxed">
                          {card.text}
                        </p>
                        <ul className="space-y-3 text-foreground/70">
                          {card.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2">
                              <span className="text-accent">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                        {Icon === Search ? (
                          <Link to={localizePath("/seo-for-service-businesses", lang)} className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-performance hover:underline">
                            {t.seoLink}
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12 flex flex-col items-center gap-4">
              <Button
                variant="glow"
                size="lg"
                onClick={() => openCalendly()}
                className="text-base md:text-lg px-8 py-6"
              >
                {t.cta}
                <ArrowRight className="ml-2" />
              </Button>
              <Link to={pagePath("pricing", lang)} className="text-sm text-stone underline-offset-4 hover:text-performance hover:underline">
                {t.pricing}
              </Link>
            </div>
          </div>
        </div>

        <nav aria-label={t.navLabel} className="container mx-auto mt-16 flex max-w-6xl justify-center px-4 md:px-6 flex-wrap items-center gap-3">
          <span className="mr-2 text-xs font-medium uppercase tracking-[0.3em] text-stone">{t.explore}</span>
          {servicePages.filter((p) => serviceLang(p) === lang).map((p) => (
            <Link
              key={p.path}
              to={p.path}
              className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-5 py-2.5 text-sm text-foreground/80 transition-colors hover:border-performance hover:text-performance"
            >
              {p.name}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ))}
        </nav>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
