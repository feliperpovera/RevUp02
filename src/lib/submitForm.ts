/** Cloudflare Worker (worker/submit.js) that emails every form via Resend. */
const FORMS_ENDPOINT = "https://revup-forms.restless-sound-965e.workers.dev";

/** Posts a site form to the forms Worker. */
export const submitForm = async (form: "lead" | "contact" | "onboarding", fields: Record<string, unknown>) => {
  const res = await fetch(FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ form, ...fields }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || "Something went wrong. Please try again.");
};
