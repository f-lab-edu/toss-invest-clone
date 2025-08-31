import { createClient } from "@supabase/supabase-js";

// prod;
const supabaseUrl = import.meta.env.VITE_SUPABASE_FUNCTIONS_PROD_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// dev
// const supabaseUrl = import.meta.env.VITE_SUPABASE_FUNCTIONS_DEV_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
