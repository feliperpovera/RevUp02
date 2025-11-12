export const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-background to-graphite">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 md:mb-8 text-center">
            About <span className="text-accent">RevUp</span>
          </h2>
          
          <div className="space-y-4 md:space-y-6 text-base md:text-lg text-foreground/80 leading-relaxed px-4">
            <p>
              RevUp is a digital marketing agency that helps businesses grow through data-driven strategies.
            </p>
            
            <p>
              We specialize in media buying and web development, combining smart technology and human insight to deliver measurable results.
            </p>
            
            <p>
              Our goal is to make digital growth simple, transparent, and accessible for businesses of all sizes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
