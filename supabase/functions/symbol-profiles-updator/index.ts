import { supabaseClient } from "@shared/supabaseClient.ts";

const BARS_URL = "https://api.polygon.io/v3/reference/tickers";
const MAX_PER_MINUTE = 5;

Deno.serve(async () => {
  try {
    const JOB_ID = "symbol_profile";
    const todayUTC = new Date().toISOString().slice(0, 10);

    const { error: upErr } = await supabaseClient
      .from("job_state_update_logs")
      .upsert(
        { job_id: JOB_ID, day_key: todayUTC },
        { onConflict: "job_id,day_key" },
      );

    if (upErr) throw upErr;

    const { data: state, error: selErr } = await supabaseClient
      .from("job_state_update_logs")
      .select("job_id,last_symbol,is_done")
      .eq("job_id", JOB_ID)
      .eq("day_key", todayUTC)
      .single();
    if (selErr) throw selErr;

    if (state.is_done) {
      return new Response(
        JSON.stringify({
          ok: true,
          done: true,
          reason: "already",
        }),
      );
    }

    console.log(state);

    const symbols: string[] = [];

    const query = supabaseClient
      .from("symbols")
      .select("symbol")
      .eq("is_use", true)
      .order("symbol", { ascending: true })
      .limit(MAX_PER_MINUTE);

    if (state.last_symbol) {
      query.gt("symbol", state.last_symbol);
    }

    const { data, error } = await query;
    if (error) throw error;

    symbols.push(...data.map((r) => r.symbol.trim().toUpperCase()));

    if (!symbols.length) {
      // 작업 완료하면 리셋
      await supabaseClient
        .from("job_state_update_logs")
        .update({
          last_symbol: "",
          is_done: true,
          finished_at: new Date().toISOString(),
        })
        .eq("job_id", JOB_ID)
        .eq("day_key", todayUTC);

      return new Response(
        JSON.stringify({ ok: true, done: true, processed: 0 }),
      );
    }

    let inserted = 0;

    for (const symbol of symbols) {
      const url = new URL(BARS_URL + `/${symbol}`);
      url.searchParams.set("apikey", Deno.env.get("POLYGON_API_KEY"));

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: { accept: "application/json" },
      });

      if (!res.ok) {
        console.log(res.statusText);
        continue;
      }

      const data = await res.json();
      const symbol_profile = data.results;

      const row = {
        symbol: symbol_profile.ticker,
        name: symbol_profile.name,
        cik: symbol_profile.cik,
        market: symbol_profile.market,
        locale: symbol_profile.locale,
        type: symbol_profile.type,
        active: symbol_profile.active,
        currency_name: symbol_profile.currency,
        primary_exchange: symbol_profile.primary_exchange,
        composite_figi: symbol_profile.composite_figi,
        share_class_figi: symbol_profile.share_class_figi,
        market_cap: symbol_profile.market_cap,
        phone_number: symbol_profile.phone_number,
        address: JSON.stringify(symbol_profile.address),
        description: symbol_profile.description,
        sic_code: symbol_profile.sic_code,
        sic_description: symbol_profile.sic_description,
        ticker_root: symbol_profile.ticker_root,
        homepage_url: symbol_profile.homepage_url,
        total_employees: symbol_profile.total_employees,
        list_date: symbol_profile.list_date,
        branding_logo_url: symbol_profile.branding?.logo_url,
        branding_icon_url: symbol_profile.branding?.icon_url,
        share_class_shares_outstanding:
          symbol_profile.share_class_shares_outstanding,
        weighted_shares_outstanding: symbol_profile.weighted_shares_outstanding,
        round_lot: symbol_profile.round_lot,
      };

      const { error } = await supabaseClient
        .from("symbol_profiles")
        .upsert(row, { onConflict: "symbol" });

      if (error) throw error;
      inserted += 1;
    }

    await supabaseClient
      .from("job_state_update_logs")
      .update({
        last_symbol: symbols[symbols.length - 1],
        updated_at: new Date().toISOString(),
      })
      .eq("job_id", JOB_ID)
      .eq("day_key", todayUTC);

    return new Response(
      JSON.stringify({
        ok: true,
        symbols: symbols.length,
        rows_upserted: inserted,
      }),
      { headers: { "content-type": "application/json" } },
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
});

/* To invoke:

  $ cd supabase
  $ supabase functions deploy symbol-profiles-updator --import-map functions/deno.json

curl -L -X POST 'https://fvvutdyuxljohzbvmgzu.supabase.co/functions/v1/time-series' \
  -H 'Authorization: Bearer your-role-key' \
  -H 'Content-Type: application/json' \
  --data '{"name":"Functions"}'

*/
