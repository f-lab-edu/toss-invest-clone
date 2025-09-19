export type MarketInfo = {
  startDateTime: Date | null;
  endDateTime: Date | null;
  marketName: "프리마켓" | "정규장" | "애프터마켓" | "장 닫힘";
};

export type MarketCalendarRow = {
  trade_date: string;
  session_open: string;
  open_time: string;
  close_time: string;
  session_close: string;
};
