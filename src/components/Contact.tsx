import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.name.length > 100) {
      toast.error("Name must be less than 100 characters");
      return;
    }

    if (formData.message.length > 1000) {
      toast.error("Message must be less than 1000 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: formData.company.trim(),
          message: formData.message.trim(),
        },
      });

      if (error) throw error;

      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-graphite relative overflow-hidden" aria-labelledby="contact-heading">
      <div className="absolute inset-0 animated-dots opacity-10" aria-hidden="true" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <header className="text-center mb-8 md:mb-12">
            <h2 id="contact-heading" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 md:mb-4">
              Let&apos;s Work <span className="text-accent">Together</span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 px-4">
              Ready to accelerate your digital growth? Get a free consultation from our marketing experts.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 glass-card rounded-xl p-6 md:p-8" aria-label="Contact form">
            <div>
              <label htmlFor="name" className="sr-only">Your Name</label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-background/50 border-border/50 focus:border-accent"
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Your Email</label>
              <Input
                id="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-background/50 border-border/50 focus:border-accent"
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="phone" className="sr-only">Phone Number</label>
              <Input
                id="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="company" className="sr-only">Company Name</label>
              <Input
                id="company"
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="message" className="sr-only">Your Message</label>
              <Textarea
                id="message"
                placeholder="Tell us about your project and goals..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="bg-background/50 border-border/50 focus:border-accent resize-none"
                aria-required="true"
              />
            </div>

            <Button 
              type="submit" 
              variant="glow" 
              size="lg" 
              className="w-full text-base md:text-lg"
              disabled={isSubmitting}
              aria-label="Submit contact form"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
