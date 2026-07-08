import { supabase } from "@/integrations/supabase/client";

/**
 * Admin authorization.
 *
 * Authentication = Supabase Auth (email + password).
 * Authorization  = an 'admin' row in `user_roles`, enforced by RLS on every
 * form-submission table.
 *
 * There is exactly ONE account (created server-side) and public sign-up is
 * blocked at the database level, so this is a pure read-only check.
 */
export const checkIsAdmin = async (): Promise<boolean> => {
  const { data, error } = await supabase.rpc("is_admin");
  if (error) {
    console.error("Admin check failed:", error.message);
    return false;
  }
  return data === true;
};
