import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.DEV_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
