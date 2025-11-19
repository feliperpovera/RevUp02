import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-24 md:py-32 bg-gradient-to-b from-background to-graphite">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 text-center">
              About <span className="text-accent">RevUp</span>
            </h1>
            
            <div className="space-y-8 text-base md:text-lg text-foreground/80 leading-relaxed">
              <p>
                RevUp Agency Group is a results-driven digital marketing agency built for the modern business landscape. We combine AI technology, data-driven strategy, and intelligent web development to help brands grow smarter and faster.
              </p>
              
              <p>
                Founded with the vision of making digital marketing more accessible and effective, we specialize in media buying and web development, combining smart technology and human insight to deliver measurable results.
              </p>
              
              <div className="bg-graphite/50 p-6 md:p-8 rounded-xl my-8">
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-accent">
                  What Sets Us Apart
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl">•</span>
                    <span><strong>Data-Driven Approach:</strong> Every decision is backed by analytics and insights, ensuring your marketing budget works harder and smarter.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl">•</span>
                    <span><strong>AI Integration:</strong> We leverage cutting-edge AI tools to optimize campaigns, automate workflows, and scale your business efficiently.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl">•</span>
                    <span><strong>Full-Stack Solutions:</strong> From ad campaigns to website development, we provide end-to-end services that work seamlessly together.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl">•</span>
                    <span><strong>Transparency:</strong> You'll always know where your money is going and what results it's generating through clear reporting and regular communication.</span>
                  </li>
                </ul>
              </div>

              <p>
                Our goal is to make digital growth simple, transparent, and accessible for businesses of all sizes. Whether you're a startup looking to establish your online presence or an established business ready to scale, RevUp is your partner for measurable, sustainable growth.
              </p>
            </div>

            <div className="text-center mt-12">
              <button 
                onClick={() => window.open('https://calendly.com/revupagencygroup-info/30min?month=2025-11', '_blank')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-11 rounded-md px-8 text-base md:text-lg py-6"
              >
                Start Growing Today
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
