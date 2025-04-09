import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types/Database";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "astro:env/server";

// Create supabase client to be used throughout the application
export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: { persistSession: true },
  }
);
