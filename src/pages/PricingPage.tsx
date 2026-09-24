import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Eyebrow, Reveal, SectionHeading } from "@/components/brand/kit";
import { PricingPlans } from "@/components/PricingPlans";
import { useLang } from "@/config/i18n";
import { goToForm, whatsappUrl } from "@/config/links";

const COPY = {
  en: {
    eyebrow: "Plans & Pricing",
    h1: ["Simple plans. ", "Real growth."],
    intro:
      "Clear monthly pricing for SEO and paid ads. Start with one service or get the complete SEO + SEM package — built for service businesses that want more calls, leads and booked jobs.",
    packages: ["SEO + SEM ", "packages"],
    packagesLede: "Organic and paid search working together: ads bring calls now while SEO builds traffic you don't pay for per click.",
    ads: ["Ads ", "management"],
    adsLede: "One platform or all of them. Managing two or more? All-Platform Ads costs less than two separate plans.",
    how: ["How it ", "works"],
    steps: [
      { title: "Free call", text: "We look at your business, your market and your goals, and recommend the plan that fits." },
      { title: "Launch", text: "We set up tracking, campaigns and your SEO foundations so every call and lead is measured." },
      { title: "Grow", text: "We optimize every week and send you a clear monthly report of calls, leads and results." },
    ],
    faq: ["Common ", "questions"],
    faqs: [
      { q: "Is ad spend included in the price?", a: "No. Your ad budget is paid directly to Google, Meta or TikTok, so you see exactly where every dollar goes. Our fee covers strategy, setup and management." },
      { q: "What is the one-time SEO launch?", a: "It's the initial SEO work: auditing your website and competitors, keyword research by service and city, optimizing your Google Business Profile and your main pages, and fixing your business listings. After that, the monthly plan keeps improving your rankings." },
      { q: "Can I choose which ad platforms to use?", a: "Yes. Each platform can be hired on its own, and All-Platform Ads covers any combination of Google, Meta and TikTok for one monthly fee." },
      { q: "Can I start small and add services later?", a: "Yes. You can start with one service, like Local SEO or Google Ads, and add more as results come in." },
      { q: "How soon will I see results?", a: "Paid ads can bring calls in the first weeks. SEO builds over time and usually takes a few months to show strong results. We report on both every month." },
    ],
    ctaTitle: "Not sure which plan fits?",
    ctaText: "Tell us about your business and we'll recommend the right plan — no pressure.",
    whatsapp: "Ask on WhatsApp",
    whatsappMessage: "Hi RevUp! I'd like help choosing a plan for my business.",
    call: "Book a Meeting",
  },
  es: {
    eyebrow: "Planes y precios",
    h1: ["Planes simples. ", "Crecimiento real."],
    intro:
      "Precios mensuales claros para SEO y anuncios. Empieza con un servicio o toma el paquete completo SEO + SEM — hecho para negocios de servicios que quieren más llamadas, clientes y trabajos agendados.",
    packages: ["Paquetes ", "SEO + SEM"],
    packagesLede: "Búsqueda orgánica y pagada trabajando juntas: los anuncios traen llamadas ya mientras el SEO construye tráfico por el que no pagas cada clic.",
    ads: ["Administración de ", "anuncios"],
    adsLede: "Una plataforma o todas. ¿Vas a manejar dos o más? Todas las plataformas cuesta menos que dos planes por separado.",
    how: ["Cómo ", "funciona"],
    steps: [
      { title: "Llamada gratis", text: "Revisamos tu negocio, tu mercado y tus metas, y te recomendamos el plan indicado." },
      { title: "Lanzamiento", text: "Configuramos la medición, las campañas y las bases de tu SEO para medir cada llamada y cada cliente." },
      { title: "Crecimiento", text: "Optimizamos cada semana y te enviamos un reporte mensual claro de llamadas, clientes y resultados." },
    ],
    faq: ["Preguntas ", "frecuentes"],
    faqs: [
      { q: "¿La inversión en anuncios está incluida?", a: "No. Tu presupuesto de anuncios se paga directo a Google, Meta o TikTok, así ves exactamente a dónde va cada dólar. Nuestra tarifa cubre estrategia, configuración y administración." },
      { q: "¿Qué es el arranque SEO de pago único?", a: "Es el trabajo inicial de SEO: auditoría de tu web y tu competencia, palabras clave por servicio y ciudad, optimización de tu Perfil de Empresa en Google y de tus páginas principales, y corrección de tus directorios. Después, el plan mensual sigue mejorando tus posiciones." },
      { q: "¿Puedo elegir en qué plataformas anunciar?", a: "Sí. Cada plataforma se puede contratar sola, y Todas las plataformas cubre cualquier combinación de Google, Meta y TikTok por una sola tarifa mensual." },
      { q: "¿Puedo empezar con poco y agregar servicios después?", a: "Sí. Puedes empezar con un servicio, como SEO Local o Google Ads, y agregar más a medida que llegan los resultados." },
      { q: "¿Cuándo veré resultados?", a: "Los anuncios pueden traer llamadas desde las primeras semanas. El SEO crece con el tiempo y normalmente toma algunos meses en mostrar resultados fuertes. Te reportamos ambos cada mes." },
    ],
    ctaTitle: "¿No sabes qué plan elegir?",
    ctaText: "Cuéntanos de tu negocio y te recomendamos el plan indicado — sin compromiso.",
    whatsapp: "Pregúntanos por WhatsApp",
    whatsappMessage: "¡Hola RevUp! Quiero ayuda para elegir un plan para mi negocio.",
    call: "Agenda una reunión",
  },
};

