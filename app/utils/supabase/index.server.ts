import { createClient } from "@supabase/supabase-js";
import { Database } from "~/types/supabase";

const supabaseURL = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Create supabase client to be used throughout the application
export const supabase = createClient<Database>(
	supabaseURL || "",
	supabaseAnonKey || "",
	{
		auth: { persistSession: true },
	},
);
