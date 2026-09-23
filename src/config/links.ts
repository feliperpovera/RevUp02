// Single source of truth for external links used across the site.
export const CALENDLY_URL = "https://calendly.com/revupagencygroup-info/30min";

export const openCalendly = () => {
  window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
};

export const WHATSAPP_NUMBER = "+1 (305) 219-8486";
export const whatsappUrl = (text: string) => "https://wa.me/13052198486?text=" + encodeURIComponent(text);
export const WHATSAPP_URL = whatsappUrl("Hi RevUp! I'd like to grow my business.");
