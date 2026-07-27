/**
 * Conversion tracking for the WhatsApp thank-you page.
 *
 * Primary channel: Google Tag Manager (GTM-KTBZGJMG, loaded site-wide in
 * index.html). The page pushes a `whatsapp_lead` event to the dataLayer;
 * map it to any Meta Pixel / Google Ads tag from the GTM UI — no code changes.
 *
 * Optional direct Meta Pixel: paste the Pixel ID below and the page will also
 * load the pixel and fire standard `Contact` + `Lead` events for attribution.
 */
export const META_PIXEL_ID = ""; // e.g. "1234567890123456" from Meta Events Manager

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const loadMetaPixel = (pixelId: string) => {
  if (window.fbq) return; // already loaded (e.g. via GTM)
  const fbq: ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[];
    push: unknown;
    loaded: boolean;
    version: string;
  } = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue.push(args);
    }
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", pixelId);
  window.fbq("track", "PageView");
};

/** Fire the WhatsApp-lead conversion signals. Safe to call once per visit. */
export const trackWhatsAppLead = () => {
  // 1) GTM dataLayer — map this event to your pixel/tags in Tag Manager.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "whatsapp_lead",
    lead_source: "whatsapp",
    page: "/gracias",
  });

  // 2) Direct Meta Pixel (only when META_PIXEL_ID is configured).
  if (META_PIXEL_ID) {
    loadMetaPixel(META_PIXEL_ID);
    window.fbq?.("track", "Contact");
    window.fbq?.("track", "Lead");
  }
};
