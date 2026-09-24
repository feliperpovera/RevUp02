import { Link } from "react-router-dom";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BrandCard, Eyebrow, Reveal, SectionHeading } from "@/components/brand/kit";
import { goToForm, WHATSAPP_URL } from "@/config/links";
import servicePages from "@/config/service-pages.json";
import { pagePath } from "@/config/i18n";
import { PricingPlans, type PlanId } from "@/components/PricingPlans";

export type ServicePage = (typeof servicePages)[number];

const CORNERS = ["tl", "tr", "bl", "br"] as const;

const LABELS = {
  en: {
    home: "Home", services: "Services", bookCall: "Book a Meeting", whatsapp: "Chat on WhatsApp",
    why: ["Why it ", "works"], included: ["What's ", "included"], how: ["How we ", "work"],
    industries: ["Industries we ", "serve"], small: "For small businesses", large: "For large brands",
    faq: ["Frequently asked ", "questions"], ctaTitle: "Ready to grow with", ctaText: "Book a free, no-pressure meeting and get an honest plan for your business.",
    others: "Other services",
    plans: ["Plans & ", "pricing"], plansLede: "Transparent monthly pricing. Start with one service or get the complete SEO + SEM package.", allPlans: "See all plans",
  },
  es: {
    home: "Inicio", services: "Servicios", bookCall: "Agenda una reunión", whatsapp: "Escríbenos por WhatsApp",
    why: ["Por qué ", "funciona"], included: ["Qué ", "incluye"], how: ["Cómo ", "trabajamos"],
    industries: ["Industrias que ", "atendemos"], small: "Para negocios pequeños", large: "Para empresas grandes",
    faq: ["Preguntas ", "frecuentes"], ctaTitle: "¿Listo para crecer con", ctaText: "Agenda una reunión gratis, sin compromiso, y recibe un plan honesto para tu negocio.",
    others: "Otros servicios",
    plans: ["Planes y ", "precios"], plansLede: "Precios mensuales claros. Empieza con un servicio o toma el paquete completo SEO + SEM.", allPlans: "Ver todos los planes",
  },
};

