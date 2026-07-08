import { Button } from "@/components/ui/button";
import { ArrowUpRight, Send } from "lucide-react";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getEdgeFunctionErrorMessage } from "@/lib/edgeFunctionError";
import { supabaseClient } from "@/lib/supabaseClient";
import { openCalendly } from "@/config/links";
import { BrandCard, DeviceArrow, Eyebrow, Marquee } from "@/components/brand/kit";
import metaLogo from "@/assets/meta-logo-new.png";
import googleLogo from "@/assets/google-logo.png";
import tiktokLogo from "@/assets/tiktok-logo.png";
import shopifyLogo from "@/assets/shopify-logo.svg";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE_LINE_1 = ["Smart", "Growth,"];
const HEADLINE_LINE_2 = ["better", "results."];

const PARTNER_LOGOS = [
  { name: "Meta", logo: metaLogo },
  { name: "Google", logo: googleLogo },
  { name: "TikTok", logo: tiktokLogo },
  { name: "Shopify", logo: shopifyLogo },
];

const STATS = [
  { value: "20.2x", label: "Best client ROAS" },
  { value: "24h", label: "Response time" },
  { value: "2", label: "Countries served" },
];

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      const { data: result, error: fnError } = await supabaseClient.functions.invoke("submit-lead", {
        body: {
          full_name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim() || "",
          company: "Quick Quote",
          services: [service],
          budget_range: budget,
          project_description: `Quick Quote – Service: ${service} | Budget: ${budget}`,
          consent: true,
          source_form: "hero_quick_quote",
        },
      });

      if (fnError) {
        throw fnError;
      }

      if (result && result.error) {
        throw new Error(result.error);
      }

      toast.success("Quote request sent! We'll get back to you soon.");
      setName("");
      setEmail("");
      setPhone("");
      setService("");
      setBudget("");
    } catch (error: unknown) {
      const errorMessage = await getEdgeFunctionErrorMessage(
        error,
        "Could not save your request. Please try again."
      );
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 40, rotate: 2 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.7, delay: 0.15 + i * 0.12, ease: EASE },
    }),
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-transparent"
      role="banner"
    >
      {/* Hairline corner-arrow device, faint, upper right */}
      <DeviceArrow className="pointer-events-none absolute right-[6%] top-28 hidden h-40 w-40 text-foreground/10 lg:block" />

      <div className="container relative z-10 mx-auto px-4 pb-10 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* Left — editorial headline */}
          <div>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Eyebrow index="001" label="Digital Growth Agency" className="mb-10 max-w-md" />
            </motion.div>

            <h1 className="font-heading text-[2.9rem] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.2rem]">
              <span className="block">
                {HEADLINE_LINE_1.map((word, i) => (
                  <motion.span
                    key={word}
                    custom={i}
                    variants={wordVariants}
                    initial={prefersReducedMotion ? false : "hidden"}
                    animate="visible"
                    className="mr-[0.28em] inline-block text-foreground"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="mt-2 block">
                {HEADLINE_LINE_2.map((word, i) => (
                  <motion.span
                    key={word}
                    custom={i + 2}
                    variants={wordVariants}
                    initial={prefersReducedMotion ? false : "hidden"}
                    animate="visible"
                    className="relative mr-[0.28em] inline-block text-foreground"
                  >
                    {/* Electric Green marker behind the closing words */}
                    <motion.span
                      aria-hidden="true"
                      initial={prefersReducedMotion ? false : { scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.9 + i * 0.15, ease: EASE }}
                      className="absolute inset-x-[-0.08em] bottom-[0.04em] top-[0.52em] -z-10 origin-left bg-accent dark:bg-accent/30"
                    />
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
              className="mt-8 max-w-xl text-lg font-light leading-relaxed text-stone md:text-xl"
            >
              Boost revenue, reduce workload, and scale faster &amp; smarter with data and AI — let
              us show you how.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1, ease: EASE }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                onClick={openCalendly}
                className="group h-14 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90"
              >
                Work With Us
                <ArrowUpRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  document.getElementById("hero-quote-form")?.scrollIntoView({ behavior: "smooth", block: "center" })
                }
                className="h-14 rounded-full border-foreground/20 px-8 text-base font-medium hover:border-performance hover:bg-transparent hover:text-performance"
              >
                Get a Free Quote
              </Button>
            </motion.div>

            {/* Stats row — real client numbers */}
            <motion.dl
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.15, ease: EASE }}
              className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-foreground/10 pt-8"
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-heading text-3xl text-foreground md:text-4xl">{stat.value}</dd>
                  <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-stone">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Right — Quick Quote form */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          >
            <BrandCard corner="tr" hover={false} className="p-7 md:p-9">
              <form
                id="hero-quote-form"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Quick quote request form"
                className="space-y-5"
              >
                <div className="mb-2">
                  <h2 className="font-heading text-2xl text-foreground md:text-[1.7rem]">
                    Get a{" "}
                    <span className="relative inline-block">
                      <span className="absolute inset-x-[-0.1em] bottom-0 top-[0.5em] -z-10 bg-accent dark:bg-accent/30" aria-hidden="true" />
                      Free Quote
                    </span>
                  </h2>
                  <p className="mt-1.5 text-sm font-light text-stone">Tell us about your project</p>
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
                      className="h-12 rounded-xl border-foreground/15 bg-background/60 focus:border-performance"
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
                      className="h-12 rounded-xl border-foreground/15 bg-background/60 focus:border-performance"
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
                      className="h-12 rounded-xl border-foreground/15 bg-background/60 focus:border-performance"
                    />
                  </div>

                  <div>
                    <label htmlFor="hero-service" className="sr-only">Service needed</label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger
                        id="hero-service"
                        className="h-12 rounded-xl border-foreground/15 bg-background/60 focus:border-performance"
                      >
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
                      <SelectTrigger
                        id="hero-budget"
                        className="h-12 rounded-xl border-foreground/15 bg-background/60 focus:border-performance"
                      >
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
                  className="h-12 w-full rounded-full bg-primary text-base font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
                >
                  {submitting ? "Sending…" : "Request Free Quote"}
                  {!submitting && <Send className="ml-2 h-4 w-4" />}
                </Button>

                <p className="text-center text-[11px] font-light text-stone">
                  No commitment required. We'll respond within 24 hours.
                </p>
              </form>
            </BrandCard>
          </motion.div>
        </div>
      </div>

      {/* Partner trust marquee */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="relative z-10 border-t border-foreground/10 bg-card/60 py-6 backdrop-blur-sm"
        aria-label="Official advertising partners"
      >
        <Marquee duration={30}>
          {Array.from({ length: 3 }).flatMap((_, copy) =>
            PARTNER_LOGOS.map((partner) => (
              <span
                key={`${copy}-${partner.name}`}
                className="mx-10 flex items-center gap-3 opacity-60 grayscale transition-opacity hover:opacity-100"
              >
                <img src={partner.logo} alt={`${partner.name} official partner`} className="h-7 w-auto object-contain md:h-8" loading="lazy" />
              </span>
            ))
          )}
        </Marquee>
      </motion.div>
    </section>
  );
};
