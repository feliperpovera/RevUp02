import { MapPin } from "lucide-react";
import { BrandCard, DeviceSquareCircle, Eyebrow, Reveal, SectionHeading } from "@/components/brand/kit";

const LOCATIONS = [
  { name: "United States", region: "North American Operations", corner: "tl" as const },
  { name: "Colombia", region: "Latin American Operations", corner: "br" as const },
];

export const ClientsMap = () => {
  return (
    <section id="locations" className="relative overflow-hidden bg-card py-24 md:py-32">
      {/* Hairline device — precision, tailored to each client */}
      <DeviceSquareCircle className="pointer-events-none absolute -top-6 right-[5%] hidden h-48 w-48 text-foreground/10 lg:block" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow index="006" label="Where We Operate" className="mb-10 max-w-md" />
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading
              title={
                <>
                  Our{" "}
                  <span className="relative inline-block">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-[-0.08em] bottom-[0.04em] top-[0.52em] -z-10 bg-accent dark:bg-accent/30"
                    />
                    Global
                  </span>{" "}
                  Presence
                </>
              }
              lede="We proudly serve clients across the Americas, with a strong presence in the United States and Colombia."
            />
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {LOCATIONS.map((location, i) => (
              <Reveal key={location.name} delay={0.2 + i * 0.1}>
                <BrandCard corner={location.corner} className="group flex h-full items-center gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-foreground/10 bg-background transition-all duration-500 group-hover:border-performance/30 group-hover:bg-accent">
                    <MapPin className="h-6 w-6 text-performance" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-heading text-xl text-foreground md:text-2xl">
                        {location.name}
                      </h3>
                      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:animate-none" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-light text-stone">{location.region}</p>
                  </div>
                </BrandCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <p className="mx-auto mt-12 max-w-md text-center text-sm font-light leading-relaxed text-stone">
              Our strategic locations allow us to serve clients across different time zones with{" "}
              <span className="relative inline-block font-medium text-foreground">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-[-0.08em] bottom-0 top-[0.5em] -z-10 bg-accent dark:bg-accent/30"
                />
                dedicated 24/7 support
              </span>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
