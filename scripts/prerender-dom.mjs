// Post-build, after prerender-meta: render key routes in headless Chrome and
// bake the resulting route markup into dist/<route>.html as
// <div id="root"><div data-route="/path">…</div></div>. Crawlers that don't
// run JS get the full page, and src/lib/prerendered.ts reuses the markup as
// the first paint, so the LCP no longer waits for the JS chunks.
// Without Chrome (or for GH_PAGES builds) it skips and the pages keep the
// metadata-only (or service-body) HTML from prerender-meta.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, execFile } from "node:child_process";
import { promisify } from "node:util";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 4179;

if (process.env.GH_PAGES || !existsSync(CHROME)) {
  console.warn(`prerender-dom: skipped (${process.env.GH_PAGES ? "GH_PAGES build" : "Chrome not found; set CHROME_PATH"})`);
  process.exit(0);
}

const readJson = (file) => JSON.parse(readFileSync(join(root, file), "utf8"));
const pages = readJson("src/config/pages.json");
const servicePages = readJson("src/config/service-pages.json");
const ROUTES = [
  ...["home", "services", "about", "testimonials"].flatMap((k) => [pages[k].en, pages[k].es]),
  ...servicePages.map((p) => p.path),
];

const fileOf = (path) => join(root, "dist", path === "/" ? "index.html" : `${path.slice(1).replace(/\//g, "--")}.html`);

/** The element that opens at `start` (a `<div`), through its matching `</div>`. */
const divAt = (html, start) => {
  const tag = /<div\b|<\/div>/g;
  tag.lastIndex = start;
  let depth = 0;
  for (let m; (m = tag.exec(html)); ) {
    depth += m[0] === "</div>" ? -1 : 1;
    if (depth === 0) return html.slice(start, tag.lastIndex);
  }
  throw new Error("Unbalanced <div> in rendered page");
};

// Entrance animations leave elements below the fold at opacity 0 / offset; the static copy shows them as they end up.
const settle = (html) =>
  html
    .replace(/style="([^"]*)"/g, (_, css) => {
      const kept = css.split(";").map((d) => d.trim()).filter((d) => d && !/^(opacity|transform|filter|will-change)\s*:/.test(d));
      return kept.length ? `style="${kept.join("; ")}"` : "";
    })
    .replace(/<div data-route="[^"]*">/, "");

const preview = spawn(join(root, "node_modules/.bin/vite"), ["preview", "--port", String(PORT), "--strictPort"], { cwd: root, stdio: ["ignore", "pipe", "inherit"] });
await new Promise((resolve, reject) => {
  preview.stdout.on("data", (d) => String(d).includes(String(PORT)) && resolve());
  preview.on("exit", (code) => reject(new Error(`vite preview exited (${code})`)));
});

const run = promisify(execFile);
const render = async (path) => {
  const { stdout } = await run(CHROME, [
    "--headless=new", "--disable-gpu", "--dump-dom", "--virtual-time-budget=10000", "--window-size=1280,900",
    // Only the local server: no analytics hits, fonts or embeds from build captures.
    "--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE localhost",
    `http://localhost:${PORT}${path}`,
  ], { maxBuffer: 32 * 1024 * 1024 });
  const at = stdout.indexOf("<div data-route=");
  if (at < 0) throw new Error(`${path}: route container not found in rendered DOM`);
  const inner = settle(divAt(stdout, at)).replace(/<\/div>$/, "");
  if (!/<h1\b/.test(inner)) throw new Error(`${path}: rendered page has no <h1>`);
  return inner;
};

try {
  for (const path of ROUTES) {
    const body = await render(path);
    const file = fileOf(path);
    const html = readFileSync(file, "utf8");
    const at = html.indexOf('<div id="root">');
    if (at < 0) throw new Error(`${file}: #root not found`);
    const rootDiv = divAt(html, at);
    writeFileSync(file, html.replace(rootDiv, `<div id="root"><div data-route="${path}">${body}</div></div>`));
    console.log(`dom: ${path.padEnd(42)} ${(body.length / 1024).toFixed(0)} KB`);
  }
} finally {
  preview.kill();
}
