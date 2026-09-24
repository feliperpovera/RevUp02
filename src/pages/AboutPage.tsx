import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { openCalendly } from "@/config/links";
import { Footer } from "@/components/Footer";
import { usd, type PlanId } from "@/components/PricingPlans";
import pricing from "@/config/pricing.json";
import { localizePath, pagePath, useLang, type Lang } from "@/config/i18n";

const PRICE_GROUPS: { title: Record<Lang, string>; ids: PlanId[] }[] = [
  { title: { en: "SEO + SEM packages", es: "Paquetes SEO + SEM" }, ids: ["seo", "search", "complete"] },
  { title: { en: "Ads management", es: "Administración de anuncios" }, ids: ["google", "meta", "tiktok", "all-ads"] },
];

const COPY = {
  en: {
    pricing: "Plans & pricing",
    badge: "Full package",
    mo: "/mo",
    setup: (n: string) => `+ ${n} one-time SEO launch`,
    setupSave: (n: string) => `${n} off the SEO launch`,
    save: (n: string) => `Save ${n}/mo`,
    adSpend: "Ad spend is paid directly to Google, Meta or TikTok and is not included.",
    seePlans: "See what each plan includes",
    about: "About",
    intro: (
      <>
        <p>
          RevUp is a <strong>modern digital marketing and automation agency</strong> helping businesses grow smarter and faster through data-driven strategy and AI-powered solutions. We specialize in <strong>Google Ads</strong>, <strong>Meta advertising</strong>, <strong>TikTok marketing</strong>, high-performance <strong>Shopify and website development</strong>, and custom <strong>automations</strong> that streamline operations and boost efficiency.
        </p>

        <p>
          What sets us apart is our ability to blend <strong>AI</strong>, <strong>data</strong>, and <strong>performance marketing</strong> into one unified growth engine. Whether we're building your online presence, running your ads, or automating your workflows, our goal is simple: deliver measurable results, reduce workload, and make digital growth accessible to businesses of all sizes.
        </p>
      </>
    ),
    values: [
      { title: "Purpose", text: "To empower businesses with data-driven, AI-powered systems that help them work smarter, operate more efficiently, and reach their full growth potential." },
      { title: "Mission", text: "To turn clicks into clients, ideas into high-performing websites and e-commerce stores, and marketing into measurable growth—using the perfect mix of strategy, creativity, automation, and performance-driven advertising." },
      { title: "Vision", text: "To shape the future of digital marketing by bringing together AI, data, and technology—helping businesses scale intelligently, sustainably, and with complete clarity on their results." },
    ],
    cta: "Start Growing Today",
  },
  es: {
    pricing: "Planes y precios",
    badge: "Paquete completo",
    mo: "/mes",
    setup: (n: string) => `+ ${n} pago único de arranque SEO`,
    setupSave: (n: string) => `${n} menos en el arranque SEO`,
    save: (n: string) => `Ahorras ${n}/mes`,
    adSpend: "La inversión en anuncios se paga directo a Google, Meta o TikTok y no está incluida.",
    seePlans: "Mira qué incluye cada plan",
    about: "Sobre",
    intro: (
      <>
        <p>
          RevUp es una <strong>agencia moderna de marketing digital y automatización</strong> que ayuda a los negocios a crecer de forma más inteligente y rápida con estrategias basadas en datos y soluciones con IA. Nos especializamos en <strong>Google Ads</strong>, <strong>publicidad en Meta</strong>, <strong>marketing en TikTok</strong>, <strong>desarrollo de sitios web y tiendas Shopify</strong> de alto rendimiento y <strong>automatizaciones</strong> a la medida que simplifican tu operación y aumentan la eficiencia.
        </p>

        <p>
          Lo que nos diferencia es nuestra capacidad de unir <strong>IA</strong>, <strong>datos</strong> y <strong>marketing de resultados</strong> en un solo motor de crecimiento. Ya sea que estemos construyendo tu presencia en línea, manejando tus anuncios o automatizando tus procesos, nuestro objetivo es simple: lograr resultados medibles, reducir tu carga de trabajo y poner el crecimiento digital al alcance de negocios de todos los tamaños.
        </p>
      </>
    ),
    values: [
      { title: "Propósito", text: "Darles a los negocios sistemas basados en datos y potenciados por IA que les ayuden a trabajar de forma más inteligente, operar con más eficiencia y alcanzar todo su potencial de crecimiento." },
      { title: "Misión", text: "Convertir clics en clientes, ideas en sitios web y tiendas en línea de alto rendimiento, y el marketing en crecimiento medible, con la combinación ideal de estrategia, creatividad, automatización y publicidad enfocada en resultados." },
      { title: "Visión", text: "Dar forma al futuro del marketing digital uniendo IA, datos y tecnología, para ayudar a los negocios a crecer de manera inteligente, sostenible y con total claridad sobre sus resultados." },
    ],
    cta: "Empieza a crecer hoy",
  },
};

