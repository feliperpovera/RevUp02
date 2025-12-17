import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FileAttachment {
  name: string;
  content: string; // base64
  type: string;
}

interface OnboardingFormData {
  hasStrategy: string;
  strategyDetails: string;
  googlePercentage: string;
  metaPercentage: string;
  activeSKUs: string;
  focusOnCategories: string;
  categoriesDetails: string;
  hasDriveFolder: string;
  driveFolderLink: string;
  additionalInfo: string;
  shopifyReport?: FileAttachment | null;
  googleAdsReport?: FileAttachment | null;
  metaAdsReport?: FileAttachment | null;
}

const escapeHtml = (text: string): string => {
  if (!text) return '';
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: OnboardingFormData = await req.json();
    
    console.log("Processing onboarding form submission");
    console.log("Files received:", {
      shopify: data.shopifyReport?.name || 'none',
      googleAds: data.googleAdsReport?.name || 'none',
      metaAds: data.metaAdsReport?.name || 'none',
    });

    // Build attachments array
    const attachments: { filename: string; content: string }[] = [];
    
    if (data.shopifyReport) {
      attachments.push({
        filename: data.shopifyReport.name,
        content: data.shopifyReport.content,
      });
    }
    
    if (data.googleAdsReport) {
      attachments.push({
        filename: data.googleAdsReport.name,
        content: data.googleAdsReport.content,
      });
    }
    
    if (data.metaAdsReport) {
      attachments.push({
        filename: data.metaAdsReport.name,
        content: data.metaAdsReport.content,
      });
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
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
              <span class="${data.shopifyReport ? 'file-info' : 'no-file'}">${data.shopifyReport?.name || 'No adjunto'} ${data.shopifyReport ? '✅ (adjunto en este email)' : ''}</span>
            </div>
            <div class="field">
              <span class="label">Informe de Google Ads:</span>
              <span class="${data.googleAdsReport ? 'file-info' : 'no-file'}">${data.googleAdsReport?.name || 'No adjunto'} ${data.googleAdsReport ? '✅ (adjunto en este email)' : ''}</span>
            </div>
            <div class="field">
              <span class="label">Informe de Meta Ads:</span>
              <span class="${data.metaAdsReport ? 'file-info' : 'no-file'}">${data.metaAdsReport?.name || 'No adjunto'} ${data.metaAdsReport ? '✅ (adjunto en este email)' : ''}</span>
            </div>
            <div class="field">
              <span class="label">¿Tiene estrategia definida?:</span>
              <span class="value highlight">${escapeHtml(data.hasStrategy) === 'si' ? 'Sí' : 'No'}</span>
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
              <span class="value highlight">${escapeHtml(data.focusOnCategories) === 'si' ? 'Sí' : 'No'}</span>
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
              <span class="value highlight">${escapeHtml(data.hasDriveFolder) === 'si' ? 'Sí' : 'No'}</span>
            </div>
            ${data.driveFolderLink ? `
            <div class="field">
              <span class="label">Enlace a carpeta:</span>
              <a href="${escapeHtml(data.driveFolderLink)}" target="_blank" style="color: #2563eb;">${escapeHtml(data.driveFolderLink)}</a>
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

    // Build email payload with attachments
    const emailPayload: any = {
      from: "RevUp Onboarding <onboarding@resend.dev>",
      to: ["feliperesvera106@gmail.com"], // Cambiar a info@revupagencygroup.com después de verificar dominio
      subject: `🚀 Nuevo Onboarding - ${new Date().toLocaleDateString('es-ES')}`,
      html: emailHtml,
    };

    // Add attachments if any
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
  } catch (error: any) {
    console.error("Error in send-onboarding-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
