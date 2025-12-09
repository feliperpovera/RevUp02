import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "We had no idea what Google Ads was or how it worked. They took over and exceeded all expectations—our site got tons of traffic, sales went up, and ROI was quick and impressive.",
    author: "Ian Greenberg",
    role: "Business Owner",
    rating: 5
  },
  {
    quote: "Before working with this team, our Google Ads campaigns were going nowhere. In just a short time, they completely turned things around—our traffic and sales increased significantly.",
    author: "Laura Castro",
    role: "Marketing Director",
    rating: 5
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background relative overflow-hidden" aria-labelledby="testimonials-heading">
      {/* Animated background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-1/3 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse-glow floating-orb" />
      <div className="absolute bottom-1/3 right-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-pulse-glow floating-orb" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <header className="text-center mb-10 md:mb-16">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 md:mb-4 opacity-0 animate-fade-in">
            Client <span className="text-accent gradient-text">Success Stories</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto px-4 opacity-0 animate-fade-in stagger-1">
            Real results from businesses that trust our digital marketing expertise
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="futuristic-card rounded-xl p-6 md:p-8 relative opacity-0 animate-slide-up group"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
              itemScope
              itemType="https://schema.org/Review"
            >
              <Quote className="w-10 h-10 md:w-12 md:h-12 text-accent/20 absolute top-4 md:top-6 right-4 md:right-6 group-hover:text-accent/40 transition-colors duration-500" aria-hidden="true" />
              
              <p itemProp="reviewBody" className="text-base md:text-lg text-foreground/80 leading-relaxed mb-4 md:mb-6 relative z-10 pr-8">
                &quot;{testimonial.quote}&quot;
              </p>
              
              <div className="border-t border-accent/20 pt-3 md:pt-4" itemProp="author" itemScope itemType="https://schema.org/Person">
                <div className="font-semibold text-foreground text-sm md:text-base group-hover:text-accent transition-colors duration-300" itemProp="name">{testimonial.author}</div>
                <div className="text-xs md:text-sm text-accent/80" itemProp="jobTitle">{testimonial.role}</div>
                <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
