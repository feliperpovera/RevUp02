import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackLead } from "@/config/tracking";
import { pagePath, useLang } from "@/config/i18n";
import revupLogoLight from "@/assets/revup-logo-light.png";

const EASE = [0.22, 1, 0.36, 1] as const;

const COPY = {
  en: {
    homeLabel: "RevUp Agency Group — Home",
    received: "Request received",
    thanks: "Thank you!",
    soon: "We'll be talking with you soon.",
    body: (whatsapp: boolean) =>
      `Your request is in our inbox. Our team will get back to you${whatsapp ? " on WhatsApp" : ""} within 24 hours.`,
    back: "Back to Home",
  },
  es: {
    homeLabel: "RevUp Agency Group — Inicio",
    received: "Solicitud recibida",
    thanks: "¡Gracias!",
    soon: "Hablaremos contigo muy pronto.",
    body: (whatsapp: boolean) =>
      `Tu solicitud ya está en nuestra bandeja de entrada. Nuestro equipo te responderá${whatsapp ? " por WhatsApp" : ""} en menos de 24 horas.`,
    back: "Volver al inicio",
  },
};

/**
 * Single thank-you page for every CTA (/gracias?source=... or /es/gracias?source=...).
 * Fires the `lead` attribution event on load (GTM dataLayer + optional
 * direct Meta Pixel), then offers a single path back home.
 * Deliberately distraction-free: logo, confirmation, one button.
 */
const GraciasPage = () => {
  const prefersReducedMotion = useReducedMotion();
  const lang = useLang();
  const t = COPY[lang];
  const home = pagePath("home", lang);

  const [params] = useSearchParams();
  const source = params.get("source") || "whatsapp";

  useEffect(() => {
    trackLead(source);
  }, [source]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4">
      {/* Soft brand glow behind the card */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]"
        aria-hidden="true"
      />

      {/* Logo */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="absolute top-10"
      >
        <Link to={home} aria-label={t.homeLabel}>
          <img src={revupLogoLight} alt="RevUp Agency Group" className="h-10" />
        </Link>
      </motion.div>

      <div className="relative z-10 w-full max-w-xl text-center">
        {/* Animated check badge */}
        <motion.div
          initial={prefersReducedMotion ? false : { scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-accent shadow-[0_0_60px_hsl(72_92%_65%/0.45)]"
        >
          <Check className="h-12 w-12 text-graphite" strokeWidth={3} />
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            <MessageCircle className="h-3.5 w-3.5" />
            {t.received}
          </p>

          <h1 className="font-heading text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
            {t.thanks}
            <br />
            <span className="text-primary">{t.soon}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-base font-light leading-relaxed text-stone md:text-lg">
            {t.body(source === "whatsapp")}
          </p>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          className="mt-10"
        >
          <Button
            asChild
            size="lg"
            className="h-14 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90"
          >
            <Link to={home}>
              <ArrowLeft className="mr-2 h-5 w-5" />
              {t.back}
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
};

export default GraciasPage;
