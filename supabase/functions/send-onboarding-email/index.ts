import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting constants
const RATE_LIMIT_MAX_REQUESTS = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Security constants
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB in base64 is ~13.3MB
const MAX_TEXT_LENGTH = 2000;
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
];
const yesNoSchema = z.enum(["si", "no", "yes", ""]);

// Validation schema
const fileSchema = z.object({
  name: z.string().max(255),
  content: z.string().max(MAX_FILE_SIZE_BYTES * 1.4), // base64 is ~1.37x larger
  type: z.string().refine(t => ALLOWED_MIME_TYPES.includes(t), {
    message: "Tipo de archivo no permitido"
  }),
}).nullable().optional();

const formSchema = z.object({
  hasStrategy: yesNoSchema,
  strategyDetails: z.string().max(MAX_TEXT_LENGTH).default(''),
  googlePercentage: z.string().refine(v => !v || (parseFloat(v) >= 0 && parseFloat(v) <= 100), {
    message: "Porcentaje inválido"
  }),
  metaPercentage: z.string().refine(v => !v || (parseFloat(v) >= 0 && parseFloat(v) <= 100), {
    message: "Porcentaje inválido"
  }),
  activeSKUs: z.string().refine(v => !v || parseInt(v) >= 0, {
    message: "Número de SKUs inválido"
  }),
  focusOnCategories: yesNoSchema,
  categoriesDetails: z.string().max(MAX_TEXT_LENGTH).default(''),
  hasDriveFolder: yesNoSchema,
  driveFolderLink: z.string().max(500).default(''),
  additionalInfo: z.string().max(MAX_TEXT_LENGTH).default(''),
  consent: z.boolean(),
  shopifyReport: fileSchema,
  googleAdsReport: fileSchema,
  metaAdsReport: fileSchema,
  shopifyReportName: z.string().max(255).optional().nullable().or(z.literal("")),
  googleAdsReportName: z.string().max(255).optional().nullable().or(z.literal("")),
  metaAdsReportName: z.string().max(255).optional().nullable().or(z.literal("")),
  sourceForm: z.string().max(100).optional().nullable().or(z.literal("")),
});

const normalizeChoice = (choice: z.infer<typeof yesNoSchema>): "yes" | "no" => {
  return choice === "si" || choice === "yes" ? "yes" : "no";
};

// Sanitize and validate URL
const sanitizeUrl = (url: string): string => {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }
    return parsed.href;
  } catch {
    return '';
  }
};

// Rate limiting function using Deno KV
const checkRateLimit = async (identifier: string): Promise<{ allowed: boolean; retryAfter?: number }> => {
  try {
    const kv = await Deno.openKv();
    const key = ['rate_limit', 'onboarding_form', identifier];
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

    // Parse and validate input
    const rawData = await req.json();

    const validationResult = formSchema.safeParse(rawData);

    if (!validationResult.success) {
      console.error("Validation errors:", validationResult.error.errors);
      return new Response(
        JSON.stringify({
          error: "Datos inválidos",
          details: validationResult.error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const data = validationResult.data;
    const hasStrategy = normalizeChoice(data.hasStrategy);
    const focusOnCategories = normalizeChoice(data.focusOnCategories);
    const hasDriveFolder = normalizeChoice(data.hasDriveFolder);

    console.log("Processing validated onboarding form submission from IP:", clientIP);

    // Sanitize URL
    const sanitizedDriveLink = sanitizeUrl(data.driveFolderLink);

    const { data: savedSubmission, error: saveError } = await supabase
      .from("onboarding_submissions")
      .insert([
        {
          has_strategy: hasStrategy,
          strategy_details: data.strategyDetails || null,
          google_percentage: data.googlePercentage || null,
          meta_percentage: data.metaPercentage || null,
          active_skus: data.activeSKUs || null,
          focus_on_categories: focusOnCategories,
          categories_details: data.categoriesDetails || null,
          has_drive_folder: hasDriveFolder,
          drive_folder_link: sanitizedDriveLink || null,
          additional_info: data.additionalInfo || null,
          consent: data.consent,
          shopify_report_name: data.shopifyReportName || data.shopifyReport?.name || null,
          google_ads_report_name: data.googleAdsReportName || data.googleAdsReport?.name || null,
          meta_ads_report_name: data.metaAdsReportName || data.metaAdsReport?.name || null,
          source_form: data.sourceForm || "onboarding_form",
          status: "new",
        },
      ])
      .select("id")
      .single();

    if (saveError) {
      console.error("Onboarding save error:", JSON.stringify(saveError));
      throw new Error(saveError.message || JSON.stringify(saveError));
    }

    console.log("Onboarding submission saved:", savedSubmission);

    return new Response(
      JSON.stringify({ success: true, submissionId: savedSubmission.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === "object" && error !== null && "message" in error && typeof error.message === "string"
          ? error.message
          : JSON.stringify(error);
    console.error("Error in send-onboarding-email function:", errorMessage);
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
