import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Rate limiting constants
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional().or(z.literal("")),
  company: z.string().trim().max(100, "Company must be less than 100 characters").optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters")
});

const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
};

// Rate limiting function using Deno KV
const checkRateLimit = async (identifier: string): Promise<{ allowed: boolean; retryAfter?: number }> => {
  try {
    const kv = await Deno.openKv();
    const key = ['rate_limit', 'contact_form', identifier];
    const result = await kv.get<{ count: number; resetAt: number }>(key);
    
    const now = Date.now();
    
    if (result.value) {
      // Check if window has expired
      if (result.value.resetAt <= now) {
        // Window expired, start new window
        await kv.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS }, { expireIn: RATE_LIMIT_WINDOW_MS });
        return { allowed: true };
      }
      
      // Check if limit exceeded
      if (result.value.count >= RATE_LIMIT_MAX_REQUESTS) {
        const retryAfter = Math.ceil((result.value.resetAt - now) / 1000);
        return { allowed: false, retryAfter };
      }
      
      // Increment counter
      await kv.set(key, { 
        count: result.value.count + 1, 
        resetAt: result.value.resetAt 
      }, { expireIn: result.value.resetAt - now });
      return { allowed: true };
    }
    
    // First request, create new entry
    await kv.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS }, { expireIn: RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  } catch (error) {
    // If KV fails, log and allow request (fail open for availability)
    console.error("Rate limiting error:", error);
    return { allowed: true };
  }
};

const RESEND_TEST_RECIPIENT = "feliperesvera106@gmail.com";

const sendEmail = async (from: string, to: string[], subject: string, html: string) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }

  return await response.json();
};

const isResendSandboxRestriction = (error: unknown) => {
  return error instanceof Error && error.message.includes("You can only send testing emails to your own email address");
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    // Check rate limit
    const rateLimitResult = await checkRateLimit(clientIP);
    
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: "Too many requests. Please try again later.",
          retryAfter: rateLimitResult.retryAfter
        }),
        {
          status: 429,
          headers: { 
            "Content-Type": "application/json",
            "Retry-After": String(rateLimitResult.retryAfter),
            ...corsHeaders 
          },
        }
      );
    }

    const rawData = await req.json();
    
    // Validate input
    const validationResult = contactSchema.safeParse(rawData);
    
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: "Invalid input data",
          details: validationResult.error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, phone, company, message } = validationResult.data;
    
    // Sanitize data for HTML output
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : '';
    const safeCompany = company ? escapeHtml(company) : '';
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    console.log("Processing contact form submission from IP:", clientIP);

    let sandboxMode = false;

    // Send notification email to RevUp inbox (fallback to test recipient if domain is not verified)
    let notificationResponse: any;
    try {
      notificationResponse = await sendEmail(
        "RevUp Contact Form <onboarding@resend.dev>",
        ["info@revupagencygroup.com"],
        `New Contact Form Submission from ${safeName}`,
        `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          ${safePhone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ''}
          ${safeCompany ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `
      );
    } catch (error) {
      if (!isResendSandboxRestriction(error)) throw error;
      sandboxMode = true;
      console.warn("Resend sandbox restriction detected. Using fallback recipient.");
      notificationResponse = await sendEmail(
        "RevUp Contact Form <onboarding@resend.dev>",
        [RESEND_TEST_RECIPIENT],
        `New Contact Form Submission from ${safeName}`,
        `
          <h2>New Contact Form Submission (Sandbox Mode)</h2>
          <p><strong>Intended inbox:</strong> info@revupagencygroup.com</p>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          ${safePhone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ''}
          ${safeCompany ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `
      );
    }

    console.log("Notification email sent successfully:", notificationResponse);

    // Send confirmation email only when not in sandbox mode
    let confirmationResponse: any = null;
    let confirmationDeliveredTo: string | null = null;

    if (!sandboxMode) {
      try {
        confirmationResponse = await sendEmail(
          "RevUp Agency Group <onboarding@resend.dev>",
          [safeEmail],
          `Confirmation: Message from ${safeName}`,
          `
            <h2>Form Submission Received</h2>
            <h1>Thank you for contacting us, ${safeName}!</h1>
            <p>We have received your message and will get back to you as soon as possible.</p>
            <p><strong>Your message:</strong></p>
            <p>${safeMessage}</p>
            <br>
            <p>Best regards,<br>The RevUp Agency Group Team</p>
          `
        );
        confirmationDeliveredTo = safeEmail;
        console.log("Confirmation email sent successfully:", confirmationResponse);
      } catch (confirmationError) {
        console.error("Confirmation email failed, but lead notification was sent:", confirmationError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        sandbox_mode: sandboxMode,
        notificationId: notificationResponse.id,
        confirmationId: confirmationResponse?.id ?? null,
        confirmationDeliveredTo,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again later." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
