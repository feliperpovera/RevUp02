// Cloudflare Pages Function: POST /api/submit
// Receives every site form and emails it to the team via Resend.
// Secrets/vars (set in Cloudflare): RESEND_API_KEY (secret), MAIL_FROM, NOTIFY_TO.

interface Env {
  RESEND_API_KEY: string;
  MAIL_FROM?: string; // e.g. "RevUp Website <forms@revupagencygroup.com>" once the domain is verified
  NOTIFY_TO?: string;
}

const FORMS = {
  lead: "Quick Quote request",
  contact: "Contact message",
  onboarding: "Onboarding form",
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELDS = 40;

const escapeHtml = (value: unknown) =>
  String(Array.isArray(value) ? value.join(", ") : value ?? "")
    .slice(0, 5000)
    .replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  // Honeypot: real users never fill the hidden "website" field.
  if (data.website) return json({ ok: true });

  const form = String(data.form) as keyof typeof FORMS;
  if (!(form in FORMS)) return json({ error: "Unknown form" }, 400);

  const email = String(data.email ?? "").trim();
  if (form !== "onboarding" && !EMAIL_RE.test(email)) {
    return json({ error: "Please enter a valid email address" }, 400);
  }

  const name = String(data.name ?? data.full_name ?? "").replace(/[\r\n]/g, " ").slice(0, 80);
  const rows = Object.entries(data)
    .filter(([key, value]) => key !== "form" && key !== "website" && value !== "" && value != null)
    .slice(0, MAX_FIELDS)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 14px;color:#6e6e5e;vertical-align:top">${escapeHtml(key.replace(/_/g, " "))}</td>` +
        `<td style="padding:8px 14px;color:#2d2b27;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.MAIL_FROM || "RevUp Website <onboarding@resend.dev>",
      to: [env.NOTIFY_TO || "info@revupagencygroup.com"],
      reply_to: EMAIL_RE.test(email) ? email : undefined,
      subject: `New ${FORMS[form]}${name ? ` — ${name}` : ""}`,
      html:
        `<div style="font-family:Arial,sans-serif;font-size:14px">` +
        `<h2 style="color:#2d2b27">New ${FORMS[form]}</h2>` +
        `<table style="border-collapse:collapse;background:#f0efeb;border-radius:12px">${rows}</table>` +
        `<p style="color:#6e6e5e">Reply to this email to answer the client directly.</p></div>`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return json({ error: "We couldn't send your message. Please try again or email info@revupagencygroup.com." }, 502);
  }
  return json({ ok: true });
};
