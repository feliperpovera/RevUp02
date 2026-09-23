// Post-build: write dist/<route>.html with that route's title,
// description, canonical, Open Graph/Twitter tags and robots directive, so
// crawlers and link previews get correct per-page metadata without running JS.
// .htaccess maps /route -> route.html (no trailing-slash redirect); unknown
// paths fall back to the SPA.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const seo = JSON.parse(readFileSync(join(root, "src/config/seo.json"), "utf8"));
const servicePages = JSON.parse(readFileSync(join(root, "src/config/service-pages.json"), "utf8"));
const blogPosts = JSON.parse(readFileSync(join(root, "src/config/blog-posts.json"), "utf8"));
const template = readFileSync(join(root, "dist/index.html"), "utf8");

// Service landing pages get Service + FAQPage + BreadcrumbList structured data.
const serviceJsonLd = (page) => {
  const url = `${seo.site}${page.path}`;
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
        { "@type": "ListItem", position: 1, name: "Home", item: `${seo.site}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${seo.site}/services` },
        { "@type": "ListItem", position: 3, name: page.name, item: url },
      ],
    },
  ];
};

const blogJsonLd = (post) => {
  const url = `${seo.site}/blog/${post.slug}`;
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
      inLanguage: "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${seo.site}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${seo.site}/blog` },
        { "@type": "ListItem", position: 3, name: post.h1, item: url },
      ],
    },
  ];
};

const routes = {
  ...seo.routes,
  ...Object.fromEntries(servicePages.map((p) => [p.path, { title: p.title, description: p.description, lang: p.lang, jsonLd: serviceJsonLd(p) }])),
  ...Object.fromEntries(blogPosts.map((p) => [`/blog/${p.slug}`, { title: p.title, description: p.description, jsonLd: blogJsonLd(p) }])),
};

const escape = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const setAttr = (html, pattern, value) => {
  if (!pattern.test(html)) throw new Error(`Tag not found for ${pattern}`);
  return html.replace(pattern, (_, pre, post) => `${pre}${escape(value)}${post}`);
};

for (const [path, meta] of Object.entries(routes)) {
  const url = `${seo.site}${path}`;
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

  // hreflang pairs: [English page, Spanish page]
  const HREFLANG_PAIRS = [
    ["/google-ads-management", "/agencia-google-ads"],
    ["/seo-for-service-businesses", "/agencia-seo"],
  ];
  const pair = HREFLANG_PAIRS.find((p) => p.includes(path));
  if (pair) {
    const [en, es] = pair;
    const alts = [
      `<link rel="alternate" hreflang="en-US" href="${seo.site}${en}" />`,
      `<link rel="alternate" hreflang="es-US" href="${seo.site}${es}" />`,
      `<link rel="alternate" hreflang="x-default" href="${seo.site}${en}" />`,
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
