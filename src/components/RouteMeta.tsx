import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import seo from "@/config/seo.json";
import servicePages from "@/config/service-pages.json";

type RouteSeo = { title: string; description: string; noindex?: boolean };
const ROUTES: Record<string, RouteSeo> = {
  ...(seo.routes as Record<string, RouteSeo>),
  ...Object.fromEntries(servicePages.map((p) => [p.path, { title: p.title, description: p.description }])),
};

const setMeta = (selector: string, attr: "content" | "href", value: string) => {
  document.querySelector(selector)?.setAttribute(attr, value);
};

/**
 * Keeps <head> in sync on client-side navigation. The same data is baked into
 * each route's static HTML at build time (scripts/prerender-meta.mjs), which is
 * what crawlers and link unfurlers read.
 */
export const RouteMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.replace(/\/+$/, "") || "/";
    const route = ROUTES[path];
    const url = `${seo.site}${path === "/" ? "/" : path}`;

    // Unknown path = soft 404: keep it out of the index.
    const noindex = !route || route.noindex;
    const title = route?.title ?? "Page Not Found | RevUp Agency Group";
    const description = route?.description ?? ROUTES["/"].description;

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta(
      'meta[name="robots"]',
      "content",
      noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );
  }, [pathname]);

  return null;
};
