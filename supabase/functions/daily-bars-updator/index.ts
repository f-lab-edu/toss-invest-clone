import { supabaseClient } from "@shared/supabaseClient.ts";

const LATEST_BARS_URL = "https://data.alpaca.markets/v2/stocks/bars/latest";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const BATCH = 30;

const floorTo15m = (d = new Date()) => {
  const t = new Date(d);
  t.setUTCMinutes(Math.floor(t.getUTCMinutes() / 15) * 15, 0, 0);
  return t;
};
const iso = (d: Date) => d.toISOString();

async function fetchLatestBarsBatch(params: {
  symbols: string[];
  feed: string;
}) {
  const { symbols, feed } = params;

  const url = new URL(LATEST_BARS_URL);
  url.searchParams.set("symbols", symbols.join(","));
  url.searchParams.set("feed", feed);

  const res = await fetch(url.toString(), {
    headers: {
      accept: "application/json",
      "APCA-API-KEY-ID": Deno.env.get("ALPACA_KEY_ID")!,
      "APCA-API-SECRET-KEY": Deno.env.get("ALPACA_SECRET_KEY")!,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  const stockBars = await res.json(); // { bars: { [sym]: Bar } }

  const rows: UpsertRow[] = [];
  for (const [symbol, bar] of Object.entries(stockBars.bars ?? {})) {
    const px = (bar.vw ?? bar.c ?? null) as number | null;
    rows.push({
      symbol: symbol.toUpperCase(),
      bar_date: bar.t,
      open: bar.o ?? null,
      high: bar.h ?? null,
      low: bar.l ?? null,
      close: bar.c ?? null,
      vwap: bar.vw ?? null,
      volume: bar.v,
      notional: px != null && bar.v != null ? px * bar.v : null,
    });
  }
  return { rows, calls: 1 };
}

async function loadSymbols(): Promise<string[]> {
  const symbols: string[] = [];

  const { data, error } = await supabaseClient
    .from("symbols")
    .select("symbol")
    .eq("is_use", true)
    .order("symbol", { ascending: true });

  if (error) throw error;

  data.forEach((r) => symbols.push(r.symbol.trim().toUpperCase()));
  return symbols;
}

async function upsertDailyBar(rows: UpsertRow[]) {
  if (!rows.length) return { inserted: 0 };

  const barRows = rows.map((r) => ({
    symbol: r.symbol,
    trade_date: r.bar_date, // 'YYYY-MM-DD'
    price: r.close, // 현재가
    vwap: r.vwap ?? null,
    volume: r.volume ?? 0, // 이번에 누적할 증가분
  }));

  const { error } = await supabaseClient.rpc("upsert_daily_bars", {
    _rows: barRows,
  });

  if (error) throw error;
  return { inserted: rows.length };
}

function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

export async function fetchExternalSnapshot() {
  const allSymbols = await loadSymbols();
  const groups = chunk(allSymbols, BATCH);

  let totalCalls = 0;
  let totalInserted = 0;

  for (const group of groups) {
    console.log("group", group);
    try {
      let rows: UpsertRow[] = [];
      const { rows: rs, calls } = await fetchLatestBarsBatch({
        symbols: group,
        feed: "delayed_sip",
      });
      totalCalls += calls;
      rows = rs;
      console.log("result", calls, rows);

      if (rows.length) {
        const { inserted } = await upsertDailyBar(rows);
        totalInserted += inserted;
      }

      // 레이트리밋 완화
      await sleep(800);
    } catch (e) {
      console.error("[batch error]", e);
      // 백오프 후 다음 배치
      await sleep(1500);
    }
  }

  return {
    ok: true,
    symbols: allSymbols.length,
    api_calls: totalCalls,
    rows_upserted: totalInserted,
  };
}

/**
 * Cron Name: daily-bars-updator
 * Running Every minute with command
 *
 * 1분마다 종목 현재가 업데이트
 */

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST")
      return new Response("Method Not Allowed", { status: 405 });

    const now = new Date();
    const batch = floorTo15m(now);
    const batchTs = iso(batch);

    // 1) latest bar data
    const snapshot = await fetchExternalSnapshot();

    console.log("my snapshot", snapshot);

    if (!snapshot.ok) throw new Error("no snapshot data");

    return new Response(
      JSON.stringify({ ok: true, batchTs, count: snapshot.length }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (e) {
    console.error("[daily-bars-updator] error", e);
    return new Response(
      JSON.stringify({ ok: false, error: String(e?.message ?? e) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
});
