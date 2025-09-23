import { supabase } from "@/lib/supabaseClient";

export const fetchSymbolInfo = async (symbol: string) => {
  const { data, error } = await supabase
    .from("symbols")
    .select(
      `symbol, name_en, name_ko,
      symbol_profiles (
      branding_logo_url,
      branding_icon_url
      )
    `,
    )
    .eq("symbol", symbol)
    .single();

  if (error) throw error;

  const profile = Array.isArray(data.symbol_profiles)
    ? data.symbol_profiles[0]
    : data.symbol_profiles;

  return {
    symbol: data.symbol,
    name_en: data.name_en,
    name_ko: data.name_ko,
    branding_logo_url: profile?.branding_logo_url ?? null,
    branding_icon_url: profile?.branding_icon_url ?? null,
  };
};

export const fetchSymbolTimeSeries = async (symbol: string) => {
  const { data, error } = await supabase
    .from("time_series")
    .select("symbol, datetime, open, high, low, close")
    .eq("symbol", symbol)
    .order("datetime", { ascending: false })
    .limit(10);

  if (error) throw error;
  return data;
};

export const fetchRecentDailyPrice = async (symbol: string) => {
  const { data, error } = await supabase
    .from("daily_bars_live")
    .select("symbol, trade_date, open, high, low, close")
    .eq("symbol", symbol)
    .order("trade_date", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
};
