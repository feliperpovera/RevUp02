import { Navbar } from "@/components/Navbar";
import { openCalendly } from "@/config/links";
import { Footer } from "@/components/Footer";
import { Target, TrendingUp, Rocket } from "lucide-react";
import { useLang } from "@/config/i18n";

/** Card icons, in the same order as COPY[lang].values. */
const ICONS = [Target, Rocket, TrendingUp];

const COPY = {
  en: {
    title: "Our",
    titleAccent: "Strategy",
    values: [
      { title: "Purpose", text: "To empower businesses with data-driven, AI-powered systems that help them work smarter, operate more efficiently, and reach their full growth potential." },
      { title: "Mission", text: "To turn clicks into clients, ideas into high-performing websites and e-commerce stores, and marketing into measurable growth—using the perfect mix of strategy, creativity, automation, and performance-driven advertising." },
      { title: "Vision", text: "To shape the future of digital marketing by bringing together AI, data, and technology—helping businesses scale intelligently, sustainably, and with complete clarity on their results." },
    ],
    growthTitle: "How We Think About Growth",
    growth: (
      <>
        <p className="mb-4">
          Growth isn't just about spending more on ads or building a prettier website. It's about understanding your business, your customers, and the market you operate in — then using that knowledge to make strategic decisions that compound over time.
        </p>
        <p>
          Our approach combines three core pillars: <span className="text-accent font-semibold">AI-powered automation</span> to scale efficiently, <span className="text-accent font-semibold">data analytics</span> to make informed decisions, and <span className="text-accent font-semibold">strategic execution</span> to deliver consistent results.
        </p>
      </>
    ),
    dataTitle: "Why Data Matters",
    data: "Every successful marketing campaign starts with understanding the numbers. We track everything — from customer acquisition costs to lifetime value, conversion rates to engagement metrics. This data becomes the foundation for every decision we make, ensuring your budget is allocated to what actually works.",
    aiTitle: "The Role of AI",
    ai: "AI isn't a buzzword for us — it's a practical tool that helps us work smarter. From automating repetitive tasks to optimizing ad spend in real-time, AI enables us to do more with less and deliver better results for our clients. We integrate AI across our workflows, from campaign management to website personalization.",
    cta: "Start Your Strategy",
  },
  es: {
    title: "Nuestra",
    titleAccent: "estrategia",
    values: [
      { title: "Propósito", text: "Darles a los negocios sistemas basados en datos y potenciados por IA que les ayuden a trabajar de forma más inteligente, operar con más eficiencia y alcanzar todo su potencial de crecimiento." },
      { title: "Misión", text: "Convertir clics en clientes, ideas en sitios web y tiendas en línea de alto rendimiento, y el marketing en crecimiento medible, con la combinación ideal de estrategia, creatividad, automatización y publicidad enfocada en resultados." },
      { title: "Visión", text: "Dar forma al futuro del marketing digital uniendo IA, datos y tecnología, para ayudar a los negocios a crecer de manera inteligente, sostenible y con total claridad sobre sus resultados." },
    ],
    growthTitle: "Cómo pensamos el crecimiento",
    growth: (
      <>
        <p className="mb-4">
          Crecer no es solo gastar más en anuncios o tener un sitio web más bonito. Se trata de entender tu negocio, tus clientes y el mercado en el que compites — y usar ese conocimiento para tomar decisiones estratégicas que suman resultados con el tiempo.
        </p>
        <p>
          Nuestro enfoque combina tres pilares: <span className="text-accent font-semibold">automatización con IA</span> para crecer con eficiencia, <span className="text-accent font-semibold">análisis de datos</span> para tomar decisiones informadas y <span className="text-accent font-semibold">ejecución estratégica</span> para lograr resultados consistentes.
        </p>
      </>
    ),
    dataTitle: "Por qué importan los datos",
    data: "Toda campaña de marketing exitosa empieza por entender los números. Medimos todo — desde el costo de adquisición de clientes hasta su valor de vida, desde las tasas de conversión hasta las métricas de interacción. Esos datos son la base de cada decisión que tomamos, para que tu presupuesto se invierta en lo que de verdad funciona.",
    aiTitle: "El papel de la IA",
    ai: "Para nosotros, la IA no es una palabra de moda — es una herramienta práctica que nos ayuda a trabajar de forma más inteligente. Desde automatizar tareas repetitivas hasta optimizar la inversión publicitaria en tiempo real, la IA nos permite hacer más con menos y entregar mejores resultados a nuestros clientes. Integramos la IA en todos nuestros procesos, desde la gestión de campañas hasta la personalización de sitios web.",
    cta: "Empieza tu estrategia",
  },
};


const StrategyPage = () => {
  const lang = useLang();
  const t = COPY[lang];

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <section className="py-24 md:py-32 bg-transparent relative overflow-hidden">
        <div className="absolute inset-0 animated-dots opacity-10" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-16 text-center">
              {t.title} <span className="text-accent">{t.titleAccent}</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
              {t.values.map((value, i) => {
                const Icon = ICONS[i];
                return (
                  <div key={value.title} className="glass-card p-8 rounded-xl text-center">
                    <div className="inline-block p-4 rounded-full bg-accent/10 mb-6">
                      <Icon className="w-12 h-12 text-accent" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-accent">
                      {value.title}
                    </h2>
                    <p className="text-foreground/80 leading-relaxed">
                      {value.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="space-y-8 text-base md:text-lg text-foreground/80 leading-relaxed">
              <div className="bg-background/50 p-6 md:p-8 rounded-xl">
                <h3 className="text-2xl font-heading font-bold mb-4 text-accent">
                  {t.growthTitle}
                </h3>
                {t.growth}
              </div>

              <div className="bg-background/50 p-6 md:p-8 rounded-xl">
                <h3 className="text-2xl font-heading font-bold mb-4 text-accent">
                  {t.dataTitle}
                </h3>
                <p>
                  {t.data}
                </p>
              </div>

              <div className="bg-background/50 p-6 md:p-8 rounded-xl">
                <h3 className="text-2xl font-heading font-bold mb-4 text-accent">
                  {t.aiTitle}
                </h3>
                <p>
                  {t.ai}
                </p>
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StrategyPage;
