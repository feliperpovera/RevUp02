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

// url: client website; leave out until confirmed.
// ar: logo width/height (files are trimmed to their content), used to give every logo the same visual weight.
const CLIENTS: { company: string; logo: string; ar: number; url?: string }[] = [
  { company: "Vélez", logo: velezLogo, ar: 3.95, url: "https://www.velez.com.co" },
  { company: "Monastery Couture", logo: monasteryLogo, ar: 2.26, url: "https://www.monasterycouture.com" },
  { company: "Distrihogar", logo: distrihogarLogo, ar: 3.29, url: "https://distrihogar.com" },
  { company: "MIAN", logo: mianLogo, ar: 1.58, url: "https://mianhousedecor.com/" },
  { company: "New Life Furniture", logo: newlifeLogo, ar: 2.53, url: "https://newlifefurniture.com" },
  { company: "IntraWest Management", logo: intrawestLogo, ar: 0.56 },
  { company: "Host U", logo: hostuLogo, ar: 2.18 },
  { company: "European Luxury Wall Finishes", logo: europeanLogo, ar: 1.07, url: "https://europeanluxurywallfinishes.com" },
  { company: "Vera Seguros", logo: veraLogo, ar: 1.54, url: "https://veraseguros.com" },
  { company: "Hera 23", logo: hera23Logo, ar: 1.29, url: "https://hera23.com" },
  { company: "Invirtiendo", logo: invirtiendoLogo, ar: 5.24, url: "https://invirtiendoo.vercel.app/" },
  { company: "Xpress Foam", logo: xpressfoamLogo, ar: 1.65, url: "https://xpressfoam.com" },
  { company: "Maylin Mattress", logo: maylinLogo, ar: 1.48, url: "https://www.maylinmattress.com/" },
];

const CORNERS = ["tl", "tr", "bl", "br"] as const;

// Same ink area for every logo, capped so tall marks don't tower and wide wordmarks fit the card.
const LOGO_AREA = 5200;
const logoWidth = (ar: number) => Math.round(Math.min(Math.sqrt(LOGO_AREA * ar), 72 * ar, 165));

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
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={client.url ? `Visit ${client.company} website` : undefined}
                  className="block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                <BrandCard
                  corner={CORNERS[index % CORNERS.length]}
                  className="group flex h-full min-h-[180px] flex-col items-center justify-center gap-5 p-6 md:min-h-[200px] md:p-8"
                >
                  <img
                    src={client.logo}
                    alt={`${client.company} logo`}
                    loading="lazy"
                    style={{ width: logoWidth(client.ar) }}
                    className="h-auto max-w-full object-contain opacity-80 grayscale mix-blend-multiply transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 dark:invert dark:mix-blend-screen dark:group-hover:grayscale"
                  />
                  <span className="text-center font-heading text-base text-foreground/70 transition-colors duration-300 group-hover:text-performance md:text-lg">
                    {client.company}
                  </span>
                </BrandCard>
                </a>
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
