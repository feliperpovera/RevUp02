/** Posts a site form to the Cloudflare Pages Function, which emails it via Resend. */
export const submitForm = async (form: "lead" | "contact" | "onboarding", fields: Record<string, unknown>) => {
  const res = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ form, ...fields }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || "Something went wrong. Please try again.");
};
