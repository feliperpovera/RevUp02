import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform",
};

const leadSchema = z.object({
    full_name: z.string().trim().min(2, "Name is required").max(100),
    email: z.string().trim().email("Invalid email").max(255),
    company: z.string().trim().max(100).optional().or(z.literal("")),
    phone: z.string().trim().max(20).optional().or(z.literal("")),
    city: z.string().trim().max(100).optional().or(z.literal("")),
    country: z.string().trim().max(100).optional().or(z.literal("")),
    website: z.string().trim().max(255).optional().or(z.literal("")),
    services: z.array(z.string()).min(1, "At least one service required"),
    budget_range: z.string().trim().max(100).optional().or(z.literal("")),
    main_goal: z.string().trim().max(255).optional().or(z.literal("")),
    project_description: z.string().trim().max(2000).optional().or(z.literal("")),
    consent: z.boolean(),
    source_form: z.string().optional().default("hero_lead"),
    utm_source: z.string().trim().max(100).optional().or(z.literal("")),
    utm_medium: z.string().trim().max(100).optional().or(z.literal("")),
    utm_campaign: z.string().trim().max(100).optional().or(z.literal("")),
});

const checkRateLimit = async (ip: string) => {
    try {
        const kv = await Deno.openKv();
        const key = ["rate_limit", "lead", ip];
        const { value } = await kv.get<{ count: number; resetAt: number }>(key);
        const now = Date.now();

        if (value && value.resetAt > now) {
            if (value.count >= 10) return { allowed: false, retryAfter: Math.ceil((value.resetAt - now) / 1000) };
            await kv.set(key, { ...value, count: value.count + 1 }, { expireIn: value.resetAt - now });
        } else {
            await kv.set(key, { count: 1, resetAt: now + 3600000 }, { expireIn: 3600000 });
        }
    } catch (err) {
        console.warn("KV Error (Rate limit bypassed):", err);
    }
    return { allowed: true };
};

const handler = async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

    try {
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
        const userAgent = req.headers.get("user-agent") || "unknown";

        const rateResult = await checkRateLimit(ip);

        const body = await req.json();
        const result = leadSchema.safeParse(body);
        if (!result.success) {
            return new Response(JSON.stringify({ error: result.error.errors[0].message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        const { data: dbData, error: dbError } = await supabase
            .from("leads")
            .insert([{ ...result.data, ip_address: ip, user_agent: userAgent, status: "new" }])
            .select()
            .single();

        if (dbError) throw dbError;

        if (RESEND_API_KEY) {
            await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
                body: JSON.stringify({
                    from: "RevUp Leads <onboarding@resend.dev>",
                    to: ["info@revupagencygroup.com"],
                    subject: `New Lead: ${result.data.full_name}`,
                    html: `<h3>New Lead Acquisition</h3>
                 <p><b>Name:</b> ${result.data.full_name}</p>
                 <p><b>Email:</b> ${result.data.email}</p>
                 <p><b>Services:</b> ${result.data.services.join(", ")}</p>
                 <p><b>Budget:</b> ${result.data.budget_range}</p>
                 <p><b>Description:</b></p>
                 <p>${result.data.project_description || "N/A"}</p>`,
                }),
            });
        }

        return new Response(JSON.stringify({ success: true, id: dbData.id }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Internal server error";
        console.error("Error:", errorMessage);
        return new Response(JSON.stringify({ error: errorMessage }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
};

serve(handler);
