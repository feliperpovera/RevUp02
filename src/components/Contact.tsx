import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Send } from "lucide-react";
import { toast } from "sonner";
import { getEdgeFunctionErrorMessage } from "@/lib/edgeFunctionError";
import { supabase } from "@/integrations/supabase/client";
import { BrandCard, Eyebrow, GiantNumeral, Reveal } from "@/components/brand/kit";

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

const TRUST_ITEMS = [
  "We'll respond within 24 hours.",
  "Your data is stored securely. We never share your information.",
];

const INPUT_CLASS = "h-12 rounded-xl border-foreground/15 bg-background/60 focus:border-performance";

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
          phone: form.phone.trim() || "",
          company: form.company.trim() || "",
          message: form.message.trim(),
          source_form: "contact_page",
        },
      });

      if (fnError) {
        throw fnError;
      }

      if (result && result.error) {
        throw new Error(result.error);
      }

      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm(INITIAL_STATE);
    } catch (error: unknown) {
      const errorMessage = await getEdgeFunctionErrorMessage(
        error,
        "Could not save your message. Please try again."
      );
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-transparent py-24 md:py-32"
      aria-labelledby="contact-heading"
    >
      {/* Giant tinted chapter numeral behind the content */}
      <GiantNumeral value="008" className="-top-8 right-[-2%] hidden lg:block" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Left — editorial intro + trust list */}
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow index="008" label="Contact" className="mb-10" />
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                id="contact-heading"
                className="font-heading text-4xl leading-[1.05] text-foreground md:text-5xl lg:text-6xl"
              >
                Let&apos;s Work{" "}
                <span className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-[-0.08em] bottom-[0.04em] top-[0.52em] -z-10 bg-accent dark:bg-accent/30"
                  />
                  Together
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-stone md:text-lg">
                Ready to accelerate your digital growth? Get a free consultation from our marketing experts.
              </p>
            </Reveal>

            <ul className="mt-10 space-y-4 border-t border-foreground/10 pt-8">
              {TRUST_ITEMS.map((item, i) => (
                <Reveal as="li" key={item} delay={0.2 + i * 0.1} distance={20}>
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
                      <Check className="h-3 w-3 text-accent-foreground" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-light leading-relaxed text-stone">{item}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Right — contact form */}
          <Reveal delay={0.15}>
            <BrandCard corner="bl" hover={false} className="p-7 md:p-10">
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                className="space-y-4 md:space-y-5"
              >
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground/70">
                    Full Name <span className="text-performance">*</span>
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
                    className={INPUT_CLASS}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-foreground/70">
                    Email <span className="text-performance">*</span>
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
                    className={INPUT_CLASS}
                  />
                </div>

                {/* Phone & Company – side by side on md+ */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-foreground/70">
                      Phone
                    </label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={update("phone")}
                      maxLength={20}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="mb-1.5 block text-sm font-medium text-foreground/70">
                      Company
                    </label>
                    <Input
                      id="contact-company"
                      type="text"
                      placeholder="Acme Inc."
                      value={form.company}
                      onChange={update("company")}
                      maxLength={200}
                      className={INPUT_CLASS}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground/70">
                    Message <span className="text-performance">*</span>
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
                    className="resize-none rounded-xl border-foreground/15 bg-background/60 focus:border-performance"
                  />
                  <p className="mt-1 text-right text-xs text-stone/70">
                    {form.message.length} / 2000
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  aria-label="Submit contact form"
                  className="group h-12 w-full rounded-full bg-primary text-base font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
                >
                  {submitting ? "Sending…" : "Send Message"}
                  {!submitting && (
                    <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </Button>

                <p className="text-center text-[11px] font-light text-stone">
                  Your data is stored securely. We never share your information.
                </p>
              </form>
            </BrandCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