const ServiceDetailPage = ({ page }: { page: ServicePage }) => {
  const lang = "lang" in page && page.lang === "es" ? "es" : "en";
  const t = LABELS[lang];
  const industries = "industries" in page ? (page.industries as string[]) : [];
  const plans = "plans" in page ? (page.plans as PlanId[]) : [];
  const others = servicePages.filter((p) => p.path !== page.path && ("lang" in p ? p.lang : "en") === lang);

  return (
    <div className="min-h-screen bg-transparent" lang={lang === "es" ? "es" : undefined}>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 pb-16 pt-36 md:px-8 md:pt-44">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-8 text-sm text-stone">
                <Link to={pagePath("home", lang)} className="hover:text-performance">{t.home}</Link>
                <span className="mx-2">/</span>
                <Link to={pagePath("services", lang)} className="hover:text-performance">{t.services}</Link>
                <span className="mx-2">/</span>
                <span className="text-foreground">{page.name}</span>
              </nav>
              <Eyebrow index="001" label={page.eyebrow} className="mb-8 max-w-md" />
              <h1 className="font-heading text-4xl leading-[1.05] text-foreground md:text-6xl">{page.h1}</h1>
              <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-stone md:text-xl">{page.intro}</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  onClick={goToForm}
                  className="group h-14 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  {t.bookCall}
                  <ArrowUpRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-foreground/20 px-8 text-base">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {t.whatsapp}
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Why it works */}
        <section className="container mx-auto px-4 py-12 md:px-8">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionHeading title={<>{t.why[0]}<span className="text-primary">{t.why[1]}</span></>} />
              <div className="mt-6 max-w-3xl space-y-5 text-base font-light leading-relaxed text-stone md:text-lg">
                {page.why.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* What's included */}
        <section className="container mx-auto px-4 py-16 md:px-8">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionHeading title={<>{t.included[0]}<span className="text-primary">{t.included[1]}</span></>} className="mb-10" />
            </Reveal>
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {page.included.map((item, i) => (
                <Reveal as="li" key={item.title} delay={(i % 2) * 0.08}>
                  <BrandCard corner={CORNERS[i % 4]} className="h-full">
                    <div className="flex items-start gap-4">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent">
                        <Check className="h-3.5 w-3.5 text-accent-foreground" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-heading text-xl text-foreground">{item.title}</h3>
                        <p className="mt-2 font-light leading-relaxed text-stone">{item.text}</p>
                      </div>
                    </div>
                  </BrandCard>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section className="container mx-auto px-4 py-16 md:px-8">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionHeading title={<>{t.how[0]}<span className="text-primary">{t.how[1]}</span></>} className="mb-10" />
            </Reveal>
            <ol className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {page.process.map((step, i) => (
                <Reveal as="li" key={step.title} delay={(i % 2) * 0.08}>
                  <span className="font-heading text-5xl text-foreground/15">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-heading text-2xl text-foreground">{step.title}</h3>
                  <p className="mt-2 font-light leading-relaxed text-stone">{step.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Industries */}
        {industries.length ? (
          <section className="container mx-auto px-4 py-12 md:px-8">
            <div className="mx-auto max-w-5xl">
              <Reveal>
                <SectionHeading title={<>{t.industries[0]}<span className="text-primary">{t.industries[1]}</span></>} className="mb-8" />
                <ul className="flex flex-wrap gap-3">
                  {industries.map((industry) => (
                    <li key={industry} className="rounded-full border border-foreground/15 bg-card px-5 py-2.5 text-sm text-foreground/80">
                      {industry}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        ) : null}

        {/* Small vs large */}
        <section className="container mx-auto px-4 py-16 md:px-8">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
            <Reveal>
              <BrandCard corner="tl" className="h-full">
                <h2 className="font-heading text-2xl text-foreground">{t.small}</h2>
                <p className="mt-3 font-light leading-relaxed text-stone">{page.small}</p>
              </BrandCard>
            </Reveal>
            <Reveal delay={0.08}>
              <BrandCard corner="br" className="h-full">
                <h2 className="font-heading text-2xl text-foreground">{t.large}</h2>
                <p className="mt-3 font-light leading-relaxed text-stone">{page.large}</p>
              </BrandCard>
            </Reveal>
          </div>
        </section>

        {/* Plans & pricing */}
        {plans.length ? (
          <section className="container mx-auto px-4 py-16 md:px-8">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <SectionHeading title={<>{t.plans[0]}<span className="text-primary">{t.plans[1]}</span></>} lede={t.plansLede} className="mb-10" />
              </Reveal>
              <PricingPlans ids={plans} lang={lang} />
              <div className="mt-8 text-center">
                <Link
                  to={pagePath("pricing", lang)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-5 py-2.5 text-sm text-foreground/80 transition-colors hover:border-performance hover:text-performance"
                >
                  {t.allPlans}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        ) : null}

        {/* FAQ */}
        <section className="container mx-auto px-4 py-16 md:px-8">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionHeading title={<>{t.faq[0]}<span className="text-primary">{t.faq[1]}</span></>} className="mb-8" />
            </Reveal>
            <div className="divide-y divide-foreground/10 border-y border-foreground/10">
              {page.faqs.map((faq) => (
                <details key={faq.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg text-foreground md:text-xl">
                    <h3>{faq.q}</h3>
                    <span className="text-2xl text-performance transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-3 max-w-3xl font-light leading-relaxed text-stone">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + other services */}
        <section className="container mx-auto px-4 pb-24 pt-8 md:px-8">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-graphite p-8 md:flex-row md:items-center md:p-10">
                <div>
                  <p className="font-heading text-3xl leading-tight text-cream md:text-4xl">{t.ctaTitle} {page.eyebrow}?</p>
                  <p className="mt-2 text-cream/70">{t.ctaText}</p>
                </div>
                <Button
                  size="lg"
                  onClick={goToForm}
                  className="group h-14 shrink-0 rounded-full bg-accent px-8 text-base font-semibold text-graphite hover:bg-accent/90"
                >
                  {t.bookCall}
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Reveal>

            <nav aria-label="Other services" className="mt-14">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-stone">{t.others}</p>
              <ul className="flex flex-wrap gap-3">
                {others.map((p) => (
                  <li key={p.path}>
                    <Link
                      to={p.path}
                      className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-5 py-2.5 text-sm text-foreground/80 transition-colors hover:border-performance hover:text-performance"
                    >
                      {p.name}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
