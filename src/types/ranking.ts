export type Category = "notional" | "volume" | "pct_up" | "pct_down";
export type Period = "RT" | "1D" | "7D" | "1M" | "3M" | "6M" | "1Y";

export const PERIODS_BY_CATEGORY: Record<Category, Period[]> = {
  notional: ["RT", "1D", "7D", "1M", "3M", "6M"],
  volume: ["RT", "1D", "7D", "1M", "3M", "6M"],
  pct_up: ["1D", "7D", "1M", "3M", "6M"], // 실시간 제외
  pct_down: ["1D", "7D", "1M", "3M", "6M"], // 실시간 제외
};

export type RankingItem = {
  metric: Category;
  timeframe: Period;
  rank: number;
  symbol: string;
  symbol_kor?: string;
  value: number; // 거래대금/거래량 합 또는 등락률(%)
  prev_rank: number;
  rank_change: number;
  current_price: number;
  anchor_price: number;
  rt_price?: number;
  rt_ts?: string;
  updated_at: string;
};
