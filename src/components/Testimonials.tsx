import { Eyebrow, GiantNumeral, Marquee, Reveal, SectionHeading } from "@/components/brand/kit";

// Import client logos
import mianLogo from "@/assets/clients/mian-logo.jpg";
import newlifeLogo from "@/assets/clients/newlife-logo.png";
import hostuLogo from "@/assets/clients/hostu-logo.jpeg";
import europeanLogo from "@/assets/clients/european-logo.png";
import velezLogo from "@/assets/clients/velez-logo.png";
import intrawestLogo from "@/assets/clients/intrawest-logo.png";

const CLIENTS = [
  { company: "Vélez", logo: velezLogo },
  { company: "IntraWest Management", logo: intrawestLogo },
  { company: "MIAN", logo: mianLogo },
  { company: "New Life Furniture", logo: newlifeLogo },
  { company: "Host U", logo: hostuLogo },
  { company: "European Luxury Wall Finishes", logo: europeanLogo },
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
                  Meet Our Amazing <span className="text-accent">Clients And Partners.</span>
                </span>
              }
              lede="We collaborate with driven brands and entrepreneurs who are ready to scale. With every partnership, our goal stays the same: deliver paid advertising that fuels real growth and lasting impact."
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
                  alt={`${client.company} logo`}
                  loading="lazy"
                  className="h-14 w-auto object-contain opacity-60 grayscale invert mix-blend-screen transition-opacity hover:opacity-100 md:h-16"
                />
              </span>
            ))
          )}
        </Marquee>
      </Reveal>
    </section>
  );
};
