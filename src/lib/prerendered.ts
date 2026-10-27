import { MotionGlobalConfig } from "framer-motion";

/**
 * Route markup that scripts/prerender-dom.mjs baked into #root at build time.
 * createRoot wipes #root on mount, so App's Suspense fallback shows this same
 * markup until the route's chunk loads: the first paint stays put instead of
 * flashing a spinner, and the prerendered text counts as the page's LCP.
 * Entrance animations are skipped meanwhile so content doesn't fade out and
 * back in when React takes over.
 */
const node = document.querySelector<HTMLElement>("#root > [data-route]");

export const prerendered = node ? { path: node.dataset.route ?? "", html: node.innerHTML } : null;

if (prerendered) MotionGlobalConfig.skipAnimations = true;

/** Called once the real route has mounted: later navigations animate normally. */
export const endPrerender = () => {
  if (!prerendered) return;
  prerendered.html = "";
  setTimeout(() => (MotionGlobalConfig.skipAnimations = false), 500);
};
