import { useLocation } from "react-router-dom";
import pages from "@/config/pages.json";
import servicePages from "@/config/service-pages.json";
import blogPosts from "@/config/blog-posts.json";

/** English lives at the site root; Spanish under /es with Spanish slugs (see pages.json). */
export type Lang = "en" | "es";
export type PageKey = keyof typeof pages;

export const langOf = (pathname: string): Lang => (pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en");
export const useLang = (): Lang => langOf(useLocation().pathname);
export const pagePath = (key: PageKey, lang: Lang): string => pages[key][lang];

type ServicePage = (typeof servicePages)[number];
type BlogPost = (typeof blogPosts)[number];

export const serviceLang = (page: ServicePage): Lang => ("lang" in page && page.lang === "es" ? "es" : "en");
export const postLang = (post: BlogPost): Lang => ("lang" in post && post.lang === "es" ? "es" : "en");
export const postPath = (post: BlogPost): string => (postLang(post) === "es" ? `/es/blog/${post.slug}` : `/blog/${post.slug}`);

/** Every page paired with its translation, as [english path, spanish path]. */
export const PAIRS: [string, string][] = [
  ...Object.values(pages).map((p): [string, string] => [p.en, p.es]),
  ...servicePages.filter((p) => serviceLang(p) === "en").map((p): [string, string] => [p.path, p.alt]),
  ...blogPosts.filter((p) => postLang(p) === "en").map((p): [string, string] => [postPath(p), p.alt]),
];

/** The same page in the other language, or that language's home when there is no translation. */
export const alternatePath = (pathname: string, target: Lang): string => {
  const path = pathname.replace(/\/+$/, "") || "/";
  const pair = PAIRS.find(([en, es]) => en === path || es === path);
  return pair ? pair[target === "en" ? 0 : 1] : pages.home[target];
};

/** Maps an English service path (e.g. from pricing.json) to the page in `lang`. */
export const localizePath = (path: string, lang: Lang): string => (lang === "en" ? path : alternatePath(path, "es"));
