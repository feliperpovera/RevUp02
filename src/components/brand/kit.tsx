import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * RevUp brand design kit — shared primitives for the wisr-style editorial
 * redesign. Tokens come from the Brandbook:
 *   Open Air canvas · Core Graphite text · Electric Green punctuation ·
 *   Performance Green actions · hairline rules · "/001" slash-index eyebrows ·
 *   giant tinted numerals · cards with one oversized corner.
 */

/* ── Reveal: standard scroll-triggered entrance ─────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Slide distance in px (default 32). */
  distance?: number;
  as?: "div" | "section" | "header" | "li" | "span";
};

export const Reveal = ({ children, className, delay = 0, distance = 32, as = "div" }: RevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      initial={prefersReducedMotion ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Tag>
  );
};

/* ── Eyebrow: "/001 — Section name" editorial slash-index ───────────── */

type EyebrowProps = {
  index: string; // e.g. "001"
  label: string;
  className?: string;
  /** "light" for use on dark/graphite sections */
  tone?: "default" | "light";
};

export const Eyebrow = ({ index, label, className, tone = "default" }: EyebrowProps) => (
  <div className={cn("flex items-center gap-4", className)}>
    <span
      className={cn(
        "font-heading text-sm tracking-wide",
        tone === "light" ? "text-accent" : "text-performance"
      )}
    >
      /{index}
    </span>
    <span
      className={cn(
        "text-xs font-medium uppercase tracking-[0.3em]",
        tone === "light" ? "text-cream/70" : "text-stone"
      )}
    >
      {label}
    </span>
    <span
      className={cn(
        "h-px flex-1",
        tone === "light" ? "bg-cream/25" : "bg-foreground/15"
      )}
      aria-hidden="true"
    />
  </div>
);

/* ── SectionHeading: Cal Sans display headline + optional lede ──────── */

type SectionHeadingProps = {
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
  tone?: "default" | "light";
  align?: "left" | "center";
};

export const SectionHeading = ({ title, lede, className, tone = "default", align = "left" }: SectionHeadingProps) => (
  <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
    <h2
      className={cn(
        "font-heading text-4xl leading-[1.05] md:text-5xl lg:text-6xl",
        tone === "light" ? "text-cream" : "text-foreground"
      )}
    >
      {title}
    </h2>
    {lede ? (
      <p
        className={cn(
          "mt-5 max-w-2xl text-base font-light leading-relaxed md:text-lg",
          tone === "light" ? "text-cream/70" : "text-stone",
          align === "center" && "mx-auto"
        )}
      >
        {lede}
      </p>
    ) : null}
  </div>
);

/* ── BrandCard: white card with one oversized rounded corner ────────── */

type BrandCardProps = {
  children: ReactNode;
  className?: string;
  /** Which corner is oversized (brandbook pages 11/13). */
  corner?: "tl" | "tr" | "bl" | "br";
  hover?: boolean;
};

const CORNER_CLASS = {
  tl: "rounded-3xl rounded-tl-[3.5rem]",
  tr: "rounded-3xl rounded-tr-[3.5rem]",
  bl: "rounded-3xl rounded-bl-[3.5rem]",
  br: "rounded-3xl rounded-br-[3.5rem]",
} as const;

export const BrandCard = ({ children, className, corner = "tl", hover = true }: BrandCardProps) => (
  <div
    className={cn(
      "border border-foreground/10 bg-card p-8 shadow-[var(--shadow-card)] transition-all duration-500",
      CORNER_CLASS[corner],
      hover && "hover:-translate-y-1.5 hover:border-performance/30 hover:shadow-[0_20px_50px_hsl(40_7%_16%/0.12)]",
      className
    )}
  >
    {children}
  </div>
);

/* ── GiantNumeral: tinted chapter numeral background graphic ────────── */

export const GiantNumeral = ({ value, className }: { value: string; className?: string }) => (
  <span
    aria-hidden="true"
    className={cn(
      "pointer-events-none absolute select-none font-heading leading-none text-foreground/[0.045]",
      "text-[12rem] md:text-[18rem] lg:text-[24rem]",
      className
    )}
  >
    {value}
  </span>
);

/* ── Hairline supporting elements (brandbook page 18) ───────────────── */

type DeviceProps = { className?: string };

/** Three overlapping circles — collaboration, openness, shared knowledge. */
export const DeviceCircles = ({ className }: DeviceProps) => (
  <svg viewBox="0 0 120 80" fill="none" className={className} aria-hidden="true">
    <circle cx="34" cy="46" r="22" stroke="currentColor" strokeWidth="1" />
    <circle cx="60" cy="34" r="22" stroke="currentColor" strokeWidth="1" />
    <circle cx="86" cy="46" r="22" stroke="currentColor" strokeWidth="1" />
  </svg>
);

/** Corner bracket with rising arrow — direction, focus, strategic vision. */
export const DeviceArrow = ({ className }: DeviceProps) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
    <path d="M14 30 V14 H30" stroke="currentColor" strokeWidth="1" />
    <path d="M70 86 H86 V70" stroke="currentColor" strokeWidth="1" />
    <path d="M30 70 L70 30 M70 30 H48 M70 30 V52" stroke="currentColor" strokeWidth="1" />
  </svg>
);

/** Eight-spoke dotted asterisk — the energy fueling innovation. */
export const DeviceAsterisk = ({ className }: DeviceProps) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
    {Array.from({ length: 8 }, (_, i) => {
      const angle = (i * Math.PI) / 4;
      const x1 = 50 + Math.cos(angle) * 14;
      const y1 = 50 + Math.sin(angle) * 14;
      const x2 = 50 + Math.cos(angle) * 34;
      const y2 = 50 + Math.sin(angle) * 34;
      const dx = 50 + Math.cos(angle) * 40;
      const dy = 50 + Math.sin(angle) * 40;
      return (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" />
          <circle cx={dx} cy={dy} r="1.6" fill="currentColor" />
        </g>
      );
    })}
  </svg>
);

/** Square with tangent circle — precision, tailored to each client. */
export const DeviceSquareCircle = ({ className }: DeviceProps) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
    <rect x="18" y="26" width="56" height="56" stroke="currentColor" strokeWidth="1" />
    <circle cx="74" cy="26" r="12" stroke="currentColor" strokeWidth="1" />
  </svg>
);

/* ── Marquee: infinite horizontal strip (wisr-style trust band) ─────── */

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Seconds per loop. */
  duration?: number;
};

export const Marquee = ({ children, className, duration = 28 }: MarqueeProps) => (
  <div className={cn("overflow-hidden", className)}>
    <div
      className="flex w-max animate-[wave_var(--marquee-duration)_linear_infinite] motion-reduce:animate-none"
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <div className="flex shrink-0 items-center">{children}</div>
      <div className="flex shrink-0 items-center" aria-hidden="true">
        {children}
      </div>
    </div>
  </div>
);
