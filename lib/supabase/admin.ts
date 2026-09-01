import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://aqwnunzrsvedxukthrzu.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_e5PqxpWY3nFJDkH1jDmh-A_xiGUkeJU",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
