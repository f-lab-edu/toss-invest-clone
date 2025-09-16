import { supabase } from "@/lib/supabaseClient";
import type { Category, Period, RankingItem } from "@/types/ranking.ts";

export async function fetchRankings(
  metric: Category,
  timeframe: Period,
  limit = 100,
): Promise<RankingItem[]> {
  const { data, error } = await supabase
    .from("rankings_live")
    .select("*")
    .eq("metric", metric)
    .eq("timeframe", timeframe)
    .order("rank", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as RankingItem[];
}

/**
 * (metric, timeframe) 조합에 대한 Realtime 구독
 */
export function subscribeRankings(
  metric: Category,
  timeframe: Period,
  limit: 100,
  setRankings: (rows: RankingItem[]) => void,
) {
  const load = async () => {
    const rows = await fetchRankings(metric, timeframe, limit);
    setRankings(rows);
  };

  const channel = supabase
    .channel(`rankings:${metric}:${timeframe}`)
    .on("broadcast", { event: "updated" }, () => {
      load();
    })
    .subscribe((status) => {
      if (status === "SUBSCRIBED") {
        // 초기 로드 한번
        load();
      }
    });

  return () => {
    supabase.removeChannel(channel);
  };
}
