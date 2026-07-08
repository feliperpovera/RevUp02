import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DeviceCircles, Eyebrow, Reveal, SectionHeading } from "@/components/brand/kit";

const PILLARS: { index: string; title: string; body: ReactNode }[] = [
  {
    index: "01",
    title: "Purpose",
    body: (
      <>
        To empower businesses with{" "}
        <span className="font-semibold text-performance">data-driven, AI-powered systems</span> that
        help them work smarter, operate more efficiently, and reach their full growth potential.
      </>
    ),
  },
  {
    index: "02",
    title: "Mission",
    body: (
      <>
        To turn clicks into clients, ideas into high-performing websites and e-commerce stores, and
        marketing into <span className="font-semibold text-performance">measurable growth</span>
        —using the perfect mix of strategy, creativity, automation, and performance-driven
        advertising.
      </>
    ),
  },
  {
    index: "03",
    title: "Vision",
    body: (
      <>
        To shape the future of digital marketing by bringing together{" "}
        <span className="font-semibold text-performance">AI, data, and technology</span>—helping
        businesses scale intelligently, sustainably, and with complete clarity on their results.
      </>
    ),
  },
];

export const Vision = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="relative overflow-hidden bg-transparent py-24 md:py-32">
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-[2fr_3fr] lg:gap-20">
          {/* Left — narrative column */}
          <div>
            <Reveal>
              <Eyebrow index="005" label="About RevUp" className="mb-10" />
            </Reveal>

            <Reveal delay={0.1}>
              <SectionHeading
                title={
                  <>
                    About{" "}
                    <span className="relative inline-block">
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-[-0.08em] bottom-[0.04em] top-[0.52em] -z-10 bg-accent dark:bg-accent/30"
                      />
                      RevUp
                    </span>
                  </>
                }
              />
            </Reveal>

            <div className="mt-8 space-y-6 text-base font-light leading-relaxed text-stone md:text-lg">
              <Reveal delay={0.2}>
                <p>
                  RevUp is a{" "}
                  <strong className="font-semibold text-performance">
                    modern digital marketing and automation agency
                  </strong>{" "}
                  helping businesses grow smarter and faster through data-driven strategy and
                  AI-powered solutions. We specialize in{" "}
                  <strong className="font-semibold text-foreground">Google Ads</strong>,{" "}
                  <strong className="font-semibold text-foreground">Meta advertising</strong>,{" "}
                  <strong className="font-semibold text-foreground">TikTok marketing</strong>,
                  high-performance{" "}
                  <strong className="font-semibold text-foreground">
                    Shopify and website development
                  </strong>
                  , and custom <strong className="font-semibold text-foreground">automations</strong>{" "}
                  that streamline operations and boost efficiency.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <p>
                  What sets us apart is our ability to blend{" "}
                  <strong className="font-semibold text-performance">AI</strong>,{" "}
                  <strong className="font-semibold text-performance">data</strong>, and{" "}
                  <strong className="font-semibold text-foreground">performance marketing</strong>{" "}
                  into one unified growth engine. Whether we're building your online presence,
                  running your ads, or automating your workflows, our goal is simple: deliver
                  measurable results, reduce workload, and make digital growth accessible to
                  businesses of all sizes.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right — Purpose / Mission / Vision index rows */}
          <div className="relative lg:pt-24">
            {/* Hairline circles device, faint, behind the rows */}
            <div className="pointer-events-none absolute -top-8 right-0 hidden lg:block" aria-hidden="true">
              <DeviceCircles className="h-44 w-64 text-foreground/10" />
              {!prefersReducedMotion && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                  className="absolute left-1/2 top-[42%] h-32 w-32 -translate-x-1/2 -translate-y-1/2"
                >
                  <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent" />
                </motion.div>
              )}
            </div>

            <div className="relative space-y-12">
              {PILLARS.map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 0.1}>
                  <div className="grid grid-cols-[3rem_1fr] gap-6 border-t border-foreground/15 pt-8 md:grid-cols-[4rem_1fr] md:gap-10">
                    <span className="font-heading text-sm leading-loose text-performance">
                      {pillar.index}
                    </span>
                    <div>
                      <h3 className="font-heading text-2xl text-foreground">{pillar.title}</h3>
                      <p className="mt-3 max-w-xl text-base font-light leading-relaxed text-stone">
                        {pillar.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
