import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

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

// Validation schema
const fileSchema = z.object({
  name: z.string().max(255),
  content: z.string().max(MAX_FILE_SIZE_BYTES * 1.4), // base64 is ~1.37x larger
  type: z.string().refine(t => ALLOWED_MIME_TYPES.includes(t), {
    message: "Tipo de archivo no permitido"
  }),
}).nullable().optional();

const formSchema = z.object({
  hasStrategy: z.enum(['si', 'no', '']),
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
  focusOnCategories: z.enum(['si', 'no', '']),
  categoriesDetails: z.string().max(MAX_TEXT_LENGTH).default(''),
  hasDriveFolder: z.enum(['si', 'no', '']),
  driveFolderLink: z.string().max(500).default(''),
  additionalInfo: z.string().max(MAX_TEXT_LENGTH).default(''),
  shopifyReport: fileSchema,
  googleAdsReport: fileSchema,
  metaAdsReport: fileSchema,
});

const escapeHtml = (text: string): string => {
  if (!text) return '';
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  return text.replace(/[&<>"'`=\/]/g, (char) => map[char]);
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
    
    console.log("Processing validated onboarding form submission from IP:", clientIP);

    // Build attachments array with validation
    const attachments: { filename: string; content: string }[] = [];
    
    if (data.shopifyReport?.content) {
      attachments.push({
        filename: escapeHtml(data.shopifyReport.name),
        content: data.shopifyReport.content,
      });
    }
    
    if (data.googleAdsReport?.content) {
      attachments.push({
        filename: escapeHtml(data.googleAdsReport.name),
        content: data.googleAdsReport.content,
      });
    }
    
    if (data.metaAdsReport?.content) {
      attachments.push({
        filename: escapeHtml(data.metaAdsReport.name),
        content: data.metaAdsReport.content,
      });
    }

    // Sanitize URL
    const sanitizedDriveLink = sanitizeUrl(data.driveFolderLink);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
          h2 { color: #1e40af; margin-top: 25px; }
          .section { background: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0; }
          .field { margin: 10px 0; }
          .label { font-weight: bold; color: #475569; }
          .value { color: #1e293b; }
          .highlight { background: #dbeafe; padding: 2px 6px; border-radius: 4px; }
          .file-info { color: #059669; font-style: italic; }
          .no-file { color: #9ca3af; font-style: italic; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Nuevo Formulario de Onboarding</h1>
          <p>Se ha recibido una nueva solicitud de onboarding. A continuación los detalles:</p>
          
          <h2>📁 Paso 1: Archivos Adjuntos</h2>
          <div class="section">
            <div class="field">
              <span class="label">Informe de Shopify:</span>
              <span class="${data.shopifyReport ? 'file-info' : 'no-file'}">${data.shopifyReport ? escapeHtml(data.shopifyReport.name) + ' ✅ (adjunto)' : 'No adjunto'}</span>
            </div>
            <div class="field">
              <span class="label">Informe de Google Ads:</span>
              <span class="${data.googleAdsReport ? 'file-info' : 'no-file'}">${data.googleAdsReport ? escapeHtml(data.googleAdsReport.name) + ' ✅ (adjunto)' : 'No adjunto'}</span>
            </div>
            <div class="field">
              <span class="label">Informe de Meta Ads:</span>
              <span class="${data.metaAdsReport ? 'file-info' : 'no-file'}">${data.metaAdsReport ? escapeHtml(data.metaAdsReport.name) + ' ✅ (adjunto)' : 'No adjunto'}</span>
            </div>
            <div class="field">
              <span class="label">¿Tiene estrategia definida?:</span>
              <span class="value highlight">${data.hasStrategy === 'si' ? 'Sí' : 'No'}</span>
            </div>
            ${data.strategyDetails ? `
            <div class="field">
              <span class="label">Detalles de estrategia:</span>
              <p class="value">${escapeHtml(data.strategyDetails)}</p>
            </div>
            ` : ''}
          </div>

          <h2>📊 Paso 2: Datos de Operación</h2>
          <div class="section">
            <div class="field">
              <span class="label">Distribución del gasto:</span>
              <span class="value">Google Ads: <span class="highlight">${escapeHtml(data.googlePercentage)}%</span> | Meta Ads: <span class="highlight">${escapeHtml(data.metaPercentage)}%</span></span>
            </div>
            <div class="field">
              <span class="label">SKUs activos:</span>
              <span class="value highlight">${escapeHtml(data.activeSKUs)}</span>
            </div>
            <div class="field">
              <span class="label">¿Enfoque en categorías específicas?:</span>
              <span class="value highlight">${data.focusOnCategories === 'si' ? 'Sí' : 'No'}</span>
            </div>
            ${data.categoriesDetails ? `
            <div class="field">
              <span class="label">Categorías/productos objetivo:</span>
              <p class="value">${escapeHtml(data.categoriesDetails)}</p>
            </div>
            ` : ''}
          </div>

          <h2>📂 Paso 3: Contenido</h2>
          <div class="section">
            <div class="field">
              <span class="label">¿Tiene carpeta Drive/Dropbox?:</span>
              <span class="value highlight">${data.hasDriveFolder === 'si' ? 'Sí' : 'No'}</span>
            </div>
            ${sanitizedDriveLink ? `
            <div class="field">
              <span class="label">Enlace a carpeta:</span>
              <a href="${sanitizedDriveLink}" target="_blank" rel="noopener noreferrer" style="color: #2563eb;">${escapeHtml(sanitizedDriveLink)}</a>
            </div>
            ` : ''}
            ${data.additionalInfo ? `
            <div class="field">
              <span class="label">Información adicional:</span>
              <p class="value">${escapeHtml(data.additionalInfo).replace(/\n/g, '<br>')}</p>
            </div>
            ` : ''}
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 12px;">
            Este email fue enviado automáticamente desde el formulario de onboarding de RevUp Agency Group.<br>
            Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'America/New_York' })}<br>
            <strong>Archivos adjuntos: ${attachments.length}</strong>
          </p>
        </div>
      </body>
      </html>
    `;

    // Build email payload
    const emailPayload: Record<string, unknown> = {
      from: "RevUp Onboarding <onboarding@resend.dev>",
      to: ["feliperesvera106@gmail.com"], // Cambiar después de verificar dominio
      subject: `🚀 Nuevo Onboarding - ${new Date().toLocaleDateString('es-ES')}`,
      html: emailHtml,
    };

    if (attachments.length > 0) {
      emailPayload.attachments = attachments;
    }

    console.log("Sending email with", attachments.length, "attachments");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend API error:", error);
      throw new Error(`Error sending email: ${error}`);
    }

    const result = await response.json();
    console.log("Email sent successfully:", result);

    return new Response(
      JSON.stringify({ success: true, emailId: result.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    console.error("Error in send-onboarding-email function:", errorMessage);
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
