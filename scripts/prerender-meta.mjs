// Post-build: write dist/<route>.html with that route's title,
// description, canonical, hreflang, Open Graph/Twitter tags, robots directive
// and structured data, so crawlers and link previews get correct per-page
// metadata without running JS. Also writes dist/sitemap.xml from the same
// routes. .htaccess maps /route -> route.html and /es/x -> es--x.html (no
// trailing-slash redirect); unknown paths fall back to the SPA.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (file) => JSON.parse(readFileSync(join(root, file), "utf8"));
const seo = readJson("src/config/seo.json");
const pages = readJson("src/config/pages.json");
const servicePages = readJson("src/config/service-pages.json");
const blogPosts = readJson("src/config/blog-posts.json");
const template = readFileSync(join(root, "dist/index.html"), "utf8");

const langOf = (entry) => (entry.lang === "es" ? "es" : "en");
const postPath = (post) => (langOf(post) === "es" ? `/es/blog/${post.slug}` : `/blog/${post.slug}`);
const LABELS = { en: { home: "Home", services: "Services" }, es: { home: "Inicio", services: "Servicios" } };
const abs = (path) => `${seo.site}${path === "/" ? "/" : path}`;

// Service landing pages get Service + FAQPage + BreadcrumbList structured data.
const serviceJsonLd = (page) => {
  const lang = langOf(page);
  const url = abs(page.path);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.name,
      description: page.description,
      url,
      serviceType: page.name,
      provider: { "@id": `${seo.site}/#organization` },
      areaServed: { "@type": "Country", name: "United States" },
      inLanguage: lang === "es" ? "es-US" : "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: LABELS[lang].home, item: abs(pages.home[lang]) },
        { "@type": "ListItem", position: 2, name: LABELS[lang].services, item: abs(pages.services[lang]) },
        { "@type": "ListItem", position: 3, name: page.name, item: url },
      ],
    },
  ];
};

const blogJsonLd = (post) => {
  const lang = langOf(post);
  const url = abs(postPath(post));
  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.h1,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      url,
      mainEntityOfPage: url,
      image: seo.image,
      author: { "@id": `${seo.site}/#organization` },
      publisher: { "@id": `${seo.site}/#organization` },
      inLanguage: lang === "es" ? "es-US" : "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: LABELS[lang].home, item: abs(pages.home[lang]) },
        { "@type": "ListItem", position: 2, name: "Blog", item: abs(pages.blog[lang]) },
        { "@type": "ListItem", position: 3, name: post.h1, item: url },
      ],
    },
  ];
};

const routes = {
  ...seo.routes,
  ...Object.fromEntries(servicePages.map((p) => [p.path, { title: p.title, description: p.description, lang: langOf(p), jsonLd: serviceJsonLd(p) }])),
  ...Object.fromEntries(blogPosts.map((p) => [postPath(p), { title: p.title, description: p.description, lang: langOf(p), jsonLd: blogJsonLd(p) }])),
};

// Every page paired with its translation: [english path, spanish path].
const PAIRS = [
  ...Object.values(pages).map((p) => [p.en, p.es]),
  ...servicePages.filter((p) => langOf(p) === "en").map((p) => [p.path, p.alt]),
  ...blogPosts.filter((p) => langOf(p) === "en").map((p) => [postPath(p), p.alt]),
].filter(([en, es]) => routes[en] && routes[es] && !routes[en].noindex && !routes[es].noindex);
const pairOf = (path) => PAIRS.find((pair) => pair.includes(path));

const escape = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const setAttr = (html, pattern, value) => {
  if (!pattern.test(html)) throw new Error(`Tag not found for ${pattern}`);
  return html.replace(pattern, (_, pre, post) => `${pre}${escape(value)}${post}`);
};

for (const [path, meta] of Object.entries(routes)) {
  const url = abs(path);
  const robots = meta.noindex
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escape(meta.title)}</title>`);
  html = setAttr(html, /(<meta name="description" content=")[^"]*(")/, meta.description);
  html = setAttr(html, /(<link rel="canonical" href=")[^"]*(")/, url);
  html = setAttr(html, /(<meta name="robots" content=")[^"]*(")/, robots);
  html = setAttr(html, /(<meta property="og:url" content=")[^"]*(")/, url);
  html = setAttr(html, /(<meta property="og:title" content=")[^"]*(")/, meta.title);
  html = setAttr(html, /(<meta property="og:description" content=")[^"]*(")/, meta.description);
  html = setAttr(html, /(<meta name="twitter:url" content=")[^"]*(")/, url);
  html = setAttr(html, /(<meta name="twitter:title" content=")[^"]*(")/, meta.title);
  html = setAttr(html, /(<meta name="twitter:description" content=")[^"]*(")/, meta.description);

  if (meta.lang === "es") {
    html = html.replace('<html lang="en-US">', '<html lang="es-US">').replace('content="en_US"', 'content="es_US"');
  }

  const pair = pairOf(path);
  if (pair) {
    const [en, es] = pair;
    const alts = [
      `<link rel="alternate" hreflang="en-US" href="${abs(en)}" />`,
      `<link rel="alternate" hreflang="es-US" href="${abs(es)}" />`,
      `<link rel="alternate" hreflang="x-default" href="${abs(en)}" />`,
    ].join("\n    ");
    html = html.replace("</head>", `    ${alts}\n  </head>`);
  }

  if (meta.jsonLd) {
    const ld = meta.jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`).join("\n    ");
    html = html.replace("</head>", `    ${ld}\n  </head>`);
  }

  const out = path === "/" ? join(root, "dist/index.html") : join(root, "dist", `${path.slice(1).replace(/\//g, "--")}.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log(`meta: ${path.padEnd(18)} ${meta.noindex ? "(noindex) " : ""}${meta.title}`);
}

// Sitemap: every indexable route, with its translation as an xhtml alternate.
const today = new Date().toISOString().slice(0, 10);
const urls = Object.entries(routes)
  .filter(([, meta]) => !meta.noindex)
  .map(([path]) => {
    const pair = pairOf(path);
    const alts = pair
      ? [
          `    <xhtml:link rel="alternate" hreflang="en-US" href="${abs(pair[0])}" />`,
          `    <xhtml:link rel="alternate" hreflang="es-US" href="${abs(pair[1])}" />`,
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(pair[0])}" />`,
        ].join("\n") + "\n"
      : "";
    const priority = path === "/" ? "1.0" : path === "/es" ? "0.9" : "0.8";
    return `  <url>\n    <loc>${abs(path)}</loc>\n${alts}    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  });
writeFileSync(
  join(root, "dist/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`
);
console.log(`sitemap: ${urls.length} URLs`);
