export type StockDetailTab = "order" | "analytics" | "news";

export type SymbolInfo = {
  symbol: string;
  name_en: string;
  name_ko: string;
  branding_logo_url: string;
  branding_icon_url: string;
};

export type Cursor = {
  lastDate: string;
};

export type TimeSeriesItem = {
  symbol: string;
  datetime: string;
  open: number;
  high: number;
  low: number;
  close: number;
  notional: number;
  volume: number;
};

export type DailyBarItem = {
  symbol: string;
  trade_date: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type ChartTimeFrame =
  | "1"
  | "3"
  | "5"
  | "15"
  | "30"
  | "60"
  | "120"
  | "240"
  | "D"
  | "W"
  | "M"
  | "Y";

export const labelChartTimeFrame: Record<ChartTimeFrame, string> = {
  "1": "1분",
  "3": "3분",
  "5": "5분",
  "15": "15분",
  "30": "30분",
  "60": "60분",
  "120": "120분",
  "240": "240분",
  D: "일",
  W: "주",
  M: "월",
  Y: "년",
};
