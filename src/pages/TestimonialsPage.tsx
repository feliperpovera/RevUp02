import { Navbar } from "@/components/Navbar";
import { goToForm } from "@/config/links";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { useLang } from "@/config/i18n";

const COPY = {
  en: {
    h1: "RevUp client results and case studies",
    title: (
      <>
        Ready to Write Your <span className="text-accent">Success Story?</span>
      </>
    ),
    text: "Join the growing list of businesses that have transformed their digital presence and achieved measurable growth with RevUp.",
    cta: "Start Your Journey",
  },
  es: {
    h1: "Resultados y casos de éxito de clientes de RevUp",
    title: (
      <>
        ¿Quieres escribir tu <span className="text-accent">historia de éxito?</span>
      </>
    ),
    text: "Súmate a la creciente lista de negocios que transformaron su presencia digital y lograron un crecimiento medible con RevUp.",
    cta: "Da el primer paso",
  },
};

const TestimonialsPage = () => {
  const lang = useLang();
  const t = COPY[lang];

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <section className="pt-32 pb-16 bg-transparent">
        <h1 className="sr-only">{t.h1}</h1>
        <Testimonials />

        <div className="container mx-auto px-4 md:px-6 mt-16">
          <div className="max-w-3xl mx-auto futuristic-card p-8 md:p-12 rounded-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              {t.title}
            </h2>
            <p className="text-foreground/60 mb-6 max-w-2xl mx-auto">
              {t.text}
            </p>
            <Button
              onClick={goToForm}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-8 py-6 text-base"
            >
              {t.cta}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TestimonialsPage;