/** Low-key price list, collapsed by default. Share revupagencygroup.com/about#pricing (or /es/nosotros#pricing) to open it directly. */
const PricingSummary = ({ lang }: { lang: Lang }) => {
  const t = COPY[lang];
  const { hash } = useLocation();
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (hash === "#pricing" && ref.current) {
      ref.current.open = true;
      ref.current.scrollIntoView({ block: "start" });
    }
  }, [hash]);

  return (
    <details ref={ref} id="pricing" className="group mt-16 scroll-mt-28 border-t border-foreground/10 pt-6">
      <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-1.5 text-sm text-stone transition-colors hover:text-performance">
        {t.pricing}
        <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
      </summary>

      <div className="mt-8 space-y-10">
        {PRICE_GROUPS.map((group) => (
          <div key={group.title.en}>
            <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-stone">{group.title[lang]}</h2>
            <ul className="divide-y divide-foreground/10 rounded-2xl border border-foreground/10 bg-card">
              {group.ids.map((id) => {
                const plan = pricing.plans.find((p) => p.id === id);
                if (!plan) return null;
                const saving = "compareAt" in plan && plan.compareAt ? plan.compareAt - plan.price : 0;
                const setupSaving = "setupCompareAt" in plan && plan.setupCompareAt && plan.setup ? plan.setupCompareAt - plan.setup : 0;
                return (
                  <li key={id} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div>
                      <Link to={localizePath(plan.href, lang)} className="font-heading text-lg text-foreground hover:text-performance">
                        {plan[lang].name}
                      </Link>
                      {plan.badge === "complete" ? (
                        <span className="ml-2 rounded-full bg-accent px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wider text-graphite">
                          {t.badge}
                        </span>
                      ) : null}
                      <p className="mt-1 text-sm leading-relaxed text-stone">{plan[lang].tagline}</p>
                    </div>
                    <div className="shrink-0 sm:text-right">
                      <p className="font-heading text-2xl text-foreground">
                        {usd(plan.price)}
                        <span className="font-sans text-sm text-stone">{t.mo}</span>
                      </p>
                      {"setup" in plan && plan.setup ? (
                        <p className="text-xs text-stone">{t.setup(usd(plan.setup))}</p>
                      ) : null}
                      {setupSaving ? <p className="text-xs font-medium text-performance">{t.setupSave(usd(setupSaving))}</p> : null}
                      {saving ? <p className="text-xs font-medium text-performance">{t.save(usd(saving))}</p> : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <p className="text-center text-xs text-stone">
          {t.adSpend}{" "}
          <Link to={pagePath("pricing", lang)} className="text-performance underline-offset-4 hover:underline">
            {t.seePlans}
          </Link>
        </p>
      </div>
    </details>
  );
};

const AboutPage = () => {
  const lang = useLang();
  const t = COPY[lang];

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <section className="py-24 md:py-32 bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 text-center">
              {t.about} <span className="text-accent">RevUp</span>
            </h1>

            <div className="space-y-8 text-base md:text-lg text-foreground/80 leading-relaxed">
              {t.intro}

              <div className="space-y-8 mt-12">
                {t.values.map(({ title, text }) => (
                  <div key={title} className="bg-graphite/50 p-6 md:p-8 rounded-xl space-y-3">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-accent">
                      {title}
                    </h2>
                    <p>
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => openCalendly()}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-11 rounded-md px-8 text-base md:text-lg py-6"
              >
                {t.cta}
              </button>
            </div>

            <PricingSummary lang={lang} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
