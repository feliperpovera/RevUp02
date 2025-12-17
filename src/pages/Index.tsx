import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Vision } from "@/components/Vision";
import { Partners } from "@/components/Partners";
import { Services } from "@/components/Services";
import { ClientsMap } from "@/components/ClientsMap";
import { Insights } from "@/components/Insights";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Partners />
      <Testimonials />
      <Services />
      <ClientsMap />
      <Vision />
      <Insights />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
