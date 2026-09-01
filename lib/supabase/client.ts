import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://aqwnunzrsvedxukthrzu.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_e5PqxpWY3nFJDkH1jDmh-A_xiGUkeJU"
  );
}
