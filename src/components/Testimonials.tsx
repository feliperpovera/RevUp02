import { Quote } from "lucide-react";

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
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Client <span className="text-accent">Success Stories</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Real results from real partnerships
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-8 relative"
            >
              <Quote className="w-12 h-12 text-accent/20 absolute top-6 right-6" />
              
              <p className="text-lg text-foreground/80 leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </p>
              
              <div className="border-t border-border/30 pt-4">
                <div className="font-semibold text-foreground">{testimonial.author}</div>
                <div className="text-sm text-accent">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
