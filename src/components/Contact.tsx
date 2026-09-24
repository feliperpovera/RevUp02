import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Send } from "lucide-react";
import { toast } from "sonner";
import { submitForm } from "@/lib/submitForm";
import { BrandCard, Eyebrow, GiantNumeral, Reveal } from "@/components/brand/kit";
import { CalendlyButton } from "@/components/CalendlyButton";
import { PHONE_URL, WHATSAPP_NUMBER } from "@/config/links";
import { pagePath, useLang } from "@/config/i18n";

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

const COPY = {
  en: {
    trust: ["We'll respond within 24 hours.", "Your information stays private. We never share it."],
    nameRequired: "Please enter your name",
    invalidEmail: "Please enter a valid email address",
    messageRequired: "Please write a message",
    messageShort: "Message must be at least 10 characters",
    sendError: "Could not send your message. Please try again.",
    eyebrow: "Contact",
    titleA: "Let's Work",
    titleB: "Together",
    lede: "Whether you run a local shop or a national brand, tell us about your goals. We'll reply within 24 hours with honest, practical ideas — free.",
    talk: "Prefer to talk it through? Pick a time that works for you.",
    call: "Or call us",
    formLabel: "Contact form",
    name: "Full Name",
    namePlaceholder: "John Smith",
    email: "Email",
    emailPlaceholder: "john@company.com",
    phone: "Phone",
    company: "Company",
    companyPlaceholder: "Acme Inc.",
    message: "Message",
    messagePlaceholder: "Tell us about your project and goals…",
    submitLabel: "Submit contact form",
    sending: "Sending…",
    submit: "Send my message",
    privacy: "Your information stays private. We never share it.",
  },
  es: {
    trust: ["Te respondemos en menos de 24 horas.", "Tu información es privada. Nunca la compartimos."],
    nameRequired: "Por favor escribe tu nombre",
    invalidEmail: "Por favor ingresa un correo electrónico válido",
    messageRequired: "Por favor escribe un mensaje",
    messageShort: "El mensaje debe tener al menos 10 caracteres",
    sendError: "No pudimos enviar tu mensaje. Por favor intenta de nuevo.",
    eyebrow: "Contacto",
    titleA: "Trabajemos",
    titleB: "juntos",
    lede: "Ya sea que tengas un negocio local o una marca nacional, cuéntanos tus metas. Te respondemos en menos de 24 horas con ideas honestas y prácticas, gratis.",
    talk: "¿Prefieres conversarlo? Elige el horario que mejor te funcione.",
    call: "O llámanos",
    formLabel: "Formulario de contacto",
    name: "Nombre completo",
    namePlaceholder: "Juan Pérez",
    email: "Correo electrónico",
    emailPlaceholder: "juan@tuempresa.com",
    phone: "Teléfono",
    company: "Empresa",
    companyPlaceholder: "Mi Negocio LLC",
    message: "Mensaje",
    messagePlaceholder: "Cuéntanos sobre tu proyecto y tus metas…",
    submitLabel: "Enviar formulario de contacto",
    sending: "Enviando…",
    submit: "Enviar mi mensaje",
    privacy: "Tu información es privada. Nunca la compartimos.",
  },
};

const INPUT_CLASS = "h-12 rounded-xl border-foreground/15 bg-background/60 focus:border-performance";

export const Contact = () => {
  const navigate = useNavigate();
  const lang = useLang();
  const t = COPY[lang];
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ── Client-side validation ──────────────────────────────────────────────
    if (!form.name.trim()) {
      toast.error(t.nameRequired);
      return;
    }
    if (!form.email.trim() || !EMAIL_REGEX.test(form.email.trim())) {
      toast.error(t.invalidEmail);
      return;
    }
    if (!form.message.trim()) {
      toast.error(t.messageRequired);
      return;
    }
    if (form.message.trim().length < 10) {
      toast.error(t.messageShort);
      return;
    }

    setSubmitting(true);

    try {
      await submitForm("contact", {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim() || "",
          company: form.company.trim() || "",
          message: form.message.trim(),
          source_form: "contact_page",
        });

      navigate(`${pagePath("thanks", lang)}?source=contact`);
      setForm(INITIAL_STATE);
    } catch (error: unknown) {
      toast.error(lang === "en" && error instanceof Error ? error.message : t.sendError);
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
              <Eyebrow index="008" label={t.eyebrow} className="mb-10" />
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                id="contact-heading"
                className="font-heading text-4xl leading-[1.05] text-foreground md:text-5xl lg:text-6xl"
              >
                {t.titleA} <span className="text-primary">{t.titleB}</span>
              </h2>
              <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-stone md:text-lg">
                {t.lede}
              </p>
            </Reveal>

            <ul className="mt-10 space-y-4 border-t border-foreground/10 pt-8">
              {t.trust.map((item, i) => (
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

            <Reveal delay={0.5} className="mt-10 border-t border-foreground/10 pt-8">
              <p className="mb-4 text-sm font-light leading-relaxed text-stone">
                {t.talk}
              </p>
              <CalendlyButton />
              <p className="mt-4 text-sm text-stone">
                {t.call}:{" "}
                <a href={PHONE_URL} className="font-semibold text-foreground underline-offset-4 hover:text-performance hover:underline">
                  {WHATSAPP_NUMBER}
                </a>
              </p>
            </Reveal>
          </div>

          {/* Right — contact form */}
          <Reveal delay={0.15}>
            <BrandCard corner="bl" hover={false} className="p-7 md:p-10">
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                noValidate
                aria-label={t.formLabel}
                className="scroll-mt-32 space-y-4 md:space-y-5"
              >
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground/70">
                    {t.name} <span className="text-performance">*</span>
                  </label>
                  <Input
                    id="contact-name"
                    type="text"
                    placeholder={t.namePlaceholder}
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
                    {t.email} <span className="text-performance">*</span>
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder={t.emailPlaceholder}
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
                      {t.phone}
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
                      {t.company}
                    </label>
                    <Input
                      id="contact-company"
                      type="text"
                      placeholder={t.companyPlaceholder}
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
                    {t.message} <span className="text-performance">*</span>
                  </label>
                  <Textarea
                    id="contact-message"
                    placeholder={t.messagePlaceholder}
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
                  aria-label={t.submitLabel}
                  className="group h-12 w-full rounded-full bg-primary text-base font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
                >
                  {submitting ? t.sending : t.submit}
                  {!submitting && (
                    <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </Button>

                <p className="text-center text-[11px] font-light text-stone">
                  {t.privacy}
                </p>
              </form>
            </BrandCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
