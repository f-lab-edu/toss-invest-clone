import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const BARS_URL = "https://data.alpaca.markets/v2/stocks/bars";
const iso = (d: Date) => d.toISOString().slice(0, 10);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

Deno.serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!, // 자동 주입 값
      {
        auth: { persistSession: false },
        global: {
          headers: { Authorization: req.headers.get("Authorization") ?? "" },
        },
      },
    );

    const PAGE = 1000;
    let last: string | null = null;
    const symbols: string[] = [];

    while (true) {
      let q = supabase
        .from("symbols")
        .select("symbol")
        .order("symbol", { ascending: true })
        .limit(PAGE);

      if (last) q = q.gt("symbol", last); // 마지막 심볼보다 큰 것부터

      const { data, error } = await q;
      if (error) throw error;
      if (!data?.length) break;

      symbols.push(...data.map((r) => r.symbol.trim().toUpperCase()));
      last = data[data.length - 1].symbol;
    }

    // 2) 기간(최근 3개월 + 버퍼)
    const end = new Date();
    const start = new Date();
    end.setUTCDate(end.getUTCDate() + 1);
    start.setUTCMonth(start.getUTCMonth() - 3);
    start.setUTCDate(start.getUTCDate() - 10);
    const startDate = iso(start) + "T00:00:00Z";
    const endDate = iso(end) + "T00:00:00Z";

    // 3) 30개씩 청크
    const chunk = <T>(arr: T[], n: number) =>
      arr.reduce(
        (a, c, i) => (i % n ? a[a.length - 1].push(c) : a.push([c]), a),
        [] as T[][],
      );
    const groups = chunk(symbols, 30);

    let inserted = 0;
    let calls = 0;

    for (const syms of groups) {
      let pageToken: string | undefined;
      do {
        const url = new URL(BARS_URL);
        url.searchParams.set("timeframe", "1Day");
        url.searchParams.set("symbols", syms.join(","));
        url.searchParams.set("adjustment", "all");
        url.searchParams.set("feed", "iex"); // 무료면 iex
        if (pageToken) url.searchParams.set("page_token", pageToken);

        const res = await fetch(
          url.toString() + `&start=${startDate}&end=${endDate}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              "APCA-API-KEY-ID": Deno.env.get("ALPACA_KEY_ID")!,
              "APCA-API-SECRET-KEY": Deno.env.get("ALPACA_SECRET_KEY")!,
            },
          },
        );
        calls++;
        if (!res.ok) throw new Error(await res.text());
        const json = await res.json();

        // 4) 매핑
        const rows = [];
        for (const [sym, list] of Object.entries(json.bars ?? {})) {
          for (const b of list) {
            const v: number | null = b.v ?? null;
            const px = (b.vw ?? b.c ?? null) as number | null;
            rows.push({
              symbol: sym,
              bar_date: b.t?.slice(0, 10), // ← 테이블 컬럼명과 일치
              open: b.o,
              high: b.h,
              low: b.l,
              close: b.c,
              vwap: b.vw ?? null,
              volume: v,
              notional: px != null && v != null ? px * v : null,
            });
          }
        }

        if (rows.length) {
          const { error } = await supabase
            .from("daily_bars")
            .upsert(rows, { onConflict: "symbol,bar_date" });
          if (error) throw error;
          inserted += rows.length;
        }

        console.log("inserted", inserted);
        pageToken = json.next_page_token ?? undefined;
      } while (pageToken);

      await sleep(1000); // rate limit 완화
    }

    return new Response(
      JSON.stringify({
        ok: true,
        symbols: symbols.length,
        api_calls: calls,
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

  supabase functions deploy fetch-snapshots --no-verify-jwt

  curl -L -X POST 'https://fvvutdyuxljohzbvmgzu.supabase.co/functions/v1/fetch-snapshots' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2dnV0ZHl1eGxqb2h6YnZtZ3p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3NTYwMzAsImV4cCI6MjA3MTMzMjAzMH0.J1UWVa9zHrJgYWa-fs7zyC6KwcTWZx-BU_3v6HqZYVg' \
  -H 'Content-Type: application/json' \
  --data '{"name":"Functions"}

  중단되었을 때는 last에 마지막으로 들어간 심볼로 수정해서 다시 요청
*/
