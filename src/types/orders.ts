export type StockDetailTab = "order" | "analytics" | "news";

export type SymbolInfo = {
  symbol: string;
  name_en: string;
  name_ko: string;
  branding_logo_url: string;
  branding_icon_url: string;
};

export type ChartTimeFrame =
  | "1m"
  | "3m"
  | "5m"
  | "10m"
  | "15m"
  | "30m"
  | "60m"
  | "120m"
  | "240m"
  | "D"
  | "W"
  | "M"
  | "Y";

export const labelChartTimeFrame: Record<ChartTimeFrame, string> = {
  "1m": "1분",
  "3m": "3분",
  "5m": "5분",
  "10m": "10분",
  "15m": "15분",
  "30m": "30분",
  "60m": "60분",
  "120m": "120분",
  "240m": "240분",
  D: "일",
  W: "주",
  M: "월",
  Y: "년",
};
