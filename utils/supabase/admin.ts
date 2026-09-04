import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Admin-privileged client — service role key, server-only, never imported
 * into any client component. Used only where an operation genuinely can't
 * be done as the signed-in user (e.g. finalizing an email change after our
 * own OTP has already verified ownership of the new address).
 */
export const createAdminClient = () => createSupabaseClient(supabaseUrl, serviceRoleKey);
