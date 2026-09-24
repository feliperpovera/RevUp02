import { Navbar } from "@/components/Navbar";
import { goToForm } from "@/config/links";
import { Footer } from "@/components/Footer";
import { Search, Map, Rocket, TrendingUp } from "lucide-react";
import { useLang } from "@/config/i18n";

/** Step icons, in the same order as COPY[lang].steps. */
const ICONS = [Search, Map, Rocket, TrendingUp];

const COPY = {
  en: {
    title: "Our",
    titleAccent: "Process",
    subtitle: "From strategy to scale — a clear path to measurable growth",
    steps: [
      {
        title: "Understand your Business",
        text: "We start with a strategy call to understand your business, goals, and audience. This step ensures every action we take is aligned with your vision and built around your growth objectives.",
        label: "What we cover:",
        detail: "Business model, target audience, current challenges, growth goals, competitive landscape, and success metrics.",
      },
      {
        title: "Strategy & Roadmap",
        text: "Next, we create a tailored plan that connects all key areas — advertising, web, email, and funnels. You'll receive a clear roadmap outlining timelines, tools, and deliverables so you know exactly what to expect.",
        label: "What you get:",
        detail: "Detailed project timeline, budget breakdown, platform recommendations, content strategy, and KPIs we'll track.",
      },
      {
        title: "Build & Launch",
        text: "Once the strategy is approved, our team gets to work — launching ad campaigns, designing or optimizing your website/store and setting up automations.",
        label: "What happens:",
        detail: "Campaign setup, creative development, website implementation, tracking configuration, and quality assurance testing before launch.",
      },
      {
        title: "Optimize & Scale",
        text: "After launch, we continually monitor and refine your campaigns and systems using data and AI insights. We test, tweak, and improve performance to help you scale efficiently and exceed your growth goals.",
        label: "Ongoing work:",
        detail: "Performance analysis, A/B testing, budget reallocation, creative refresh, conversion rate optimization, and monthly reporting.",
      },
    ],
    cta: "Let's Discuss Your Growth",
  },
  es: {
    title: "Nuestro",
    titleAccent: "proceso",
    subtitle: "De la estrategia al crecimiento — un camino claro hacia resultados medibles",
    steps: [
      {
        title: "Entendemos tu negocio",
        text: "Empezamos con una llamada de estrategia para entender tu negocio, tus metas y tu público. Así nos aseguramos de que cada acción esté alineada con tu visión y construida alrededor de tus objetivos de crecimiento.",
        label: "Qué revisamos:",
        detail: "Modelo de negocio, público objetivo, retos actuales, metas de crecimiento, panorama de la competencia y métricas de éxito.",
      },
      {
        title: "Estrategia y hoja de ruta",
        text: "Luego creamos un plan a la medida que conecta todas las áreas clave — publicidad, web, email y embudos. Recibirás una hoja de ruta clara con tiempos, herramientas y entregables, para que sepas exactamente qué esperar.",
        label: "Qué recibes:",
        detail: "Cronograma detallado del proyecto, desglose del presupuesto, recomendaciones de plataformas, estrategia de contenido y los KPIs que vamos a medir.",
      },
      {
        title: "Construcción y lanzamiento",
        text: "Una vez aprobada la estrategia, nuestro equipo se pone manos a la obra — lanzamos campañas publicitarias, diseñamos u optimizamos tu sitio web o tienda y configuramos automatizaciones.",
        label: "Qué hacemos:",
        detail: "Configuración de campañas, desarrollo creativo, implementación del sitio web, configuración de la medición y pruebas de calidad antes del lanzamiento.",
      },
      {
        title: "Optimización y crecimiento",
        text: "Después del lanzamiento, monitoreamos y afinamos tus campañas y sistemas de forma continua con datos e insights de IA. Probamos, ajustamos y mejoramos el rendimiento para ayudarte a crecer con eficiencia y superar tus metas de crecimiento.",
        label: "Trabajo continuo:",
        detail: "Análisis de rendimiento, pruebas A/B, redistribución del presupuesto, renovación de creativos, optimización de la tasa de conversión y reportes mensuales.",
      },
    ],
    cta: "Hablemos de tu crecimiento",
  },
};


const ProcessPage = () => {
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
              {t.steps.map((step, i) => {
                const Icon = ICONS[i];
                return (
                  <div key={step.title} className="glass-card p-8 md:p-12 rounded-xl relative">
                    <div className="absolute top-4 right-4 text-6xl md:text-7xl font-bold text-accent/10">
                      {i + 1}
                    </div>
                    <div className="flex items-start gap-6">
                      <div className="p-4 rounded-lg bg-accent/10">
                        <Icon className="w-10 h-10 md:w-12 md:h-12 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                          {step.title}
                        </h2>
                        <p className="text-foreground/70 mb-6 leading-relaxed">
                          {step.text}
                        </p>
                        <div className="bg-background/50 p-4 rounded-lg">
                          <p className="text-sm text-foreground/60">
                            <strong>{step.label}</strong> {step.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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

export default ProcessPage;
