import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Hero = () => {
  const [displayedText1, setDisplayedText1] = useState("");
  const [displayedText2, setDisplayedText2] = useState("");
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const text1 = "Smart Growth,";
  const text2 = "better results.";

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer1 = setInterval(() => {
      if (index < text1.length) {
        setDisplayedText1(text1.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer1);
        let index2 = 0;
        const timer2 = setInterval(() => {
          if (index2 < text2.length) {
            setDisplayedText2(text2.slice(0, index2 + 1));
            index2++;
          } else {
            clearInterval(timer2);
            setTimeout(() => setShowSubtitle(true), 300);
            setTimeout(() => setShowButton(true), 600);
          }
        }, 80);
      }
    }, 80);

    return () => clearInterval(timer1);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!name.trim() || !email.trim() || !service || !budget) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    setSubmitting(true);

    try {

      // ── 1. Call secure Edge Function ──────────────────────────────────────
      const { data: result, error: fnError } = await supabase.functions.invoke("submit-lead", {
        body: {
          full_name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim() || null,
          company: "Quick Quote",
          services: [service],
          budget_range: budget,
          project_description: `Quick Quote – Service: ${service} | Budget: ${budget}`,
          consent: true,
          source_form: "hero_quick_quote",
        },
      });

      if (fnError || (result && result.error)) {
        throw new Error(fnError?.message || result?.error || "Could not save your request. Please try again.");
      }

      toast.success("Quote request sent! We'll get back to you soon.");
      setName("");
      setEmail("");
      setPhone("");
      setService("");
      setBudget("");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
      role="banner"
    >
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-24 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left – headline */}
          <div className="text-center lg:text-left">
            <div className="relative mb-8 md:mb-10">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
                <span className="text-foreground font-semibold block mb-4 min-h-[1.2em]">
                  {displayedText1}
                  {displayedText1.length < text1.length && (
                    <span className="inline-block w-[3px] h-[0.9em] bg-accent ml-1 animate-pulse" />
                  )}
                </span>
                <span className="text-accent font-semibold block min-h-[1.2em]">
                  {displayedText2}
                  {displayedText1.length === text1.length &&
                    displayedText2.length < text2.length && (
                      <span className="inline-block w-[3px] h-[0.9em] bg-accent ml-1 animate-pulse" />
                    )}
                </span>
              </h1>
            </div>

            <div className={`relative mb-10 transition-all duration-700 ${showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Boost revenue, reduce workload, and scale faster &amp; smarter with data and AI — let us show you how.
              </p>
            </div>
          </div>

          {/* Right – Quick Quote Form */}
          <div className={`transition-all duration-700 delay-500 ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <form
              id="hero-quote-form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Quick quote request form"
              className="futuristic-card rounded-2xl p-6 md:p-8 space-y-5"
            >
              <div className="text-center mb-2">
                <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground">
                  Get a <span className="text-accent">Free Quote</span>
                </h2>
                <p className="text-sm text-foreground/50 mt-1">Tell us about your project</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="hero-name" className="sr-only">Your name</label>
                  <Input
                    id="hero-name"
                    placeholder="Your name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={200}
                    required
                    aria-required="true"
                    className="bg-background/50 border-border/30 rounded-xl h-12 focus:border-accent/50"
                  />
                </div>

                <div>
                  <label htmlFor="hero-email" className="sr-only">Your email</label>
                  <Input
                    id="hero-email"
                    type="email"
                    placeholder="Your email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    required
                    aria-required="true"
                    className="bg-background/50 border-border/30 rounded-xl h-12 focus:border-accent/50"
                  />
                </div>

                <div>
                  <label htmlFor="hero-phone" className="sr-only">Your phone</label>
                  <Input
                    id="hero-phone"
                    type="tel"
                    placeholder="Your phone (optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={20}
                    className="bg-background/50 border-border/30 rounded-xl h-12 focus:border-accent/50"
                  />
                </div>

                <div>
                  <label htmlFor="hero-service" className="sr-only">Service needed</label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger id="hero-service" className="bg-background/50 border-border/30 rounded-xl h-12 focus:border-accent/50">
                      <SelectValue placeholder="Service needed *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid-ads">Paid Advertising</SelectItem>
                      <SelectItem value="social-media">Social Media Management</SelectItem>
                      <SelectItem value="web-dev">Web Development</SelectItem>
                      <SelectItem value="ecommerce">E-commerce Solutions</SelectItem>
                      <SelectItem value="branding">Branding &amp; Design</SelectItem>
                      <SelectItem value="full-service">Full Service Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="hero-budget" className="sr-only">Monthly budget</label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger id="hero-budget" className="bg-background/50 border-border/30 rounded-xl h-12 focus:border-accent/50">
                      <SelectValue placeholder="Monthly budget *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500-1000">$500 – $1,000</SelectItem>
                      <SelectItem value="1000-3000">$1,000 – $3,000</SelectItem>
                      <SelectItem value="3000-5000">$3,000 – $5,000</SelectItem>
                      <SelectItem value="5000-10000">$5,000 – $10,000</SelectItem>
                      <SelectItem value="10000+">$10,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl h-12 text-base hover:scale-[1.02] transition-all duration-300"
              >
                {submitting ? "Sending…" : "Request Free Quote"}
                {!submitting && <Send className="ml-2 w-4 h-4" />}
              </Button>

              <p className="text-[11px] text-foreground/30 text-center">
                No commitment required. We'll respond within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
    </section>
  );
};
