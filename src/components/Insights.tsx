import { Search, Map, Rocket, TrendingUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Eyebrow, GiantNumeral, Reveal, SectionHeading } from "@/components/brand/kit";
import { pagePath, useLang } from "@/config/i18n";

const steps = [
  {
    icon: Search,
    number: "1",
    title: { en: "Understand Your Business Goals", es: "Entendemos las metas de tu negocio" },
    description: {
      en: "We begin with an in-depth strategy consultation to understand your business model, target audience, competitive landscape, and growth objectives. This ensures every marketing dollar is strategically invested for maximum impact.",
      es: "Empezamos con una consulta estratégica a fondo para entender tu modelo de negocio, tu público objetivo, tu competencia y tus metas de crecimiento. Así cada dólar de marketing se invierte con estrategia para lograr el mayor impacto.",
    },
  },
  {
    icon: Map,
    number: "2",
    title: { en: "Custom Marketing Strategy & Roadmap", es: "Estrategia de marketing y hoja de ruta a la medida" },
    description: {
      en: "Our team develops a comprehensive digital marketing plan connecting paid advertising, website optimization, email campaigns, and conversion funnels. You receive a clear roadmap with timelines, platform recommendations, KPIs, and expected ROI.",
      es: "Nuestro equipo arma un plan completo de marketing digital que conecta publicidad pagada, optimización de tu sitio web, campañas de email y embudos de conversión. Recibes una hoja de ruta clara con plazos, recomendaciones de plataformas, KPIs y ROI esperado.",
    },
  },
  {
    icon: Rocket,
    number: "3",
    title: { en: "Build & Launch Campaigns", es: "Creamos y lanzamos tus campañas" },
    description: {
      en: "Once approved, we execute your strategy—launching Google Ads and Meta campaigns, optimizing your website for conversions, and implementing marketing automation to drive immediate results.",
      es: "Una vez aprobada, ejecutamos tu estrategia: lanzamos campañas en Google Ads y Meta, optimizamos tu sitio web para convertir e implementamos automatización de marketing para generar resultados desde el inicio.",
    },
  },
  {
    icon: TrendingUp,
    number: "4",
    title: { en: "Optimize & Scale for Growth", es: "Optimizamos y escalamos para crecer" },
    description: {
      en: "We continuously monitor campaign performance, conduct A/B testing, and leverage AI-driven insights to improve your advertising ROI, reduce cost-per-acquisition, and scale your business efficiently.",
      es: "Monitoreamos el rendimiento de tus campañas todo el tiempo, hacemos pruebas A/B y usamos análisis con IA para mejorar el ROI de tu publicidad, reducir el costo por adquisición y escalar tu negocio de forma eficiente.",
    },
  },
];

const COPY = {
  en: { eyebrow: "Our Process", titleA: "Our", titleB: "Process" },
  es: { eyebrow: "Nuestro proceso", titleA: "Nuestro", titleB: "proceso" },
};

export const Insights = () => {
  const lang = useLang();
  const t = COPY[lang];
  return (
    <section
      id="insights"
      className="relative overflow-hidden bg-background py-24 md:py-32"
      aria-labelledby="process-heading"
    >
      {/* Giant tinted chapter numeral behind the heading */}
      <GiantNumeral value="007" className="-top-10 right-[2%] hidden lg:block" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow index="007" label={t.eyebrow} className="mb-10" />
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading
              className="mb-16 md:mb-20"
              title={
                <span id="process-heading">
                  {t.titleA} <span className="text-primary">{t.titleB}</span>
                </span>
              }
            />
          </Reveal>

          {/* Editorial numbered row-list */}
          <ol className="border-b border-foreground/10">
            {steps.map((step, index) => (
              <Reveal key={step.number} as="li" delay={index * 0.1} className="border-t border-foreground/10">
                <Link
                  to={pagePath("process", lang)}
                  className="group grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-4 rounded-2xl px-2 py-10 transition-colors duration-500 hover:bg-accent/10 md:grid-cols-[7rem_auto_1fr_auto] md:items-center md:gap-x-10 md:px-6 md:py-12"
                >
                  {/* Big zero-padded numeral */}
                  <span
                    aria-hidden="true"
                    className="font-heading text-5xl leading-none text-foreground/15 transition-colors duration-500 group-hover:text-performance md:text-7xl"
                  >
                    {step.number.padStart(2, "0")}
                  </span>

                  {/* Icon chip */}
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-foreground/10 bg-card transition-colors duration-500 group-hover:border-performance/30 md:h-14 md:w-14">
                    <step.icon className="h-5 w-5 text-performance md:h-6 md:w-6" aria-hidden="true" />
                  </span>

                  {/* Title + description */}
                  <span className="col-span-2 md:col-span-1">
                    <h3 className="font-heading text-2xl leading-tight text-foreground transition-colors duration-300 group-hover:text-performance md:text-3xl">
                      {step.title[lang]}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-stone md:text-base">
                      {step.description[lang]}
                    </p>
                  </span>

                  {/* Hover arrow */}
                  <span className="hidden md:block">
                    <ArrowUpRight className="h-7 w-7 text-performance opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
