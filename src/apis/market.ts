import { supabase } from "@/lib/supabaseClient";

export const fetchMarketInfo = async (isoDate: string) => {
  const { data, error } = await supabase
    .from("market_calendar")
    .select("trade_date,open_time, close_time, session_open, session_close")
    .eq("trade_date", isoDate)
    .maybeSingle();

  if (error) throw error;
  return data;
};