const PricingPage = () => {
  const lang = useLang();
  const t = COPY[lang];

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <main>
        <section className="container mx-auto px-4 pb-12 pt-36 md:px-8 md:pt-44">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Eyebrow index="001" label={t.eyebrow} className="mb-8 max-w-md" />
              <h1 className="font-heading text-4xl leading-[1.05] text-foreground md:text-6xl">
                {t.h1[0]}
                <span className="text-primary">{t.h1[1]}</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-stone md:text-xl">{t.intro}</p>
            </Reveal>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionHeading title={<>{t.packages[0]}<span className="text-primary">{t.packages[1]}</span></>} lede={t.packagesLede} className="mb-10" />
            </Reveal>
            <PricingPlans ids={["seo", "search", "complete"]} lang={lang} learnMore />
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionHeading title={<>{t.ads[0]}<span className="text-primary">{t.ads[1]}</span></>} lede={t.adsLede} className="mb-10" />
            </Reveal>
            <PricingPlans ids={["google", "meta", "tiktok", "all-ads"]} lang={lang} learnMore />
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 md:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionHeading title={<>{t.how[0]}<span className="text-primary">{t.how[1]}</span></>} className="mb-10" />
            </Reveal>
            <ol className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {t.steps.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 0.08}>
                  <span className="font-heading text-5xl text-foreground/15">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-heading text-2xl text-foreground">{step.title}</h3>
                  <p className="mt-2 font-light leading-relaxed text-stone">{step.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 md:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionHeading title={<>{t.faq[0]}<span className="text-primary">{t.faq[1]}</span></>} className="mb-8" />
            </Reveal>
            <div className="divide-y divide-foreground/10 border-y border-foreground/10">
              {t.faqs.map((faq) => (
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

        <section className="container mx-auto px-4 pb-24 pt-8 md:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-graphite p-8 md:flex-row md:items-center md:p-10">
                <div>
                  <p className="font-heading text-3xl leading-tight text-cream md:text-4xl">{t.ctaTitle}</p>
                  <p className="mt-2 text-cream/70">{t.ctaText}</p>
                </div>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="h-14 rounded-full bg-accent px-8 text-base font-semibold text-graphite hover:bg-accent/90">
                    <a href={whatsappUrl(t.whatsappMessage)} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      {t.whatsapp}
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={goToForm}
                    className="h-14 rounded-full border-cream/30 bg-transparent px-8 text-base text-cream hover:bg-cream/10 hover:text-cream"
                  >
                    {t.call}
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
