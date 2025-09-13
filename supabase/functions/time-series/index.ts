import { supabaseClient } from "@shared/supabaseClient.ts";

const BARS_URL = "https://api.twelvedata.com/time_series";
const MAX_PER_MINUTE = 8;

/**
 * Cron Name: daily-time-series-updator
 * Running Every minute, at 05:00 AM and 06:00 AM with command
 *
 * 장 마감 시간에 일봉 업데이트
 */

Deno.serve(async () => {
  try {
    const JOB_ID = "time_series_daily";
    const todayUTC = new Date().toISOString().slice(0, 10);

    const { error: upErr } = await supabaseClient
      .from("job_state_time_series")
      .upsert(
        { job_id: JOB_ID, day_key: todayUTC },
        { onConflict: "job_id,day_key" },
      );
    if (upErr) throw upErr;

    const { data: state, error: selErr } = await supabaseClient
      .from("job_state_time_series")
      .select("job_id,last_symbol,day_key,is_done")
      .eq("job_id", JOB_ID)
      .eq("day_key", todayUTC)
      .single();
    if (selErr) throw selErr;

    if (state.is_done) {
      return new Response(
        JSON.stringify({
          ok: true,
          done: true,
          reason: "already finished for today",
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
        .from("job_state_time_series")
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

    const url = new URL(BARS_URL);
    url.searchParams.set("apikey", Deno.env.get("TWELVE_API_KEY"));
    url.searchParams.set("symbol", symbols.join(","));
    url.searchParams.set("interval", "1day");
    url.searchParams.set("outputsize", 7);
    url.searchParams.set("timezone", "utc");

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: { accept: "application/json" },
    });

    if (!res.ok) throw new Error(await res.text());
    const stockInfo = await res.json();

    const rows = [];
    for (const [symbol, list] of Object.entries(stockInfo ?? {})) {
      if (
        !list ||
        list.status === "error" ||
        list.code === 404 ||
        list.code === 403 ||
        !Array.isArray(list.values)
      )
        continue;
      for (const value of list.values) {
        rows.push({
          symbol: symbol,
          datetime: value.datetime,
          open: Number(value.open),
          high: Number(value.high),
          low: Number(value.low),
          close: Number(value.close),
          volume: Number(value.volume),
          notional: Number(value.close) * Number(value.volume),
        });
      }
    }
    if (rows.length) {
      const { error } = await supabaseClient
        .from("time_series")
        .upsert(rows, { onConflict: "symbol,datetime" });
      if (error) throw error;
      inserted += rows.length;
    }

    // 마지막 심볼 업데이트
    await supabaseClient
      .from("job_state_time_series")
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

  supabase functions deploy time-series

curl -L -X POST 'https://fvvutdyuxljohzbvmgzu.supabase.co/functions/v1/time-series' \
  -H 'Authorization: Bearer your-role-key' \
  -H 'Content-Type: application/json' \
  --data '{"name":"Functions"}'

*/
