import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { openCalendly } from "@/config/links";
import { Footer } from "@/components/Footer";
import { usd, type PlanId } from "@/components/PricingPlans";
import pricing from "@/config/pricing.json";

const PRICE_GROUPS: { title: string; ids: PlanId[] }[] = [
  { title: "SEO + SEM packages", ids: ["seo", "search", "complete"] },
  { title: "Ads management", ids: ["google", "meta", "tiktok", "all-ads"] },
];

/** Low-key price list, collapsed by default. Share revupagencygroup.com/about#pricing to open it directly. */
const PricingSummary = () => {
  const { hash } = useLocation();
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (hash === "#pricing" && ref.current) {
      ref.current.open = true;
      ref.current.scrollIntoView({ block: "start" });
    }
  }, [hash]);

  return (
    <details ref={ref} id="pricing" className="group mt-16 scroll-mt-28 border-t border-foreground/10 pt-6">
      <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-1.5 text-sm text-stone transition-colors hover:text-performance">
        Plans & pricing
        <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
      </summary>

      <div className="mt-8 space-y-10">
        {PRICE_GROUPS.map((group) => (
          <div key={group.title}>
            <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-stone">{group.title}</h2>
            <ul className="divide-y divide-foreground/10 rounded-2xl border border-foreground/10 bg-card">
              {group.ids.map((id) => {
                const plan = pricing.plans.find((p) => p.id === id);
                if (!plan) return null;
                const saving = "compareAt" in plan && plan.compareAt ? plan.compareAt - plan.price : 0;
                return (
                  <li key={id} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div>
                      <Link to={plan.href} className="font-heading text-lg text-foreground hover:text-performance">
                        {plan.en.name}
                      </Link>
                      {plan.badge === "complete" ? (
                        <span className="ml-2 rounded-full bg-accent px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wider text-graphite">
                          Full package
                        </span>
                      ) : null}
                      <p className="mt-1 text-sm leading-relaxed text-stone">{plan.en.tagline}</p>
                    </div>
                    <div className="shrink-0 sm:text-right">
                      <p className="font-heading text-2xl text-foreground">
                        {usd(plan.price)}
                        <span className="font-sans text-sm text-stone">/mo</span>
                      </p>
                      {"setup" in plan && plan.setup ? (
                        <p className="text-xs text-stone">+ {usd(plan.setup)} one-time SEO launch</p>
                      ) : null}
                      {saving ? <p className="text-xs font-medium text-performance">Save {usd(saving)}/mo</p> : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <p className="text-center text-xs text-stone">
          Ad spend is paid directly to Google, Meta or TikTok and is not included.{" "}
          <Link to="/pricing" className="text-performance underline-offset-4 hover:underline">
            See what each plan includes
          </Link>
        </p>
      </div>
    </details>
  );
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <section className="py-24 md:py-32 bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 text-center">
              About <span className="text-accent">RevUp</span>
            </h1>

            <div className="space-y-8 text-base md:text-lg text-foreground/80 leading-relaxed">
              <p>
                RevUp is a <strong>modern digital marketing and automation agency</strong> helping businesses grow smarter and faster through data-driven strategy and AI-powered solutions. We specialize in <strong>Google Ads</strong>, <strong>Meta advertising</strong>, <strong>TikTok marketing</strong>, high-performance <strong>Shopify and website development</strong>, and custom <strong>automations</strong> that streamline operations and boost efficiency.
              </p>

              <p>
                What sets us apart is our ability to blend <strong>AI</strong>, <strong>data</strong>, and <strong>performance marketing</strong> into one unified growth engine. Whether we're building your online presence, running your ads, or automating your workflows, our goal is simple: deliver measurable results, reduce workload, and make digital growth accessible to businesses of all sizes.
              </p>

              <div className="space-y-8 mt-12">
                <div className="bg-graphite/50 p-6 md:p-8 rounded-xl space-y-3">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-accent">
                    Purpose
                  </h2>
                  <p>
                    To empower businesses with data-driven, AI-powered systems that help them work smarter, operate more efficiently, and reach their full growth potential.
                  </p>
                </div>

                <div className="bg-graphite/50 p-6 md:p-8 rounded-xl space-y-3">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-accent">
                    Mission
                  </h2>
                  <p>
                    To turn clicks into clients, ideas into high-performing websites and e-commerce stores, and marketing into measurable growth—using the perfect mix of strategy, creativity, automation, and performance-driven advertising.
                  </p>
                </div>

                <div className="bg-graphite/50 p-6 md:p-8 rounded-xl space-y-3">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-accent">
                    Vision
                  </h2>
                  <p>
                    To shape the future of digital marketing by bringing together AI, data, and technology—helping businesses scale intelligently, sustainably, and with complete clarity on their results.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => openCalendly()}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-11 rounded-md px-8 text-base md:text-lg py-6"
              >
                Start Growing Today
              </button>
            </div>

            <PricingSummary />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
