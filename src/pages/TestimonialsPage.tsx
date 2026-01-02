import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/button";

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-background">
        <Testimonials />

        <div className="container mx-auto px-4 md:px-6 mt-16">
          <div className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl text-center border border-border/30">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Ready to Write Your <span className="text-accent">Success Story?</span>
            </h2>
            <p className="text-foreground/60 mb-6 max-w-2xl mx-auto">
              Join the growing list of businesses that have transformed their digital presence and achieved measurable growth with RevUp.
            </p>
            <Button 
              onClick={() => window.open('https://calendly.com/revupagencygroup-info/30min?month=2025-11', '_blank')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-8 py-6 text-base"
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
