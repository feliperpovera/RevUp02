import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandCard, Eyebrow, GiantNumeral, Reveal, SectionHeading } from "@/components/brand/kit";
import { openCalendly } from "@/config/links";

// Import client logos
import mianLogo from "@/assets/clients/mian-logo.jpg";
import newlifeLogo from "@/assets/clients/newlife-logo.png";
import hostuLogo from "@/assets/clients/hostu-logo.jpeg";
import europeanLogo from "@/assets/clients/european-logo.png";
import velezLogo from "@/assets/clients/velez-logo.png";
import intrawestLogo from "@/assets/clients/intrawest-logo.png";
import monasteryLogo from "@/assets/clients/monastery-logo.png";
import distrihogarLogo from "@/assets/clients/distrihogar-logo.png";
import veraLogo from "@/assets/clients/vera-logo.png";
import hera23Logo from "@/assets/clients/hera23-logo.png";
import invirtiendoLogo from "@/assets/clients/invirtiendo-logo.png";
import xpressfoamLogo from "@/assets/clients/xpressfoam-logo.png";
import maylinLogo from "@/assets/clients/maylin-logo.png";

const CLIENTS = [
  { company: "Vélez", logo: velezLogo },
  { company: "Monastery Couture", logo: monasteryLogo },
  { company: "Distrihogar", logo: distrihogarLogo },
  { company: "MIAN", logo: mianLogo },
  { company: "New Life Furniture", logo: newlifeLogo },
  { company: "IntraWest Management", logo: intrawestLogo },
  { company: "Host U", logo: hostuLogo },
  { company: "European Luxury Wall Finishes", logo: europeanLogo },
  { company: "Vera Seguros", logo: veraLogo },
  { company: "Hera 23", logo: hera23Logo },
  { company: "Invirtiendo", logo: invirtiendoLogo },
  { company: "Xpress Foam", logo: xpressfoamLogo },
  { company: "Maylin Mattress", logo: maylinLogo },
];

const CORNERS = ["tl", "tr", "bl", "br"] as const;

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
          <Reveal>
            <Eyebrow index="003" label="Our Clients" tone="light" className="mb-10" />
          </Reveal>

          <Reveal delay={0.1} className="mb-14 max-w-3xl md:mb-20">
            <SectionHeading
              tone="light"
              title={
                <span id="testimonials-heading">
                  Brands that <span className="text-accent">grow with us.</span>
                </span>
              }
              lede="Small and large businesses in the USA and Latin America trust us with their growth."
            />
          </Reveal>

          {/* Client logos — same card treatment as Official Partners */}
          <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
            {CLIENTS.map((client, index) => (
              <Reveal
                as="li"
                key={client.company}
                delay={(index % 5) * 0.08}
                className="w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1.2rem)]"
              >
                <BrandCard
                  corner={CORNERS[index % CORNERS.length]}
                  className="group flex h-full min-h-[180px] flex-col items-center justify-center gap-5 p-6 md:min-h-[200px] md:p-8"
                >
                  <img
                    src={client.logo}
                    alt={`${client.company} logo`}
                    loading="lazy"
                    className="max-h-14 w-auto max-w-[150px] object-contain opacity-80 grayscale mix-blend-multiply transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 md:max-h-16 md:max-w-[170px]"
                  />
                  <span className="text-center font-heading text-base text-foreground/70 transition-colors duration-300 group-hover:text-performance md:text-lg">
                    {client.company}
                  </span>
                </BrandCard>
              </Reveal>
            ))}
          </ul>

          {/* Friendly CTA */}
          <Reveal className="mt-10">
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
