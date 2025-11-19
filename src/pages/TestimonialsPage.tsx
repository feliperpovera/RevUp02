import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { Quote } from "lucide-react";

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <Quote className="w-16 h-16 text-accent mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                Client <span className="text-accent">Success Stories</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
                Real results from real businesses. See how we've helped companies grow their revenue and scale their operations.
              </p>
            </div>

            <Testimonials />

            <div className="mt-16 bg-graphite/50 p-8 md:p-12 rounded-xl text-center">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
                Join the growing list of businesses that have transformed their digital presence and achieved measurable growth with RevUp.
              </p>
              <button 
                onClick={() => window.open('https://calendly.com/revupagencygroup-info/30min?month=2025-11', '_blank')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-11 rounded-md px-8 text-base md:text-lg py-6"
              >
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
