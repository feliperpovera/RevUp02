import { useLocation } from "react-router-dom";
import { WHATSAPP_NUMBER, WHATSAPP_URL, whatsappUrl } from "@/config/links";
import { pagePath, useLang } from "@/config/i18n";

const COPY = {
  en: { href: WHATSAPP_URL, label: `Chat with us on WhatsApp at ${WHATSAPP_NUMBER}`, cta: "Chat on WhatsApp" },
  es: {
    href: whatsappUrl("¡Hola RevUp! Quiero hacer crecer mi negocio."),
    label: `Escríbenos por WhatsApp al ${WHATSAPP_NUMBER}`,
    cta: "Escríbenos por WhatsApp",
  },
};

/** Floating WhatsApp chat button, shown on every page except the thank-you page. */
export const WhatsAppButton = () => {
  const { pathname } = useLocation();
  const lang = useLang();
  const t = COPY[lang];
  if (pathname === pagePath("thanks", lang)) return null;

  return (
    <a
      href={t.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.label}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-3 pr-3 text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:pr-5 hover:shadow-[0_14px_40px_rgba(37,211,102,0.55)] md:bottom-8 md:right-8"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0" fill="currentColor" aria-hidden="true">
        <path d="M16.04 3C9.07 3 3.4 8.66 3.4 15.63c0 2.23.58 4.4 1.69 6.32L3.3 28.5l6.73-1.76a12.6 12.6 0 0 0 6.01 1.53h.01c6.97 0 12.64-5.67 12.64-12.64 0-3.38-1.31-6.55-3.7-8.94A12.56 12.56 0 0 0 16.04 3Zm0 23.13h-.01a10.5 10.5 0 0 1-5.35-1.47l-.38-.23-3.99 1.05 1.06-3.89-.25-.4a10.47 10.47 0 0 1-1.61-5.56c0-5.8 4.72-10.52 10.53-10.52 2.81 0 5.45 1.1 7.44 3.08a10.45 10.45 0 0 1 3.08 7.45c0 5.8-4.72 10.5-10.52 10.5Zm5.77-7.87c-.32-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54l-.61-.01c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.62 0 1.55 1.13 3.04 1.29 3.25.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.75.24 1.44.21 1.98.13.6-.09 1.87-.77 2.13-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37Z" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[200px]">
        {t.cta}
      </span>
    </a>
  );
};
