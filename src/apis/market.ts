import { supabase } from "@/lib/supabaseClient";

export async function fetchMarketInfo(isoDate: string) {
  const { data, error } = await supabase
    .from("market_calendar")
    .select("trade_date,open_time, close_time, session_open, session_close")
    .eq("trade_date", isoDate)
    .single();

  if (error) throw error;
  return data;
}
