import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, GiantNumeral, Marquee, Reveal, SectionHeading } from "@/components/brand/kit";
import { openCalendly } from "@/config/links";

// Import client logos
import mianLogo from "@/assets/clients/mian-logo.jpg";
import newlifeLogo from "@/assets/clients/newlife-logo.png";
import hostuLogo from "@/assets/clients/hostu-logo.jpeg";
import europeanLogo from "@/assets/clients/european-logo.png";
import velezLogo from "@/assets/clients/velez-logo.png";
import intrawestLogo from "@/assets/clients/intrawest-logo.png";

// Real results only — add a client quote here once you have one approved.
const CLIENTS = [
  {
    company: "MIAN",
    industry: "E-commerce",
    logo: mianLogo,
    result: "20.2x",
    resultLabel: "Return on ad spend",
    story: "Every $1 they invested in ads came back as $20.20 in sales.",
  },
  {
    company: "New Life Furniture",
    industry: "Home & Living",
    logo: newlifeLogo,
    result: "7.4x",
    resultLabel: "Return on ad spend",
    story: "Every $1 in ads turned into $7.40 in furniture sales.",
  },
  {
    company: "Vélez",
    industry: "Retail & Fashion",
    logo: velezLogo,
    result: "Full",
    resultLabel: "US ad management",
    story: "We run their entire advertising process in the USA.",
  },
  {
    company: "IntraWest Management",
    industry: "Real Estate",
    logo: intrawestLogo,
    result: "Full",
    resultLabel: "US ad management",
    story: "We handle their full advertising process in the USA.",
  },
  {
    company: "Host U",
    industry: "Web Development",
    logo: hostuLogo,
    result: "New",
    resultLabel: "Website built",
    story: "We built their complete web presence from scratch.",
  },
  {
    company: "European Luxury Wall Finishes",
    industry: "Web Development",
    logo: europeanLogo,
    result: "New",
    resultLabel: "Website built",
    story: "We created a complete web presence that shows off their craft.",
  },
];

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-graphite py-24 md:py-32"
      aria-labelledby="testimonials-heading"
    >
      {/* Giant tinted chapter numeral, behind content */}
      <GiantNumeral value="003" className="-top-10 right-[-2%] text-cream/[0.04]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <Reveal>
            <Eyebrow index="003" label="Clients & Results" tone="light" className="mb-10" />
          </Reveal>

          <Reveal delay={0.1} className="max-w-3xl">
            <SectionHeading
              tone="light"
              title={
                <span id="testimonials-heading">
                  Real businesses. <span className="text-accent">Real results.</span>
                </span>
              }
              lede="Small and large businesses across the USA trust us with their growth. Here's what we've achieved together."
            />
          </Reveal>
        </div>
      </div>

      {/* Monochrome client logo carousel — white-bg logos knocked out via
          invert + mix-blend-screen so only the mark shows on graphite */}
      <Reveal delay={0.2}>
        <Marquee duration={32} className="mt-14 md:mt-16">
          {Array.from({ length: 3 }).flatMap((_, copy) =>
            CLIENTS.map((client) => (
              // bg-graphite inside the blend group: the marquee's transform
              // isolates blending, so the backdrop must be painted in here
              <span key={`${copy}-${client.company}`} className="mx-12 bg-graphite">
                <img
                  src={client.logo}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-14 w-auto object-contain opacity-60 grayscale invert mix-blend-screen transition-opacity hover:opacity-100 md:h-16"
                />
              </span>
            ))
          )}
        </Marquee>
      </Reveal>

      {/* Client stories */}
      <div className="container relative z-10 mx-auto mt-16 px-4 md:mt-20 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CLIENTS.map((client, i) => (
            <Reveal key={client.company} delay={(i % 3) * 0.1}>
              <article className="group flex h-full flex-col rounded-3xl border border-cream/10 bg-cream/[0.05] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:bg-cream/[0.08] md:p-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-5xl leading-none text-accent md:text-6xl">{client.result}</span>
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-cream/50">
                    {client.resultLabel}
                  </span>
                </div>

                <p className="mt-6 flex-1 text-lg font-light leading-relaxed text-cream/85">{client.story}</p>

                <div className="mt-8 flex items-center gap-4 border-t border-cream/10 pt-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1.5">
                    <img src={client.logo} alt={`${client.company} logo`} loading="lazy" className="max-h-full max-w-full object-contain" />
                  </span>
                  <span>
                    <span className="block font-heading text-lg leading-tight text-cream">{client.company}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-cream/50">{client.industry}</span>
                  </span>
                </div>
              </article>
            </Reveal>
          ))}

          {/* Friendly CTA */}
          <Reveal className="md:col-span-2 lg:col-span-3">
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-accent p-8 md:flex-row md:items-center md:p-10">
              <div>
                <p className="font-heading text-3xl leading-tight text-graphite md:text-4xl">Your business could be next.</p>
                <p className="mt-2 text-base text-graphite/70">
                  Small shop or big brand — let's have a quick, no-pressure chat about your goals.
                </p>
              </div>
              <Button
                size="lg"
                onClick={openCalendly}
                className="group h-14 shrink-0 rounded-full bg-graphite px-8 text-base font-semibold text-cream hover:bg-graphite/90"
              >
                Book a free call
                <ArrowUpRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
