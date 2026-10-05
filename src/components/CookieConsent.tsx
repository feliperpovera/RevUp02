import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pagePath, useLang } from "@/config/i18n";

const KEY = "revup_consent";
export const OPEN_CONSENT_EVENT = "revup:open-consent";

const COPY = {
  en: {
    text: "We use cookies for analytics and advertising to improve our site and measure our ads. You can accept or reject non-essential cookies.",
    gpc: "Your browser's Global Privacy Control signal is on, so advertising cookies stay off.",
    policy: "Cookie Policy",
    accept: "Accept all",
    reject: "Reject non-essential",
  },
  es: {
    text: "Usamos cookies de analítica y publicidad para mejorar el sitio y medir nuestros anuncios. Puedes aceptar o rechazar las cookies no esenciales.",
    gpc: "Tu navegador tiene activada la señal Global Privacy Control, así que las cookies publicitarias permanecen desactivadas.",
    policy: "Política de cookies",
    accept: "Aceptar todas",
    reject: "Rechazar no esenciales",
  },
};

declare global {
  interface Navigator {
    globalPrivacyControl?: boolean;
  }
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const readChoice = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

/** Cookie banner + "Your Privacy Choices" panel. Updates Google Consent Mode (defaults are set in index.html). */
export const CookieConsent = () => {
  const lang = useLang();
  const t = COPY[lang];
  const [open, setOpen] = useState(false);
  const gpc = typeof navigator !== "undefined" && navigator.globalPrivacyControl === true;

  useEffect(() => {
    if (!readChoice()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  const choose = (choice: "granted" | "denied") => {
    try {
      localStorage.setItem(KEY, choice);
    } catch {
      /* storage blocked: the choice applies to this page view only */
    }
    const ads = choice === "denied" || gpc ? "denied" : "granted";
    window.gtag?.("consent", "update", { ad_storage: ads, ad_user_data: ads, ad_personalization: ads, analytics_storage: choice });
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.policy}
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-foreground/10 bg-background p-5 shadow-[0_20px_50px_hsl(40_7%_16%/0.25)] md:bottom-6 md:p-6"
    >
      <p className="text-sm leading-relaxed text-foreground/80">
        {t.text} {gpc ? `${t.gpc} ` : ""}
        <Link to={pagePath("cookies", lang)} className="font-medium text-performance underline-offset-4 hover:underline">
          {t.policy}
        </Link>
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="h-11 rounded-full border border-foreground/20 px-5 text-sm font-semibold text-foreground transition-colors hover:border-performance hover:text-performance"
        >
          {t.reject}
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
};
