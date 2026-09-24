import { Link } from "react-router-dom";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/brand/kit";
import { cn } from "@/lib/utils";
import { goToForm, whatsappUrl } from "@/config/links";
import { trackPlanInterest } from "@/config/tracking";
import pricing from "@/config/pricing.json";
import { localizePath } from "@/config/i18n";

export type Lang = "en" | "es";
export type PlanId = (typeof pricing.plans)[number]["id"];

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

const T = {
  en: {
    mo: "/mo",
    setup: (n: number) => `+ ${usd(n)} one-time SEO launch`,
    save: (n: number) => `Save ${usd(n)}/mo vs. separate plans`,
    setupSave: (n: number) => `${usd(n)} off the SEO launch`,
    badge: { value: "Best value", complete: "Full SEO + SEM package" },
    cta: "Get started",
    call: "Book a Meeting",
    more: "Learn more",
    message: (name: string, price: string) => `Hi RevUp! I'm interested in the ${name} plan (${price}/mo).`,
    adSpend: "Ad spend is paid directly to Google, Meta or TikTok and is not included in management fees.",
  },
  es: {
    mo: "/mes",
    setup: (n: number) => `+ ${usd(n)} pago único de arranque SEO`,
    save: (n: number) => `Ahorras ${usd(n)}/mes vs. planes por separado`,
    setupSave: (n: number) => `${usd(n)} menos en el arranque SEO`,
    badge: { value: "Mejor valor", complete: "Paquete completo SEO + SEM" },
    cta: "Empezar",
    call: "Agenda una reunión",
    more: "Ver más",
    message: (name: string, price: string) => `¡Hola RevUp! Me interesa el plan ${name} (${price}/mes).`,
    adSpend: "La inversión en anuncios se paga directo a Google, Meta o TikTok y no está incluida en la tarifa de administración.",
  },
};

type Props = {
  ids: PlanId[];
  lang?: Lang;
  /** Show a "Learn more" link to each plan's service page. */
  learnMore?: boolean;
  className?: string;
};

export const PricingPlans = ({ ids, lang = "en", learnMore = false, className }: Props) => {
  const t = T[lang];
  const plans = ids.map((id) => pricing.plans.find((p) => p.id === id)).filter((p) => p !== undefined);

  return (
    <div className={className}>
      <ul
        className={cn(
          "grid grid-cols-1 gap-5",
          plans.length === 4 ? "md:grid-cols-2 xl:grid-cols-4" : plans.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
        )}
      >
        {plans.map((plan, i) => {
          const copy = plan[lang];
          const featured = plan.badge === "complete";
          const saving = "compareAt" in plan && plan.compareAt ? plan.compareAt - plan.price : 0;
          const setupSaving = "setupCompareAt" in plan && plan.setupCompareAt && plan.setup ? plan.setupCompareAt - plan.setup : 0;
          return (
            <Reveal as="li" key={plan.id} delay={(i % 4) * 0.08} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-7 md:p-8",
                  featured
                    ? "border-accent bg-graphite text-cream shadow-[0_24px_60px_hsl(40_7%_16%/0.25)]"
                    : "border-foreground/10 bg-card shadow-[var(--shadow-card)]",
                  plan.badge === "value" && "border-performance/40"
                )}
              >
                {plan.badge ? (
                  <span
                    className={cn(
                      "mb-4 inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                      featured ? "bg-accent text-graphite" : "bg-performance/10 text-performance"
                    )}
                  >
                    {t.badge[plan.badge as keyof typeof t.badge]}
                  </span>
                ) : null}

                <h3 className={cn("font-heading text-2xl", featured ? "text-cream" : "text-foreground")}>{copy.name}</h3>
                <p className={cn("mt-2 text-sm leading-relaxed", featured ? "text-cream/70" : "text-stone")}>{copy.tagline}</p>

                <div className="mt-6 flex items-end gap-1">
                  <span className={cn("font-heading text-5xl leading-none", featured ? "text-accent" : "text-foreground")}>
                    {usd(plan.price)}
                  </span>
                  <span className={cn("pb-1 text-sm", featured ? "text-cream/70" : "text-stone")}>{t.mo}</span>
                </div>
                <div className={cn("mt-2 min-h-[1.25rem] space-y-1 text-xs font-medium", featured ? "text-cream/70" : "text-stone")}>
                  {"setup" in plan && plan.setup ? <p>{t.setup(plan.setup)}</p> : null}
                  {setupSaving ? <p className={featured ? "text-accent" : "text-performance"}>{t.setupSave(setupSaving)}</p> : null}
                  {saving ? <p className={featured ? "text-accent" : "text-performance"}>{t.save(saving)}</p> : null}
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {copy.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed">
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                          featured ? "bg-accent" : "bg-accent/60"
                        )}
                      >
                        <Check className="h-3 w-3 text-graphite" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className={featured ? "text-cream/90" : "text-foreground/80"}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappUrl(t.message(copy.name, usd(plan.price)))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackPlanInterest(plan.id)}
                  className={cn(
                    "mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors",
                    featured ? "bg-accent text-graphite hover:bg-accent/90" : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {t.cta}
                </a>
                <button
                  type="button"
                  onClick={goToForm}
                  className={cn(
                    "mt-3 text-sm underline-offset-4 hover:underline",
                    featured ? "text-cream/80 hover:text-cream" : "text-stone hover:text-performance"
                  )}
                >
                  {t.call}
                </button>
                {learnMore ? (
                  <Link
                    to={localizePath(plan.href, lang)}
                    className={cn(
                      "mt-2 inline-flex items-center justify-center gap-1 text-xs",
                      featured ? "text-cream/60 hover:text-cream" : "text-stone hover:text-performance"
                    )}
                  >
                    {t.more}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </ul>
      <p className="mt-6 text-center text-xs text-stone">{t.adSpend}</p>
    </div>
  );
};
