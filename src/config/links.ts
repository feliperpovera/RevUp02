// Single source of truth for external links used across the site.
export const CALENDLY_URL = "https://calendly.com/revupagencygroup-info/30min";


export const WHATSAPP_NUMBER = "+1 (305) 219-8486";
export const whatsappUrl = (text: string) => "https://wa.me/13052198486?text=" + encodeURIComponent(text);
export const WHATSAPP_URL = whatsappUrl("Hi RevUp! I'd like to grow my business.");

/** Takes the visitor to the quote form ("Let's Work Together") on the home page of the current language. */
export const goToForm = () => {
  const home = window.location.pathname === "/es" || window.location.pathname.startsWith("/es/") ? "/es" : "/";
  const form = window.location.pathname === home ? document.getElementById("contact-form") : null;
  if (form) {
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  // SPA navigation: BrowserRouter listens to popstate; ScrollToTop scrolls to the hash.
  window.history.pushState({}, "", `${home}#contact-form`);
  window.dispatchEvent(new PopStateEvent("popstate"));
};
