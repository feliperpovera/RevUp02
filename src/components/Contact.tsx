import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

export const Contact = () => {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ── Client-side validation ──────────────────────────────────────────────
    if (!form.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!form.email.trim() || !EMAIL_REGEX.test(form.email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!form.message.trim()) {
      toast.error("Please write a message");
      return;
    }
    if (form.message.trim().length < 10) {
      toast.error("Message must be at least 10 characters");
      return;
    }

    setSubmitting(true);

    try {
      // ── 1. Persist to Supabase ────────────────────────────────────────────
      // ── 1. Call secure Edge Function ──────────────────────────────────────
      const { data: result, error: fnError } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim() || null,
          company: form.company.trim() || null,
          message: form.message.trim(),
          source_form: "contact_page",
        },
      });

      if (fnError || (result && result.error)) {
        throw new Error(fnError?.message || result?.error || "Could not save your message. Please try again.");
      }

      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm(INITIAL_STATE);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-transparent relative overflow-hidden"
      aria-labelledby="contact-heading"
    >


      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <header className="text-center mb-8 md:mb-12">
            <h2
              id="contact-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 md:mb-4"
            >
              Let&apos;s Work <span className="text-accent">Together</span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 px-4">
              Ready to accelerate your digital growth? Get a free consultation from our marketing experts.
            </p>
          </header>

          <form
            id="contact-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
            className="futuristic-card rounded-2xl p-6 md:p-8 space-y-4 md:space-y-5"
          >
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-foreground/70 mb-1.5">
                Full Name <span className="text-accent">*</span>
              </label>
              <Input
                id="contact-name"
                type="text"
                placeholder="John Smith"
                value={form.name}
                onChange={update("name")}
                maxLength={100}
                required
                aria-required="true"
                className="bg-background/50 border-border/30 rounded-xl h-12 focus:border-accent/50"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-foreground/70 mb-1.5">
                Email <span className="text-accent">*</span>
              </label>
              <Input
                id="contact-email"
                type="email"
                placeholder="john@company.com"
                value={form.email}
                onChange={update("email")}
                maxLength={255}
                required
                aria-required="true"
                className="bg-background/50 border-border/30 rounded-xl h-12 focus:border-accent/50"
              />
            </div>

            {/* Phone & Company – side by side on md+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Phone
                </label>
                <Input
                  id="contact-phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={update("phone")}
                  maxLength={20}
                  className="bg-background/50 border-border/30 rounded-xl h-12 focus:border-accent/50"
                />
              </div>
              <div>
                <label htmlFor="contact-company" className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Company
                </label>
                <Input
                  id="contact-company"
                  type="text"
                  placeholder="Acme Inc."
                  value={form.company}
                  onChange={update("company")}
                  maxLength={200}
                  className="bg-background/50 border-border/30 rounded-xl h-12 focus:border-accent/50"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-foreground/70 mb-1.5">
                Message <span className="text-accent">*</span>
              </label>
              <Textarea
                id="contact-message"
                placeholder="Tell us about your project and goals…"
                value={form.message}
                onChange={update("message")}
                maxLength={2000}
                required
                aria-required="true"
                rows={5}
                className="bg-background/50 border-border/30 rounded-xl focus:border-accent/50 resize-none"
              />
              <p className="text-xs text-foreground/40 mt-1 text-right">
                {form.message.length} / 2000
              </p>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              aria-label="Submit contact form"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl h-12 text-base hover:scale-[1.02] transition-all duration-300"
            >
              {submitting ? "Sending…" : "Send Message"}
            </Button>

            <p className="text-xs text-foreground/30 text-center">
              Your data is stored securely. We never share your information.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
