// RevUp site forms -> Resend. Cloudflare Worker (module syntax), same pattern as MIAN.
// Secret:    RESEND_API_KEY   (npx wrangler secret put RESEND_API_KEY)
// Variables: MAIL_TO   (comma-separated) and MAIL_FROM — see wrangler.toml

const ALLOWED = [
  "https://revupagencygroup.com",
  "https://www.revupagencygroup.com",
  "https://feliperpovera.github.io",
  "http://localhost:8080",
];

const FORMS = {
  lead: "Quick Quote request",
  contact: "Contact message",
  onboarding: "Onboarding form",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const cors = (origin) => ({
  "Access-Control-Allow-Origin": ALLOWED.includes(origin) ? origin : ALLOWED[0],
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
  Vary: "Origin",
});

const esc = (v) =>
  String(Array.isArray(v) ? v.join(", ") : v ?? "")
    .slice(0, 5000)
    .replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const json = (body, status, headers) =>
  new Response(JSON.stringify(body), { status, headers: { ...headers, "Content-Type": "application/json" } });

export default {
  async fetch(req, env) {
    const origin = req.headers.get("origin") || "";
    const h = cors(origin);
    if (req.method === "OPTIONS") return new Response(null, { headers: h });
    if (req.method !== "POST") return json({ error: "Method not allowed" }, 405, h);
    if (!ALLOWED.includes(origin)) return json({ error: "Forbidden" }, 403, h);

    let d;
    try {
      d = await req.json();
    } catch {
      return json({ error: "Invalid request" }, 400, h);
    }

    if (d.website) return json({ ok: true }, 200, h); // honeypot: pretend OK

    const form = String(d.form);
    if (!(form in FORMS)) return json({ error: "Unknown form" }, 400, h);

    const email = String(d.email ?? "").trim();
    const validEmail = EMAIL_RE.test(email);
    if (form !== "onboarding" && !validEmail) return json({ error: "Please enter a valid email address" }, 400, h);

    const fields = Object.entries(d)
      .filter(([k, v]) => k !== "form" && k !== "website" && v !== "" && v != null)
      .slice(0, 40)
      .map(([k, v]) => [k.replace(/_/g, " "), v]);

    const rows = fields
      .map(([k, v]) => `<tr><td style="padding:8px 14px;color:#6e6e5e;font-weight:600;vertical-align:top">${esc(k)}</td>
                        <td style="padding:8px 14px;color:#2d2b27">${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
      .join("");

    const name = String(d.name ?? d.full_name ?? "").replace(/[\r\n]/g, " ").slice(0, 80);

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.MAIL_FROM,
        to: String(env.MAIL_TO).split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: validEmail ? email : undefined,
        subject: `New ${FORMS[form]}${name ? ` — ${name}` : ""}`,
        html: `<div style="font-family:Arial,sans-serif;color:#2d2b27">
          <h2 style="color:#01634c;margin:0 0 12px">New ${FORMS[form]}</h2>
          <table style="border-collapse:collapse;background:#f0efeb;border:1px solid #d9d7cf">${rows}</table>
          <p style="font-size:12px;color:#6e6e5e">Sent from the revupagencygroup.com ${FORMS[form].toLowerCase()} form. Reply to answer the client directly.</p></div>`,
        text: `New ${FORMS[form]}\n\n` + fields.map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join("\n"),
      }),
    });

    if (!r.ok) {
      console.log("resend error", r.status, await r.text());
      return json({ error: "We couldn't send your message. Please try again or email info@revupagencygroup.com." }, 502, h);
    }
    return json({ ok: true }, 200, h);
  },
};
