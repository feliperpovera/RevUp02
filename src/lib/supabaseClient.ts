// Re-export the canonical Supabase client so the whole app shares a single
// instance (multiple createClient() calls spawn duplicate GoTrueClient
// instances that compete over the same auth storage key).
export { supabase as supabaseClient } from "@/integrations/supabase/client";
