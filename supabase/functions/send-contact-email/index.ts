import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

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
  source_form?: string;
}

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional().nullable().or(z.literal("")),
  company: z.string().trim().max(100, "Company must be less than 100 characters").optional().nullable().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
  source_form: z.string().trim().max(100).optional().nullable().or(z.literal("")),
});

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

const persistSubmission = async (payload: ContactEmailRequest) => {
  const { data, error } = await supabase
    .from("contact_submissions")
    .insert([
      {
        name: payload.name,
        email: payload.email,
        phone: payload.phone || null,
        company: payload.company || null,
        message: payload.message,
        source_form: payload.source_form || "contact_page",
        status: "new",
      },
    ])
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  return data;
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

    const { name, email, phone, company, message, source_form } = validationResult.data;

    console.log("Processing contact form submission from IP:", clientIP);

    const savedSubmission = await persistSubmission({
      name,
      email,
      phone: phone || "",
      company: company || "",
      message,
      source_form: source_form || "contact_page",
    });

    return new Response(
      JSON.stringify({
        success: true,
        submissionId: savedSubmission.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-contact-email function:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
