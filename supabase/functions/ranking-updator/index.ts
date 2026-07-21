import { supabaseClient } from "@shared/supabaseClient.ts";

const METRICS = ["notional", "volume", "pct_up", "pct_down"] as const;
const TIMEFRAMES = ["RT", "1D", "7D", "1M", "3M", "6M", "1Y"] as const;

/**
 * Cron Name: ranking-updator
 * Running Every minute with command
 *
 * 1분마다 실시간 차트 랭킹 업데이트
 */

Deno.serve(async () => {
  for (const metric of METRICS) {
    for (const timeframe of TIMEFRAMES) {
      const { error } = await supabaseClient.rpc("upsert_rankings_snapshot", {
        p_metric: metric,
        p_timeframe: timeframe,
      });
      if (error)
        console.error(`[rankings-updater] ${metric}/${timeframe}`, error);

      try {
        await supabaseClient.channel(`rankings:${metric}:${timeframe}`).send({
          type: "broadcast",
          event: "updated",
          payload: {
            event: "updated",
            metric,
            timeframe,
            ts: new Date().toISOString(),
          },
        });
      } catch (broadcastError) {
        console.error(`[broadcast] ${metric}/${timeframe}`, broadcastError);
      }
    }
  }

  return new Response("ok");
});

/* To invoke:

  supabase functions deploy ranking-updator

curl -L -X POST 'https://fvvutdyuxljohzbvmgzu.supabase.co/functions/v1/ranking-updator' \
  -H 'Authorization: Bearer your-role-key' \
  -H 'Content-Type: application/json' \
  --data '{"name":"Functions"}'

  중단되었을 때는 last에 마지막으로 들어간 심볼로 수정해서 다시 요청
*/
