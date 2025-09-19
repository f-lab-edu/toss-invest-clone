import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const url = Deno.env.get("SUPABASE_URL")!;
const serviceRole = Deno.env.get("SUPABASE_ANON_KEY")!; // 서버 전용

export const supabaseClient = createClient(url, serviceRole, {
  auth: { persistSession: false },
});
