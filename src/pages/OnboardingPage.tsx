import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OnboardingForm } from "@/components/OnboardingForm";

const OnboardingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Formulario de <span className="text-accent">Ingreso</span>
              </h1>
              <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
                Completa el siguiente formulario para comenzar tu estrategia publicitaria personalizada.
              </p>
            </div>
            <OnboardingForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OnboardingPage;
