import { supabase } from "@/lib/supabaseClient";

export const createUserAccount = async () => {
  const { data, error } = await supabase.rpc("create_account");
  if (error) throw error;
  return data;
};
