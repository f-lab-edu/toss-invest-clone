import { supabaseClient } from "../_shared/supabaseClient.ts";

const REST = Deno.env.get("KIS_REST_BASE")!;
const APP = Deno.env.get("KIS_APP_KEY")!;
const SEC = Deno.env.get("KIS_APP_SECRET")!;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
function bad(message: string, status = 400, details?: unknown) {
  return jsonResponse({ ok: false, error: { message, details } }, status);
}

// Rate limiting을 위한 간단한 상태 관리
let requestTimes: number[] = [];

async function waitForRateLimit(maxRequests = 20, timeWindow = 1000) {
  const now = Date.now();

  // 시간 윈도우 밖의 요청들 제거
  requestTimes = requestTimes.filter((time) => now - time < timeWindow);

  if (requestTimes.length >= maxRequests) {
    // 가장 오래된 요청이 시간 윈도우를 벗어날 때까지 대기
    const oldestRequest = requestTimes[0];
    const waitTime = timeWindow - (now - oldestRequest) + 10; // 여유분 10ms 추가
    if (waitTime > 0) {
      console.log(`Rate limit reached, waiting ${waitTime}ms`);
      await sleep(waitTime);
      return waitForRateLimit(maxRequests, timeWindow); // 재귀적으로 다시 체크
    }
  }

  requestTimes.push(now);
}

async function postAuthAccessTokenP(): Promise<string> {
  const res = await fetch(`${REST}/oauth2/tokenP`, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      appkey: APP,
      appsecret: SEC,
    }),
  });
  if (!res.ok) throw new Error(`tokenP ${res.status}: ${await res.text()}`);
  const j = await res.json().catch(() => ({}));
  if (!j.access_token) throw new Error("No access_token");
  return j.access_token as string;
}

async function getOverseaStockTradeVolRanking(accessToken: string) {
  const url = `${REST}/uapi/overseas-stock/v1/ranking/trade-vol?EXCD=NYS&NDAY=1`; // 필요 파라미터만
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json; charset=utf-8",
      authorization: `Bearer ${accessToken}`,
      appkey: APP,
      appsecret: SEC,
      tr_id: "HHDFS76310010",
      custtype: "P",
    },
  });
  if (!res.ok) throw new Error(`trade-vol ${res.status}: ${await res.text()}`);
  return await res.json();
}

async function getOverseaSymbolInfo(
  accessToken: string,
  symbol: string,
  prdtType: string,
) {
  await waitForRateLimit();
  const url = `${REST}/uapi/overseas-price/v1/quotations/search-info?PRDT_TYPE_CD=${prdtType}&PDNO=${symbol}`; // 필요 파라미터만
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json; charset=utf-8",
      authorization: `Bearer ${accessToken}`,
      appkey: APP,
      appsecret: SEC,
      tr_id: "HHDFS76310010",
      custtype: "P",
    },
  });
  if (!res.ok) throw new Error(`trade-vol ${res.status}: ${await res.text()}`);
  return await res.json();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  const params: reqPayload = await req.json();

  try {
    const symbols: string[] = [];

    const query = supabaseClient
      .from("symbols")
      .select("symbol")
      .eq("is_use", true)
      .order("symbol", { ascending: true });

    if (params.last_symbol) {
      query.gt("symbol", params.last_symbol);
    }

    const { data, error } = await query;
    if (error) throw error;

    symbols.push(...data.map((r) => r.symbol.trim().toUpperCase()));

    const token = await postAuthAccessTokenP(); // 토큰 발급(1분 제한)
    console.log("token", token);

    requestTimes = [];
    const results = [];
    let processed = 0;

    for (const symbol of symbols) {
      try {
        const data = await getOverseaSymbolInfo(token, symbol, "512");
        results.push({
          symbol,
          prdt_eng_name: data.output?.prdt_eng_name ?? null,
          prdt_name: data.output?.prdt_name ?? null,
          std_pdno: data.output?.std_pdno ?? null,
        });
        processed++;

        if (processed % 10 === 0) {
          console.log(`Processed ${processed}/${symbols.length} symbols`);
        }
      } catch (error) {
        console.error(`Error processing symbol ${symbol}:`, error);
        // 에러가 발생해도 null 값으로 저장하고 계속 진행
        results.push({
          symbol,
          prdt_eng_name: null,
          prdt_name: null,
          std_pdno: null,
        });
        processed++;
      }
    }

    const SAVE_BATCH_SIZE = 50;
    let saved = 0;

    for (let i = 0; i < results.length; i += SAVE_BATCH_SIZE) {
      const batch = results.slice(i, i + SAVE_BATCH_SIZE);

      const { error } = await supabaseClient
        .from("symbols")
        .upsert(batch, { onConflict: "symbol" });

      if (error) {
        console.error("Database error:", error);
        throw error;
      }

      saved += batch.length;
      console.log(`Saved ${saved}/${results.length} records to database`);
    }

    return new Response(
      JSON.stringify({
        ok: true,
        processed: processed,
        saved: saved,
        total_symbols: symbols.length,
      }),
    );
  } catch (err) {
    return bad("request failed", 500, String(err));
  }
});

/*
supabase functions deploy kis-relay --import-map functions/deno.json

curl -L -X POST 'https://fvvutdyuxljohzbvmgzu.supabase.co/functions/v1/kis-relay' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2dnV0ZHl1eGxqb2h6YnZtZ3p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3NTYwMzAsImV4cCI6MjA3MTMzMjAzMH0.J1UWVa9zHrJgYWa-fs7zyC6KwcTWZx-BU_3v6HqZYVg' \
  -H 'Content-Type: application/json' \
  --data '{"name":"Functions"}'

*/
