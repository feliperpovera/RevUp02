import { Quote } from "lucide-react";
import { CirclesDecor, AsteriskDecor } from "./decorative/GeometricShapes";

const testimonials = [
  {
    quote: "We had no idea what Google Ads was or how it worked. They took over and exceeded all expectations—our site got tons of traffic, sales went up, and ROI was quick and impressive.",
    author: "Ian Greenberg",
    role: "Owner",
  },
  {
    quote: "Before working with this team, our Google Ads campaigns were going nowhere. In just a short time, they completely turned things around—our traffic and sales increased significantly.",
    author: "Laura Castro",
    role: "Marketing Director",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <CirclesDecor className="absolute top-10 right-20 opacity-20 animate-pulse" />
      <AsteriskDecor className="absolute bottom-10 left-20 opacity-20" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 md:mb-4">
            Client <span className="text-accent">Success Stories</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto px-4">
            Real results from real partnerships
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-6 md:p-8 relative"
            >
              <Quote className="w-10 h-10 md:w-12 md:h-12 text-accent/20 absolute top-4 md:top-6 right-4 md:right-6" />
              
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-4 md:mb-6 relative z-10 pr-8">
                "{testimonial.quote}"
              </p>
              
              <div className="border-t border-border/30 pt-3 md:pt-4">
                <div className="font-semibold text-foreground text-sm md:text-base">{testimonial.author}</div>
                <div className="text-xs md:text-sm text-accent">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
