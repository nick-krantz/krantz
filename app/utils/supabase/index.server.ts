import { createClient } from '@supabase/supabase-js'

const supabaseURL = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

// Create supabase client to be used throughout the application
export const supabase = createClient(supabaseURL || '', supabaseAnonKey || '', { persistSession: true })
