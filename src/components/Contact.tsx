import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-graphite relative overflow-hidden">
      <div className="absolute inset-0 animated-dots opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Let's Work <span className="text-accent text-glow">Together</span>
            </h2>
            <p className="text-xl text-foreground/70">
              Ready to accelerate your digital growth? Get in touch with us.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 glass-card rounded-xl p-8">
            <div>
              <Input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-background/50 border-border/50 focus:border-accent"
              />
            </div>

            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-background/50 border-border/50 focus:border-accent"
              />
            </div>

            <div>
              <Input
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-accent"
              />
            </div>

            <div>
              <Textarea
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="bg-background/50 border-border/50 focus:border-accent resize-none"
              />
            </div>

            <Button type="submit" variant="glow" size="lg" className="w-full">
              Start Your Growth Journey
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
