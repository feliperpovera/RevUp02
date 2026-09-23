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
const template = readFileSync(join(root, "dist/index.html"), "utf8");

const escape = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const setAttr = (html, pattern, value) => {
  if (!pattern.test(html)) throw new Error(`Tag not found for ${pattern}`);
  return html.replace(pattern, (_, pre, post) => `${pre}${escape(value)}${post}`);
};

for (const [path, meta] of Object.entries(seo.routes)) {
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

  const out = path === "/" ? join(root, "dist/index.html") : join(root, "dist", `${path.slice(1)}.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log(`meta: ${path.padEnd(18)} ${meta.noindex ? "(noindex) " : ""}${meta.title}`);
}
