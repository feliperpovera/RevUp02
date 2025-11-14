import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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

    console.log("Processing contact form submission");

    // TEMPORARY: Sending to verified email until domain is verified
    // Once you verify revupagencygroup.com at resend.com/domains:
    // 1. Change from: "noreply@revupagencygroup.com" 
    // 2. Change to: ["info@revupagencygroup.com"]
    const notificationResponse = await sendEmail(
      "RevUp Contact Form <onboarding@resend.dev>",
      ["feliperesvera106@gmail.com"],
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

    console.log("Notification email sent successfully:", notificationResponse);

    // Send confirmation email to the user (also to verified email temporarily)
    const confirmationResponse = await sendEmail(
      "RevUp Agency Group <onboarding@resend.dev>",
      ["feliperesvera106@gmail.com"],
      `Confirmation: Message from ${safeName}`,
      `
        <h2>Form Submission Received</h2>
        <p>This would be sent to: ${safeEmail}</p>
        <hr>
        <h1>Thank you for contacting us, ${safeName}!</h1>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p>${safeMessage}</p>
        <br>
        <p>Best regards,<br>The RevUp Agency Group Team</p>
      `
    );

    console.log("Confirmation email sent successfully:", confirmationResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        notificationId: notificationResponse.id,
        confirmationId: confirmationResponse.id
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
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
