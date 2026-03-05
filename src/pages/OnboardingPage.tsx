import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OnboardingForm } from "@/components/OnboardingForm";

const OnboardingPage = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="text-accent">Onboarding</span> Form
              </h1>
              <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
                Complete the following form to start your personalized advertising strategy.
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
