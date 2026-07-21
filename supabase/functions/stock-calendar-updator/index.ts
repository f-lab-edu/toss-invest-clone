import { supabaseClient } from "@shared/supabaseClient.ts";
import { DateTime } from "npm:luxon@3.4.4";

const CALENDAL_URL = "https://paper-api.alpaca.markets/v2/calendar";
const ET = "America/New_York";

const iso = (d: Date) => d.toISOString();

const toHHMM = (s: string) =>
  s.includes(":") ? s : `${s.slice(0, 2)}:${s.slice(2)}`;

const toUtcIso = (dateEt: string, hhmmEt: string) =>
  DateTime.fromISO(`${dateEt}T${toHHMM(hhmmEt)}`, { zone: ET })
    .toUTC()
    .toISO({ suppressMilliseconds: true });

type reqPayload = {
  start: string | Date;
  end: string | Date;
};

async function fetchStockCalendar(params: reqPayload) {
  const { start, end } = params;
  const url = new URL(CALENDAL_URL);
  url.searchParams.set("start", iso(new Date(start)));
  url.searchParams.set("end", iso(new Date(end)));

  const res = await fetch(url.toString(), {
    headers: {
      accept: "application/json",
      "APCA-API-KEY-ID": Deno.env.get("ALPACA_KEY_ID")!,
      "APCA-API-SECRET-KEY": Deno.env.get("ALPACA_SECRET_KEY")!,
    },
  });

  if (!res.ok) throw new Error(await res.text());
  const result = await res.json();

  const calendars = [];
  for (const item of result) {
    calendars.push({
      trade_date: item.date,
      open_time: toUtcIso(item.date, item.open),
      close_time: toUtcIso(item.date, item.close),
      session_open: toUtcIso(item.date, item.session_open),
      session_close: toUtcIso(item.date, item.session_close),
      settlement_date: item.settlement_date,
    });
  }

  return calendars;
}

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST")
      return new Response("Method Not Allowed", { status: 405 });

    const params: reqPayload = await req.json();
    const result = await fetchStockCalendar(params);

    const { error } = await supabaseClient
      .from("market_calendar")
      .upsert(result, { onConflict: "trade_date" });

    if (error) throw error;
    return new Response(JSON.stringify({ ok: true, data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ ok: false, error: String(e?.message ?? e) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
});

/*
배포 및 테스트
supabase functions deploy stock-calendar-updator --import-map functions/deno.json

 curl -L -X POST 'https://fvvutdyuxljohzbvmgzu.supabase.co/functions/v1/stock-calendar-updator' \
  -H 'Authorization: Bearer your-token' \
  -H 'Content-Type: application/json' \
  --data '{"start":"2025-09-10", "end": "2026-12-31"}'
 */
