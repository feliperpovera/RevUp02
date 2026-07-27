import { Award } from "lucide-react";
import { Link } from "react-router-dom";
import { BrandCard, Eyebrow, GiantNumeral, Reveal } from "@/components/brand/kit";
import googleLogo from "@/assets/google-logo.png";
import tiktokLogo from "@/assets/tiktok-logo.png";
import metaLogo from "@/assets/meta-logo-new.png";
import shopifyLogo from "@/assets/shopify-logo.svg";

const CORNERS = ["tl", "tr", "bl", "br"] as const;

export const Partners = () => {
  const partners = [
    { name: "Meta", logo: metaLogo },
    { name: "Google", logo: googleLogo },
    { name: "TikTok", logo: tiktokLogo },
    { name: "Shopify", logo: shopifyLogo },
  ];

  return (
    <section
      id="partners"
      className="relative overflow-hidden bg-transparent py-24 md:py-32"
      aria-labelledby="partners-heading"
    >
      {/* Giant tinted chapter numeral, behind content */}
      <GiantNumeral value="002" className="right-[-3%] top-[-4%]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow index="002" label="Official Partners" className="mb-12 max-w-md" />
          </Reveal>

          <header className="mb-14 md:mb-20">
            <Reveal delay={0.1}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-card px-4 py-1.5">
                <Award className="h-4 w-4 text-performance" aria-hidden="true" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone">
                  Certified
                </span>
              </div>

              <h2
                id="partners-heading"
                className="font-heading text-4xl leading-[1.05] text-foreground md:text-5xl lg:text-6xl"
              >
                We are <span className="text-primary">Official Partners</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-stone md:text-lg">
                Certified digital marketing partners with Meta, Google Ads, TikTok, and
                Shopify—delivering expert campaign management and e-commerce solutions
              </p>
            </Reveal>
          </header>

          <ul className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {partners.map((partner, index) => (
              <Reveal as="li" key={partner.name} delay={index * 0.1}>
                <Link
                  to="/partners"
                  className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={`${partner.name} official partner — learn more`}
                >
                  <BrandCard
                    corner={CORNERS[index % CORNERS.length]}
                    className="flex h-full min-h-[180px] flex-col items-center justify-center gap-5 p-6 md:min-h-[200px] md:p-8"
                  >
                    <img
                      src={partner.logo}
                      alt={`${partner.name} certified partner - Professional ${partner.name} advertising and marketing management`}
                      className="max-h-12 w-auto max-w-[110px] object-contain opacity-80 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 md:max-h-14 md:max-w-[130px]"
                      loading="lazy"
                    />
                    <span className="flex items-center gap-2 font-heading text-base text-foreground/70 transition-colors duration-300 group-hover:text-performance md:text-lg">
                      {partner.name}
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </span>
                  </BrandCard>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
