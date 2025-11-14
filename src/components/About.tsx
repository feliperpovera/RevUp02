export const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-background to-graphite" aria-labelledby="about-heading">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 id="about-heading" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 md:mb-8 text-center">
            <span className="text-accent">Strategy</span>
          </h2>
          
          <div className="space-y-4 md:space-y-6 text-base md:text-lg text-foreground/80 leading-relaxed px-4">
            <p>
              RevUp is a <strong>digital marketing agency</strong> specializing in data-driven strategies for businesses across the United States. We help companies achieve sustainable growth through expert <strong>paid media management</strong> and intelligent <strong>web development solutions</strong>.
            </p>
            
            <p>
              Our expertise spans <strong>Google Ads management</strong>, <strong>Meta advertising</strong> (Facebook & Instagram), <strong>TikTok marketing</strong>, and custom <strong>Shopify development</strong>. We combine cutting-edge AI technology with proven marketing strategies to deliver measurable ROI for your business.
            </p>
            
            <p>
              Our mission is to make <strong>digital marketing success</strong> simple, transparent, and accessible for businesses of all sizes—from startups to established enterprises looking to scale their online presence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
